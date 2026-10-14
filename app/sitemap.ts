import type { MetadataRoute } from "next"

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site, lastModified: "2026-10-13", changeFrequency: "monthly", priority: 1 }]
}
