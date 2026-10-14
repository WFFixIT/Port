import type { Metadata, Viewport } from "next"
import { Archivo, Noto_Sans_Thai } from "next/font/google"

import { IntroProvider } from "@/components/providers/intro-provider"
import { LangProvider } from "@/components/providers/lang-provider"
import { MotionProvider } from "@/components/providers/motion-provider"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import { Toaster } from "@/components/ui/sonner"
import { site } from "@/lib/content"
import { publicUrl } from "@/lib/site-url"
import "./globals.css"

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
})

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
  axes: ["wdth"],
  display: "swap",
})

const title = site.title.th
const description = site.description.th

export const metadata: Metadata = {
  ...(publicUrl ? { metadataBase: new URL(publicUrl), alternates: { canonical: "/" } } : {}),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "th_TH",
    alternateLocale: ["en_US"],
  },
  twitter: { card: "summary_large_image", title, description },
}

export const viewport: Viewport = {
  themeColor: "#0b1a1d",
  colorScheme: "dark",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${archivo.variable} ${notoThai.variable} dark`}>
      <body>
        <MotionProvider>
          <SmoothScroll>
            <IntroProvider>
              <LangProvider>
                {children}
                <Toaster position="bottom-center" />
              </LangProvider>
            </IntroProvider>
          </SmoothScroll>
        </MotionProvider>
        <noscript>
          <style>{`.loader{display:none}.hero :is(.hero-letter__inner,.hero-portrait>div,.hero-intro,.hero-actions,.hero-facts){animation:none!important}.site-header,.statement-pic{translate:none!important;scale:none!important;transform:none!important;opacity:1!important}`}</style>
        </noscript>
      </body>
    </html>
  )
}
