import { readFile } from "node:fs/promises"
import path from "node:path"

import sharp from "sharp"

const [source, destination] = process.argv.slice(2)
if (!source || path.extname(source).toLowerCase() !== ".svg") {
  throw new Error("Usage: node export-banner.mjs <banner.svg> [output.png]")
}
const output = destination ?? source.replace(/\.svg$/i, ".png")
if (path.extname(output).toLowerCase() !== ".png") {
  throw new Error("Output must be a .png file")
}

const svg = await readFile(source)
const metadata = await sharp(svg).metadata()
if (metadata.width !== 1440 || metadata.height !== 288) {
  throw new Error("Banner SVG must be 1440 × 288; fix the source canvas before exporting")
}
await sharp(svg).png().toFile(output)
console.log(`Exported ${output} (1440 × 288)`)
