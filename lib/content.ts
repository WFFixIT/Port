// \u00a0 keeps brand names on one line, \u2060 stops Thai from breaking inside a word
import type { StaticImageData } from "next/image"

import avatarFixit from "@/assets/channels/fixit.webp"
import avatarLabs from "@/assets/channels/labs.webp"
import clipUps from "@/assets/clips/7649742913714375957.webp"
import clipNas from "@/assets/clips/7649357006851034388.webp"
import clipBoard from "@/assets/clips/7653081645775506709.webp"
import clipLan from "@/assets/clips/7652690609798647060.webp"
import sheetUps from "@/assets/clips/7649742913714375957-sheet.webp"
import sheetNas from "@/assets/clips/7649357006851034388-sheet.webp"
import sheetBoard from "@/assets/clips/7653081645775506709-sheet.webp"
import sheetLan from "@/assets/clips/7652690609798647060-sheet.webp"

export type Lang = "th" | "en"
export type Localized = Record<Lang, string>

export const profile = {
  name: "Nattaphat",
  nameTh: "ณัฐภัทร",
  nameLines: ["Natta", "phat"],
  role: { th: "วิศวกรซอฟต์แวร์ และนักพัฒนาเว็บ", en: "Software engineer & web developer" },
  base: { th: "กรุงเทพฯ", en: "Bangkok" },
  timeZone: "Asia/Bangkok",
  year: 2026,
}

export const site = {
  title: {
    th: "ณัฐภัทร (Nattaphat) | วิศวกรซอฟต์แวร์และนักพัฒนาเว็บ กรุงเทพฯ",
    en: "Nattaphat | Software engineer & web developer in Bangkok",
  },
  description: {
    th: "ผมณัฐภัทร วิศวกรซอฟต์แวร์จากแม่ฟ้าหลวง ทำเว็บ ระบบ แอปใน LINE และฮาร์ดแวร์ต้นแบบที่ใช้กับงานจริง และทำคลิปการตลาดให้ร้านซ่อมคอมของเราเอง",
    en: "I’m Nattaphat, a software engineer from Mae Fah Luang University. I build websites, systems, LINE apps and hardware prototypes for real use, and I make the marketing clips for our own repair shop.",
  },
}

export const contact = {
  line: { id: "ccaker.9", href: "https://line.me/ti/p/~ccaker.9" },
  phone: { label: "095 889 3776", href: "tel:+66958893776" },
  email: "nattaphat.nontha@gmail.com",
  github: { handle: "WFFixIT", href: "https://github.com/WFFixIT" },
}

export const brands = {
  labs: "https://labs.whiteforces.com/",
  fixit: "https://fixit.whiteforces.com/",
  whiteForces: "https://www.whiteforces.com/",
}

export const ui = {
  skip: { th: "ข้ามไปที่เนื้อหา", en: "Skip to content" },
  nav: [
    { id: "work", label: { th: "ผลงาน", en: "Work" } },
    { id: "github", label: { th: "GitHub", en: "GitHub" } },
    { id: "story", label: { th: "เรื่องราว", en: "Story" } },
    { id: "content", label: { th: "คอนเทนต์", en: "Content" } },
    { id: "toolbox", label: { th: "เครื่องมือ", en: "Toolbox" } },
  ],
  talk: { th: "ติดต่อผม", en: "Contact me" },
  addLine: { th: "แอดไลน์ผม", en: "Add me on LINE" },
  menu: { th: "เมนู", en: "Menu" },
  close: { th: "ปิด", en: "Close" },
  language: { th: "ภาษา", en: "Language" },
  copied: { th: "คัดลอกแล้ว", en: "Copied" },
  copy: { th: "คัดลอก", en: "Copy" },
  visit: { th: "เปิดเว็บจริง", en: "Visit the site" },
  backToTop: { th: "กลับขึ้นด้านบน", en: "Back to top" },
}

