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
