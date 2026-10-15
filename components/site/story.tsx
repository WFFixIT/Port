"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, MapPin, ShieldCheck } from "lucide-react"

import selfie from "@/assets/me/selfie.webp"
import wfMark from "@/assets/brand/wf-mark.webp"
import fixitPhonePoster from "@/assets/clips/fixit-phone-poster.webp"
import shotLabs from "@/assets/work/labs.webp"
import shot500day from "@/assets/work/500day.webp"
import shotBlueocean from "@/assets/work/blueocean.webp"
import shotOnstage from "@/assets/work/onstage.webp"
import shotEleave from "@/assets/work/eleave.webp"
import { useLang } from "@/components/providers/lang-provider"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { brands, channels, story } from "@/lib/content"
import { cn } from "@/lib/utils"
import { TiktokIcon } from "@/components/site/brand-icons"
import { LoopVideo } from "@/components/site/loop-video"

// horizontal scroll on wide screens, stacked on phones, with reduced motion and before the script runs
export function Story() {
  const { t } = useLang()
  const reduce = usePrefersReducedMotion()
  const sectionRef = React.useRef<HTMLElement>(null)
  const trackRef = React.useRef<HTMLOListElement>(null)
  const [distance, setDistance] = React.useState(0)
  const [wide, setWide] = React.useState(false)
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)")
    const measure = () => {
      const track = trackRef.current
      setWide(mq.matches)
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    mq.addEventListener("change", measure)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      mq.removeEventListener("change", measure)
      window.removeEventListener("resize", measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, (p) => -p * distance)
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])
  const count = story.chapters.length

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(count - 1, Math.max(0, Math.round(p * (count - 1)))))
  })

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-labelledby="story-title"
      data-wide={wide || undefined}
      className="relative"
      style={wide ? { height: `calc(${distance}px + 100svh)` } : undefined}
    >
      <div className={cn("flex flex-col", wide && "sticky top-0 h-svh overflow-hidden")}>
        <header className="px-gutter flex items-end justify-between gap-6 pt-24 pb-[clamp(2rem,5svh,3.5rem)] in-data-wide:pt-[calc(var(--header-h)+min(2.5rem,3svh))]">
          <h2 id="story-title" className="type-display text-[clamp(3.25rem,1.6rem+7vw,8.5rem)] text-paper in-data-wide:text-[min(clamp(3.25rem,1.6rem+7vw,8.5rem),15svh)]">
            {t(story.title)}
          </h2>
          <p className="hidden max-w-[15rem] pb-2 text-right text-sm text-paper-dim in-data-wide:block">{t(story.hint)}</p>
        </header>

        <motion.ol
          ref={trackRef}
          style={wide && !reduce ? { x } : undefined}
          className="px-gutter flex flex-1 flex-col gap-16 pb-24 in-data-wide:w-max in-data-wide:flex-row in-data-wide:items-stretch in-data-wide:gap-0 in-data-wide:pb-[clamp(3.5rem,9svh,7rem)]"
        >
          {story.chapters.map((c, i) => (
            <li
              key={c.id}
              className="relative grid shrink-0 gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] in-data-wide:w-[min(64vw,60rem)] in-data-wide:border-l in-data-wide:border-paper/10 in-data-wide:pr-[4vw] in-data-wide:pl-[3.5vw] in-data-wide:first:border-l-0 in-data-wide:first:pl-0"
            >
              <div className="flex flex-col">
                <span className="type-display text-[clamp(4.5rem,3rem+5vw,8rem)] text-transparent [-webkit-text-stroke:1.25px_var(--paper-dim)] in-data-wide:text-[min(clamp(4.5rem,3rem+5vw,8rem),11svh)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[clamp(1.75rem,1.3rem+1.4vw,2.6rem)] leading-[1.15] font-bold tracking-[-0.015em] text-paper wdth-87 lang-th:leading-[1.35]">
                  {t(c.title)}
                </h3>
                <p className="mt-4 max-w-[40ch] text-[1.05rem] text-paper/75 text-pretty">{t(c.body)}</p>
                <p className="mt-auto flex items-center gap-2 pt-6 text-sm text-paper-dim">
                  <MapPin className="size-4 text-signal" aria-hidden />
                  {t(c.place)}
                </p>
              </div>
              <div className="relative flex min-h-[18rem] items-center justify-center in-data-wide:min-h-0">
                <ChapterVisual id={c.id} />
              </div>
            </li>
          ))}
        </motion.ol>

        {wide ? (
          <div className="px-gutter absolute inset-x-0 bottom-[clamp(1.5rem,4svh,2.5rem)] flex items-center gap-5" aria-hidden>
            <span className="w-14 text-sm text-paper tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <div className="relative h-px flex-1 bg-paper/12">
              <motion.div style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-signal" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function ChapterVisual({ id }: { id: string }) {
  switch (id) {
    case "mfu":
      return <Polaroid />
    case "cyber":
      return <Internship />
    case "wf":
      return <Brands />
    case "fixit":
      return <Phone />
    case "labs":
      return <BrowserShot />
    case "clients":
      return <Fan />
    default:
      return null
  }
}

function Polaroid() {
  return (
    <figure className="w-[min(19rem,72vw)] rotate-[-4deg] bg-paper p-3 pb-12 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] transition-transform duration-500 ease-[var(--ease-out-quint)] can-hover:hover:rotate-[-1deg] in-data-wide:w-[min(19rem,calc((100svh-26rem)*0.82))]">
      <div className="relative aspect-[4/4.4] overflow-hidden bg-ink-high">
        <Image src={selfie} alt="" fill sizes="(max-width: 1024px) 72vw, 19rem" className="object-cover object-[50%_35%]" />
      </div>
      <figcaption className="absolute right-4 bottom-3 left-4 text-center text-[0.95rem] font-semibold text-ink/80 wdth-75">
        Software Engineering, MFU
      </figcaption>
    </figure>
  )
}

function Internship() {
  const { t } = useLang()
  const rows = [
    { title: story.intern.system, note: "React, Vite, TanStack Query" },
    { title: story.intern.training, note: "Network, Blue team, Red team, OWASP" },
  ]
  return (
    <div className="w-full max-w-[26rem] -rotate-[1.5deg] rounded-[1.75rem] border border-paper/12 bg-ink-raised p-6 shadow-[0_50px_90px_-30px_rgb(0_0_0/0.95)]">
      <div className="flex items-center gap-4">
        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-ink-high text-signal ring-1 ring-paper/12">
          <ShieldCheck className="size-8" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="type-display block text-[2.4rem] text-paper">Army Cyber Center</span>
          <span className="mt-1 block text-sm text-paper-dim">{t(story.intern.unit)}</span>
        </span>
      </div>
      <ul className="mt-6">
        {rows.map((r) => (
          <li key={r.note} className="border-t border-paper/10 py-3.5">
            <span className="block font-semibold text-paper">{t(r.title)}</span>
            <span className="block text-sm text-paper-dim">{r.note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Brands() {
  const { t } = useLang()
  const rows = [
    { name: "WF LABs", note: story.brands.labs, href: brands.labs },
    { name: "WF FixIT", note: story.brands.fixit, href: brands.fixit },
  ]
  return (
    <div className="w-full max-w-[26rem] rotate-[1.5deg] rounded-[1.75rem] border border-paper/12 bg-ink-raised p-6 shadow-[0_50px_90px_-30px_rgb(0_0_0/0.95)]">
      <a href={brands.whiteForces} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
        <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-paper/12">
          <Image src={wfMark} alt="" fill sizes="64px" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span className="type-display block text-[2.4rem] text-paper">White Forces</span>
          <span className="mt-1 block text-sm text-paper-dim">{t(story.brands.where)}</span>
        </span>
      </a>
      <ul className="mt-6">
        {rows.map((r) => (
          <li key={r.name} className="border-t border-paper/10">
            <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-3.5">
              <span>
                <span className="block font-semibold text-paper">{r.name}</span>
                <span className="block text-sm text-paper-dim">{t(r.note)}</span>
              </span>
              <ArrowUpRight className="size-4 text-paper-dim transition-[translate,color] duration-300 ease-[var(--ease-out-quint)] can-hover:group-hover:-translate-y-0.5 can-hover:group-hover:translate-x-0.5 can-hover:group-hover:text-signal" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Phone() {
  const tiktok = channels.find((c) => c.id === "tiktok-fixit")
  return (
    <figure className="flex flex-col items-center">
      <div className="relative w-[min(14.5rem,58vw)] rotate-[3deg] rounded-[2.4rem] border border-paper/15 bg-ink-high p-2 shadow-[0_50px_90px_-30px_rgb(0_0_0/0.95)] in-data-wide:w-[min(14.5rem,calc((100svh-24rem)*0.5625))]">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.9rem] bg-ink">
          <LoopVideo src="/clips/fixit-phone" poster={fixitPhonePoster.src} className="absolute inset-0 size-full" />
        </div>
      </div>
      {tiktok ? (
        <figcaption className="mt-8">
          <a
            href={tiktok.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-paper"
          >
            <TiktokIcon className="size-4" aria-hidden />
            <span className="underline decoration-paper/30 underline-offset-4 transition-colors duration-200 can-hover:group-hover:decoration-signal">
              {tiktok.handle}
            </span>
            <ArrowUpRight className="size-4 text-paper-dim" aria-hidden />
          </a>
        </figcaption>
      ) : null}
    </figure>
  )
}

function BrowserShot() {
  return (
    <div className="w-full max-w-[34rem] -rotate-[1.5deg] overflow-hidden rounded-2xl border border-paper/12 bg-ink-high shadow-[0_50px_90px_-30px_rgb(0_0_0/0.95)]">
      <div className="flex items-center gap-2 border-b border-paper/8 px-4 py-3" aria-hidden>
        <span className="size-2.5 rounded-full bg-paper/20" />
        <span className="size-2.5 rounded-full bg-paper/20" />
        <span className="size-2.5 rounded-full bg-paper/20" />
        <span className="ml-3 flex-1 truncate rounded-full bg-paper/6 px-3 py-1 text-xs text-paper-dim">labs.whiteforces.com</span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={shotLabs} alt="" fill sizes="(max-width: 1024px) 90vw, 34rem" className="object-cover object-top" />
      </div>
    </div>
  )
}

function Fan() {
  const shots = [shot500day, shotBlueocean, shotOnstage, shotEleave]
  return (
    <div className="group relative h-[17rem] w-[min(30rem,84vw)]">
      {shots.map((s, i) => {
        const r = (i - 1.5) * 7
        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 aspect-[16/10] w-[62%] overflow-hidden rounded-xl border border-paper/12 shadow-[0_30px_60px_-24px_rgb(0_0_0/0.95)] transition-transform duration-700 ease-[var(--ease-out-expo)] [transform:translate(-50%,-50%)_translateX(var(--x0))_rotate(var(--r0))] can-hover:group-hover:[transform:translate(-50%,-50%)_translateX(var(--x1))_rotate(var(--r1))]"
            style={
              {
                zIndex: i,
                "--x0": `${(i - 1.5) * 16}%`,
                "--r0": `${r}deg`,
                "--x1": `${(i - 1.5) * 34}%`,
                "--r1": `${r * 1.5}deg`,
              } as React.CSSProperties
            }
          >
            <Image src={s} alt="" fill sizes="20rem" className="object-cover object-top" />
          </div>
        )
      })}
    </div>
  )
}
