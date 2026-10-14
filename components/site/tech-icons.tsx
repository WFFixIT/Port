import type * as React from "react"
import { CandlestickChart, Cpu, KeyRound, MapPinned, RadioTower, type LucideIcon } from "lucide-react"
import {
  siCloudflare,
  siCplusplus,
  siCss,
  siDigitalocean,
  siDocker,
  siDrizzle,
  siEspressif,
  siExpress,
  siFastapi,
  siFlask,
  siGithubactions,
  siGnubash,
  siGoogledrive,
  siJavascript,
  siLeaflet,
  siLine,
  siMqtt,
  siNeon,
  siNextdotjs,
  siNodedotjs,
  siPm2,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siShadcnui,
  siSqlite,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  type SimpleIcon,
} from "simple-icons"

import { cn } from "@/lib/utils"

const BRANDS: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Node.js": siNodedotjs,
  PostgreSQL: siPostgresql,
  SQL: siPostgresql,
  "Neon Postgres": siNeon,
  SQLite: siSqlite,
  Drizzle: siDrizzle,
  Prisma: siPrisma,
  Express: siExpress,
  "Tailwind CSS": siTailwindcss,
  "shadcn/ui": siShadcnui,
  CSS: siCss,
  Vite: siVite,
  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  Vercel: siVercel,
  Cloudflare: siCloudflare,
  "Cloudflare Tunnel": siCloudflare,
  DigitalOcean: siDigitalocean,
  PM2: siPm2,
  "LINE Messaging API": siLine,
  LIFF: siLine,
  "Google Drive API": siGoogledrive,
  "ESP32-S3": siEspressif,
  "C++": siCplusplus,
  Python: siPython,
  Flask: siFlask,
  FastAPI: siFastapi,
  Leaflet: siLeaflet,
  MQTT: siMqtt,
  Shell: siGnubash,
}

// no brand mark for these, so a plain glyph instead
const GLYPHS: Record<string, LucideIcon> = {
  NextAuth: KeyRound,
  FreeRTOS: Cpu,
  LoRa: RadioTower,
  PostGIS: MapPinned,
  MQL5: CandlestickChart,
}

// dark brand colours get lost on the dark page, so those fall back to the text colour
function readable(hex: string) {
  const n = parseInt(hex, 16)
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255
  return lum < 0.28 ? undefined : `#${hex}`
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const brand = BRANDS[name]
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={cn("shrink-0", className)}
        style={{ color: readable(brand.hex) }}
        fill="currentColor"
      >
        <path d={brand.path} />
      </svg>
    )
  }
  const Glyph = GLYPHS[name]
  return Glyph ? <Glyph aria-hidden className={cn("shrink-0", className)} strokeWidth={2} /> : null
}

export function TechChip({ name, children, className }: { name: string; children?: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <TechIcon name={name} className="size-4" />
      <span>{name}</span>
      {children}
    </span>
  )
}
