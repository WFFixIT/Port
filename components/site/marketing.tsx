"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowUpRight, Play } from "lucide-react"

import { useLang } from "@/components/providers/lang-provider"
import { FacebookIcon, TiktokIcon } from "@/components/site/brand-icons"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { channels, clips, marketing, type Channel, type Clip } from "@/lib/content"
import { cn } from "@/lib/utils"

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`

export function Marketing() {
  const { t } = useLang()
  const tiktok = channels.find((c) => c.id === "tiktok-fixit")

  return (
    <section id="content" aria-labelledby="content-title" className="px-gutter relative py-[clamp(5rem,10vw,9rem)]">
      <header className="grid gap-6 pb-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[1fr_auto] lg:items-end">
        <h2 id="content-title" className="type-display text-[clamp(3.75rem,1.5rem+10vw,12rem)] text-paper">
          {t(marketing.title)}
        </h2>
        <p className="max-w-[34ch] text-paper-dim text-pretty lg:pb-4 lg:text-right">{t(marketing.intro)}</p>
      </header>

      <div className="grid grid-cols-1 gap-x-[clamp(2rem,6vw,6rem)] gap-y-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
        <figure>
          <p className="type-display text-[clamp(8rem,5rem+10vw,15rem)] leading-[0.78] text-signal">{marketing.stat.value}</p>
          <figcaption className="mt-6 text-[1.2rem] leading-snug font-semibold text-paper text-pretty">
            {t(marketing.stat.label)}
          </figcaption>
          <p className="mt-2 max-w-[34ch] text-paper-dim text-pretty">{t(marketing.stat.note)}</p>
        </figure>

        <div className="min-w-0">
          <h3 className="mb-4 text-sm text-paper-dim">{t(marketing.channels)}</h3>
          <ul className="border-t border-paper/12">
            {channels.map((c) => (
              <ChannelRow key={c.id} channel={c} />
            ))}
          </ul>
        </div>
      </div>

      {clips.length > 0 ? (
        <div className="mt-[clamp(3.5rem,7vw,6rem)]">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h3 className="text-sm text-paper-dim">{t(marketing.clips)}</h3>
            {tiktok ? (
              <a
                href={tiktok.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group -my-2 inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-paper"
              >
                <TiktokIcon className="size-3.5" aria-hidden />
                <span className="underline decoration-paper/30 underline-offset-4 transition-colors duration-200 can-hover:group-hover:decoration-signal">
                  {t(marketing.seeAll)}
                </span>
                <ArrowUpRight className="size-4 text-paper-dim" aria-hidden />
              </a>
            ) : null}
          </div>
          {/* relative so the sr-only labels don't overflow the page */}
          <ul className="bleed-x relative flex snap-x snap-mandatory gap-3 overflow-x-auto px-gutter pb-2 [scroll-padding-inline:var(--gutter)] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {clips.map((clip) => (
              <ClipCard key={clip.id} clip={clip} />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}

function ChannelRow({ channel: c }: { channel: Channel }) {
  const { t } = useLang()
  const Icon = c.platform === "TikTok" ? TiktokIcon : FacebookIcon
  return (
    <li className="border-b border-paper/12">
      <a
        href={c.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 py-5"
      >
        <span className="relative size-14 overflow-hidden rounded-2xl ring-1 ring-paper/12">
          <Image src={c.avatar} alt="" fill sizes="56px" className="object-cover" />
          <span className="absolute right-0.5 bottom-0.5 grid size-5 place-items-center rounded-full bg-paper text-ink">
            <Icon className="size-3" aria-hidden />
          </span>
        </span>
        <span className="min-w-0">
          <span className="flex items-baseline gap-2">
            <span className="text-[1.15rem] font-semibold text-paper">{c.name}</span>
            <span className="text-sm text-paper-dim">{c.platform}</span>
          </span>
          <span className="mt-0.5 block text-sm text-paper-dim text-pretty">{t(c.about)}</span>
        </span>
        <span className="grid size-10 place-items-center rounded-full border border-paper/20 text-paper transition-[background-color,border-color,color,rotate] duration-500 ease-[var(--ease-out-expo)] can-hover:group-hover:-rotate-45 can-hover:group-hover:border-transparent can-hover:group-hover:bg-signal can-hover:group-hover:text-on-signal">
          <ArrowUpRight className="size-4 rotate-45" aria-hidden />
          <span className="sr-only">
            {t(marketing.visit)} {c.platform} {c.name}
          </span>
        </span>
      </a>
    </li>
  )
}

function ClipCard({ clip }: { clip: Clip }) {
  const { t } = useLang()
  const reduce = usePrefersReducedMotion()
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = React.useState(false)

  const start = (e: React.PointerEvent | React.FocusEvent) => {
    const video = videoRef.current
    if (!video || reduce) return
    if ("pointerType" in e && e.pointerType !== "mouse") return
    video.muted = true
    video.play().catch(() => {})
  }
  const stop = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    setPlaying(false)
  }

  return (
    <li className="w-[58vw] max-w-[15rem] shrink-0 snap-start sm:w-auto sm:max-w-none">
      <a
        href={clip.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        onPointerEnter={start}
        onPointerLeave={stop}
        onFocus={start}
        onBlur={stop}
      >
        <span className="relative block aspect-[3/4] overflow-hidden rounded-2xl border border-paper/10 bg-ink-high">
          <Image
            src={clip.cover}
            alt=""
            fill
            sizes="(max-width: 640px) 58vw, (max-width: 1024px) 45vw, 22rem"
            className="object-cover transition-[scale] duration-700 ease-[var(--ease-out-expo)] can-hover:group-hover:scale-[1.04]"
          />
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            tabIndex={-1}
            disablePictureInPicture
            onPlaying={() => setPlaying(true)}
            className={cn(
              "absolute inset-0 size-full object-cover opacity-0 [transition:opacity_300ms_ease,scale_700ms_var(--ease-out-expo)] can-hover:group-hover:scale-[1.04]",
              playing && "opacity-100",
            )}
          >
            <source src={`${clip.preview}.mp4`} type="video/mp4" />
            <source src={`${clip.preview}.webm`} type="video/webm" />
          </video>
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent" />
          <span className="absolute top-3 left-3 grid size-8 place-items-center rounded-full bg-black/55 text-white">
            <TiktokIcon className="size-3.5" aria-hidden />
          </span>
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
            <Play className="size-3.5 fill-current" aria-hidden />
            <span className="text-sm font-semibold tabular-nums">{clock(clip.duration)}</span>
          </span>
        </span>
        <span className="mt-3 line-clamp-2 text-sm text-paper/80 text-pretty">{t(clip.caption)}</span>
        <span className="sr-only">{t(marketing.watch)}</span>
      </a>
    </li>
  )
}
