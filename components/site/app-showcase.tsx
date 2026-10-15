"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"

import { useLang } from "@/components/providers/lang-provider"
import { LineIcon } from "@/components/site/brand-icons"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { LoopVideo } from "@/components/site/loop-video"
import type { ShowcaseApp, StoreScreen } from "@/lib/projects"
import { cn } from "@/lib/utils"

export function AppShowcase({ app, bleed = true, className }: { app: ShowcaseApp; bleed?: boolean; className?: string }) {
  const { t } = useLang()
  const reduce = usePrefersReducedMotion()
  const rowRef = React.useRef<HTMLUListElement>(null)
  const prevRef = React.useRef<HTMLButtonElement>(null)
  const nextRef = React.useRef<HTMLButtonElement>(null)
  const [edge, setEdge] = React.useState<"start" | "middle" | "end">("start")
  const [scrollable, setScrollable] = React.useState(false)

  const measure = React.useCallback(() => {
    const row = rowRef.current
    if (!row) return
    const max = row.scrollWidth - row.clientWidth
    setScrollable(max > 4)
    setEdge(row.scrollLeft <= 4 ? "start" : row.scrollLeft >= max - 4 ? "end" : "middle")
  }, [])

  React.useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const ro = new ResizeObserver(measure)
    ro.observe(row)
    return () => ro.disconnect()
  }, [measure])

  // a button that hides at the end of the row hands focus to the other one
  React.useEffect(() => {
    const active = document.activeElement
    if (edge === "end" && active === nextRef.current) prevRef.current?.focus()
    if (edge === "start" && active === prevRef.current) nextRef.current?.focus()
  }, [edge])

  const step = (dir: 1 | -1) => {
    const row = rowRef.current
    const card = row?.querySelector("li")
    if (!row || !card) return
    row.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
        <span className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-[1.15rem] ring-1 ring-paper/15">
          <Image src={app.icon} alt="" fill sizes="72px" className="object-cover" />
        </span>
        <span className="min-w-[13rem] flex-1">
          <span className="block text-[1.6rem] leading-tight font-bold text-paper">{app.name}</span>
          <span className="mt-1 block text-sm text-paper-dim">{t(app.kind)}</span>
        </span>
        {app.href && app.cta ? (
          <a
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#06c755] px-5 text-sm font-bold text-ink hover:bg-[#05b14c] max-sm:w-full"
          >
            <LineIcon className="size-4" aria-hidden />
            {t(app.cta)}
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        ) : null}
      </div>

      <dl className="mt-6 grid grid-cols-2 border-y border-paper/12 sm:grid-cols-4">
        {app.facts.map((f, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col-reverse justify-end px-4 py-4 text-center",
              i > 0 && "sm:border-l sm:border-paper/12",
              i % 2 === 1 && "border-l border-paper/12",
            )}
          >
            <dt className="mt-1.5 text-xs text-paper-dim">{t(f.label)}</dt>
            <dd className="text-[1.6rem] leading-none font-bold text-paper tabular-nums">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-8">
        <ul
          ref={rowRef}
          onScroll={measure}
          tabIndex={scrollable ? 0 : undefined}
          aria-label={t({ th: `ภาพหน้าจอ ${app.name}`, en: `${app.name} screenshots` })}
          className={cn(
            "relative grid auto-cols-[minmax(min(72vw,17.5rem),21rem)] grid-flow-col snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] focus-visible:outline-offset-[-2px]",
            bleed && "bleed-x px-gutter [scroll-padding-inline:var(--gutter)] lg:mx-0 lg:px-0 lg:[scroll-padding-inline:0]",
          )}
        >
          {app.screens.map((s, i) => (
            <ScreenCard key={i} screen={s} />
          ))}
        </ul>
        {scrollable ? (
          <div className="pointer-events-none absolute inset-y-0 -right-2 -left-2 hidden items-center justify-between lg:flex">
            <StepButton ref={prevRef} dir={-1} hidden={edge === "start"} onClick={() => step(-1)} />
            <StepButton ref={nextRef} dir={1} hidden={edge === "end"} onClick={() => step(1)} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

function StepButton({
  ref,
  dir,
  hidden,
  onClick,
}: {
  ref: React.Ref<HTMLButtonElement>
  dir: 1 | -1
  hidden: boolean
  onClick: () => void
}) {
  const { t } = useLang()
  const Icon = dir === 1 ? ArrowRight : ArrowLeft
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      aria-label={t(dir === 1 ? { th: "รูปถัดไป", en: "Next screenshot" } : { th: "รูปก่อนหน้า", en: "Previous screenshot" })}
      className={cn(
        "press pointer-events-auto grid size-11 place-items-center rounded-full bg-paper text-ink shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)] transition-opacity duration-200",
        hidden && "pointer-events-none opacity-0",
      )}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  )
}

/** Breaks only at spaces, so a Thai phrase never splits across lines. */
function Phrases({ text }: { text: string }) {
  return text.split(" ").map((part, i) => (
    <React.Fragment key={i}>
      {i > 0 ? " " : null}
      <span className="whitespace-nowrap">{part}</span>
    </React.Fragment>
  ))
}

function ScreenCard({ screen: s }: { screen: StoreScreen }) {
  const { t } = useLang()
  return (
    <li
      className="relative flex aspect-[1/2] snap-start flex-col items-center overflow-hidden rounded-[1.75rem] px-5 pt-7"
      style={{ background: `linear-gradient(180deg, ${s.tone[0]} 0%, ${s.tone[1]} 100%)`, color: s.ink ?? "#1b1440" }}
    >
      <p className="text-center text-[1.45rem] leading-[1.1] font-extrabold tracking-[-0.01em]">{s.headline}</p>
      <p className="mt-1.5 min-h-[2.75em] text-center text-[0.92rem] leading-snug font-medium text-balance opacity-80">
        <Phrases text={t(s.caption)} />
      </p>
      <div className="relative mt-4 w-[80%] flex-1">
        {s.video ? (
          <div className="absolute inset-x-0 top-0 aspect-[585/1342] overflow-hidden rounded-[2.1rem] bg-[#16161a] shadow-[0_24px_40px_-20px_rgb(20_10_40/0.55)]">
            <Image src={s.image} alt="" fill sizes="(max-width: 640px) 60vw, 15rem" className="object-cover object-[50%_40%]" />
            <LoopVideo src={s.video} poster={s.image.src} className="absolute inset-0 size-full object-[50%_40%]" />
          </div>
        ) : (
          <div className="absolute inset-x-0 top-0 aspect-[585/1342] rounded-[2.1rem] bg-[#16161a] p-[5px] shadow-[0_24px_40px_-20px_rgb(20_10_40/0.55)]">
            <div className="relative size-full overflow-hidden rounded-[1.8rem] bg-white">
              <Image src={s.image} alt="" fill sizes="(max-width: 640px) 60vw, 15rem" className="object-cover object-top" />
              <StatusBar ink={s.bar === "dark" ? "#14161c" : "#ffffff"} />
            </div>
          </div>
        )}
        {s.sticker ? (
          <span aria-hidden className="absolute -right-5 bottom-[12%] w-[38%] drop-shadow-[0_12px_18px_rgb(20_10_40/0.35)]">
            <Image src={s.sticker} alt="" sizes="7rem" className="h-auto w-full" />
          </span>
        ) : null}
      </div>
    </li>
  )
}

// drawn over the screenshot's empty top strip (76 of 1342 px), proportions of an iPhone 14 Pro
function StatusBar({ ink }: { ink: string }) {
  return (
    <svg viewBox="0 0 585 76" aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full">
      <text x="92" y="53" textAnchor="middle" fontSize="25" fontWeight="600" fill={ink} style={{ fontFamily: "var(--font-archivo), system-ui, sans-serif" }}>
        9:41
      </text>
      <rect x="199" y="15" width="187" height="52" rx="26" fill="#16161a" />
      <g fill={ink}>
        <rect x="444" y="46" width="5" height="7" rx="1.5" />
        <rect x="451" y="42.5" width="5" height="10.5" rx="1.5" />
        <rect x="458" y="39" width="5" height="14" rx="1.5" />
        <rect x="465" y="35.5" width="5" height="17.5" rx="1.5" />
      </g>
      <g fill="none" stroke={ink} strokeWidth="3.2" strokeLinecap="round">
        <path d="M480.6 41.6a14 14 0 0 1 19.8 0" />
        <path d="M476.3 37.3a20 20 0 0 1 28.4 0" />
      </g>
      <path d="M485 46a7.5 7.5 0 0 1 11 0L490.5 52Z" fill={ink} />
      <rect x="510" y="35" width="37" height="18" rx="5.5" fill="none" stroke={ink} strokeOpacity="0.45" strokeWidth="2" />
      <rect x="513" y="38" width="28" height="12" rx="3" fill={ink} />
      <rect x="549" y="41" width="3" height="6.5" rx="1.5" fill={ink} fillOpacity="0.45" />
    </svg>
  )
}
