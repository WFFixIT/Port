"use client"

import * as React from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface IconProps {
  id: number
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  className: string
  color?: string
  label?: string
}

export interface FloatingIconsHeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  onCtaClick?: React.MouseEventHandler<HTMLAnchorElement>
  icons: IconProps[]
}

const REPEL_RADIUS = 150
const REPEL_FORCE = 50

// deterministic per index so the float timing is stable across renders
const seeded = (n: number) => {
  const x = Math.sin(n * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const Icon = ({
  mouseX,
  mouseY,
  iconData,
  index,
  active,
  reduce,
}: {
  mouseX: React.RefObject<number>
  mouseY: React.RefObject<number>
  iconData: IconProps
  index: number
  active: boolean
  reduce: boolean
}) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const near = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })
  const glow = useSpring(near, { stiffness: 200, damping: 30 })
  const glowPct = useTransform(glow, (v) => `${Math.round(v * 100)}%`)
  const labelOpacity = useTransform(glow, [0.25, 0.6], [0, 1])
  const labelY = useTransform(glow, [0.25, 0.6], [6, 0])

  React.useEffect(() => {
    if (!active || reduce) return
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const distance = Math.hypot(mouseX.current - cx, mouseY.current - cy)

      if (distance < REPEL_RADIUS) {
        const angle = Math.atan2(mouseY.current - cy, mouseX.current - cx)
        const force = (1 - distance / REPEL_RADIUS) * REPEL_FORCE
        x.set(-Math.cos(angle) * force)
        y.set(-Math.sin(angle) * force)
        near.set(1 - distance / REPEL_RADIUS)
      } else {
        x.set(0)
        y.set(0)
        near.set(0)
      }
    }
    const handleMouseMove = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [active, reduce, x, y, near, mouseX, mouseY])

  const duration = 5 + seeded(index + 1) * 5

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: 0.1 + (index % 6) * 0.05,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("absolute", iconData.className)}
    >
      <motion.div
        className="flex size-16 items-center justify-center rounded-[1.4rem] border border-paper/10 bg-ink-raised p-3 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.9)] md:size-20 md:rounded-3xl xl:size-24 xl:rounded-[1.75rem]"
        style={{ "--glow": glowPct } as React.CSSProperties & Record<"--glow", typeof glowPct>}
        animate={
          active && !reduce
            ? {
                y: [0, -8, 0, 8, 0],
                x: [0, 6, 0, -6, 0],
                rotate: [0, 5, 0, -5, 0],
              }
            : { y: 0, x: 0, rotate: 0 }
        }
        transition={{
          duration,
          repeat: active && !reduce ? Infinity : 0,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <iconData.icon
          aria-hidden="true"
          className="size-8 md:size-10 xl:size-12"
          style={{
            color: `color-mix(in oklch, ${iconData.color ?? "var(--paper)"} var(--glow, 0%), var(--paper))`,
          }}
        />
      </motion.div>
      {iconData.label ? (
        <motion.span
          aria-hidden="true"
          style={{ opacity: labelOpacity, y: labelY }}
          className="pointer-events-none absolute top-full left-1/2 mt-2.5 -translate-x-1/2 rounded-full bg-paper px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-ink"
        >
          {iconData.label}
        </motion.span>
      ) : null}
    </motion.div>
  )
}

const FloatingIconsHero = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & FloatingIconsHeroProps>(
  ({ className, title, subtitle, ctaText, ctaHref, onCtaClick, icons, ...props }, ref) => {
    const mouseX = React.useRef(0)
    const mouseY = React.useRef(0)
    const sectionRef = React.useRef<HTMLElement>(null)
    // only track the cursor while the section is visible
    const active = useInView(sectionRef, { margin: "10% 0px 10% 0px" })
    const reduce = usePrefersReducedMotion()

    React.useImperativeHandle(ref, () => sectionRef.current as HTMLDivElement)

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
      mouseX.current = event.clientX
      mouseY.current = event.clientY
    }

    return (
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-background",
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 h-full w-full" aria-hidden="true">
          {icons.map((iconData, index) => (
            <Icon
              key={iconData.id}
              mouseX={mouseX}
              mouseY={mouseY}
              iconData={iconData}
              index={index}
              active={active}
              reduce={reduce}
            />
          ))}
        </div>

        <div className="pointer-events-none relative z-10 px-4 text-center">
          <h2 className="type-display text-[clamp(3rem,1rem+8vw,9rem)] text-paper">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-pretty">{subtitle}</p>
          <ul className="sr-only">
            {icons.map((i) => (i.label ? <li key={i.id}>{i.label}</li> : null))}
          </ul>
          <div className="pointer-events-auto mt-10">
            <Button asChild size="lg" className="h-auto rounded-full px-8 py-4 text-base font-semibold">
              <a href={ctaHref} onClick={onCtaClick}>
                {ctaText}
              </a>
            </Button>
          </div>
        </div>
      </section>
    )
  },
)

FloatingIconsHero.displayName = "FloatingIconsHero"

export { FloatingIconsHero }
