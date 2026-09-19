import assert from "node:assert/strict"
import { execFileSync, spawnSync } from "node:child_process"
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, utimesSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

const script = resolve("scripts/update-portfolio-version.mjs")
const root = mkdtempSync(join(tmpdir(), "portfolio-version-"))
const localEnv = { ...process.env, CI: "", VERCEL: "" }
const run = (env = {}) =>
  spawnSync(process.execPath, [script], { cwd: root, env: { ...localEnv, ...env }, encoding: "utf8" })
try {
  mkdirSync(join(root, "public/portfolio"), { recursive: true })
  mkdirSync(join(root, "public/projects"), { recursive: true })
  const htmlPath = join(root, "public/portfolio/index.html")
  writeFileSync(htmlPath, '<head>\n    <meta charset="utf-8" />\n</head><img data-src="/projects/demo.svg">')
  writeFileSync(join(root, "public/portfolio/deck.css"), "body { color: black }")
  writeFileSync(join(root, "public/projects/demo.svg"), "<svg />")
  const git = (...args) =>
    execFileSync("git", args, {
      cwd: root,
      env: { ...localEnv, GIT_AUTHOR_DATE: "2026-09-17T16:00:00Z", GIT_COMMITTER_DATE: "2026-09-17T16:00:00Z" },
      stdio: "pipe",
    })
  git("init")
  git("add", ".")
  git("-c", "user.name=Test", "-c", "user.email=test@example.com", "commit", "-m", "Initial deck")
  assert.equal(run().status, 0)
  const snapshot = readFileSync(htmlPath, "utf8")
  assert.match(snapshot, /portfolio-modified" content="2026-09-18"/)
  // Checkout timestamps and deployment without .git must not change the date.
  for (const file of [htmlPath, join(root, "public/portfolio/deck.css")]) utimesSync(file, new Date(), new Date())
  rmSync(join(root, ".git"), { recursive: true, force: true })
  assert.equal(run({ VERCEL: "1" }).status, 0)
  assert.equal(readFileSync(htmlPath, "utf8"), snapshot)
  // A referenced image change must be detected rather than stamped with deployment time.
  writeFileSync(join(root, "public/projects/demo.svg"), '<svg width="2" />')
  assert.notEqual(run({ VERCEL: "1" }).status, 0)
  assert.equal(readFileSync(htmlPath, "utf8"), snapshot)
  console.log("PASS: Git date in KST, stable redeploy without Git, stale asset detection")
} finally {
  rmSync(root, { recursive: true, force: true })
}
