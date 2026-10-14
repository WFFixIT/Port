"use client"

import { FloatingIconsHero } from "@/components/ui/floating-icons-hero-section"
import { useLang } from "@/components/providers/lang-provider"
import { useSmoothScroll } from "@/components/providers/smooth-scroll"
import { toolboxIcons } from "@/components/site/brand-icons"
import { toolbox } from "@/lib/content"

export function Toolbox() {
  const { t } = useLang()
  const { scrollTo } = useSmoothScroll()
  return (
    <FloatingIconsHero
      id="toolbox"
      aria-labelledby="toolbox-title"
      titleId="toolbox-title"
      title={t(toolbox.title)}
      subtitle={t(toolbox.subtitle)}
      ctaText={t(toolbox.cta)}
      ctaHref="#contact"
      onCtaClick={(e) => {
        e.preventDefault()
        scrollTo("#contact", { offset: -8, focus: true })
      }}
      icons={toolboxIcons}
      className="bg-transparent"
    />
  )
}
