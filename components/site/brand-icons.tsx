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

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>

function fromSimpleIcon(icon: SimpleIcon): IconComponent {
  const Component: IconComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d={icon.path} />
    </svg>
  )
  Component.displayName = `Icon(${icon.title})`
  return Component
}

// near-black logos would disappear on the dark background
const tint = (icon: SimpleIcon) => {
  const n = parseInt(icon.hex, 16)
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255
  return lum < 0.2 ? "#ffffff" : `#${icon.hex}`
}

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
