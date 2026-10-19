import type * as React from "react"
import {
  siApple,
  siCloudflare,
  siFacebook,
  siFigma,
  siGithub,
  siGoogleanalytics,
  siGooglesearchconsole,
  siLine,
  siNextdotjs,
  siNodedotjs,
  siNvidia,
  siReact,
  siTailwindcss,
  siTiktok,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons"

import { visibleOnDark } from "@/lib/color"

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>

function fromSimpleIcon(icon: Pick<SimpleIcon, "path" | "title">): IconComponent {
  const Component: IconComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d={icon.path} />
    </svg>
  )
  Component.displayName = `Icon(${icon.title})`
  return Component
}

// dark logos fall back to white
const tint = (icon: SimpleIcon) => (visibleOnDark(icon.hex) ? `#${icon.hex}` : "#ffffff")

const tools: { icon: SimpleIcon; className: string }[] = [
  { icon: siNextdotjs, className: "top-[8%] left-[9%]" },
  { icon: siNodedotjs, className: "top-[4%] left-[29%]" },
  { icon: siGoogleanalytics, className: "top-[7%] left-[52%] max-sm:left-[58%]" },
  { icon: siFigma, className: "top-[11%] right-[29%] max-sm:hidden" },
  { icon: siReact, className: "top-[14%] right-[8%]" },
  { icon: siGooglesearchconsole, className: "top-[21%] right-[21%] max-md:hidden" },
  { icon: siLine, className: "top-[31%] left-[4%] max-md:hidden" },
  { icon: siFacebook, className: "top-[57%] left-[6%] max-md:hidden" },
  { icon: siGithub, className: "top-[42%] right-[4%] max-md:hidden" },
  { icon: siCloudflare, className: "top-[64%] right-[7%] max-md:hidden" },
  { icon: siTypescript, className: "top-[80%] left-[9%]" },
  { icon: siVercel, className: "bottom-[6%] left-[28%]" },
  { icon: siApple, className: "top-[77%] left-[37%] max-sm:hidden" },
  { icon: siNvidia, className: "bottom-[4%] right-[44%] max-sm:right-[40%]" },
  { icon: siTiktok, className: "top-[81%] right-[28%] max-sm:right-[12%]" },
  { icon: siTailwindcss, className: "bottom-[10%] right-[9%] max-sm:hidden" },
]

export const toolboxIcons = tools.map((t, i) => ({
  id: i + 1,
  icon: fromSimpleIcon(t.icon),
  className: t.className,
  color: tint(t.icon),
  label: t.icon.title,
}))

export const LineIcon = fromSimpleIcon(siLine)
export const FacebookIcon = fromSimpleIcon(siFacebook)
export const TiktokIcon = fromSimpleIcon(siTiktok)
export const GithubIcon = fromSimpleIcon(siGithub)
// simple-icons no longer ships LinkedIn, so its last path lives here
export const LinkedinIcon = fromSimpleIcon({
  title: "LinkedIn",
  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
})
