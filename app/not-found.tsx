"use client"

import Link from "next/link"

import { useLang } from "@/components/providers/lang-provider"
import { notFoundCopy } from "@/lib/content"

export default function NotFound() {
  const { t } = useLang()
  return (
    <main className="px-gutter grid min-h-svh place-items-center py-24 text-center">
      <div>
        <p aria-hidden className="type-display text-[clamp(8rem,4rem+20vw,22rem)] leading-[0.8] text-signal">
          404
        </p>
        <h1 className="mt-8 text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] font-semibold text-paper">{t(notFoundCopy.title)}</h1>
        <p className="mx-auto mt-3 max-w-[34ch] text-paper-dim">{t(notFoundCopy.body)}</p>
        <Link
          href="/"
          className="press mt-8 inline-flex h-12 items-center rounded-full bg-signal px-6 font-semibold text-on-signal hover:bg-signal-bright"
        >
          {t(notFoundCopy.home)}
        </Link>
      </div>
    </main>
  )
}
