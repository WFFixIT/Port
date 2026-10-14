"use client"

import * as React from "react"
import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { useLang } from "@/components/providers/lang-provider"
import { AppShowcase } from "@/components/site/app-showcase"
import { LoopVideo } from "@/components/site/loop-video"
import { TechChip } from "@/components/site/tech-icons"
import { useSmoothScroll } from "@/components/providers/smooth-scroll"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { ui, work } from "@/lib/content"
import { apps, ownSites, projects, type Field, type Project, type Shot } from "@/lib/projects"
import { cn } from "@/lib/utils"

export function Work() {
  const { t } = useLang()
  const [hovered, setHovered] = React.useState<number | null>(null)
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  return (
    <section id="work" aria-labelledby="work-title" className="px-gutter relative py-[clamp(5rem,10vw,9rem)]">
      <header className="grid gap-6 pb-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[1fr_auto] lg:items-end">
        <h2 id="work-title" className="flex items-start gap-[0.08em] text-[clamp(3.75rem,1.5rem+10vw,12rem)]">
          <span className="type-display text-paper">{t(work.title)}</span>
          <span className="mt-[0.12em] text-[0.18em] leading-none font-bold text-signal tabular-nums wdth-75">
            {String(projects.length).padStart(2, "0")}
          </span>
        </h2>
        <p className="max-w-[30ch] text-paper-dim text-pretty lg:pb-4 lg:text-right">{t(work.intro)}</p>
      </header>

      <ProjectList onHover={setHovered} onOpen={setOpenIndex} />
      <CursorPreview index={hovered} />
      <OwnSites />
      <LineApps onOpen={setOpenIndex} />
      <PublicWork onOpen={setOpenIndex} />
      <ProjectDrawer index={openIndex} onIndexChange={setOpenIndex} />
    </section>
  )
}

