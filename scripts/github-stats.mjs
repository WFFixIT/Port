// Refresh lib/github-stats.json from the GitHub API (uses GITHUB_TOKEN, or the gh CLI login).
// node scripts/github-stats.mjs
import { execFileSync } from "node:child_process"
import { writeFile } from "node:fs/promises"

const token = process.env.GITHUB_TOKEN

const AUTHORS = ["WFFixIT", "Cakekie"]
const SINCE = "2026-01-01T00:00:00Z"
const REPOS = [
  "WFFixIT/MaMoBot",
  "WFFixIT/concerts-bot",
  "WFFixIT/Web-cinema",
  "WFFixIT/500day.co.th",
  "WF-LABs/500day.co.th",
  "WFFixIT/WFLABs",
  "WFFixIT/WFFixIT",
  "WFFixIT/White-Forces",
  "WFFixIT/WFCloud",
  "WFFixIT/WFFinTech",
  "WFFixIT/BOT.co.th",
  "WFFixIT/FDC",
  "WFFixIT/eabotgod",
  "WFFixIT/stock-template-v.2",
  "WFFixIT/Stock-template",
  "e-leave/E-LEAVE-SYSTEM",
]
// language names as people write them
const LABEL = { PLpgSQL: "SQL", MQL5: "MQL5", MQL4: "MQL5" }
const SKIP = new Set(["HTML", "TeX", "Batchfile", "PowerShell", "Dockerfile"])

async function get(path) {
  if (!token) return JSON.parse(execFileSync("gh", ["api", path], { maxBuffer: 64 * 1024 * 1024 }).toString())
  const res = await fetch(`https://api.github.com/${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  })
  if (!res.ok) throw new Error(`${path}: ${res.status}`)
  return res.json()
}

const commits = new Map()
for (const repo of REPOS) {
  for (const author of AUTHORS) {
    for (let page = 1; ; page++) {
      const list = await get(`repos/${repo}/commits?author=${author}&since=${SINCE}&per_page=100&page=${page}`)
      for (const c of list) commits.set(c.sha, c.commit.author.date.slice(0, 10))
      if (list.length < 100) break
    }
  }
}

const days = {}
for (const day of commits.values()) days[day] = (days[day] ?? 0) + 1
const sorted = Object.keys(days).sort()

let longest = 0
let run = 0
let prev = null
for (const day of sorted) {
  run = prev && Date.parse(day) - Date.parse(prev) === 86_400_000 ? run + 1 : 1
  longest = Math.max(longest, run)
  prev = day
}

// a language counts for a repo once it has 10 KB of code there
const languages = new Map()
for (const repo of REPOS) {
  const bytes = await get(`repos/${repo}/languages`)
  const seen = new Set()
  for (const [lang, n] of Object.entries(bytes)) {
    if (SKIP.has(lang) || n < 10_000) continue
    const name = LABEL[lang] ?? lang
    const entry = languages.get(name) ?? { repos: 0, bytes: 0 }
    entry.bytes += n
    if (!seen.has(name)) entry.repos += 1
    seen.add(name)
    languages.set(name, entry)
  }
}

const out = {
  generatedAt: new Date().toISOString().slice(0, 10),
  accounts: AUTHORS,
  repos: REPOS.length,
  commits: commits.size,
  activeDays: sorted.length,
  longestStreak: longest,
  first: sorted[0],
  last: sorted.at(-1),
  days,
  languages: [...languages].sort((a, b) => b[1].bytes - a[1].bytes).map(([name, { repos }]) => ({ name, repos })),
}
await writeFile(new URL("../lib/github-stats.json", import.meta.url), JSON.stringify(out, null, 2) + "\n")
console.log(`${out.commits} commits on ${out.activeDays} days across ${out.repos} repos`)
