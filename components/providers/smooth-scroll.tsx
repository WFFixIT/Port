"use client"

import * as React from "react"

type ScrollApi = {
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number; immediate?: boolean; focus?: boolean }) => void
  focus: (target: string | HTMLElement) => void
  lock: () => void
  unlock: () => void
}

// move keyboard focus to a section without scrolling, the way a plain #link would
function focusTarget(target: string | HTMLElement) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target
  if (!el) return
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1")
  el.focus({ preventScroll: true })
}

const ScrollContext = React.createContext<ScrollApi | null>(null)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const locks = React.useRef(0)

  const api = React.useMemo<ScrollApi>(
    () => ({
      scrollTo(target, opts) {
        const el =
          typeof target === "string" ? document.querySelector<HTMLElement>(target) : typeof target === "number" ? null : target
        const top = typeof target === "number" ? target : el ? el.getBoundingClientRect().top + window.scrollY : 0
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        window.scrollTo({ top: top + (opts?.offset ?? 0), behavior: opts?.immediate || reduce ? "instant" : "smooth" })
        if (opts?.focus && el) focusTarget(el)
      },
      focus: focusTarget,
      lock() {
        locks.current += 1
        document.documentElement.style.overflow = "hidden"
      },
      unlock() {
        locks.current = Math.max(0, locks.current - 1)
        if (locks.current === 0) document.documentElement.style.overflow = ""
      },
    }),
    [],
  )

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>
}

export function useSmoothScroll() {
  const ctx = React.useContext(ScrollContext)
  if (!ctx) throw new Error("useSmoothScroll must be used inside <SmoothScroll>")
  return ctx
}
