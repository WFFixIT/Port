"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Check, Copy, Download, FileText, Mail, Phone } from "lucide-react"
import { toast } from "sonner"

import pointing from "@/assets/me/portrait-point.webp"
import { useLang } from "@/components/providers/lang-provider"
import { GithubIcon, LineIcon } from "@/components/site/brand-icons"
import { LineQr } from "@/components/site/line-qr"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { contact, contactCopy, ui } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Contact() {
  const { t } = useLang()
  const ref = React.useRef<HTMLElement>(null)
  const reduce = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const rise = useTransform(scrollYProgress, [0.15, 0.85], ["32%", "0%"])
  const words = useTransform(scrollYProgress, [0.05, 0.6], ["40%", "0%"])

  const rows = [
    {
      id: "line",
      icon: <LineIcon className="size-5" aria-hidden />,
      label: t(contactCopy.lineLabel),
      value: contact.line.id,
      href: contact.line.href,
      copy: contact.line.id,
    },
    {
      id: "phone",
      icon: <Phone className="size-5" aria-hidden />,
      label: t(contactCopy.phoneLabel),
      value: contact.phone.label,
      href: contact.phone.href,
      copy: contact.phone.label.replace(/\s/g, ""),
    },
    {
      id: "email",
      icon: <Mail className="size-5" aria-hidden />,
      label: t(contactCopy.emailLabel),
      value: contact.email,
      href: `mailto:${contact.email}`,
      copy: contact.email,
    },
    {
      id: "github",
      icon: <GithubIcon className="size-5" aria-hidden />,
      label: "GitHub",
      value: contact.github.handle,
      href: contact.github.href,
    },
    {
      id: "resume",
      icon: <FileText className="size-5" aria-hidden />,
      label: t(contactCopy.resumeLabel),
      value: t(contactCopy.resumeValue),
      href: contact.resume,
      download: true,
    },
  ]

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-signal text-on-signal selection:bg-ink selection:text-paper"
    >
      <div className="px-gutter pt-[clamp(6rem,11vw,10rem)]">
        <h2 id="contact-title" className="overflow-hidden text-center">
          <motion.span
            style={reduce ? undefined : { y: words }}
            className="type-display block text-[clamp(5rem,1rem+17vw,19rem)] text-ink lang-th:text-[clamp(4.25rem,0.5rem+15vw,16rem)]"
          >
            {t(contactCopy.heading)}
          </motion.span>
        </h2>
      </div>

      <div className="px-gutter relative mx-auto grid max-w-[96rem] items-start gap-10 pb-[clamp(2rem,5vw,4rem)] md:grid-cols-[minmax(0,1fr)_auto] xl:grid-cols-[1fr_minmax(0,30rem)_1fr] xl:items-end">
        <div className="order-2 max-w-[30rem] pb-4 xl:order-1">
          <p className="text-[1.15rem] text-pretty text-on-signal/90">{t(contactCopy.body)}</p>
          <div className="mt-7 flex items-center gap-5">
            <span className="hidden shrink-0 rounded-2xl bg-paper p-4 text-ink shadow-[0_24px_48px_-24px_rgb(0_0_0/0.55)] lg:block">
              <LineQr className="size-[7.5rem]" label={t(contactCopy.qrLabel)} />
            </span>
            <div>
              <p className="mb-3.5 hidden text-sm leading-snug whitespace-pre-line text-on-signal/80 lg:block">{t(contactCopy.scan)}</p>
              <a
                href={contact.line.href}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex h-13 items-center gap-2.5 rounded-full bg-ink px-7 text-[1rem] font-semibold whitespace-nowrap text-paper hover:bg-black"
              >
                <LineIcon className="size-5 text-[#06c755]" aria-hidden />
                {t(ui.addLine)}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div className="relative order-1 mx-auto -mt-3 aspect-[1436/1600] w-[min(30rem,88vw)] md:col-span-2 lg:-mt-[clamp(4rem,7vw,7.5rem)] xl:order-2 xl:col-span-1 xl:-mb-[clamp(2rem,5vw,4rem)] xl:w-full xl:max-w-[30rem]">
          <motion.div style={reduce ? undefined : { y: rise }} className="absolute inset-0">
            <Image
              src={pointing}
              alt={t(contactCopy.portraitAlt)}
              fill
              sizes="(max-width: 1024px) 88vw, 30rem"
              className="object-contain object-bottom"
            />
          </motion.div>
        </div>

        <ul className="order-3 flex flex-col max-md:min-w-0">
          {rows.map((c) => (
            <ChannelRow key={c.id} {...c} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function ChannelRow({
  icon,
  label,
  value,
  href,
  copy,
  download,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  copy?: string
  download?: boolean
}) {
  const { t } = useLang()
  const [copied, setCopied] = React.useState(false)
  const external = href.startsWith("http")

  const onCopy = async () => {
    if (!copy) return
    try {
      await navigator.clipboard.writeText(copy)
      setCopied(true)
      toast(`${t(ui.copied)}: ${copy}`)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  return (
    <li className="group flex items-center gap-3 border-b border-on-signal/20 py-3.5 first:border-t">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        download={download ? href.split("/").pop() : undefined}
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[var(--ease-out-expo)] can-hover:group-hover:-rotate-12">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-sm text-on-signal/80">{label}</span>
          <span className="block truncate text-[clamp(0.9rem,0.5rem+1.75vw,1.15rem)] font-semibold">{value}</span>
        </span>
      </a>
      {copy ? (
        <button
          type="button"
          onClick={onCopy}
          className={cn(
            "press grid size-10 shrink-0 place-items-center rounded-full border border-on-signal/35 hover:bg-on-signal hover:text-signal",
            copied && "bg-on-signal text-signal",
          )}
          aria-label={`${t(ui.copy)} ${value}`}
        >
          {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        </button>
      ) : download ? (
        <Download className="mr-2.5 size-5 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] can-hover:group-hover:translate-y-0.5" aria-hidden />
      ) : (
        <ArrowUpRight className="mr-2.5 size-5 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] can-hover:group-hover:-translate-y-0.5 can-hover:group-hover:translate-x-0.5" aria-hidden />
      )}
    </li>
  )
}
