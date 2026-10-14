import type { MetadataRoute } from "next"

import stats from "@/lib/github-stats.json"
import { publicUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  if (!publicUrl) return []
  return [{ url: `${publicUrl}/`, lastModified: stats.generatedAt, changeFrequency: "monthly", priority: 1 }]
}