export const hero = {
  status: { th: "พร้อมเริ่มงานใหม่", en: "Open to new roles" },
  role: { th: "วิศวกรซอฟต์แวร์\nและนักพัฒนาเว็บ", en: "Software engineer\n& web developer" },
  intro: {
    th: "ผมณัฐภัทร จบวิศวะซอฟต์แวร์จากแม่ฟ้าหลวง ตอนนี้ทำเว็บและระบบอยู่ที่ WF\u00a0LABs ที่เปิดกับพี่\u2060ชาย และทำคลิปการตลาดให้ร้านซ่อมคอม WF\u00a0FixIT ของเราเอง",
    en: "I’m Nattaphat, a software engineering graduate from Mae Fah Luang. I build websites and systems at WF\u00a0LABs, which I started with my brother, and make the marketing clips for our own repair shop, WF\u00a0FixIT.",
  },
  primary: { th: "ดูผลงาน", en: "See my work" },
  secondary: { th: "ติดต่อผม", en: "Contact me" },
  facts: [
    { value: "07", label: { th: "ผลงานจริง", en: "real projects" } },
    { value: "02", label: { th: "แอปใน LINE", en: "LINE apps" } },
    { value: "44", label: { th: "คลิป TikTok ที่ลงให้ร้าน", en: "TikTok clips for the shop" } },
  ],
  portraitAlt: {
    th: "ณัฐภัทร ยืนกอดอก สวมเสื้อโปโลสีเทาเข้ม",
    en: "Nattaphat standing with arms crossed, in a dark slate polo",
  },
}

export const ribbons = {
  services: {
    th: ["เว็บไซต์บริษัท", "ระบบคลังสินค้า", "แอปใน LINE", "LINE CRM", "ระบบลางาน", "ระบบขายบัตร", "ระบบหลังบ้าน", "อุปกรณ์ LoRa + GPS", "วาง SEO", "คลิป TikTok"],
    en: ["Company websites", "Inventory systems", "LINE mini apps", "LINE CRM", "Leave management", "Ticketing", "Admin panels", "LoRa + GPS devices", "SEO", "TikTok clips"],
  },
  places: {
    th: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "LINE API", "LIFF", "Tailwind CSS", "Docker", "GitHub Actions"],
    en: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "LINE API", "LIFF", "Tailwind CSS", "Docker", "GitHub Actions"],
  },
}

// {name} marks an inline picture
export const statement = {
  th: "ผม {selfie} เป็นวิศวกรซอฟต์แวร์ งานที่ทำมีตั้งแต่เว็บบริษัท ระบบคลังสินค้า แอปใน LINE {line} ระบบลางานของหน่วยงานราชการ ไปจนถึงโมดูลต้นแบบสำหรับปืนใหญ่ของกองทัพบก {fdc} และยังถ่ายคลิป {clip} ทำการตลาดให้ร้านของเราเอง",
  en: "I {selfie} am a software engineer. What I've built runs from company websites and an inventory system to LINE apps {line}, a leave system for a government office and a prototype artillery module for the Royal Thai Army {fdc}, and I film the marketing clips {clip} for our own shop.",
}

