"use client"

import * as React from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

import { useLang } from "@/components/providers/lang-provider"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { process as processCopy } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Process() {
  const { t, lang } = useLang()
  const listRef = React.useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] })
  const n = processCopy.steps.length

  return (
    <section id="process" aria-labelledby="process-title" className="px-gutter relative py-[clamp(5rem,10vw,9rem)]">
      <header className="mb-[clamp(2.5rem,6vw,5rem)] grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <h2 id="process-title" className="type-display text-[clamp(3.25rem,1.6rem+7vw,8.5rem)] text-paper">
          {t(processCopy.title)}
        </h2>
        <p className="max-w-[30ch] text-paper-dim text-pretty lg:pb-3 lg:text-right">{t(processCopy.intro)}</p>
      </header>

      <ol ref={listRef} className="relative mx-auto max-w-[78rem]">
        {processCopy.steps.map((step, i) => (
          <li
            key={i}
            className="sticky pb-[clamp(1rem,3vw,2rem)]"
            style={{ top: `calc(var(--header-h) + 1rem + ${i * 1.1}rem)` }}
          >
            <StepCard index={i} total={n} progress={scrollYProgress} last={i === n - 1}>
              <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start md:gap-12">
                <span className="type-display text-[clamp(4.5rem,3rem+6vw,9rem)] leading-[0.8] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div className="max-w-[40rem]">
                  <h3 className="text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-[1.05] font-bold tracking-[-0.02em] wdth-80 lang-th:leading-[1.3]">
                    {t(step.title)}
                  </h3>
                  <p className={cn("mt-5 text-[1.1rem] text-pretty", i === n - 1 ? "text-on-signal/90" : "text-paper/75")}>{t(step.body)}</p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {step.detail[lang].map((d) => (
                      <li
                        key={d}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-sm",
                          i === n - 1 ? "border-on-signal/35 text-on-signal" : "border-paper/15 text-paper/85",
                        )}
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StepCard>
          </li>
        ))}
      </ol>
    </section>
  )
}

function StepCard({
  index,
  total,
  progress,
  last,
  children,
}: {
  index: number
  total: number
  progress: MotionValue<number>
  last: boolean
  children: React.ReactNode
}) {
  const reduce = usePrefersReducedMotion()
  const start = (index + 0.6) / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.035])
  const dim = useTransform(progress, [start, Math.min(1, start + 0.3)], [0, last ? 0 : 0.45])
  return (
    <motion.div
      style={reduce ? undefined : { scale }}
      className={cn(
        "relative origin-top overflow-hidden rounded-[clamp(1.5rem,3vw,2.5rem)] border p-[clamp(1.75rem,4vw,3.5rem)] md:min-h-[21rem]",
        last
          ? "border-transparent bg-signal text-on-signal"
          : "border-paper/10 bg-ink-raised text-paper shadow-[0_-30px_60px_-40px_rgb(0_0_0/0.9)]",
        !last && index === 1 && "bg-ink-high",
      )}
    >
      {children}
      {!reduce && !last ? <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" /> : null}
    </motion.div>
  )
}
