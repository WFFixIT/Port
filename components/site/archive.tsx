"use client"

import * as React from "react"

import GlassFolder, { type ArtRecipe, type FolderFile } from "@/components/ui/glass-folder-cards"
import { useLang } from "@/components/providers/lang-provider"
import { archive } from "@/lib/content"
import { projects } from "@/lib/projects"

const PAPER_ART: ArtRecipe = {
  style: "streak",
  colors: ["#f4efe7", "#e6d2bd", "#f2994a", "#26323a", "#4a5f69", "#9fb3bb", "#ece5d8"],
  scale: 0.7,
  warp: 1.4,
  angle: -0.62,
  gloss: 0.18,
  veins: 0,
}
const SLATE_ART: ArtRecipe = {
  style: "marble",
  colors: ["#07090c", "#16252c", "#3d5f68", "#12171a", "#b65f22", "#f2994a", "#ffc48a"],
  scale: 0.62,
  warp: 3.2,
  angle: -0.5,
  gloss: 0.55,
  veins: 0.6,
}

const domain = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

export function Archive() {
  const { lang, t } = useLang()
  const gridRef = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(340)

  React.useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const cell = el.firstElementChild?.getBoundingClientRect().width ?? 340
      setWidth(Math.round(Math.max(260, Math.min(360, cell))))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // client sites only (our own are in the work section); the last file sits at the front
  const sites: FolderFile[] = ["onstage", "blueocean", "500day"].flatMap((slug) => {
    const p = projects.find((x) => x.slug === slug)
    return p?.url ? [{ name: p.name, meta: domain(p.url), image: `/work/folder-${slug}.webp`, href: p.url }] : []
  })
  const demos: FolderFile[] = [
    { name: "MeMo", meta: t(archive.files.memo), image: "/work/memo-line-thumb.webp", href: "https://memo.whiteforces.com/" },
    { name: "Stock Workspace", meta: t(archive.files.stock), image: "/work/folder-stock.webp", href: "https://stock.whiteforces.com/" },
  ]

  const font = { fontFamily: "var(--font-sans)" }
  const strings =
    lang === "th"
      ? {
          open: "เปิด",
          close: "ปิด",
          openFolder: "เปิดแฟ้ม",
          closeFolder: "ปิดแฟ้ม",
          addTo: "เพิ่มลงใน",
          moreFor: "ตัวเลือกของ",
          contents: "ในแฟ้ม",
          options: "ตัวเลือก",
          untitled: "ไม่มีชื่อ",
          justNow: "เมื่อสักครู่",
          count: (n: number) => `${n} รายการ`,
        }
      : {}

  return (
    <section aria-labelledby="archive-title" className="px-gutter relative py-[clamp(5rem,10vw,9rem)]">
      <header className="mx-auto mb-[clamp(3rem,7vw,6rem)] flex max-w-[64rem] flex-col items-center text-center">
        <h2 id="archive-title" className="type-display text-[clamp(3.25rem,1.6rem+7vw,8.5rem)] text-paper">
          {t(archive.title)}
        </h2>
        <p className="mt-5 max-w-[42ch] text-paper-dim text-pretty">{t(archive.intro)}</p>
      </header>

      <div
        ref={gridRef}
        className="mx-auto grid max-w-[52rem] grid-cols-1 items-end justify-items-center gap-x-10 gap-y-16 md:grid-cols-2"
      >
        {/* a folder reads its files once, so a new language needs a fresh folder */}
        <div className="flex w-full max-w-[360px] justify-center">
          <GlassFolder
            key={`sites-${lang}`}
            label={t(archive.folders.live)}
            meta={t(archive.count.sites).replace("{n}", String(sites.length))}
            art={PAPER_ART}
            seed={3}
            files={sites}
            action="none"
            width={width}
            style={font}
            strings={strings}
          />
        </div>
        <div className="flex w-full max-w-[360px] justify-center">
          <GlassFolder
            key={`demos-${lang}`}
            label={t(archive.folders.demos)}
            meta={t(archive.count.demos).replace("{n}", String(demos.length))}
            tone="dark"
            art={SLATE_ART}
            seed={11}
            files={demos}
            action="none"
            labelPlacement="top-left"
            appearDelay={140}
            width={width}
            style={font}
            strings={strings}
          />
        </div>
      </div>

      <p className="mt-14 text-center text-sm text-paper-dim">
        <span className="can-hover:hidden">{t(archive.hintTouch)}</span>
        <span className="hidden can-hover:inline">{t(archive.hint)}</span>
      </p>
    </section>
  )
}
