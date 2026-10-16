"use client"

import * as React from "react"

import { site, type Lang, type Localized } from "@/lib/content"
import { keepThaiWords } from "@/lib/thai"

type LangContextValue = {
  lang: Lang
  setLang: (next: Lang) => void
  t: (copy: Localized) => string
}

const LangContext = React.createContext<LangContextValue | null>(null)
const STORAGE_KEY = "portfolio-lang"

let memory: Lang | null = null
const listeners = new Set<() => void>()

function read(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === "en" || saved === "th") return saved
  } catch {}
  return memory ?? "th"
}

function write(next: Lang) {
  memory = next
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {}
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  // server render is always Thai, a saved choice applies after hydration
  const lang = React.useSyncExternalStore(subscribe, read, () => "th" as Lang)
  const timers = React.useRef<number[]>([])

  React.useEffect(() => {
    document.documentElement.lang = lang
    // streamed metadata can put the default title back after this runs
    const title = site.title[lang]
    const apply = () => {
      if (document.title !== title) document.title = title
    }
    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.head, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [lang])

  React.useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  // compares against the stored value, not the rendered one, so the last of several quick clicks wins
  const setLang = React.useCallback((next: Lang) => {
    const root = document.documentElement
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    if (next === read() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      write(next)
      root.removeAttribute("data-lang-switching")
      return
    }
    root.setAttribute("data-lang-switching", "")
    timers.current.push(
      window.setTimeout(() => {
        write(next)
        timers.current.push(window.setTimeout(() => root.removeAttribute("data-lang-switching"), 70))
      }, 170),
    )
  }, [])

  const t = React.useCallback((copy: Localized) => (lang === "th" ? keepThaiWords(copy.th) : copy.en), [lang])

  const value = React.useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = React.useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>")
  return ctx
}
