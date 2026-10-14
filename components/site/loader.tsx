"use client"

import { useIntro } from "@/components/providers/intro-provider"
import { profile } from "@/lib/content"

export function Loader() {
  const { phase } = useIntro()
  return (
    <div
      aria-hidden
      data-phase={phase}
      className="loader fixed inset-0 z-[80] flex flex-col items-center justify-center gap-5 bg-ink data-[phase=ready]:invisible"
    >
      <span className="type-display text-[clamp(3rem,10vw,7rem)] text-paper">{profile.name}</span>
      <span className="relative h-px w-28 overflow-hidden bg-paper/15">
        <span className="absolute inset-0 animate-[loader-bar_1.2s_var(--ease-in-out-quint)_infinite] bg-signal" />
      </span>
    </div>
  )
}
