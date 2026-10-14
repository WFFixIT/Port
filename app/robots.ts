import type { MetadataRoute } from "next"

import { publicUrl } from "@/lib/site-url"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(publicUrl ? { sitemap: `${publicUrl}/sitemap.xml` } : {}),
  }
}
