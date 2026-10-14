"use client"

import * as React from "react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

// `src` without extension (.mp4 and .webm next to each other); loads only when visible
export function LoopVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = React.useRef<HTMLVideoElement>(null)
  const reduce = usePrefersReducedMotion()
  const [playing, setPlaying] = React.useState(false)

  React.useEffect(() => {
    const video = ref.current
    if (!video || reduce) return
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (saveData) return
    video.muted = true
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(video)
    return () => {
      io.disconnect()
      video.pause()
    }
  }, [reduce])

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden
      tabIndex={-1}
      disablePictureInPicture
      onPlaying={() => setPlaying(true)}
      className={cn(
        "object-cover",
        !poster && "opacity-0 transition-opacity duration-500",
        !poster && playing && "opacity-100",
        className,
      )}
    >
      <source src={`${src}.mp4`} type="video/mp4" />
      <source src={`${src}.webm`} type="video/webm" />
    </video>
  )
}
