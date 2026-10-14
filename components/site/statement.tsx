"use client"

import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

import selfie from "@/assets/me/selfie.webp"
import talkPoster from "@/assets/clips/talk-pill-poster.webp"
import fdcPill from "@/assets/work/fdc/pill.webp"
import linePill from "@/assets/work/pink/pill.webp"
import { useLang } from "@/components/providers/lang-provider"
import { LoopVideo } from "@/components/site/loop-video"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { statement, type Lang } from "@/lib/content"

type MediaItem = {
  src: StaticImageData
  position?: string
  video?: string
}

const MEDIA: Record<string, MediaItem> = {
  selfie: { src: selfie, position: "50% 38%" },
  line: { src: linePill },
  fdc: { src: fdcPill },
  clip: { src: talkPoster, video: "/clips/talk-pill" },
}

type Token = { kind: "word"; text: string } | { kind: "space"; text: string } | { kind: "media"; key: string }

// Thai has no spaces between words, so split with Intl.Segmenter
function tokenize(text: string, lang: Lang): Token[] {
  const segmenter = typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter(lang, { granularity: "word" }) : null
  const out: Token[] = []
  for (const part of text.split(/(\{\w+\})/)) {
    if (!part) continue
    const media = part.match(/^\{(\w+)\}$/)
    if (media) {
      out.push({ kind: "media", key: media[1] })
      continue
    }
    if (!segmenter) {
      for (const w of part.split(/(\s+)/)) if (w) out.push(/^\s+$/.test(w) ? { kind: "space", text: w } : { kind: "word", text: w })
      continue
    }
    for (const s of segmenter.segment(part)) {
      const prev = out[out.length - 1]
      if (/^\s+$/.test(s.segment)) out.push({ kind: "space", text: s.segment })
      else if (prev?.kind === "word" && (!s.isWordLike || prev.text.endsWith("\u2060") || s.segment.startsWith("\u2060"))) {
        // keep punctuation and U+2060-joined words attached to the previous word
        prev.text += s.segment
      } else out.push({ kind: "word", text: s.segment })
    }
  }
  return out
}

export function Statement() {
  const { lang, t } = useLang()
  const ref = React.useRef<HTMLElement>(null)
  const reduce = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.85"] })

  const tokens = React.useMemo(() => tokenize(statement[lang], lang), [lang])
  const lit = tokens.filter((x) => x.kind !== "space").length
  let n = 0

  return (
    <section ref={ref} aria-label={lang === "th" ? "เกี่ยวกับผม" : "About me"} className="px-gutter relative py-[clamp(6rem,14vw,12rem)]">
      <p className="sr-only">{t(statement).replace(/\s*\{\w+\}\s*/g, " ")}</p>
      <p
        aria-hidden
        className="mx-auto max-w-[22ch] text-[clamp(2rem,1rem+4.2vw,5.25rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-paper wdth-80 lang-th:leading-[1.32] max-lg:max-w-[18ch] max-sm:max-w-none"
      >
        {tokens.map((tok, i) => {
          if (tok.kind === "space") return <React.Fragment key={i}>{tok.text}</React.Fragment>
          const at = n++
          const range: [number, number] = [at / lit, Math.min(1, (at + 1.5) / lit)]
          if (tok.kind === "media") {
            const m = MEDIA[tok.key]
            return m ? <Media key={i} progress={scrollYProgress} range={range} reduce={reduce} {...m} /> : null
          }
          return <Word key={i} progress={scrollYProgress} range={range} reduce={reduce} text={tok.text} />
        })}
      </p>
    </section>
  )
}

function Word({ progress, range, reduce, text }: { progress: MotionValue<number>; range: [number, number]; reduce: boolean; text: string }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <motion.span style={reduce ? undefined : { opacity }}>{text}</motion.span>
}

function Media({
  progress,
  range,
  reduce,
  src,
  position = "50% 50%",
  video,
}: MediaItem & {
  progress: MotionValue<number>
  range: [number, number]
  reduce: boolean
}) {
  const scale = useTransform(progress, range, [0.4, 1])
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <motion.span
      style={reduce ? undefined : { scale, opacity }}
      className="relative mx-[0.1em] inline-block h-[0.82em] w-[1.7em] overflow-hidden rounded-full align-[-0.06em] ring-1 ring-paper/15"
    >
      {video ? (
        <LoopVideo src={video} poster={src.src} className="absolute inset-0 size-full" />
      ) : (
        <Image
          src={src}
          alt=""
          fill
          sizes="160px"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      )}
    </motion.span>
  )
}