export const story = {
  title: { th: "เส้นทางที่ผ่านมา", en: "How it started" },
  hint: { th: "เลื่อนต่อเพื่ออ่านทีละบท", en: "Keep scrolling, one chapter at a time" },
  brands: {
    where: { th: "กรุงเทพฯ ตั้งแต่ปี 2026", en: "Bangkok, since 2026" },
    labs: { th: "สตูดิโอเว็บไซต์และระบบ", en: "Websites & systems studio" },
    fixit: { th: "ร้านซ่อมคอม ใกล้ BTS\u00a0พญาไท", en: "Computer repair, by BTS Phaya Thai" },
  },
  chapters: [
    {
      id: "mfu",
      title: { th: "เรียนวิศวะซอฟต์แวร์", en: "Studying software engineering" },
      body: {
        th: "ก่อนมาเรียนที่แม่ฟ้าหลวง จังหวัดเชียงราย ผมเคยทำพาร์ทไทม์งานบริการลูกค้า เลยชอบคุยกับคน พอได้ทำงานจริงกับลูกค้า ผมจะนัดคุย requirement ให้เคลียร์ตั้งแต่แรก สรุปเป็น PRD ให้เห็นตรงกันก่อนค่อยเริ่มเขียนโค้ด งานจะได้จบในรอบเดียว ไม่ต้องทำไปแก้ไป ผมว่านี่แหละคือจุดเด่นของผม",
        en: "Before studying at Mae Fah Luang in Chiang Rai, I worked part-time in customer service, so I like talking to people. On real projects I settle the requirements with the client first and write them up as a PRD before any code, so the work gets done in one pass, not build-then-fix. I think that's my biggest strength.",
      },
      place: { th: "เชียงราย", en: "Chiang Rai" },
    },
    {
      id: "wf",
      title: { th: "ทำธุรกิจกับพี่ชาย", en: "Starting out with my brother" },
      body: {
        th: "พอเรียนจบ ผมก็มาทำธุรกิจกับพี่\u2060ชายที่กรุงเทพฯ ตั้งชื่อว่า White\u00a0Forces",
        en: "Once I graduated, I came to Bangkok and started a business with my brother. We called it White\u00a0Forces.",
      },
      place: { th: "กรุงเทพฯ", en: "Bangkok" },
    },
    {
      id: "fixit",
      title: { th: "WF FixIT", en: "WF FixIT" },
      body: {
        th: "เราเปิดร้านซ่อมคอมแถว BTS\u00a0พญาไท ผมดูแลเรื่องการตลาด ถ่ายคลิปกับตัดต่อเอง แล้วลง TikTok กับ Facebook ให้คนแถวนั้นรู้ว่ามีร้านเรา",
        en: "We opened a computer repair shop near BTS Phaya Thai. I handle the marketing: I shoot and edit the clips myself and post them on TikTok and Facebook so people around here know we exist.",
      },
      place: { th: "พญาไท", en: "Phaya Thai" },
    },
    {
      id: "labs",
      title: { th: "WF LABs", en: "WF LABs" },
      body: {
        th: "อีกฝั่งคือ WF\u00a0LABs ที่ทำเว็บและระบบ งานหลักของผมอยู่ตรงนี้ ตั้งแต่ออกแบบ เขียนโค้ด ไปจนเอาขึ้นใช้งานจริง",
        en: "The other half is WF\u00a0LABs, where we build websites and systems. That's where most of my time goes: designing, coding and getting things live.",
      },
      place: { th: "ราชเทวี", en: "Ratchathewi" },
    },
    {
      id: "clients",
      title: { th: "งานจริงกว่า 7 งาน", en: "Seven-plus real jobs" },
      body: {
        th: "เปิดมาได้ไม่กี่เดือน ก็ได้ทำงานจริงไปแล้วกว่า 7 งาน มีทั้งบริษัทรับเหมา บริษัทนำเข้าวัสดุ ผู้จัดคอนเสิร์ต ไปจนถึงโปรเจกต์ภาครัฐ",
        en: "A few months in, we'd done more than seven real jobs: a construction company, a materials importer, a concert promoter and public-sector projects too.",
      },
      place: { th: "ปี 2026", en: "2026" },
    },
  ],
}

export const work = {
  title: { th: "ผลงาน", en: "Selected work" },
  intro: {
    th: "เว็บไซต์ ระบบ แอปใน LINE และฮาร์ดแวร์ที่ผมทำจริง เปิดดูรายละเอียดแต่ละงานได้",
    en: "Websites, systems, LINE apps and hardware I’ve actually built. Open any of them for the details.",
  },
  open: { th: "ดูรายละเอียด", en: "View project" },
  did: { th: "สิ่งที่ผมทำ", en: "What I did" },
  stack: { th: "เครื่องมือ", en: "Built with" },
  year: { th: "ปี", en: "Year" },
  next: { th: "งานถัดไป", en: "Next project" },
  prev: { th: "งานก่อนหน้า", en: "Previous project" },
  fullPage: { th: "ภาพหน้าเว็บ {name} ทั้งหน้า", en: "Full-page screenshot of {name}" },
  appsTitle: { th: "แอปใน LINE", en: "LINE apps" },
  fieldOpen: { th: "ดูรูปวันงานทั้งหมด", en: "See the whole day" },
  govTitle: { th: "โปรเจกต์ภาครัฐ", en: "Public-sector projects" },
  govIntro: {
    th: "ระบบลาออนไลน์ของกระทรวงมหาดไทย และต้นแบบโมดูลปืนใหญ่ที่ทำให้กองทัพบก",
    en: "An online leave system for the Ministry of Interior, and an artillery module prototype for the Royal Thai Army.",
  },
  appsIntro: {
    th: "บอทและแอปที่เปิดในไลน์ได้ทันที ไม่ต้องโหลดแอปเพิ่ม",
    en: "Bots and mini apps that open right inside LINE, nothing to install.",
  },
  ownSites: { th: "เว็บของเราเอง", en: "Our own sites" },
}

