"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { ArrowDownRight } from "lucide-react"

import portrait from "@/assets/me/portrait-arms.webp"
import { useIntro } from "@/components/providers/intro-provider"
import { useLang } from "@/components/providers/lang-provider"
import { useSmoothScroll } from "@/components/providers/smooth-scroll"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { hero, profile } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Hero() {
  const { t } = useLang()
  const { phase, markPortraitReady } = useIntro()
  const { scrollTo } = useSmoothScroll()
  const reduce = usePrefersReducedMotion()
  const ref = React.useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const left = useTransform(scrollYProgress, [0, 1], ["0vw", "-22vw"])
  const right = useTransform(scrollYProgress, [0, 1], ["0vw", "22vw"])
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const dim = useTransform(scrollYProgress, [0.1, 0.9], [0, 0.82])

  // lift letters near the cursor; only `translate` changes so there's no relayout
  React.useEffect(() => {
    const root = ref.current
    if (!root || reduce || phase !== "ready") return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const letters = Array.from(root.querySelectorAll<HTMLElement>(".hero-letter"))
    let px: number | null = null
    let raf = 0
    const apply = () => {
      raf = 0
      const reach = Math.max(window.innerWidth * 0.16, 150)
      for (const el of letters) {
        let lift = 0
        if (px !== null) {
          const r = el.getBoundingClientRect()
          const f = Math.max(0, 1 - Math.abs(px - (r.left + r.width / 2)) / reach)
          lift = f * f * (3 - 2 * f)
        }
        el.style.translate = lift > 0.001 ? `0 ${(-lift * 0.055).toFixed(4)}em` : ""
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect()
      px = e.clientY >= r.top && e.clientY <= r.bottom ? e.clientX : null
      schedule()
    }
    const onLeave = () => {
      px = null
      schedule()
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(raf)
      letters.forEach((el) => (el.style.translate = ""))
    }
  }, [phase, reduce])

  const go = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollTo(id, { offset: -8, focus: true })
  }

  return (
    <section
      ref={ref}
      id="top"
      data-phase={phase}
      className="hero relative isolate h-[calc(100svh-2.75rem)] min-h-[600px] overflow-hidden"
    >
      <h1 className="sr-only">
        {t({ th: `${profile.nameTh} (${profile.name})`, en: profile.name })}, {t(profile.role)}, {t(profile.base)}
      </h1>

      <GiantWord left={left} right={right} />

      <div className="hero-portrait pointer-events-none absolute bottom-0 left-1/2 z-20 aspect-[1072/1800] h-[min(80%,52rem)] -translate-x-1/2 [@media(max-aspect-ratio:4/5)]:h-[68%]">
        <motion.div style={reduce ? undefined : { y: portraitY, scale: portraitScale }} className="relative size-full origin-bottom">
          <Image
            src={portrait}
            alt={t(hero.portraitAlt)}
            fill
            preload
            sizes="(max-width: 768px) 70vw, 34vw"
            className="object-contain object-bottom"
            onLoad={markPortraitReady}
          />
        </motion.div>
      </div>

      <div aria-hidden className="hero-floor pointer-events-none absolute inset-0 z-[26]" />

      <div className="px-gutter absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-10 pb-[clamp(1.5rem,4svh,2.5rem)] max-md:flex-col max-md:items-stretch max-md:gap-6">
        <div className="max-w-[29rem] max-md:max-w-none">
          <div className="hero-intro">
            <p className="flex items-center gap-2.5 text-sm font-medium text-paper">
              <span className="size-2 rounded-full bg-signal" aria-hidden />
              {t(hero.status)}
            </p>
            <p className="type-display mt-4 text-[clamp(2.1rem,1.4rem+1.5vw,3rem)] whitespace-pre-line text-signal max-md:mt-3 max-md:text-[1.9rem]">
              {t(hero.role)}
            </p>
            <p className="mt-4 text-[1rem] leading-relaxed text-paper/80 text-pretty max-md:mt-3 max-md:text-[0.95rem]">{t(hero.intro)}</p>
          </div>
          <div className="hero-actions mt-6 flex gap-2.5 max-md:grid max-md:grid-cols-2">
            <a
              href="#work"
              onClick={go("#work")}
              className="press group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-signal px-6 text-[0.95rem] font-semibold text-on-signal hover:bg-signal-bright"
            >
              {t(hero.primary)}
              <ArrowDownRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] can-hover:group-hover:translate-x-0.5 can-hover:group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href="#contact"
              onClick={go("#contact")}
              className="press inline-flex h-12 items-center justify-center gap-2 rounded-full border border-paper/25 bg-ink/60 px-6 text-[0.95rem] font-medium text-paper hover:border-paper/50"
            >
              {t(hero.secondary)}
            </a>
          </div>
        </div>

        <dl className="hero-facts w-[15rem] shrink-0 max-md:hidden">
          {hero.facts.map((f, i) => (
            <div key={i} className={cn("grid grid-cols-[4.25rem_1fr] items-center gap-3 py-3.5", i > 0 && "border-t border-paper/15")}>
              <dt className="order-2 text-[0.85rem] leading-snug text-paper-dim">{t(f.label)}</dt>
              <dd className="type-display order-1 text-[2.75rem] leading-none text-paper">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-40 bg-ink" />
    </section>
  )
}

function GiantWord({ left, right }: { left: MotionValue<string>; right: MotionValue<string> }) {
  const reduce = usePrefersReducedMotion()
  const lines = profile.nameLines.map((line) => line.toUpperCase().split(""))
  const offsets = lines.map((_, li) => lines.slice(0, li).reduce((n, l) => n + l.length, 0))
  return (
    <div
      aria-hidden
      className="hero-word hero-word--solid pointer-events-none absolute inset-x-0 z-10 flex justify-center select-none"
    >
      {lines.map((letters, li) => (
        <motion.span key={li} style={reduce ? undefined : { x: li === 0 ? left : right }} className="hero-line">
          {letters.map((ch, ci) => {
            const i = offsets[li] + ci
            return (
              <span key={i} className="hero-letter" style={{ "--i": i } as React.CSSProperties}>
                <span className="hero-letter__inner">{ch}</span>
              </span>
            )
          })}
        </motion.span>
      ))}
    </div>
  )
}
