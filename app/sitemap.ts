import type { MetadataRoute } from "next"

import stats from "@/lib/github-stats.json"
import { siteUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/`, lastModified: stats.generatedAt, changeFrequency: "monthly", priority: 1 }]
}