export const github = {
  title: { th: "GitHub", en: "GitHub" },
  intro: {
    th: "งานส่วนใหญ่เป็นโค้ดของลูกค้าเลยตั้ง repo เป็น\u00a0private ถ้าอยากดูโค้ดงานไหน ทักมาได้เลย",
    en: "Most of my work is client code, so those repositories are private. If you'd like to see the code for any project, just ask.",
  },
  contributions: { th: "contribution ในรอบปีที่ผ่านมา", en: "contributions in the last year" },
  repos: { th: "repo ที่มี commit ของผม", en: "repositories with my commits" },
  days: { th: "วันที่มี contribution", en: "active days" },
  streak: { th: "วันติดกันที่ยาวที่สุด", en: "longest streak, in days" },
  activity: { th: "contribution รายวัน", en: "Contributions per day" },
  updated: { th: "ข้อมูลวันที่", en: "As of" },
  less: { th: "น้อย", en: "Less" },
  more: { th: "มาก", en: "More" },
  languages: { th: "ภาษาที่เขียน", en: "Languages" },
  repoUnit: { th: "repo", en: "repos" },
  links: { th: "ลิงก์ GitHub", en: "Links" },
  profile: { th: "โปรไฟล์ GitHub ของผม", en: "My GitHub profile" },
}

export type Channel = {
  id: "tiktok-fixit" | "facebook-fixit" | "facebook-labs"
  platform: "TikTok" | "Facebook"
  name: string
  handle: string
  href: string
  avatar: StaticImageData
  about: Localized
}

export const channels: Channel[] = [
  {
    id: "tiktok-fixit",
    platform: "TikTok",
    name: "WF FixIT",
    handle: "@wffixit",
    href: "https://www.tiktok.com/@wffixit",
    avatar: avatarFixit,
    about: { th: "คลิปสั้นของร้านซ่อมคอม", en: "Short clips for the repair shop" },
  },
  {
    id: "facebook-fixit",
    platform: "Facebook",
    name: "WF FixIT",
    handle: "WF FixIT",
    href: "https://www.facebook.com/profile.php?id=61590490418582",
    avatar: avatarFixit,
    about: { th: "เพจร้าน ลงคลิปและโปรโมชัน", en: "The shop’s page: clips and offers" },
  },
  {
    id: "facebook-labs",
    platform: "Facebook",
    name: "WF LABs",
    handle: "WF LABs",
    href: "https://www.facebook.com/profile.php?id=61593635511889",
    avatar: avatarLabs,
    about: { th: "เพจสตูดิโอ ผลงานและแพ็กเกจ", en: "The studio’s page: work and packages" },
  },
]

// cover: 3:4 frame from the clip, sheet: wide crop for the archive, preview: muted cut in public/clips, duration in seconds
export type Clip = {
  id: string
  href: string
  caption: Localized
  duration: number
  cover: StaticImageData
  sheet: StaticImageData
  preview: string
}
export const clips: Clip[] = [
  {
    id: "7649742913714375957",
    href: "https://www.tiktok.com/@wffixit/video/7649742913714375957",
    caption: { th: "เปลี่ยนแบตเตอรี่ UPS", en: "Swapping a UPS battery" },
    duration: 76,
    cover: clipUps,
    sheet: sheetUps,
    preview: "/clips/7649742913714375957-preview",
  },
  {
    id: "7649357006851034388",
    href: "https://www.tiktok.com/@wffixit/video/7649357006851034388",
    caption: { th: "แกะกล่องเซ็ตอัพ NAS ให้ลูกค้า", en: "Unboxing and setting up a customer’s NAS" },
    duration: 81,
    cover: clipNas,
    sheet: sheetNas,
    preview: "/clips/7649357006851034388-preview",
  },
  {
    id: "7653081645775506709",
    href: "https://www.tiktok.com/@wffixit/video/7653081645775506709",
    caption: { th: "เปลี่ยนเมนบอร์ดเครื่องเซิร์ฟเวอร์", en: "Swapping a server’s motherboard" },
    duration: 100,
    cover: clipBoard,
    sheet: sheetBoard,
    preview: "/clips/7653081645775506709-preview",
  },
  {
    id: "7652690609798647060",
    href: "https://www.tiktok.com/@wffixit/video/7652690609798647060",
    caption: { th: "จัดห้องใหม่ เข้าหัวสาย LAN เอง", en: "Setting up the new room and crimping the LAN cables" },
    duration: 126,
    cover: clipLan,
    sheet: sheetLan,
    preview: "/clips/7652690609798647060-preview",
  },
]

