"use client"

import * as React from "react"

import { site, type Lang, type Localized } from "@/lib/content"

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

  React.useEffect(() => {
    document.documentElement.lang = lang
    document.title = site.title[lang]
  }, [lang])

  const setLang = React.useCallback(
    (next: Lang) => {
      if (next === lang) return
      const root = document.documentElement
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        write(next)
        return
      }
      root.setAttribute("data-lang-switching", "")
      window.setTimeout(() => {
        write(next)
        window.setTimeout(() => root.removeAttribute("data-lang-switching"), 70)
      }, 170)
    },
    [lang],
  )

  const t = React.useCallback((copy: Localized) => copy[lang], [lang])

  const value = React.useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = React.useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>")
  return ctx
}
