import { activateMedia, standaloneHTML } from "./assets.js"
import { downloadDeckPDF } from "./pdf.js"

class SlidePresentation {
  constructor() {
    this.slides = [...document.querySelectorAll(".slide")]
    this.stage = document.querySelector(".deck-stage")
    this.current = 0
    this.editing = false
    this.canEdit = location.protocol === "file:" || ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname)
    document.querySelector("#editToggle").hidden = !this.canEdit
    this.storageKey = "hyejun-portfolio-html-2026-09-17-v17"
    this.items = [...document.querySelectorAll("[data-edit]")]
    this.items.forEach((el, i) => (el.dataset.editId = i))
    this.restore()
    this.scale()
    window.addEventListener("resize", () => this.scale())
    window.addEventListener("hashchange", () => this.show(this.hashIndex()))
    this.show(this.hashIndex())
    this.bind()
  }
  hashIndex() {
    return Math.max(0, (parseInt(location.hash.slice(1), 10) || 1) - 1)
  }
  scale() {
    let w = innerWidth,
      h = innerHeight - (document.fullscreenElement ? 0 : 64),
      s = Math.min(w / 1920, h / 1080)
    this.stage.style.transform = `translate(${(w - 1920 * s) / 2}px,${(h - 1080 * s) / 2}px) scale(${s})`
  }
  show(n) {
    this.current = Math.max(0, Math.min(n, this.slides.length - 1))
    this.slides.forEach((s, i) => {
      let active = i === this.current
      s.classList.toggle("active", active)
      s.classList.toggle("visible", active)
      if (active) activateMedia(s)
      s.inert = !active
      s.setAttribute("aria-hidden", String(!active))
    })
    document.querySelector("#counter").textContent = `${this.current + 1} / ${this.slides.length}`
    document.querySelector("#prev").disabled = this.current === 0
    document.querySelector("#next").disabled = this.current === this.slides.length - 1
    history.replaceState(null, "", "#" + (this.current + 1))
  }
  message(s) {
    let n = document.querySelector("#notice")
    n.textContent = s
    n.classList.add("show")
    clearTimeout(this.timer)
    this.timer = setTimeout(() => n.classList.remove("show"), 3200)
  }
  restore() {
    this.edits = {}
    if (!this.canEdit) return
    try {
      let saved = JSON.parse(localStorage.getItem(this.storageKey) || "null")
      if (Array.isArray(saved)) {
        saved.forEach((value, i) => {
          if (typeof value === "string" && value.trim()) this.edits[i] = value
        })
        localStorage.setItem(this.storageKey, JSON.stringify({ version: 2, edits: this.edits }))
      } else if (saved?.version === 2 && saved.edits && typeof saved.edits === "object") this.edits = saved.edits
      this.items.forEach((el, i) => {
        if (typeof this.edits[i] === "string") {
          el.innerText = this.edits[i]
        }
      })
    } catch {}
  }
  persist(el) {
    if (!this.editing || !el.isContentEditable) return
    this.edits[el.dataset.editId] = el.innerText
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({ version: 2, edits: this.edits }))
    } catch {
      this.message("자동 저장을 사용할 수 없습니다. 저장 버튼으로 파일을 내려받으세요.")
    }
  }
  toggleEdit() {
    if (!this.canEdit) return
    this.editing = !this.editing
    document.body.classList.toggle("editing", this.editing)
    this.items.forEach((el) => {
      if (this.editing) el.setAttribute("contenteditable", "true")
      else el.removeAttribute("contenteditable")
    })
    document.querySelector("#editToggle").textContent = this.editing ? "편집 끝" : "편집"
    this.message(
      this.editing ? "문구를 클릭해 수정하세요. 저장 버튼으로 HTML을 내려받을 수 있습니다." : "편집을 마쳤습니다.",
    )
  }
  async save() {
    if (!this.canEdit) return
    try {
      let root = document.documentElement.cloneNode(true)
      root.querySelector("body").classList.remove("editing", "controls-revealed")
      root.querySelectorAll("[contenteditable]").forEach((el) => el.removeAttribute("contenteditable"))
      root.querySelector("#editToggle").textContent = "편집"
      root.querySelector("#fullscreen").textContent = "전체 화면"
      root.querySelector("#notice").classList.remove("show")
      root.querySelectorAll("dialog").forEach((d) => d.removeAttribute("open"))
      root.querySelector("#outlineList").replaceChildren()
      let url = URL.createObjectURL(new Blob([await standaloneHTML(root)], { type: "text/html;charset=utf-8" }))
      let a = document.createElement("a")
      a.href = url
      a.download = "2026-09-17-portfolio-edited.html"
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 10000)
      this.message("수정한 HTML 파일을 다운로드했습니다.")
    } catch (error) {
      console.error(error)
      this.message("HTML 저장에 실패했습니다. 다시 시도해 주세요.")
    }
  }
  bind() {
    let by = (id) => document.getElementById(id)
    document.addEventListener("fullscreenchange", () => {
      document.body.classList.remove("controls-revealed")
      if (document.fullscreenElement && document.activeElement?.closest(".deck-controls")) document.activeElement.blur()
      by("fullscreen").textContent = document.fullscreenElement ? "전체 화면 종료" : "전체 화면"
      this.scale()
    })
    document.addEventListener("pointermove", (e) => {
      if (document.fullscreenElement) document.body.classList.toggle("controls-revealed", e.clientY >= innerHeight - 90)
    })
    document.documentElement.addEventListener("pointerleave", () => document.body.classList.remove("controls-revealed"))
    by("prev").onclick = () => this.show(this.current - 1)
    by("next").onclick = () => this.show(this.current + 1)
    by("editToggle").onclick = () => this.toggleEdit()
    by("download").onclick = () => this.save()
    by("pdfExport").onclick = () => this.exportPDF()
    by("fullscreen").onclick = () => this.fullscreen()
    this.items.forEach((el) => {
      el.addEventListener("input", () => this.persist(el))
      el.addEventListener("paste", (e) => {
        if (!this.editing) return
        e.preventDefault()
        let selection = getSelection()
        if (!selection.rangeCount) return
        let range = selection.getRangeAt(0)
        range.deleteContents()
        let node = document.createTextNode(e.clipboardData.getData("text/plain"))
        range.insertNode(node)
        range.setStartAfter(node)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
        this.persist(el)
      })
    })
    const outlineSections = new Map()
    const outlineGroups = new Map()
    by("outlineList").replaceChildren()
    this.slides.forEach((s, i) => {
      if (s.dataset.outlineSkip) return
      let parent = outlineSections.get(s.dataset.section) || by("outlineList")
      if (s.dataset.group) {
        const key = `${s.dataset.section}/${s.dataset.group}`
        if (!outlineGroups.has(key)) {
          const group = document.createElement("li")
          const label = document.createElement("p")
          label.className = "outline-group-label"
          label.textContent = s.dataset.group
          const list = document.createElement("ol")
          group.append(label, list)
          parent.append(group)
          outlineGroups.set(key, list)
        }
        parent = outlineGroups.get(key)
      }
      const item = document.createElement("li")
      let b = document.createElement("button")
      const number = document.createElement("span")
      number.className = "outline-page-number"
      number.textContent = String(i + 1).padStart(2, "0")
      const label = document.createElement("span")
      label.textContent = s.dataset.title
      b.append(number, label)
      b.onclick = () => {
        by("outline").close()
        this.show(i)
      }
      item.append(b)
      parent.append(item)
      if (s.dataset.outlineRoot) {
        const list = document.createElement("ol")
        item.append(list)
        outlineSections.set(s.dataset.outlineRoot, list)
      }
    })
    by("contents").onclick = () => by("outline").showModal()
    by("closeOutline").onclick = () => by("outline").close()
    document.addEventListener("keydown", (e) => {
      if (this.canEdit && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault()
        this.save()
        return
      }
      if (e.key === "Escape" && this.editing) {
        this.toggleEdit()
        return
      }
      if (e.target.isContentEditable || e.target.closest("dialog") || e.ctrlKey || e.metaKey || e.altKey) return
      if ((e.key === " " || e.key === "Enter") && e.target.closest("button,a")) return
      if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(e.key)) {
        e.preventDefault()
        this.show(this.current + 1)
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault()
        this.show(this.current - 1)
      } else if (e.key === "Home") {
        e.preventDefault()
        this.show(0)
      } else if (e.key === "End") {
        e.preventDefault()
        this.show(this.slides.length - 1)
      } else if (e.key.toLowerCase() === "e") this.toggleEdit()
      else if (e.key.toLowerCase() === "f") this.fullscreen()
    })
    let start = null
    this.stage.addEventListener(
      "touchstart",
      (e) => {
        if (!this.editing) start = e.touches[0].clientX
      },
      { passive: true },
    )
    this.stage.addEventListener(
      "touchend",
      (e) => {
        if (start === null || this.editing) return
        let dx = e.changedTouches[0].clientX - start
        if (Math.abs(dx) > 50) this.show(this.current + (dx < 0 ? 1 : -1))
        start = null
      },
      { passive: true },
    )
    let wheel = 0
    this.stage.addEventListener(
      "wheel",
      (e) => {
        if (this.editing || Math.abs(e.deltaY) < 15) return
        e.preventDefault()
        if (Date.now() - wheel > 650) {
          wheel = Date.now()
          this.show(this.current + (e.deltaY > 0 ? 1 : -1))
        }
      },
      { passive: false },
    )
    window.addEventListener("beforeprint", () =>
      this.slides.forEach((s) => {
        activateMedia(s)
        s.inert = false
      }),
    )
    window.addEventListener("afterprint", () => this.show(this.current))
  }
  async exportPDF() {
    if (this.exporting) return
    this.exporting = true
    const button = document.getElementById("pdfExport")
    button.disabled = true
    try {
      await document.fonts.ready
      await downloadDeckPDF(this.slides, (n) => (button.textContent = `PDF ${n}/${this.slides.length}`))
      this.message("PDF를 다운로드했습니다.")
    } catch (error) {
      console.error(error)
      this.message("PDF 생성에 실패했습니다. 다시 시도해 주세요.")
    } finally {
      this.exporting = false
      button.disabled = false
      button.textContent = "PDF 저장"
    }
  }
  async fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
    } catch {
      this.message("브라우저의 전체 화면 기능을 사용하세요.")
    }
  }
}
window.deck = new SlidePresentation()
