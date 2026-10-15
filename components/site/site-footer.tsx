"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowUp, ArrowUpRight } from "lucide-react"

import wfMark from "@/assets/brand/wf-mark.webp"
import { useLang } from "@/components/providers/lang-provider"
import { useSmoothScroll } from "@/components/providers/smooth-scroll"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { brands, contact, footer, profile, ui } from "@/lib/content"

const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 15_000)
  return () => window.clearInterval(id)
}
const minute = () => Math.floor(Date.now() / 60_000)

function useBangkokTime() {
  const m = React.useSyncExternalStore(subscribe, minute, () => 0)
  if (!m) return "––:––"
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: profile.timeZone }).format(m * 60_000)
}

export function SiteFooter() {
  const { t } = useLang()
  const { scrollTo } = useSmoothScroll()
  const time = useBangkokTime()
  const wordRef = React.useRef<HTMLDivElement>(null)
  const inView = useInView(wordRef, { once: true, amount: 0.4 })
  const reduce = usePrefersReducedMotion()
  const word = profile.name.toUpperCase().split("")

  const go = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollTo(id, { offset: id === "#top" ? 0 : -8, focus: true })
  }

  return (
    <footer className="relative overflow-hidden bg-ink">
      <div className="px-gutter grid gap-12 pt-[clamp(4rem,8vw,6rem)] pb-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <a
          href={brands.whiteForces}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex max-w-[22rem] items-center gap-4"
        >
          <span className="relative size-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-paper/15">
            <Image src={wfMark} alt="" fill sizes="56px" className="object-cover" />
          </span>
          <span>
            <span className="block text-sm text-paper-dim">{t(footer.partOf)}</span>
            <span className="mt-0.5 flex items-center gap-1.5 font-semibold text-paper">
              whiteforces.com
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] can-hover:group-hover:translate-x-0.5 can-hover:group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </span>
        </a>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {ui.nav
              .filter((item) => item.id !== "github")
              .map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={go(`#${item.id}`)} className="-my-1 inline-block py-1 text-paper/80 transition-colors hover:text-paper">
                    {t(item.label)}
                  </a>
                </li>
              ))}
            <li>
              <a href="#contact" onClick={go("#contact")} className="-my-1 inline-block py-1 text-paper/80 transition-colors hover:text-paper">
                {t(ui.talk)}
              </a>
            </li>
            <li>
              <a href={contact.line.href} target="_blank" rel="noopener noreferrer" className="-my-1 inline-block py-1 text-paper/80 transition-colors hover:text-paper">
                LINE
              </a>
            </li>
            <li>
              <a href={contact.github.href} target="_blank" rel="noopener noreferrer" className="-my-1 inline-block py-1 text-paper/80 transition-colors hover:text-paper">
                GitHub
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-start justify-between gap-6 md:flex-col md:items-end">
          <p className="md:text-right">
            <span className="block text-sm text-paper-dim">{t(footer.time)}</span>
            <span className="mt-0.5 block text-2xl font-semibold text-paper tabular-nums wdth-75">{time}</span>
          </p>
          <a
            href="#top"
            onClick={go("#top")}
            className="press group inline-flex h-11 items-center gap-2 rounded-full border border-paper/15 px-5 text-sm text-paper hover:border-paper/35"
          >
            {t(ui.backToTop)}
            <ArrowUp className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] can-hover:group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </div>

      <div ref={wordRef} aria-hidden className="px-gutter flex justify-center overflow-hidden select-none">
        {word.map((ch, i) => (
          <span key={i} className="footer-key overflow-hidden">
            <motion.span
              initial={reduce ? false : { y: "70%" }}
              animate={inView || reduce ? { y: "18%" } : { y: "70%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              className="footer-letter block text-[min(calc((100vw-2*var(--gutter))/4.06),48svh)] leading-[0.8] font-extrabold wdth-62"
            >
              {ch}
            </motion.span>
          </span>
        ))}
      </div>

      <div className="px-gutter relative flex flex-wrap items-center justify-between gap-3 border-t border-paper/8 py-6 text-sm text-paper-dim">
        <span>
          © {profile.year} {t({ th: profile.nameTh, en: profile.name })}
        </span>
        <span>{t(footer.built)}</span>
      </div>
    </footer>
  )
}
