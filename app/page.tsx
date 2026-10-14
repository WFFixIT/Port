import { Archive } from "@/components/site/archive"
import { Contact } from "@/components/site/contact"
import { Github } from "@/components/site/github"
import { Hero } from "@/components/site/hero"
import { Loader } from "@/components/site/loader"
import { Marketing } from "@/components/site/marketing"
import { Process } from "@/components/site/process"
import { Ribbons } from "@/components/site/ribbons"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { Statement } from "@/components/site/statement"
import { Story } from "@/components/site/story"
import { Toolbox } from "@/components/site/toolbox"
import { Work } from "@/components/site/work"
import { brands, contact, profile } from "@/lib/content"

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.nameTh,
  jobTitle: profile.role.en,
  email: `mailto:${contact.email}`,
  telephone: contact.phone.href.replace("tel:", ""),
  address: { "@type": "PostalAddress", addressLocality: "Bangkok", addressCountry: "TH" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Mae Fah Luang University" },
  worksFor: { "@type": "Organization", name: "White Forces", url: brands.whiteForces },
  knowsAbout: ["Web development", "Next.js", "TypeScript", "SEO", "Social media marketing"],
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: process.env.NEXT_PUBLIC_SITE_URL } : {}),
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      <Loader />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Ribbons />
        <Statement />
        <Work />
        <Github />
        <Story />
        <Marketing />
        <Archive />
        <Toolbox />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
