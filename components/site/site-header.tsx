"use client"

import * as React from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { useIntro } from "@/components/providers/intro-provider"
import { useLang } from "@/components/providers/lang-provider"
import { useSmoothScroll } from "@/components/providers/smooth-scroll"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { contact, profile, ui, type Lang } from "@/lib/content"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const { t } = useLang()
  const { phase } = useIntro()
  const { scrollTo } = useSmoothScroll()
  const { scrollY } = useScroll()
  const [solid, setSolid] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const current = useCurrentSection(ui.nav.map((n) => n.id))

  // hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    if (menuOpen) return
    if (y > 160 && y > prev + 4) setHidden(true)
    else if (y < prev - 4 || y <= 160) setHidden(false)
  })

  const go = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollTo(id, { offset: id === "#top" ? 0 : -8 })
  }

  const entered = phase !== "loading"

  return (
    <>
      <a
        href="#main"
        className="press fixed top-3 left-3 z-[90] -translate-y-24 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink focus-visible:translate-y-0"
      >
        {t(ui.skip)}
      </a>
      <header
        className={cn(
          "site-header fixed inset-x-0 top-0 z-50 transition-[translate,opacity] duration-500 ease-[var(--ease-out-quint)]",
          !entered && "-translate-y-full opacity-0",
          entered && hidden && "-translate-y-full",
          phase === "intro" && "delay-[1100ms]",
        )}
      >
        <div
          className={cn(
            "px-gutter mx-auto flex h-[var(--header-h)] items-center justify-between gap-6 border-b border-transparent transition-[background-color,border-color] duration-300",
            solid && "border-paper/8 bg-ink/95",
          )}
        >
          <a href="#top" onClick={go("#top")} className="press type-display text-[1.75rem] leading-none text-paper" aria-label={profile.name}>
            {profile.name}
          </a>

          <nav aria-label="Primary" className="max-md:hidden">
            <ul className="flex items-center gap-1">
              {ui.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(`#${item.id}`)}
                    aria-current={current === item.id ? "location" : undefined}
                    className="nav-link relative inline-flex h-10 items-center px-3.5 text-[0.95rem] text-paper/80 transition-colors duration-200 hover:text-paper aria-[current]:text-paper"
                  >
                    {t(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <LangToggle />
            <a
              href="#contact"
              onClick={go("#contact")}
              className="press inline-flex h-10 items-center rounded-full bg-signal px-5 text-[0.92rem] font-semibold text-on-signal hover:bg-signal-bright max-md:hidden"
            >
              {t(ui.talk)}
            </a>
            <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} go={go} />
          </div>
        </div>
      </header>
    </>
  )
}

function useCurrentSection(ids: string[]) {
  const [current, setCurrent] = React.useState<string | null>(null)
  const key = ids.join(",")
  React.useEffect(() => {
    const els = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(e.target.id)
          else setCurrent((c) => (c === e.target.id ? null : c))
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
  return current
}

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  const reduce = usePrefersReducedMotion()
  const id = React.useId()
  const options: { value: Lang; label: string; long: string }[] = [
    { value: "th", label: "TH", long: "ภาษาไทย" },
    { value: "en", label: "EN", long: "English" },
  ]
  return (
    <div
      role="group"
      aria-label={t(ui.language)}
      className={cn("relative flex h-10 items-center rounded-full border border-paper/15 bg-ink/80 p-1", className)}
    >
      {options.map((o) => {
        const active = lang === o.value
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            aria-label={o.long}
            onClick={() => setLang(o.value)}
            className={cn(
              "press relative z-10 h-8 rounded-full px-3 text-[0.8rem] font-semibold tracking-wide transition-colors duration-200",
              active ? "text-ink" : "text-paper/70 hover:text-paper",
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${id}`}
                transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0.15 }}
                className="absolute inset-0 -z-10 rounded-full bg-paper"
              />
            )}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

function MobileMenu({
  open,
  onOpenChange,
  go,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  go: (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  const { t } = useLang()
  const links = [...ui.nav.map((n) => ({ id: n.id, label: n.label })), { id: "contact", label: ui.talk }]
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="press inline-flex size-10 items-center justify-center rounded-full border border-paper/15 bg-ink/80 text-paper md:hidden"
          aria-label={t(ui.menu)}
        >
          <Menu className="size-[1.15rem]" aria-hidden />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content className="mobile-menu px-gutter fixed inset-0 z-[70] flex flex-col bg-ink pb-8 text-paper outline-none">
          <DialogPrimitive.Title className="sr-only">{t(ui.menu)}</DialogPrimitive.Title>
          <div className="flex h-[var(--header-h)] items-center justify-between">
            <span className="type-display text-[1.75rem] leading-none">{profile.name}</span>
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                className="press inline-flex size-10 items-center justify-center rounded-full border border-paper/15 text-paper"
                aria-label={t(ui.close)}
              >
                <X className="size-[1.15rem]" aria-hidden />
              </button>
            </DialogPrimitive.Close>
          </div>
          <nav aria-label="Mobile" className="mt-8 flex-1">
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => (
                <li key={l.id} className="mobile-menu__item overflow-hidden" style={{ "--i": i } as React.CSSProperties}>
                  <a
                    href={`#${l.id}`}
                    onClick={go(`#${l.id}`)}
                    className={cn(
                      "type-display block py-1 text-[clamp(3.25rem,16vw,5rem)]",
                      l.id === "contact" ? "text-signal" : "text-paper",
                    )}
                  >
                    {t(l.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu__foot flex items-end justify-between gap-4 border-t border-paper/10 pt-6">
            <div className="flex flex-col gap-1 text-sm text-paper/70">
              <a href={contact.line.href} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                LINE {contact.line.id}
              </a>
              <a href={contact.phone.href} className="hover:text-paper">
                {contact.phone.label}
              </a>
            </div>
            <LangToggle />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
