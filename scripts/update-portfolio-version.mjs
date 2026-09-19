import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { readFileSync, statSync, writeFileSync } from "node:fs"

const htmlPath = "public/portfolio/index.html"
const html = readFileSync(htmlPath, "utf8")
const versionTags = /    <meta name="portfolio-(?:modified|digest)" content="[^"]*" \/>\n/g
const sourceHTML = html.replace(versionTags, "")
const css = readFileSync("public/portfolio/deck.css", "utf8")
const files = new Map([
  [htmlPath, sourceHTML],
  ["public/portfolio/deck.css", css],
])
// Include the images and fonts actually used by the deck, including assets outside /portfolio.
for (const match of (sourceHTML + css).matchAll(/["'(](\/[^"'()<>\s]+\.(?:png|jpe?g|webp|svg|gif|woff2?))["')]/gi)) {
  const file = `public${match[1]}`
  files.set(file, readFileSync(file))
}
const hash = createHash("sha256")
for (const [file, content] of [...files].sort(([a], [b]) => a.localeCompare(b))) {
  hash.update(file).update("\0").update(content).update("\0")
}
const digest = hash.digest("hex")
const previous = html.match(/name="portfolio-digest" content="([^"]+)"/)?.[1]
if (previous === digest) {
  console.log("Portfolio version unchanged")
} else {
  // Deployment must use committed metadata, never checkout/build timestamps.
  if (process.env.VERCEL || process.env.CI) {
    throw new Error("Portfolio version is stale. Run npm run portfolio:version locally and commit index.html.")
  }
  const paths = [...files.keys()]
  const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim()
  const committed = git("log", "-1", "--format=%cI", "--", ...paths)
  let modified = committed ? Date.parse(committed) : 0
  const dirty = new Set([
    ...git("diff", "HEAD", "--name-only", "-z", "--", ...paths).split("\0"),
    ...git("ls-files", "--others", "--exclude-standard", "-z", "--", ...paths).split("\0"),
  ])
  for (const file of paths) {
    if (dirty.has(file)) modified = Math.max(modified, statSync(file).mtimeMs)
  }
  if (!modified) throw new Error("Cannot determine portfolio modification date from Git or local changes")
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(modified))
  const tags = `    <meta name="portfolio-modified" content="${date}" />\n    <meta name="portfolio-digest" content="${digest}" />\n`
  writeFileSync(htmlPath, sourceHTML.replace('    <meta charset="utf-8" />\n', '    <meta charset="utf-8" />\n' + tags))
  console.log(`Portfolio version: ${date}`)
}
