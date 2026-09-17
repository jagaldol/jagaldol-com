const dataURLs = new Map()

export async function asDataURL(url) {
  if (url.startsWith("data:")) return url
  if (!dataURLs.has(url)) {
    const pending = fetch(url)
      .then(async (response) => {
        if (!response.ok) throw new Error(`Asset failed: ${url}`)
        const blob = await response.blob()
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
      })
      .catch((error) => {
        dataURLs.delete(url)
        throw error
      })
    dataURLs.set(url, pending)
  }
  return dataURLs.get(url)
}

export function activateMedia(root) {
  root.querySelectorAll("[data-src], [data-href]").forEach((el) => {
    for (const name of ["src", "href"]) {
      if (el.hasAttribute(`data-${name}`)) {
        el.setAttribute(name, el.getAttribute(`data-${name}`))
        el.removeAttribute(`data-${name}`)
      }
    }
  })
}

export async function inlineMedia(root) {
  activateMedia(root)
  await Promise.all(
    [...root.querySelectorAll("img[src], image[href]")].map(async (el) => {
      const attr = el.tagName.toLowerCase() === "img" ? "src" : "href"
      el.setAttribute(attr, await asDataURL(el.getAttribute(attr)))
    }),
  )
}

export async function exportStyles() {
  const sheets = await Promise.all(
    [...document.querySelectorAll('style, link[rel="stylesheet"]')].map(async (el) => {
      if (el.tagName === "STYLE") return el.textContent
      const response = await fetch(el.href)
      if (!response.ok) throw new Error("Stylesheet failed")
      return response.text()
    }),
  )
  if (document.querySelector('link[rel="stylesheet"]') && !document.getElementById("extraFonts")) {
    const response = await fetch("/portfolio/extra-fonts.css")
    if (!response.ok) throw new Error("Additional fonts failed")
    sheets.push(await response.text())
  }
  let css = sheets.join("\n")
  const urls = [...new Set([...css.matchAll(/url\(["']?([^\s)"']+)["']?\)/g)].map((match) => match[1]))]
  for (const url of urls) css = css.split(url).join(await asDataURL(url))
  return css
}

export async function standaloneHTML(root) {
  const css = await exportStyles()
  await inlineMedia(root)
  root.querySelectorAll('style, link[rel="stylesheet"]').forEach((el) => el.remove())
  const style = document.createElement("style")
  style.textContent = css
  root.querySelector("head").append(style)
  // Inline this small ES module graph so saved copies also work offline.
  if (root.querySelector('script[type="module"]')) {
    const modules = await Promise.all(
      ["assets.js", "pdf.js", "controller.js"].map(async (name) => {
        const response = await fetch(`/portfolio/${name}`)
        if (!response.ok) throw new Error("Script failed")
        return (await response.text()).replace(/^import .*?from .*?;?\s*$/gm, "").replace(/^export /gm, "")
      }),
    )
    root.querySelectorAll("script").forEach((el) => el.remove())
    const script = document.createElement("script")
    script.textContent = modules.join("\n")
    root.querySelector("body").append(script)
  }
  return "<!doctype html>\n" + root.outerHTML
}

// Additional glyphs are needed only for user-edited text outside the original deck.
const primaryCharacters = new Set(
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ·–•←→↗㈜가각간갈감개거검것게겠격견결경계고공과곽관교구국궁규균그글금기깁깊까꼭나내넓네넥년논놓는능니닝다단닫담답대더데델도돌돕동된드든들듭디떤라랑래랙량러렌렙력로록론롬롭료루룹류르를리린링마만많매메며면명모목무문미및바박반발방배백버법베변보복본봇부분불뷰브블비빠뿐사산상색생서석선설성션소솔수순술스습승시식신실심쌓아악안않약양어억언업에엔여역연영예오와완요용우운원월웹위유육윤율으은을음응의이익인일입있자잡장재저적전절점접정제젝존졸종좌주준중즐증지직진질집짓차챌챗처천체총촬최추축출측치카캠커컴크큰탕탠터테템토톤통튜트특팀파퍼편평포폭폰폴표퓨프필하학한합해행향험혜호화확환활회획효흥히\n\r\t",
)
export function ensureEditedFonts(text) {
  if ([...text].every((char) => primaryCharacters.has(char))) return
  if (!document.querySelector('link[rel="stylesheet"]') || document.getElementById("extraFonts")) return
  const link = document.createElement("link")
  link.id = "extraFonts"
  link.rel = "stylesheet"
  link.href = "/portfolio/extra-fonts.css"
  document.head.append(link)
}
