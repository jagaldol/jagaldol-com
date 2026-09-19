import { exportStyles, inlineMedia } from "./assets.js"

/* 문서가 마지막으로 수정된 날짜를 파일명에 쓴다. 내려받은 날짜가 아니라 버전을 가리켜야 한다. */
export function deckVersionDate() {
  const date = document.querySelector('meta[name="portfolio-modified"]')?.content
  return /^\d{4}-\d{2}-\d{2}$/.test(date || "") ? date : "undated"
}

/* Standalone browser export: render each slide, then package JPEG pages as PDF. */
export async function downloadDeckPDF(slides, progress) {
  const encoder = new TextEncoder(),
    parts = [],
    offsets = [0]
  let length = 0
  const append = (value) => {
    let bytes = typeof value === "string" ? encoder.encode(value) : value
    parts.push(bytes)
    length += bytes.length
  }
  const object = (id, body) => {
    offsets[id] = length
    append(`${id} 0 obj\n`)
    append(body)
    append("\nendobj\n")
  }
  const stream = (id, header, bytes) => {
    offsets[id] = length
    append(`${id} 0 obj\n<<${header} /Length ${bytes.length}>>\nstream\n`)
    append(bytes)
    append("\nendstream\nendobj\n")
  }
  append("%PDF-1.4\n")
  object(1, "<< /Type /Catalog /Pages 2 0 R >>")
  object(2, `<< /Type /Pages /Count ${slides.length} /Kids [${slides.map((_, i) => `${3 + i * 3} 0 R`).join(" ")}] >>`)
  let nextAnnotation = 3 + slides.length * 3
  const css = await exportStyles()
  for (let i = 0; i < slides.length; i++) {
    progress(i + 1)
    await new Promise((resolve) => requestAnimationFrame(resolve))
    const clone = slides[i].cloneNode(true)
    clone.classList.add("active", "visible")
    clone.removeAttribute("inert")
    clone.removeAttribute("aria-hidden")
    clone.querySelectorAll("[contenteditable]").forEach((e) => e.removeAttribute("contenteditable"))
    await inlineMedia(clone)
    const wrapper = document.createElement("div")
    wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
    wrapper.style.cssText = "width:1920px;height:1080px;background:white;font-family:Body,sans-serif;color:#233c33"
    const style = document.createElement("style")
    style.textContent =
      css +
      "\n.slide{position:relative!important;top:0!important;left:0!important;visibility:visible!important;opacity:1!important;animation:none!important;transform:none!important}"
    wrapper.append(style, clone)
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><foreignObject width="1920" height="1080">' +
      new XMLSerializer().serializeToString(wrapper) +
      "</foreignObject></svg>"
    const img = new Image()
    img.src =
      "data:image/svg+xml;base64," +
      (await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result.split(",")[1])
        reader.onerror = reject
        reader.readAsDataURL(new Blob([svg], { type: "image/svg+xml" }))
      }))
    await img.decode()
    const canvas = document.createElement("canvas")
    canvas.width = 1920
    canvas.height = 1080
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, 1920, 1080)
    ctx.drawImage(img, 0, 0)
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.96))
    if (!blob) throw Error("Slide capture failed")
    const jpeg = new Uint8Array(await blob.arrayBuffer())
    const id = 3 + i * 3
    const bounds = slides[i].getBoundingClientRect(),
      scale = bounds.width / 1920,
      annotations = []
    for (const link of slides[i].querySelectorAll("a[href]")) {
      const rect = link.getBoundingClientRect()
      if (!rect.width || !rect.height) continue
      const x = ((rect.left - bounds.left) / scale) * 0.75,
        y = 810 - ((rect.bottom - bounds.top) / scale) * 0.75,
        w = (rect.width / scale) * 0.75,
        h = (rect.height / scale) * 0.75
      const uri = link.href.replace(/([\\()])/g, "\\$1"),
        annotation = nextAnnotation++
      annotations.push(`${annotation} 0 R`)
      object(
        annotation,
        `<< /Type /Annot /Subtype /Link /Rect [${x} ${y} ${x + w} ${y + h}] /Border [0 0 0] /A << /S /URI /URI (${uri}) >> >>`,
      )
    }
    object(
      id,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 1440 810] /Resources << /XObject << /Slide ${id + 1} 0 R >> >> /Contents ${id + 2} 0 R /Annots [${annotations.join(" ")}] >>`,
    )
    stream(
      id + 1,
      " /Type /XObject /Subtype /Image /Width 1920 /Height 1080 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode",
      jpeg,
    )
    stream(id + 2, "", encoder.encode("q 1440 0 0 810 0 0 cm /Slide Do Q"))
    canvas.width = 0
    img.src = ""
  }
  const xref = length
  append(`xref\n0 ${offsets.length}\n0000000000 65535 f \n`)
  for (const offset of offsets.slice(1)) append(`${String(offset).padStart(10, "0")} 00000 n \n`)
  append(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`)
  const url = URL.createObjectURL(new Blob(parts, { type: "application/pdf" }))
  const a = document.createElement("a")
  a.href = url
  a.download = `${deckVersionDate()}-portfolio.pdf`
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 60000)
}
