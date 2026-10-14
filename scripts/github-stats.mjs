// Refresh lib/github-stats.json: the contribution calendar GitHub shows on the profile,
// plus the repositories with my commits and their languages.
// node scripts/github-stats.mjs   (GITHUB_TOKEN, or the gh CLI login; private repos need the account's own token)
import { execFileSync } from "node:child_process"
import { writeFile } from "node:fs/promises"

const LOGIN = "WFFixIT"
const token = process.env.GITHUB_TOKEN
// a language counts for a repository once it has this much code there
const MIN_BYTES = 10_000
const SKIP = new Set(["HTML", "TeX", "Batchfile", "PowerShell", "Dockerfile", "Makefile"])
const LABEL = { PLpgSQL: "SQL", MQL4: "MQL5" }

class HttpError extends Error {
  constructor(path, status) {
    super(`${path}: ${status}`)
    this.status = status
  }
}

async function rest(path) {
  if (!token) {
    try {
      const out = execFileSync("gh", ["api", path], { maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] })
      return JSON.parse(out.toString())
    } catch (err) {
      const status = Number(/HTTP (\d{3})/.exec(String(err.stderr))?.[1])
      throw status ? new HttpError(path, status) : err
    }
  }
  const res = await fetch(`https://api.github.com/${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  })
  if (!res.ok) throw new HttpError(path, res.status)
  return res.json()
}

async function graphql(query, variables) {
  if (!token) {
    const args = ["api", "graphql", "-f", `query=${query}`]
    for (const [k, v] of Object.entries(variables)) args.push("-f", `${k}=${v}`)
    return JSON.parse(execFileSync("gh", args, { maxBuffer: 16 * 1024 * 1024 }).toString()).data
  }
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors ?? res.status))
  return json.data
}

async function all(path) {
  const items = []
  for (let page = 1; ; page++) {
    const batch = await rest(`${path}${path.includes("?") ? "&" : "?"}per_page=100&page=${page}`)
    items.push(...batch)
    if (batch.length < 100) return items
  }
}

const { user } = await graphql(
  `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        startedAt
        contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
      }
    }
  }`,
  { login: LOGIN },
)
const collection = user.contributionsCollection
const calendar = collection.contributionCalendar.weeks.flatMap((w) => w.contributionDays)

const days = {}
let longest = 0
let run = 0
for (const d of calendar) {
  run = d.contributionCount > 0 ? run + 1 : 0
  longest = Math.max(longest, run)
  if (d.contributionCount > 0) days[d.date] = d.contributionCount
}
const active = Object.keys(days).sort()

// The commits endpoint's author filter misses commits made under a noreply address,
// so look at who GitHub linked each commit to instead.
async function hasMyCommits(name) {
  for (let page = 1; ; page++) {
    let batch
    try {
      batch = await rest(`repos/${name}/commits?since=${collection.startedAt}&per_page=100&page=${page}`)
    } catch (err) {
      // an empty repository answers 409
      if (err.status === 409) return false
      throw err
    }
    if (batch.some((c) => c.author?.login === LOGIN)) return true
    if (batch.length < 100) return false
  }
}

// every repository the account can reach, kept if it has my commits inside the calendar's year
const mine = []
for (const repo of await all("user/repos?affiliation=owner,collaborator,organization_member")) {
  if (repo.size > 0 && (await hasMyCommits(repo.full_name))) mine.push(repo.full_name)
}

const languages = new Map()
for (const name of mine) {
  const seen = new Set()
  for (const [lang, n] of Object.entries(await rest(`repos/${name}/languages`))) {
    if (SKIP.has(lang) || n < MIN_BYTES) continue
    const label = LABEL[lang] ?? lang
    const entry = languages.get(label) ?? { repos: 0, bytes: 0 }
    entry.bytes += n
    if (!seen.has(label)) entry.repos += 1
    seen.add(label)
    languages.set(label, entry)
  }
}

const out = {
  generatedAt: new Date().toISOString().slice(0, 10),
  login: LOGIN,
  contributions: collection.contributionCalendar.totalContributions,
  repos: mine.length,
  activeDays: active.length,
  longestStreak: longest,
  first: active[0] ?? calendar[0].date,
  last: calendar.at(-1).date,
  days,
  languages: [...languages].sort((a, b) => b[1].bytes - a[1].bytes).map(([name, { repos }]) => ({ name, repos })),
}
await writeFile(new URL("../lib/github-stats.json", import.meta.url), JSON.stringify(out, null, 2) + "\n")
console.log(`${out.contributions} contributions on ${out.activeDays} days, ${out.repos} repositories`)
