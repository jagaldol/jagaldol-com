import assert from "node:assert/strict"
import { mkdtemp } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright")
const output = await mkdtemp(join(tmpdir(), "portfolio-check-"))
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
})
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
  const errors = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto(process.env.PORTFOLIO_URL || "http://localhost:3000/portfolio")
  await page.evaluate(() => document.fonts.ready)
  assert.equal(await page.locator(".slide").count(), 12)
  assert.ok((await page.locator("[data-src]").count()) > 0)
  const initialBytes = await page.evaluate(() => {
    const entries = [...performance.getEntriesByType("navigation"), ...performance.getEntriesByType("resource")]
    return entries.reduce((total, entry) => total + entry.transferSize, 0)
  })
  assert.ok(initialBytes < 500_000, `Initial transfer too large: ${initialBytes}`)
  await page.screenshot({ path: join(output, "cover.png") })
  // Export before visiting later slides, including their deferred media.
  await page.evaluate(() => {
    window.print = () => {
      throw new Error("Must download without print dialog")
    }
  })
  let download = page.waitForEvent("download", { timeout: 120_000 })
  await page.click("#pdfExport")
  await (await download).saveAs(join(output, "portfolio.pdf"))
  await page.click("#fullscreen")
  await page.waitForFunction(() => !!document.fullscreenElement)
  await page.mouse.move(600, 150)
  await page.waitForTimeout(250)
  assert.equal(await page.locator(".deck-controls").evaluate((el) => getComputedStyle(el).opacity), "0")
  await page.mouse.move(600, 710)
  await page.waitForTimeout(250)
  assert.equal(await page.locator(".deck-controls").evaluate((el) => getComputedStyle(el).opacity), "1")
  await page.keyboard.press("f")
  await page.waitForFunction(() => !document.fullscreenElement)
  for (let i = 0; i < 12; i++) {
    await page.evaluate((index) => window.deck.show(index), i)
    await page.locator(".slide.active img").evaluateAll((images) => Promise.all(images.map((img) => img.decode())))
    assert.ok((await page.locator(".slide.active").innerText()).trim().length > 0)
  }
  await page.evaluate(() => window.deck.show(8))
  await page.screenshot({ path: join(output, "box-size.png") })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.waitForTimeout(250)
  assert.ok(await page.locator(".deck-stage").evaluate((el) => Math.abs(el.getBoundingClientRect().width - 390) < 1))
  await page.screenshot({ path: join(output, "mobile.png") })
  await page.evaluate(() => window.deck.show(0))
  await page.click("#editToggle")
  const edited = "새로운 글자 뾰쫑 테스트"
  await page.locator("h1[data-edit]").fill(edited)
  await page.reload()
  assert.equal(await page.locator("h1[data-edit]").innerText(), edited)
  assert.equal(await page.locator(".project-6 h2").textContent(), "매일메일")
  await page.click("#editToggle")
  download = page.waitForEvent("download", { timeout: 120_000 })
  await page.click("#download")
  const saved = join(output, "saved.html")
  await (await download).saveAs(saved)
  await page.goto(`file://${saved}`)
  await page.evaluate(() => document.fonts.ready)
  assert.equal(await page.locator("h1[data-edit]").innerText(), edited)
  download = page.waitForEvent("download", { timeout: 120_000 })
  await page.click("#pdfExport")
  await (await download).saveAs(join(output, "edited-offline.pdf"))
  assert.deepEqual(errors, [])
  console.log(JSON.stringify({ result: "pass", initialBytes, output }))
} finally {
  await browser.close()
}
