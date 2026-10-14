"use client"

import * as React from "react"

import { useSmoothScroll } from "@/components/providers/smooth-scroll"

export type IntroPhase = "loading" | "intro" | "ready"

type IntroContextValue = {
  phase: IntroPhase
  markPortraitReady: () => void
}

const IntroContext = React.createContext<IntroContextValue | null>(null)

const MIN_LOADER_MS = 900
const MAX_WAIT_MS = 3200
const INTRO_MS = 1950
const SEEN_KEY = "portfolio-intro-seen"

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = React.useState<IntroPhase>("loading")
  const portrait = React.useRef<() => void>(() => {})
  const portraitReady = React.useRef(false)
  const scroll = useSmoothScroll()

  const markPortraitReady = React.useCallback(() => {
    portraitReady.current = true
    portrait.current()
  }, [])

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // no intro for deep links, reduced motion, the 404 page, or a page that is already scrolled or loaded late
    const late = performance.now() > 5500 || window.scrollY > 0
    if (reduce || late || window.location.hash || !document.querySelector(".hero")) {
      const raf = requestAnimationFrame(() => setPhase("ready"))
      return () => cancelAnimationFrame(raf)
    }

    let seen = false
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === "1"
      window.sessionStorage.setItem(SEEN_KEY, "1")
    } catch {}

    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
    scroll.lock()

    let cancelled = false
    let locked = true
    const release = () => {
      if (!locked) return
      locked = false
      scroll.unlock()
    }
    const timers: number[] = []
    const portraitLoaded = new Promise<void>((resolve) => {
      if (portraitReady.current) resolve()
      else portrait.current = resolve
    })
    const fontsLoaded = document.fonts?.ready ?? Promise.resolve()
    const minTime = new Promise<void>((r) => timers.push(window.setTimeout(r, seen ? 250 : MIN_LOADER_MS)))
    const maxTime = new Promise<void>((r) => timers.push(window.setTimeout(r, MAX_WAIT_MS)))

    Promise.race([Promise.all([portraitLoaded, fontsLoaded, minTime]), maxTime]).then(() => {
      if (cancelled) return
      setPhase("intro")
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return
          setPhase("ready")
          release()
        }, INTRO_MS),
      )
    })

    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
      release()
    }
  }, [scroll])

  const value = React.useMemo(() => ({ phase, markPortraitReady }), [phase, markPortraitReady])
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
}

export function useIntro() {
  const ctx = React.useContext(IntroContext)
  if (!ctx) throw new Error("useIntro must be used inside <IntroProvider>")
  return ctx
}