export const marketing = {
  title: { th: "คอนเทนต์", en: "Content" },
  intro: {
    th: "นอกจากเขียนเว็บ ผมทำการตลาดให้ทั้งร้านซ่อมคอมและสตูดิโอ คิดคอนเทนต์ และลงคลิปใน TikTok กับ Facebook เอง",
    en: "Besides building websites, I do the marketing for both the repair shop and the studio. I plan the content and post the clips on TikTok and Facebook myself.",
  },
  // count as of 13 Oct 2026
  stat: {
    value: "44",
    label: { th: "คลิปที่ผมลง TikTok ให้ร้าน WF\u00a0FixIT", en: "clips I’ve posted to TikTok for WF\u00a0FixIT" },
    note: { th: "ตั้งแต่เปิดช่องเมื่อมิถุนายน 2026 เฉลี่ยสัปดาห์ละ 2–3 คลิป", en: "since the account opened in June 2026, two or three a week" },
  },
  channels: { th: "ช่องที่ผมดูแล", en: "Channels I run" },
  clips: { th: "คลิปเด่น", en: "Featured clips" },
  seeAll: { th: "ดูทุกคลิปบน TikTok", en: "See every clip on TikTok" },
  visit: { th: "ไปที่ช่อง", en: "Visit" },
  watch: { th: "ดูคลิปบน TikTok", en: "Watch on TikTok" },
}

export const archive = {
  title: { th: "ลองเปิดดูเอง", en: "Try them yourself" },
  intro: {
    th: "เว็บกับระบบที่ออนไลน์อยู่จริงตอนนี้ เปิดแฟ้มแล้วกดเข้าไปลองได้เลย",
    en: "Sites and systems that are live right now. Open a folder and try one.",
  },
  folders: {
    live: { th: "เว็บลูกค้า", en: "Client sites" },
    demos: { th: "ระบบที่ลองได้", en: "Systems to try" },
  },
  count: {
    sites: { th: "{n} เว็บ", en: "{n} sites" },
    demos: { th: "{n} ระบบ", en: "{n} systems" },
  },
  files: {
    stock: { th: "ลองได้เลย", en: "Try it" },
    memo: { th: "ลองในไลน์", en: "Try it on LINE" },
  },
  hint: { th: "วางเมาส์เพื่อแง้มแฟ้ม คลิกเพื่อเปิด", en: "Hover to peek, click to open" },
}

export const toolbox = {
  title: { th: "ใช้อะไรทำงานบ้าง", en: "What I work with" },
  subtitle: {
    th: "เขียนโค้ด เอาระบบขึ้น ไปจนถึงตัดคลิปลง TikTok ใช้ของพวกนี้แทบทุกวัน ลองเอาเมาส์ไล่ดูได้",
    en: "Writing code, shipping it, cutting clips for TikTok: I use these pretty much every day. Try chasing them with your cursor.",
  },
  cta: { th: "ติดต่อผม", en: "Contact me" },
}

