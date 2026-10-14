"use client"

import * as React from "react"
import { motion, useInView, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"

import { useLang } from "@/components/providers/lang-provider"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { ribbons } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Ribbons() {
  const { lang } = useLang()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const reduce = usePrefersReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 40 })
  const skew = useTransform(velocity, [-2500, 0, 2500], [7, 0, -7], { clamp: true })

  return (
    <div ref={ref} className="relative z-10 -mt-11 h-[clamp(9rem,17vw,15rem)] overflow-hidden" role="presentation">
      <motion.div style={reduce ? undefined : { skewY: skew }} className="absolute inset-0">
        <Ribbon
          items={ribbons.places[lang]}
          className="top-[48%] rotate-[2.4deg] bg-paper text-ink"
          reverse
          running={inView && !reduce}
        />
        <Ribbon
          items={ribbons.services[lang]}
          className="top-[18%] -rotate-[3deg] bg-signal text-on-signal shadow-[0_18px_50px_-12px_rgb(0_0_0/0.8)]"
          running={inView && !reduce}
        />
      </motion.div>
    </div>
  )
}

function Ribbon({
  items,
  className,
  reverse,
  running,
}: {
  items: string[]
  className?: string
  reverse?: boolean
  running: boolean
}) {
  const row = (copy: number) => (
    <ul className="flex shrink-0 items-center" aria-hidden={copy > 0}>
      {items.map((item, i) => (
        <li key={`${copy}-${i}`} className="flex items-center">
          <span className="type-display px-5 text-[clamp(1.6rem,1rem+2.2vw,3rem)] whitespace-nowrap">{item}</span>
          <Dot />
        </li>
      ))}
    </ul>
  )
  return (
    <div className={cn("absolute -inset-x-[5%] flex overflow-hidden py-[0.55rem]", className)}>
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${items.length * 3.4}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: running ? "running" : "paused",
        }}
      >
        {row(0)}
        {row(1)}
      </div>
    </div>
  )
}

function Dot() {
  return <span className="size-[clamp(0.45rem,0.3rem+0.4vw,0.7rem)] shrink-0 rounded-full bg-current" aria-hidden />
}
