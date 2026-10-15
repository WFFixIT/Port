"use client"

import * as React from "react"
import { useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { useLang } from "@/components/providers/lang-provider"
import { GithubIcon } from "@/components/site/brand-icons"
import { TechIcon } from "@/components/site/tech-icons"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { contact, github, type Lang } from "@/lib/content"
import stats from "@/lib/github-stats.json"
import { cn } from "@/lib/utils"

const DAY = 86_400_000
const DAYS = stats.days as Record<string, number>

// fixed names rather than Intl, so the server and the browser print the same thing
const MONTHS: Record<Lang, string[]> = {
  th: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
}
const formatDate = (iso: string, lang: Lang) => {
  const [y, m, d] = iso.split("-").map(Number)
  return `${d} ${MONTHS[lang][m - 1]} ${y}`
}

type Cell = { date: string; count: number } | null

// Sunday-first weeks, from the first of the month with the first contribution to the last day counted
function buildWeeks() {
  const first = Date.parse(`${stats.first.slice(0, 7)}-01T00:00:00Z`)
  const last = Date.parse(`${stats.last}T00:00:00Z`)
  const weeks: Cell[][] = []
  for (let t = first - new Date(first).getUTCDay() * DAY; t <= last; t += 7 * DAY) {
    const week: Cell[] = []
    for (let d = 0; d < 7; d++) {
      const at = t + d * DAY
      const date = new Date(at).toISOString().slice(0, 10)
      week.push(at < first || at > last ? null : { date, count: DAYS[date] ?? 0 })
    }
    weeks.push(week)
  }
  return weeks
}

const WEEKS = buildWeeks()

// four shades split at the quartiles of the active days, the way GitHub shades its graph
const QUARTILES = (() => {
  const counts = Object.values(DAYS).sort((a, b) => a - b)
  const at = (q: number) => counts[Math.min(counts.length - 1, Math.floor(q * counts.length))] ?? 0
  return [at(0.25), at(0.5), at(0.75)]
})()
const level = (n: number) => (n === 0 ? 0 : n <= QUARTILES[0] ? 1 : n <= QUARTILES[1] ? 2 : n <= QUARTILES[2] ? 3 : 4)
const SHADES = [
  "color-mix(in oklab, var(--paper) 7%, transparent)",
  "color-mix(in oklab, var(--signal) 32%, transparent)",
  "color-mix(in oklab, var(--signal) 56%, transparent)",
  "color-mix(in oklab, var(--signal) 82%, transparent)",
  "var(--signal-bright)",
]

const number = (n: number) => n.toLocaleString("en-US")
const contributions = (n: number, lang: Lang) =>
  lang === "th" ? `${number(n)} contribution` : `${number(n)} contribution${n === 1 ? "" : "s"}`

export function Github() {
  const { t, lang } = useLang()

  return (
    <section id="github" aria-labelledby="github-title" className="px-gutter relative py-[clamp(5rem,10vw,9rem)]">
      <header className="grid gap-6 pb-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[1fr_auto] lg:items-end">
        <h2 id="github-title" className="type-display flex items-center gap-[0.18em] text-[clamp(3.75rem,1.5rem+10vw,12rem)] text-paper">
          <GithubIcon className="size-[0.62em] shrink-0" aria-hidden />
          {t(github.title)}
        </h2>
        <p className="max-w-[36ch] text-paper-dim text-pretty lg:pb-4 lg:text-right">{t(github.intro)}</p>
      </header>

      <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end">
        <div>
          <p className="type-display text-[clamp(7rem,4rem+9vw,13rem)] leading-[0.78] text-signal tabular-nums">{number(stats.contributions)}</p>
          <p className="mt-5 text-[1.2rem] font-semibold text-paper">{t(github.contributions)}</p>
          <dl className="mt-8 grid grid-cols-3 border-t border-paper/12">
            {[
              { value: stats.repos, label: github.repos },
              { value: stats.activeDays, label: github.days },
              { value: stats.longestStreak, label: github.streak },
            ].map((s, i) => (
              <div key={i} className={cn("flex flex-col-reverse justify-end pt-4 pr-3", i > 0 && "border-l border-paper/12 pl-4")}>
                <dt className="mt-2 text-sm leading-snug text-paper-dim">{t(s.label)}</dt>
                <dd className="type-display text-[2.6rem] leading-none text-paper tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Heatmap />
      </div>

      <div className="mt-12">
        <h3 className="text-sm text-paper-dim">{t(github.languages)}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {stats.languages.map((l) => (
            <li key={l.name} className="flex items-center gap-2 rounded-full border border-paper/15 py-2 pr-4 pl-3 text-paper">
              <TechIcon name={l.name} className="size-[1.05rem]" />
              <span className="font-semibold">{l.name}</span>
              <span className="text-sm text-paper-dim tabular-nums">
                {l.repos} {lang === "en" && l.repos === 1 ? "repo" : t(github.repoUnit)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[clamp(3.5rem,7vw,6rem)]">
        <h3 className="mb-4 text-sm text-paper-dim">{t(github.links)}</h3>
        <ul className="border-t border-paper/12">
          <li className="border-b border-paper/12">
            <a
              href={contact.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="work-row group relative isolate grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-[clamp(1.25rem,2.4vw,2rem)] lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)_auto]"
            >
              <span aria-hidden className="work-row__fill absolute inset-x-[calc(var(--gutter)*-1)] inset-y-0 -z-10 bg-signal" />
              <span className="type-display flex min-w-0 items-baseline text-[clamp(2.6rem,1.4rem+4vw,5.25rem)] text-paper transition-[translate,color] duration-500 ease-[var(--ease-out-expo)] max-sm:flex-col can-hover:group-hover:translate-x-4 can-hover:group-hover:text-on-signal">
                <span className="text-paper-dim/80 transition-colors duration-500 max-sm:mb-1 max-sm:text-[0.4em] can-hover:group-hover:text-on-signal/60">
                  github.com/
                </span>
                <span className="min-w-0 break-all">{contact.github.handle}</span>
              </span>
              <span className="text-paper/85 transition-colors duration-300 max-lg:col-span-2 max-lg:row-start-2 can-hover:group-hover:text-on-signal">
                {t(github.profile)}
              </span>
              <span className="grid size-11 place-items-center rounded-full border border-paper/20 text-paper transition-[background-color,border-color,color,rotate] duration-500 ease-[var(--ease-out-expo)] max-lg:col-start-2 max-lg:row-start-1 can-hover:group-hover:-rotate-45 can-hover:group-hover:border-transparent can-hover:group-hover:bg-ink can-hover:group-hover:text-paper">
                <ArrowRight className="size-5" aria-hidden />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

function Heatmap() {
  const { t, lang } = useLang()
  const reduce = usePrefersReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const [tip, setTip] = React.useState<{ x: number; y: number; text: string } | null>(null)

  const rowLabels = lang === "th" ? ["", "จ.", "", "พ.", "", "ศ.", ""] : ["", "Mon", "", "Wed", "", "Fri", ""]
  const months = WEEKS.map((week, i) => {
    const day = week.find(Boolean)
    const prev = WEEKS[i - 1]?.find(Boolean)
    if (!day || (prev && prev.date.slice(0, 7) === day.date.slice(0, 7))) return null
    return MONTHS[lang][Number(day.date.slice(5, 7)) - 1]
  })
  const summary =
    lang === "th"
      ? `${contributions(stats.contributions, lang)} ระหว่าง ${formatDate(stats.first, lang)} ถึง ${formatDate(stats.last, lang)}`
      : `${contributions(stats.contributions, lang)} from ${formatDate(stats.first, lang)} to ${formatDate(stats.last, lang)}`

  return (
    <div ref={ref} className="relative min-w-0 rounded-[1.75rem] border border-paper/10 bg-ink-raised p-[clamp(1rem,2.5vw,1.75rem)]">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold text-paper">{t(github.activity)}</h3>
        <p className="text-sm text-paper-dim">
          {t(github.updated)} {formatDate(stats.generatedAt, lang)}
        </p>
      </div>

      <div
        role="img"
        aria-label={summary}
        className="mt-5 grid gap-[clamp(3px,0.5vw,5px)]"
        style={{ gridTemplateColumns: `auto repeat(${WEEKS.length}, minmax(0, 1fr))` }}
        onPointerLeave={() => setTip(null)}
      >
        <span />
        {months.map((m, i) => (
          <span key={i} className="h-5 text-xs whitespace-nowrap text-paper-dim">
            {m}
          </span>
        ))}
        {rowLabels.map((label, row) => (
          <React.Fragment key={row}>
            <span className="self-center pr-2 text-right text-[0.7rem] leading-none text-paper-dim/80">{label}</span>
            {WEEKS.map((week, col) => {
              const cell = week[row]
              if (!cell) return <span key={col} />
              return (
                <span
                  key={col}
                  aria-hidden
                  onPointerEnter={(e) => {
                    const host = ref.current
                    if (e.pointerType !== "mouse" || !host) return
                    const box = e.currentTarget.getBoundingClientRect()
                    const frame = host.getBoundingClientRect()
                    setTip({
                      x: box.left - frame.left + box.width / 2,
                      y: box.top - frame.top,
                      text: `${formatDate(cell.date, lang)}: ${contributions(cell.count, lang)}`,
                    })
                  }}
                  className={cn(
                    "aspect-square rounded-[22%]",
                    !reduce && "transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)]",
                    !reduce && !inView && "scale-50 opacity-0",
                  )}
                  style={{ background: SHADES[level(cell.count)], transitionDelay: reduce ? undefined : `${col * 28 + row * 10}ms` }}
                />
              )
            })}
          </React.Fragment>
        ))}
      </div>

      <div aria-hidden className="mt-4 flex items-center justify-end gap-1.5 text-xs text-paper-dim">
        <span className="mr-1">{t(github.less)}</span>
        {SHADES.map((c, i) => (
          <span key={i} className="size-3 rounded-[22%]" style={{ background: c }} />
        ))}
        <span className="ml-1">{t(github.more)}</span>
      </div>

      {tip ? (
        <span
          aria-hidden
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-lg bg-paper px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-ink shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)]"
          style={{ left: tip.x, top: tip.y }}
        >
          {tip.text}
        </span>
      ) : null}
    </div>
  )
}