function OwnSites() {
  const { t } = useLang()
  const reduce = usePrefersReducedMotion()
  const [hovered, setHovered] = React.useState<number | null>(null)
  return (
    <div className="mt-12 grid gap-x-6 gap-y-5 md:grid-cols-[minmax(0,1.7fr)_minmax(0,3fr)]">
      <h3 className="text-paper-dim">{t(work.ownSites)}</h3>
      <ul className="bleed-x px-gutter flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scroll-padding-inline:var(--gutter)] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
        {ownSites.map((s, i) => (
          <li key={s.name} className="w-[min(72vw,18rem)] shrink-0 snap-start sm:w-auto">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
              onPointerLeave={() => setHovered(null)}
              className="group block"
            >
              <span className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-paper/10 bg-ink-high">
                <Image src={s.shot} alt="" fill sizes="(max-width: 640px) 92vw, 18rem" className="object-cover object-top" />
                {reduce ? null : <SiteVideo src={s.video} active={hovered === i} />}
              </span>
              <span className="mt-3 flex items-start justify-between gap-3">
                <span>
                  <span className="block font-semibold text-paper">{s.name}</span>
                  <span className="block text-sm text-paper-dim">{t(s.kind)}</span>
                </span>
                <ArrowUpRight
                  className="mt-0.5 size-4 shrink-0 text-paper-dim transition-[translate,color] duration-300 can-hover:group-hover:translate-x-0.5 can-hover:group-hover:-translate-y-0.5 can-hover:group-hover:text-paper"
                  aria-hidden
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LineApps({ onOpen }: { onOpen: (i: number) => void }) {
  const { t } = useLang()
  return (
    <div className="mt-[clamp(6rem,12vw,10rem)]">
      <header className="grid gap-5 pb-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[1fr_auto] lg:items-end">
        <h3 className="type-display text-[clamp(2.75rem,1.4rem+5.5vw,6.5rem)] text-paper">{t(work.appsTitle)}</h3>
        <p className="max-w-[38ch] text-paper-dim text-pretty lg:pb-2 lg:text-right">{t(work.appsIntro)}</p>
      </header>
      <div className="grid gap-[clamp(4.5rem,9vw,8rem)]">
        {apps.map((app) => {
          const index = projects.findIndex((p) => p.app?.id === app.id)
          const field = projects[index]?.field
          return (
            <div key={app.id} className="min-w-0">
              <AppShowcase app={app} />
              {field ? <FieldStrip field={field} onOpen={() => onOpen(index)} /> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// a few photos from on site in one justified row; sideways scroll on a phone
function FieldStrip({ field, onOpen }: { field: Field; onOpen: () => void }) {
  const { t } = useLang()
  const shots = field.picks.map((i) => field.shots[i])
  return (
    <div className="mt-10 grid gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-end">
      <div>
        <h4 className="text-sm text-paper-dim">{t(field.title)}</h4>
        <p className="mt-2 text-[1.15rem] leading-snug font-semibold text-paper text-pretty">{t(field.short)}</p>
        <button
          type="button"
          onClick={onOpen}
          className="press group mt-5 inline-flex h-11 items-center gap-2 rounded-full border border-paper/25 px-5 text-sm font-semibold text-paper hover:border-paper/50"
        >
          {t(work.fieldOpen)}
          <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] can-hover:group-hover:translate-x-0.5" aria-hidden />
        </button>
      </div>
      <ul
        className="bleed-x px-gutter flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scroll-padding-inline:var(--gutter)] [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0"
      >
        {shots.map((s, i) => {
          const ratio = s.src.width / s.src.height
          return (
            <li
              key={i}
              className="relative h-64 w-[calc(var(--r)*16rem)] shrink-0 snap-start overflow-hidden rounded-2xl [aspect-ratio:var(--r)] sm:h-auto sm:w-auto sm:shrink sm:[flex:var(--r)_1_0%]"
              style={{ "--r": ratio } as React.CSSProperties}
            >
              <Image src={s.src} alt={t(s.caption)} fill sizes="(max-width: 640px) 70vw, 30vw" className="object-cover" />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function FieldSection({ field }: { field: Field }) {
  const { t } = useLang()
  const tall = field.shots.filter((s) => s.src.height > s.src.width)
  const wide = field.shots.filter((s) => s.src.height <= s.src.width)
  return (
    <section className="mt-16 border-t border-paper/10 pt-6">
      <h3 className="text-sm text-paper-dim">{t(field.title)}</h3>
      <p className="mt-2 max-w-[56ch] text-[1.1rem] text-paper/85 text-pretty">{t(field.intro)}</p>
      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-4">
        {tall.map((s, i) => (
          <li key={i}>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink">
                <Image src={s.src} alt={t(s.caption)} fill sizes="(max-width: 1024px) 44vw, 13rem" className={cn("object-cover", s.video && "object-[50%_35%]")} />
                {s.video ? <LoopVideo src={s.video} poster={s.src.src} className="absolute inset-0 size-full object-[50%_35%]" /> : null}
              </div>
              <figcaption className="mt-2.5 text-sm text-paper-dim text-pretty">{t(s.caption)}</figcaption>
            </figure>
          </li>
        ))}
        {wide.map((s, i) => (
          <li key={`w${i}`} className="col-span-2 lg:col-span-4">
            <figure className="lg:grid lg:grid-cols-4 lg:items-end lg:gap-x-4">
              <Image src={s.src} alt={t(s.caption)} sizes="(max-width: 1024px) 92vw, 40rem" className="h-auto w-full rounded-xl lg:col-span-3" />
              <figcaption className="mt-2.5 text-sm text-paper-dim text-pretty lg:mt-0">{t(s.caption)}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PublicWork({ onOpen }: { onOpen: (i: number) => void }) {
  const { t } = useLang()
  const picks = ["eleave", "fdc"]
    .map((slug) => projects.findIndex((p) => p.slug === slug))
    .filter((i) => i >= 0 && projects[i].highlight)
  if (!picks.length) return null
  return (
    <div className="mt-[clamp(6rem,12vw,10rem)]">
      <header className="grid gap-5 pb-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[1fr_auto] lg:items-end">
        <h3 className="type-display text-[clamp(2.75rem,1.4rem+5.5vw,6.5rem)] text-paper">{t(work.govTitle)}</h3>
        <p className="max-w-[38ch] text-paper-dim text-pretty lg:pb-2 lg:text-right">{t(work.govIntro)}</p>
      </header>
      <ul className="grid gap-5 lg:grid-cols-2">
        {picks.map((index) => {
          const p = projects[index]
          const h = p.highlight!
          return (
            <li key={p.slug} className="min-w-0">
              <button
                type="button"
                onClick={() => onOpen(index)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-paper/10 bg-ink-raised text-left transition-[border-color,scale] duration-200 ease-[var(--ease-out-quint)] active:scale-[0.99] can-hover:hover:border-paper/25"
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-ink-high">
                  <Image
                    src={p.shot}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 92vw, 42rem"
                    className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] can-hover:group-hover:scale-[1.03]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-[clamp(1.25rem,2.6vw,2.25rem)]">
                  <span className="text-sm text-paper-dim text-pretty">{t(p.client)}</span>
                  <span className="type-display mt-2 block text-[clamp(2.6rem,1.6rem+3.4vw,4.75rem)] text-paper">{p.name}</span>
                  <span className="mt-3 block max-w-[48ch] text-[1.05rem] text-paper/85 text-pretty">{t(h.line)}</span>
                  <span className="mt-7 grid grid-cols-3 border-t border-paper/10">
                    {h.facts.map((f, i) => (
                      <span key={i} className={cn("pt-4 pr-3", i > 0 && "border-l border-paper/10 pl-4")}>
                        <span className="type-display block text-[2.2rem] leading-none text-signal tabular-nums">{f.value}</span>
                        <span className="mt-2 block text-sm leading-snug text-paper-dim">{t(f.label)}</span>
                      </span>
                    ))}
                  </span>
                  <span className="mt-auto flex items-center gap-2 pt-8 font-semibold text-paper">
                    {t(work.open)}
                    <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] can-hover:group-hover:translate-x-1" aria-hidden />
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ProjectList({ onHover, onOpen }: { onHover: (i: number | null) => void; onOpen: (i: number) => void }) {
  const { t } = useLang()
  return (
    <ul className="border-t border-paper/12" onPointerLeave={() => onHover(null)}>
      {projects.map((p, i) => (
        <li key={p.slug} className="border-b border-paper/12">
          <button
            type="button"
            onClick={() => onOpen(i)}
            onPointerEnter={(e) => e.pointerType === "mouse" && onHover(i)}
            onFocus={() => onHover(null)}
            className="work-row group relative isolate grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 py-[clamp(1.25rem,2.4vw,2.25rem)] text-left md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)_auto_auto]"
          >
            <span aria-hidden className="work-row__fill absolute inset-x-[calc(var(--gutter)*-1)] inset-y-0 -z-10 bg-signal" />
            <span className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-xl border border-paper/10 md:hidden">
              <Image src={p.shot} alt="" fill sizes="92vw" className="object-cover object-top" />
              {p.video ? <LoopVideo src={`${p.video}-sm`} className="absolute inset-0 size-full object-top" /> : null}
            </span>
            <span className="type-display text-[clamp(2.6rem,1.4rem+4vw,5.25rem)] text-paper transition-[translate,color] duration-500 ease-[var(--ease-out-expo)] can-hover:group-hover:translate-x-4 can-hover:group-hover:text-on-signal">
              {p.name}
            </span>
            <span className="transition-colors duration-300 max-md:hidden">
              <span className="block text-paper/90 can-hover:group-hover:text-on-signal">{t(p.kind)}</span>
              <span className="mt-0.5 block text-sm text-paper-dim can-hover:group-hover:text-on-signal/75">{t(p.client)}</span>
            </span>
            <span className="text-sm text-paper-dim tabular-nums transition-colors duration-300 max-md:hidden can-hover:group-hover:text-on-signal/85">
              {p.year}
            </span>
            <span className="grid size-11 place-items-center rounded-full border border-paper/20 text-paper transition-[background-color,border-color,color,rotate] duration-500 ease-[var(--ease-out-expo)] can-hover:group-hover:-rotate-45 can-hover:group-hover:border-transparent can-hover:group-hover:bg-ink can-hover:group-hover:text-paper">
              <ArrowRight className="size-5" aria-hidden />
              <span className="sr-only">{t(work.open)}</span>
            </span>
            <span className="col-span-2 -mt-1 text-sm text-paper-dim md:hidden">
              {t(p.kind)}
              <span className="block text-paper-dim/75">{t(p.client)}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

function CursorPreview({ index }: { index: number | null }) {
  const reduce = usePrefersReducedMotion()
  const [enabled, setEnabled] = React.useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.6 })
  const y = useSpring(my, { stiffness: 220, damping: 26, mass: 0.6 })
  const vx = useVelocity(x)
  const rotate = useTransform(vx, [-2200, 0, 2200], [-9, 0, 9], { clamp: true })

  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setEnabled(fine.matches)
    update()
    fine.addEventListener("change", update)
    const move = (e: PointerEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => {
      fine.removeEventListener("change", update)
      window.removeEventListener("pointermove", move)
    }
  }, [mx, my])

  if (!enabled) return null
  const shown = index !== null

  return (
    <motion.div
      aria-hidden
      style={{ x, y, rotate: reduce ? 0 : rotate }}
      className="pointer-events-none fixed top-0 left-0 z-[45] max-md:hidden"
    >
      <motion.div
        initial={false}
        animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.86 }}
        transition={{ duration: shown ? 0.35 : 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="relative -mt-[9.5rem] ml-8 aspect-[16/10] w-[26rem] overflow-hidden rounded-2xl border border-paper/15 bg-ink-high shadow-[0_40px_100px_-30px_rgb(0_0_0/1)]"
      >
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className={cn(
              "absolute inset-0 transition-[opacity,scale] duration-500 ease-[var(--ease-out-quint)]",
              index === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
            )}
          >
            <Image src={p.shot} alt="" fill sizes="26rem" className="object-cover object-top" />
            {p.video && !reduce ? <SiteVideo src={p.video} active={index === i} /> : null}
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

function SiteVideo({ src, active }: { src: string; active: boolean }) {
  const ref = React.useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = React.useState(false)

  React.useEffect(() => {
    const video = ref.current
    if (!video) return
    if (active) {
      video.muted = true
      video.currentTime = 0
      video.play().catch(() => {})
    } else video.pause()
  }, [active])

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
      disablePictureInPicture
      onPlaying={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      className={cn("absolute inset-0 size-full object-cover object-top opacity-0 transition-opacity duration-300", active && playing && "opacity-100")}
    >
      <source src={`${src}.mp4`} type="video/mp4" />
      <source src={`${src}.webm`} type="video/webm" />
    </video>
  )
}

function ProjectDrawer({ index, onIndexChange }: { index: number | null; onIndexChange: (i: number | null) => void }) {
  const { t } = useLang()
  const { lock, unlock } = useSmoothScroll()
  const open = index !== null
  const [shown, setShown] = React.useState(index ?? 0)
  const [dir, setDir] = React.useState(1)
  const scrollerRef = React.useRef<HTMLDivElement>(null)

  // keep showing the last project while the drawer animates closed
  if (index !== null && index !== shown) setShown(index)

  React.useEffect(() => {
    if (!open) return
    lock()
    return () => unlock()
  }, [open, lock, unlock])

  const step = (delta: number) => {
    const next = (shown + delta + projects.length) % projects.length
    setDir(delta)
    onIndexChange(next)
    scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  const p = projects[shown]
  const next = projects[(shown + 1) % projects.length]

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="drawer-overlay fixed inset-0 z-[60] bg-black/70" />
        <DialogPrimitive.Content
          aria-describedby="project-summary"
          className="drawer fixed inset-y-0 right-0 z-[61] flex w-[min(62rem,100vw)] flex-col bg-ink-raised text-paper shadow-[-40px_0_120px_-20px_rgb(0_0_0/0.9)] outline-none md:inset-y-2 md:right-2 md:w-[min(62rem,calc(100vw-1rem))] md:overflow-hidden md:rounded-[1.75rem] md:border md:border-paper/10"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1)
            if (e.key === "ArrowLeft") step(-1)
          }}
        >
          <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-paper/8 px-5 md:px-7">
            <span className="text-sm text-paper-dim tabular-nums">
              {String(shown + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                className="press grid size-10 place-items-center rounded-full border border-paper/15 hover:border-paper/35"
                aria-label={t(work.prev)}
              >
                <ArrowLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="press grid size-10 place-items-center rounded-full border border-paper/15 hover:border-paper/35"
                aria-label={t(work.next)}
              >
                <ArrowRight className="size-4" aria-hidden />
              </button>
              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  className="press ml-2 grid size-10 place-items-center rounded-full bg-paper text-ink hover:bg-white"
                  aria-label={t(ui.close)}
                >
                  <X className="size-4" aria-hidden />
                </button>
              </DialogPrimitive.Close>
            </div>
          </div>

          <div ref={scrollerRef} className="flex-1 overflow-y-auto overscroll-contain">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.article
                key={p.slug}
                custom={dir}
                initial={{ opacity: 0, x: dir * 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: dir * -28, filter: "blur(6px)" }}
                transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                className="px-5 pt-8 pb-10 md:px-10 md:pt-10"
              >
                <ProjectBody project={p} />
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="group mt-16 flex w-full items-end justify-between gap-6 border-t border-paper/10 pt-8 text-left"
                >
                  <span>
                    <span className="block text-sm text-paper-dim">{t(work.next)}</span>
                    <span className="type-display mt-2 block text-[clamp(2.5rem,1.5rem+4vw,4.5rem)] transition-colors duration-300 can-hover:group-hover:text-signal">
                      {next.name}
                    </span>
                  </span>
                  <ArrowRight className="mb-3 size-7 transition-transform duration-500 ease-[var(--ease-out-expo)] can-hover:group-hover:translate-x-2" aria-hidden />
                </button>
              </motion.article>
            </AnimatePresence>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function ProjectBody({ project: p }: { project: Project }) {
  const { t } = useLang()
  return (
    <>
      <p className="text-paper-dim">
        {t(p.kind)}
        <span className="text-paper-dim/60"> / </span>
        {t(p.client)}
      </p>
      <DialogPrimitive.Title className="type-display mt-2 text-[clamp(3.25rem,2rem+6vw,7.5rem)] text-paper">{p.name}</DialogPrimitive.Title>
      <DialogPrimitive.Description id="project-summary" className="mt-5 max-w-[56ch] text-[1.1rem] text-paper/80 text-pretty">
        {t(p.summary)}
      </DialogPrimitive.Description>
      {p.url ? (
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="press mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 font-semibold text-on-signal hover:bg-signal-bright"
        >
          {t(ui.visit)}
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      ) : null}

      {p.app ? <AppShowcase app={p.app} bleed={false} className="mt-12" /> : null}

      {p.full && p.url ? (
        <div className="relative mt-10">
          <div className="overflow-hidden rounded-2xl border border-paper/10 bg-ink">
            <BrowserBar url={p.url} />
            <div className="group/pan relative h-[min(30rem,56svh)] overflow-hidden [--pan-window:min(30rem,56svh)] max-md:h-[22rem] max-md:[--pan-window:22rem]">
              <Image
                src={p.full}
                alt={`${p.name}: ${t(work.previewHint)}`}
                sizes="(max-width: 768px) 92vw, 52rem"
                className="w-full animate-[pan-down_24s_ease-in-out_infinite_alternate] can-hover:group-hover/pan:[animation-play-state:paused]"
              />
            </div>
          </div>
          {p.mobile ? (
            <div className="absolute -right-2 -bottom-8 w-[24%] min-w-[7.5rem] rotate-[4deg] rounded-[1.6rem] border border-paper/15 bg-ink-high p-1.5 shadow-[0_40px_80px_-24px_rgb(0_0_0/1)] max-sm:hidden">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[1.25rem] bg-white">
                <Image src={p.mobile} alt="" fill sizes="12rem" className="object-cover object-top" />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {p.field ? <FieldSection field={p.field} /> : null}

      {p.gallery?.length ? <Gallery shots={p.gallery} lead={!p.full && !p.app} /> : null}

      <section className="mt-16 border-t border-paper/10 pt-6">
        <h3 className="text-sm text-paper-dim">{t(work.did)}</h3>
        <p className="mt-2 text-[1.15rem] font-semibold text-paper">{t(p.role)}</p>
        <ul className="mt-5 grid gap-3">
          {p.points.map((point, i) => (
            <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-2 text-paper/85">
              <span aria-hidden className="mt-[0.6em] size-1.5 rounded-full bg-signal" />
              <span className="text-pretty">{t(point)}</span>
            </li>
          ))}
        </ul>
      </section>

      <dl className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2">
        <Meta label={t(work.stack)} className="sm:col-span-2">
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="rounded-full border border-paper/15 py-1.5 pr-3.5 pl-3 text-sm text-paper/90">
                <TechChip name={s} />
              </li>
            ))}
          </ul>
        </Meta>
        {p.team ? <Meta label={t(work.team)}>{t(p.team)}</Meta> : null}
        <Meta label={t(work.year)}>{p.year}</Meta>
      </dl>
    </>
  )
}

function BrowserBar({ url }: { url?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-paper/8 px-4 py-3" aria-hidden>
      <span className="size-2.5 rounded-full bg-paper/20" />
      <span className="size-2.5 rounded-full bg-paper/20" />
      <span className="size-2.5 rounded-full bg-paper/20" />
      {url ? (
        <span className="ml-3 flex-1 truncate rounded-full bg-paper/6 px-3 py-1 text-xs text-paper-dim">
          {url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </span>
      ) : null}
    </div>
  )
}

// odd one out spans both columns; `lead` makes the first shot full width too
function Gallery({ shots, lead }: { shots: Shot[]; lead: boolean }) {
  const { t } = useLang()
  const wide = shots.filter((s) => s.frame !== "phone")
  const phones = shots.filter((s) => s.frame === "phone")
  const first = lead ? 1 : 0
  const isFull = (i: number) => (lead && i === 0) || (i === wide.length - 1 && (wide.length - first) % 2 === 1)
  return (
    <div className="mt-14 grid gap-8">
      {wide.length ? (
        <ul className="grid gap-x-5 gap-y-8 md:grid-cols-2">
          {wide.map((s, i) => {
            const full = isFull(i)
            return (
              <li key={i} className={cn(full && "md:col-span-2")}>
                <figure>
                  {s.frame === "desktop" ? (
                    <div className="overflow-hidden rounded-xl border border-paper/10 bg-ink">
                      <BrowserBar url={s.url} />
                      <Image src={s.src} alt={t(s.caption)} sizes={full ? "(max-width: 768px) 92vw, 54rem" : "(max-width: 768px) 92vw, 26rem"} className="h-auto w-full" />
                    </div>
                  ) : full && s.src.width > s.src.height ? (
                    <Image src={s.src} alt={t(s.caption)} sizes="(max-width: 768px) 92vw, 54rem" className="h-auto w-full rounded-xl" />
                  ) : (
                    <div className={cn("relative overflow-hidden rounded-xl", full ? "aspect-[16/10]" : "aspect-[4/5]")}>
                      <Image src={s.src} alt={t(s.caption)} fill sizes={full ? "(max-width: 768px) 92vw, 54rem" : "(max-width: 768px) 92vw, 26rem"} className="object-cover" />
                    </div>
                  )}
                  <figcaption className="mt-3 text-sm text-paper-dim text-pretty">{t(s.caption)}</figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      ) : null}
      {phones.length ? (
        <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
          {phones.map((s, i) => (
            <li key={i} className={cn(phones.length === 1 && "col-span-2 sm:col-span-3")}>
              <figure className={cn(phones.length === 1 && "grid grid-cols-[minmax(0,11rem)_1fr] items-end gap-x-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-x-6")}>
                <div className="rounded-[1.6rem] border border-paper/15 bg-ink-high p-1.5">
                  <div className="relative aspect-[390/844] overflow-hidden rounded-[1.2rem] bg-white">
                    <Image src={s.src} alt={t(s.caption)} fill sizes="(max-width: 640px) 44vw, 16rem" className="object-cover object-top" />
                  </div>
                </div>
                <figcaption className={cn("text-sm text-paper-dim text-pretty", phones.length === 1 ? "max-w-[24ch] pb-2" : "mt-3")}>{t(s.caption)}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function Meta({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border-t border-paper/10 pt-4", className)}>
      <dt className="text-sm text-paper-dim">{label}</dt>
      <dd className="mt-2 text-[1.05rem] text-paper">{children}</dd>
    </div>
  )
}