export const process = {
  title: { th: "วิธีทำงานของผม", en: "How I work" },
  intro: {
    th: "สี่อย่างที่ทำทุกงาน ไม่ว่าจะเป็นเว็บ ระบบ หรือแอปใน LINE",
    en: "Four things I do on every project, whether it's a website, a system or a LINE app.",
  },
  steps: [
    {
      title: { th: "คุยให้เคลียร์ก่อนเขียนโค้ด", en: "Settle it before the code" },
      body: {
        th: "นัดคุย requirement กับลูกค้าจนได้ข้อสรุป แล้วเขียนเป็น PRD ให้ทุกคนเห็นตรงกัน ถ้าต้องดูหน้างานก็ไปเอง อย่างเดินซ้อมกับทีมงานคอนเสิร์ตที่ฮอลล์ หรือนั่งไล่รายการแก้กับหน่วยงานราชการ",
        en: "I meet the client and talk the requirements through until we agree, then write them up as a PRD. If I need to see the place, I go: a walk-through with the concert crew at the hall, or going over the change list with the agency.",
      },
      detail: { th: ["คุย requirement", "PRD", "ลงพื้นที่"], en: ["Requirements", "PRD", "On site"] },
    },
    {
      title: { th: "มือถือมาก่อน", en: "Phone first" },
      body: {
        th: "คนส่วนใหญ่ใช้งานผ่านมือถือ ช่างหน้างานสแกน QR เบิกของ ผู้ชมลงทะเบียนในไลน์ ผมเลยออกแบบทุกหน้าให้ใช้มือเดียวได้ และมีสองภาษา",
        en: "Most people use it on a phone: crews scan QR codes to take stock out, concert-goers sign up inside LINE. So every screen works one-handed, in Thai and English.",
      },
      detail: { th: ["มือถือ", "สองภาษา", "LINE"], en: ["Mobile", "Bilingual", "LINE"] },
    },
    {
      title: { th: "ทดสอบก่อนขึ้นจริง", en: "Test before it ships" },
      body: {
        th: "เขียนเทสอัตโนมัติไว้คู่กับโค้ด ระบบคลังมี 1,454 เคส เมมโม่มี 2,835 เคส และทดสอบโหลดบอทคอนเสิร์ตที่ 1,000 คนต่อนาทีก่อนวันงาน",
        en: "Automated tests live next to the code: 1,454 on the inventory system, 2,835 on MeMo, and the concert bot was load-tested at 1,000 sign-ups a minute before the show.",
      },
      detail: { th: ["เทสอัตโนมัติ", "CI", "ทดสอบโหลด"], en: ["Automated tests", "CI", "Load tests"] },
    },
    {
      title: { th: "ขึ้นระบบแล้วดูแลต่อ", en: "Ship it, then look after it" },
      body: {
        th: "ขึ้นระบบผ่าน GitHub Actions ตรวจสุขภาพหลังขึ้นทุกครั้ง ถ้าไม่ผ่านถอยกลับเอง สำรองข้อมูลทุกคืน และมีเซิร์ฟเวอร์สำรองสำหรับวันที่พลาดไม่ได้",
        en: "Releases go out through GitHub Actions with a health check that rolls back a bad one. Backups run nightly, and there's a standby server for the days that can't go wrong.",
      },
      detail: { th: ["CI/CD", "สำรองข้อมูล", "เซิร์ฟเวอร์สำรอง"], en: ["CI/CD", "Backups", "Failover"] },
    },
  ],
}

export const contactCopy = {
  heading: { th: "คุยกันเลย", en: "Let’s talk" },
  body: {
    th: "ถ้าสนใจให้ผมไปร่วมทีม หรืออยากนัดคุยเรื่องตำแหน่งงาน ทักมาได้เลยครับ ทางอีเมลหรือไลน์ก็ได้",
    en: "If you'd like me on your team or want to talk about a role, message me by email or on LINE.",
  },
  lineLabel: { th: "LINE (ตอบเร็วที่สุด)", en: "LINE (fastest)" },
  phoneLabel: { th: "โทร", en: "Phone" },
  emailLabel: { th: "อีเมล", en: "Email" },
  scan: { th: "สแกนด้วยกล้องมือถือ\nเพื่อแอดไลน์ได้ทันที", en: "Scan with your phone’s camera\nto add me on LINE" },
  qrLabel: { th: "QR code สำหรับแอดไลน์", en: "QR code to add me on LINE" },
  portraitAlt: {
    th: "ณัฐภัทร ชี้นิ้วขึ้นไปที่คำว่าคุยกันเลย",
    en: "Nattaphat pointing up at the words ‘Let’s talk’",
  },
}

export const notFoundCopy = {
  title: { th: "ไม่เจอหน้านี้", en: "This page doesn’t exist" },
  body: { th: "ลิงก์อาจพิมพ์ผิด หรือหน้านี้ย้ายไปแล้ว", en: "The link may be mistyped, or the page has moved." },
  home: { th: "กลับหน้าแรก", en: "Back to the home page" },
}

export const footer = {
  partOf: { th: "ธุรกิจที่ทำกับพี่\u2060ชาย", en: "The business I run with my brother" },
  time: { th: "เวลาที่กรุงเทพฯ", en: "Bangkok time" },
  built: { th: "สร้างด้วย Next.js และ Tailwind CSS", en: "Built with Next.js and Tailwind CSS" },
}
