import type { MetadataRoute } from "next"

import { profile, site } from "@/lib/content"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.nameTh} (${profile.name})`,
    short_name: profile.name,
    description: site.description.th,
    start_url: "/",
    display: "standalone",
    background_color: "#0b1a1d",
    theme_color: "#0b1a1d",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
