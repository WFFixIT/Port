import type { StaticImageData } from "next/image"

import type { Localized } from "@/lib/content"

import shot500day from "@/assets/work/500day.webp"
import full500day from "@/assets/work/500day-full.webp"
import mobile500day from "@/assets/work/500day-mobile.webp"
import stockDashboard from "@/assets/work/stock-dashboard.webp"
import stockIssue from "@/assets/work/stock-issue.webp"
import stockQr from "@/assets/work/stock-qr.webp"
import stockMap from "@/assets/work/stock-map.webp"
import stockDashboardPhone from "@/assets/work/stock-dashboard-phone.webp"
import stockItemPhone from "@/assets/work/stock-item-phone.webp"
import stockAlertsPhone from "@/assets/work/stock-alerts-phone.webp"
import shotBlueocean from "@/assets/work/blueocean.webp"
import fullBlueocean from "@/assets/work/blueocean-full.webp"
import mobileBlueocean from "@/assets/work/blueocean-mobile.webp"
import blueoceanProduct from "@/assets/work/blueocean-product.webp"
import blueoceanQuote from "@/assets/work/blueocean-quote.webp"
import blueoceanEn from "@/assets/work/blueocean-en.webp"
import blueoceanProductPhone from "@/assets/work/blueocean-product-phone.webp"
import shotOnstage from "@/assets/work/onstage.webp"
import fullOnstage from "@/assets/work/onstage-full.webp"
import mobileOnstage from "@/assets/work/onstage-mobile.webp"
import onstageSeats from "@/assets/work/onstage-seats.webp"
import onstageTicket from "@/assets/work/onstage-ticket.webp"
import onstageAdmin from "@/assets/work/onstage-admin.webp"
import onstagePhone from "@/assets/work/onstage-phone.webp"
import shotMemo from "@/assets/work/memo.webp"
import memoIcon from "@/assets/work/memo/icon.webp"
import memoToday from "@/assets/work/memo/today-bar.webp"
import memoChat from "@/assets/work/memo/chat-reminder-bar.webp"
import memoFiles from "@/assets/work/memo/files-bar.webp"
import memoSearch from "@/assets/work/memo/search-bar.webp"
import memoTeam from "@/assets/work/memo/team-bar.webp"
import memoCheckin from "@/assets/work/memo/checkin-bar.webp"
import memoCalendar from "@/assets/work/memo/calendar.webp"
import bearWave from "@/assets/work/memo/bear-wave.webp"
import bearClock from "@/assets/work/memo/bear-clock.webp"
import bearFiling from "@/assets/work/memo/bear-filing.webp"
import bearReading from "@/assets/work/memo/bear-reading.webp"
import bearParty from "@/assets/work/memo/bear-party.webp"
import bearThumbsup from "@/assets/work/memo/bear-thumbsup.webp"
import shotEleave from "@/assets/work/eleave.webp"
import eleaveRequest from "@/assets/work/eleave-request.webp"
import eleaveApprove from "@/assets/work/eleave-approve.webp"
import eleaveReport from "@/assets/work/eleave-report.webp"
import shotPink from "@/assets/work/pink.webp"
import pinkIcon from "@/assets/work/pink/icon.webp"
import pinkWelcome from "@/assets/work/pink/welcome-bar.webp"
import pinkSignup from "@/assets/work/pink/signup-bar.webp"
import pinkRegistered from "@/assets/work/pink/registered-bar.webp"
import pinkSeat from "@/assets/work/pink/seat-bar.webp"
import pinkDoor from "@/assets/work/pink/door-bar.webp"
import pinkConsoleDashboard from "@/assets/work/pink/console-dashboard.webp"
import pinkConsoleCrm from "@/assets/work/pink/console-crm.webp"
import pinkConsoleCheckins from "@/assets/work/pink/console-checkins.webp"
import flyCelebrate from "@/assets/work/pink/fly-celebrate.webp"
import flyHeart from "@/assets/work/pink/fly-heart.webp"
import flyMusic from "@/assets/work/pink/fly-music.webp"
import onsitePoster from "@/assets/work/pink/onsite-poster.webp"
import onsiteSignup from "@/assets/work/pink/onsite-signup.webp"
import onsiteTalk from "@/assets/work/pink/onsite-talk.webp"
import onsiteBackdrop from "@/assets/work/pink/onsite-backdrop.webp"
import onsiteLobby from "@/assets/work/pink/onsite-lobby.webp"
import fdcLaptop from "@/assets/work/fdc/laptop.webp"
import fdcField from "@/assets/work/fdc/field.webp"
import fdcPair from "@/assets/work/fdc/pair.webp"
import fdcApp from "@/assets/work/fdc/app-satellite.webp"
import shotLabs from "@/assets/work/labs.webp"
import shotFixit from "@/assets/work/fixit.webp"
import shotWf from "@/assets/work/whiteforces.webp"

export type Shot = {
  src: StaticImageData
  frame: "desktop" | "phone" | "photo"
  caption: Localized
  url?: string
}

export type StoreScreen = {
  image: StaticImageData
  headline: string
  // spaces are the only places a caption may wrap; join words with \u00a0
  caption: Localized
  tone: [string, string]
  ink?: string
  // colour of the clock and icons over the screenshot's top edge
  bar?: "light" | "dark"
  sticker?: StaticImageData
  // a muted loop in public/ (no extension) shown instead of a phone; image is its poster
  video?: string
}

export type ShowcaseApp = {
  id: string
  name: string
  kind: Localized
  icon: StaticImageData
  href?: string
  cta?: Localized
  facts: { value: string; label: Localized }[]
  screens: StoreScreen[]
}

export type FieldShot = {
  src: StaticImageData
  // muted loop in public/ without extension; src is its poster
  video?: string
  caption: Localized
}

// photos and clips from on site
export type Field = {
  title: Localized
  intro: Localized
  // one line for the home page, next to the picks
  short: Localized
  shots: FieldShot[]
  // indexes of the shots shown on the home page
  picks: number[]
}

// the short version shown in a spotlight card on the home page
export type Highlight = {
  line: Localized
  facts: { value: string; label: Localized }[]
}

export type Project = {
  slug: string
  name: string
  kind: Localized
  client: Localized
  year: string
  summary: Localized
  role: Localized
  points: Localized[]
  stack: string[]
  team?: Localized
  url?: string
  shot: StaticImageData
  full?: StaticImageData
  mobile?: StaticImageData
  // public/work path without extension, plus a -sm cut for phones
  video?: string
  app?: ShowcaseApp
  field?: Field
  highlight?: Highlight
  gallery?: Shot[]
}

const sky: [string, string] = ["#cfe1ff", "#eef4ff"]
const honey: [string, string] = ["#ffe6a6", "#fff6dc"]
const mint: [string, string] = ["#cdf3e1", "#eefbf4"]
const lilac: [string, string] = ["#e3dcfd", "#f5f2ff"]

export const memo: ShowcaseApp = {
  id: "memo",
  name: "MeMo เมมโม่",
  kind: { th: "ผู้ช่วยออฟฟิศใน LINE", en: "Office assistant inside LINE" },
  icon: memoIcon,
  href: "https://line.me/R/ti/p/@398yatur",
  cta: { th: "เพิ่มเพื่อน", en: "Add on LINE" },
  facts: [
    { value: "2,835", label: { th: "เทสอัตโนมัติ", en: "automated tests" } },
    { value: "94%", label: { th: "เข้าใจประโยคไทยถูก", en: "Thai sentences understood" } },
    { value: "39", label: { th: "ครั้งที่ขึ้นระบบใน 10 วัน", en: "releases in 10 days" } },
    { value: "TH/EN", label: { th: "สองภาษา", en: "two languages" } },
  ],
  screens: [
    {
      image: memoToday,
      headline: "Today at a Glance",
      caption: { th: "เปิดมาก็รู้ว่าวันนี้มีอะไร ต้องทำอะไรต่อ", en: "Open it and see what's on today and what's next" },
      tone: sky,
      bar: "light",
      sticker: bearWave,
    },
    {
      image: memoChat,
      headline: "Right in LINE",
      caption: { th: "พิมพ์เหมือนคุยกับคน เมมโม่ตั้งเตือน และอ่านยอดบิลให้", en: "Just type; it sets reminders and reads bills" },
      tone: honey,
      bar: "light",
      sticker: bearClock,
    },
    {
      image: memoFiles,
      headline: "Files That Stay",
      caption: { th: "ไฟล์ในแชทเก็บเข้า Drive\u00a0หรือ\u00a0NAS ของคุณเอง", en: "Files from chat land in your own Drive or NAS" },
      tone: mint,
      bar: "dark",
      sticker: bearFiling,
    },
    {
      image: memoSearch,
      headline: "Search Inside Files",
      caption: { th: "จำชื่อไฟล์ไม่ได้ ค้นจากคำในเอกสารก็เจอ", en: "Forgot the file name? Search the words inside it" },
      tone: lilac,
      bar: "light",
      sticker: bearReading,
    },
    {
      image: memoTeam,
      headline: "One Team Schedule",
      caption: { th: "ทั้งทีมดูตารางเดียวกัน ใครมีนัด ใครรับงาน ใครลา", en: "One schedule for the team: meetings, tasks and leave" },
      tone: sky,
      bar: "light",
      sticker: bearParty,
    },
    {
      image: memoCheckin,
      headline: "Who's In Today",
      caption: { th: "เช็กชื่อตอนเช้า รู้ว่าใครเข้าออฟฟิศ ใคร\u00a0WFH", en: "Morning check-in: who's in the office, who's at home" },
      tone: honey,
      bar: "dark",
      sticker: bearThumbsup,
    },
  ],
}

const rose: [string, string] = ["#ffd3ea", "#fff1f8"]
const orchid: [string, string] = ["#e6d6ff", "#f7f1ff"]
const plum = "#5a1747"

export const pink: ShowcaseApp = {
  id: "pink",
  name: "Jubilee",
  kind: { th: "บอท LINE เก็บ CRM งาน Pink Symphonic Concert", en: "LINE CRM bot for Pink Symphonic Concert" },
  icon: pinkIcon,
  facts: [
    { value: "465+", label: { th: "คนลงทะเบียนวันงาน", en: "sign-ups on show day" } },
    { value: "1,000", label: { th: "คนต่อนาทีที่รับไหว", en: "sign-ups a minute, load-tested" } },
    { value: "16", label: { th: "วันจากเริ่มทำถึงวันงาน", en: "days from start to show" } },
    { value: "1,053", label: { th: "ที่นั่งที่ตรวจได้ทันที", en: "seats checked live" } },
  ],
  screens: [
    {
      image: onsitePoster,
      video: "/clips/pink-onsite",
      headline: "Live at the Show",
      caption: { th: "ผมชวนผู้ชมลงทะเบียนเอง ที่หน้าฮอลล์", en: "Signing guests up myself at the hall" },
      tone: orchid,
      ink: plum,
    },
    {
      image: pinkWelcome,
      headline: "Meet Jubilee",
      caption: { th: "แอดไลน์แล้ว จูบิลี่พาลงทะเบียน ในไม่กี่วินาที", en: "Add the LINE account and Jubilee walks you through sign-up" },
      tone: rose,
      ink: plum,
      bar: "light",
      sticker: flyMusic,
    },
    {
      image: pinkSignup,
      headline: "Sign Up Once",
      caption: { th: "ชื่อ อีเมล เบอร์ และความยินยอม\u00a0PDPA ในหน้าเดียว", en: "Name, email, phone and PDPA consent on one screen" },
      tone: orchid,
      ink: plum,
      bar: "light",
      sticker: flyHeart,
    },
    {
      image: pinkRegistered,
      headline: "Free Photo Unlocked",
      caption: { th: "ลงทะเบียนเสร็จ โชว์จอนี้ที่ซุ้ม ถ่ายรูปฟรีได้เลย", en: "Show this at the booth for a free photo" },
      tone: rose,
      ink: plum,
      bar: "light",
      sticker: flyCelebrate,
    },
    {
      image: pinkSeat,
      headline: "Save Your Seat",
      caption: { th: "กรอกโซนและเลขที่นั่ง ระบบเช็กกับผังจริงทันที", en: "Seat from the ticket, checked against the real chart" },
      tone: orchid,
      ink: plum,
      bar: "light",
    },
    {
      image: pinkDoor,
      headline: "Door Check-in",
      caption: { th: "ทีมหน้าประตูพิมพ์เลขที่นั่ง รู้ทันทีว่าใครมาแล้ว", en: "Door staff type a seat and the visit is logged" },
      tone: rose,
      ink: plum,
      bar: "light",
    },
  ],
}

export const apps: ShowcaseApp[] = [memo, pink]

export const projects: Project[] = [
  {
    slug: "500day",
    name: "500DAY",
    kind: { th: "เว็บไซต์บริษัท + ระบบคลังวัสดุ", en: "Company website + inventory system" },
    client: { th: "บริษัทรับเหมาก่อสร้าง 500DAY", en: "500DAY, a construction company" },
    year: "2026",
    summary: {
      th: "เว็บบริษัทสองภาษาที่ให้ผลงานก่อสร้างเป็นตัวเล่าเรื่อง กับระบบคลังวัสดุที่ช่างหน้างานใช้จริงบนมือถือ สแกน QR เบิกของ รู้ว่าของอยู่คลังไหน และเตือนก่อนของหมด",
      en: "A bilingual company site that lets finished projects do the talking, and an inventory system the site crews use on their phones: scan a QR code to take stock out, see which warehouse holds what, and get warned before anything runs out.",
    },
    role: { th: "ออกแบบ พัฒนา และดูแลทั้งสองระบบ", en: "Designed, built and run both systems" },
    points: [
      {
        th: "ช่างหยิบของใส่ตะกร้าบนมือถือ ได้ใบเบิกพร้อม QR คลังสแกนครั้งเดียวแล้วตัดสต็อก คืนของก็ทำแบบเดียวกัน",
        en: "Staff pick items into a cart on their phone and get a slip with one QR; the warehouse scans it once and only then is stock cut. Returns work the same way",
      },
      {
        th: "หลายคลังแยกยอด ป้าย QR ประจำชั้นวาง เครื่องมือติดตามรายชิ้นพร้อมขั้นอนุมัติ และเที่ยวส่งของที่ถ่ายรูปตอนส่งและตอนรับ",
        en: "Several warehouses with their own balances, shelf QR codes, tools tracked one by one with an approval step, and delivery trips photographed at dispatch and receipt",
      },
      {
        th: "รายงาน นำเข้าและส่งออก Excel แจ้งเตือนของใกล้หมด และสิทธิ์ผู้ใช้ 4 ระดับที่แอดมินกำหนดเมนูได้",
        en: "Reports, Excel import and export, low-stock alerts, and four roles whose menus the admin sets",
      },
      {
        th: "เทสอัตโนมัติ 1,454 เคสในระบบคลัง และอีก 202 เคสในเว็บ GitHub Actions เทสและ build ทุกครั้ง ขึ้นระบบแล้วตรวจสุขภาพ ถ้าไม่ผ่านถอยกลับเอง สำรองฐานข้อมูลทุกคืน",
        en: "1,454 automated tests on the inventory system and 202 on the website. GitHub Actions tests and builds every release, a health check rolls a bad one back, and the database is backed up nightly",
      },
      {
        th: "เว็บบริษัทสองภาษา 21 ผลงานใน 8 หมวด แอดมินแก้ได้ทั้งสองภาษา",
        en: "A bilingual company site with 21 projects in 8 categories, all editable in both languages",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Drizzle", "GitHub Actions", "DigitalOcean", "Cloudflare", "Vercel"],
    url: "https://www.500day.co.th",
    shot: shot500day,
    full: full500day,
    mobile: mobile500day,
    video: "/work/500day-scroll",
    gallery: [
      { src: stockDashboard, frame: "desktop", url: "stock.whiteforces.com", caption: { th: "หน้าแรกของระบบคลัง (ภาพจากเดโม ข้อมูลสมมติ)", en: "Inventory home (from the public demo, sample data)" } },
      { src: stockIssue, frame: "desktop", url: "stock.whiteforces.com", caption: { th: "จ่ายของตามใบเบิก ตัดสต็อกทันที", en: "Issuing against a request, stock deducted on the spot" } },
      { src: stockQr, frame: "desktop", url: "stock.whiteforces.com", caption: { th: "พิมพ์ป้าย QR ติดวัสดุและเครื่องมือ", en: "Printing QR labels for materials and tools" } },
      { src: stockMap, frame: "desktop", url: "stock.whiteforces.com", caption: { th: "แผนที่คลังสินค้า", en: "Map of the warehouses" } },
      { src: stockDashboardPhone, frame: "phone", caption: { th: "หน้าแรกบนมือถือ", en: "Home on a phone" } },
      { src: stockItemPhone, frame: "phone", caption: { th: "สแกนแล้วเบิกได้เลย", en: "Scan, then take it out" } },
      { src: stockAlertsPhone, frame: "phone", caption: { th: "เตือนของใกล้หมด", en: "Low-stock alerts" } },
    ],
  },
  {
    slug: "blueocean",
    name: "Blue Ocean Traders",
    kind: { th: "เว็บแคตตาล็อกสินค้า B2B", en: "B2B product catalogue" },
    client: { th: "บริษัท บลู โอเชี่ยน เทรดเดอร์ จำกัด", en: "Blue Ocean Traders Co., Ltd." },
    year: "2026",
    summary: {
      th: "เว็บของผู้นำเข้าวัสดุก่อสร้างและตกแต่ง แคตตาล็อกสองภาษา 10 กลุ่มสินค้า ทุกหน้ามีปุ่มขอใบเสนอราคาที่ส่งตรงเข้าหลังบ้านและอีเมลของบริษัท พนักงานแก้สินค้าเองได้ไม่ต้องพึ่งโปรแกรมเมอร์",
      en: "Site for an importer of building and finishing materials: a bilingual catalogue of 10 product groups, a quote button on every page that goes straight to the admin inbox and the office email, and an admin panel so staff update products themselves.",
    },
    role: { th: "พัฒนาต่อจากเวอร์ชันแรก: สองภาษา หลังบ้าน ใบเสนอราคา และ SEO", en: "Took over the first version: bilingual site, admin, quotes and SEO" },
    points: [
      { th: "ทำทั้งเว็บและเนื้อหาสินค้าให้เป็นไทย/อังกฤษ แยก URL /en สลับภาษาแล้วยังอยู่หน้าเดิม", en: "Thai and English for the whole site and every product, with /en URLs and a switch that keeps you on the same page" },
      { th: "ขอใบเสนอราคาเข้ากล่องข้อความหลังบ้าน แจ้งเตือนเข้าอีเมล กันสแปมด้วย honeypot และจำกัดจำนวนครั้ง", en: "Quote requests land in an admin inbox and the office email, with a honeypot and rate limiting against spam" },
      { th: "หลังบ้านแก้สินค้า หมวดหมู่ หน้าแรก ข่าว และรูปภาพได้เอง แบ่งสิทธิ์ ADMIN/EDITOR", en: "Admin for products, categories, home page sections, news and images, with ADMIN/EDITOR roles" },
      { th: "SEO: hreflang, sitemap จากฐานข้อมูล, structured data ระดับสินค้า และ prerender ทั้งสองภาษา", en: "SEO: hreflang, a sitemap built from the database, product structured data, both languages prerendered" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "NextAuth", "Vercel"],
    url: "https://www.blueoceantraders.co.th/",
    shot: shotBlueocean,
    full: fullBlueocean,
    mobile: mobileBlueocean,
    video: "/work/blueocean-scroll",
    gallery: [
      { src: blueoceanProduct, frame: "desktop", url: "blueoceantraders.co.th/products/spc-flooring", caption: { th: "หน้าสินค้า: รูป สเปก และปุ่มขอใบเสนอราคา", en: "Product page: photos, specs and the quote button" } },
      { src: blueoceanQuote, frame: "desktop", url: "blueoceantraders.co.th/#contact", caption: { th: "ฟอร์มขอใบเสนอราคา", en: "The quote request form" } },
      { src: blueoceanEn, frame: "desktop", url: "blueoceantraders.co.th/en/products", caption: { th: "แคตตาล็อกภาษาอังกฤษ", en: "The English catalogue" } },
      { src: blueoceanProductPhone, frame: "phone", caption: { th: "หน้าสินค้าบนมือถือ", en: "A product page on a phone" } },
    ],
  },
  {
    slug: "memo",
    name: "MeMo",
    kind: { th: "ผู้ช่วยออฟฟิศใน LINE", en: "Office assistant inside LINE" },
    client: { th: "ผลิตภัณฑ์ของ WF LABs", en: "A WF LABs product" },
    year: "2026",
    summary: {
      th: "บอท LINE และแอปในไลน์ที่ช่วยทีมออฟฟิศ พิมพ์เหมือนคุยกับคน เมมโม่แยกเองว่าเป็นโน้ต นัด รายจ่าย หรืองานของทีม เก็บไฟล์เข้า Drive อ่านยอดจากสลิปและใบแจ้งหนี้ แล้วเตือนก่อนครบกำหนด",
      en: "A LINE bot and an in-LINE app for office teams. Type the way you'd talk and MeMo files it as a note, a reminder, an expense or a team task. It keeps chat files in Google Drive, reads amounts off slips and invoices, and reminds you before they're due.",
    },
    role: { th: "คิดผลิตภัณฑ์ พัฒนา และดูแลระบบจริง", en: "Product, development and running the live service" },
    points: [
      { th: "ตัวแยกประโยคภาษาไทยแบบใช้กฎ ไม่ต้องเรียก AI ถูก 94% ในชุดทดสอบ 306 ประโยค", en: "A rule-based Thai intent parser with no AI calls: 94% right on a 306-sentence held-out set" },
      { th: "อ่านเอกสาร: OCR ผ่าน Google Drive ของผู้ใช้ ดึงยอด เลขที่ และวันครบกำหนด ค้นไฟล์จากคำข้างในได้", en: "Document reading: OCR through the user's own Google Drive, pulling out totals, numbers and due dates, with full-text search" },
      { th: "ใช้ในกลุ่มไลน์ทั้งทีม: ตารางทีม มอบงาน ลางาน และเช็กชื่อตอนเช้า", en: "Works in LINE groups: team schedule, task assignment, leave and morning check-in" },
      { th: "เทสอัตโนมัติ 2,835 เคส ขึ้นระบบผ่าน staging ทุกครั้ง ถ้าอะไรพังถอยกลับเอง", en: "2,835 automated tests; every release goes through staging and rolls back by itself if a step fails" },
    ],
    stack: ["Node.js", "TypeScript", "PostgreSQL", "LINE Messaging API", "LIFF", "Google Drive API", "PM2", "Cloudflare Tunnel"],
    url: "https://memo.whiteforces.com/",
    shot: shotMemo,
    video: "/work/memo-scroll",
    app: memo,
    gallery: [{ src: memoCalendar, frame: "phone", caption: { th: "ปฏิทินรวมนัดและงานของทีม", en: "The calendar with the team's meetings and tasks" } }],
  },
  {
    slug: "pink",
    name: "Pink Symphonic",
    kind: { th: "บอท LINE เก็บ CRM งานคอนเสิร์ต", en: "LINE CRM bot for a concert" },
    client: { th: "Pink Symphonic Concert โดย JubileeX", en: "Pink Symphonic Concert, by JubileeX" },
    year: "2026",
    summary: {
      th: "บอท LINE และแอปในไลน์ที่ให้ผู้ชมลงทะเบียนในวันงาน Pink Symphonic Concert เพื่อแลกถ่ายรูปฟรี ผู้จัดได้รายชื่อลูกค้าพร้อมความยินยอมตาม PDPA ข้อมูลที่นั่ง และการใช้งานในแอป ดูและส่งออกเป็น Excel ได้จากคอนโซลของผู้จัด",
      en: "A LINE bot and in-LINE app that signed up concert-goers on the day of Pink Symphonic Concert in exchange for a free photo. The organiser got a customer list with PDPA consent, seats and in-app activity, viewable and exportable to Excel from their console.",
    },
    role: { th: "ออกแบบระบบ พัฒนา ลงพื้นที่ และดูแลระบบสดในวันงาน", en: "Designed and built it, went on site, and ran it live on the day" },
    points: [
      {
        th: "ลงทะเบียนจบในหน้าเดียว ความยินยอม PDPA แยกกับการรับข่าว แลกด้วยสิทธิ์ถ่ายรูปฟรีที่ซุ้ม วันงานมีคนลงทะเบียนอย่างน้อย 465 คน",
        en: "One-screen sign-up with PDPA consent kept separate from news opt-in, traded for a free photo at the booth; at least 465 people signed up on the day",
      },
      {
        th: "คอนโซลผู้จัด: แดชบอร์ด ข้อมูลผู้ชมรายคนพร้อมแท็กและสถานะความยินยอม ส่งออก Excel พร้อมกราฟ",
        en: "Organiser console: a dashboard, a record per attendee with tags and consent status, and an Excel export with charts",
      },
      {
        th: "ตรวจที่นั่งกับผังจริงของฮอลล์ 1,053 ที่นั่ง ทีมหน้าประตูพิมพ์เลขที่นั่งแล้วรู้ว่าใครเข้างาน",
        en: "Seats checked against the hall's real 1,053-seat chart; the door crew types a seat and sees who came in",
      },
      {
        th: "ทดสอบโหลด 1,000 คนต่อนาที ตอบใน 60 ms (p95) มีเซิร์ฟเวอร์สำรองที่สลับเองและซ้อมสลับจริงก่อนวันงาน สำรองข้อมูลทุก 5 นาทีระหว่างงาน",
        en: "Load-tested at 1,000 sign-ups a minute with a 60 ms p95, a standby server that takes over by itself (rehearsed before the show), and backups every 5 minutes during the event",
      },
      {
        th: "หลังงาน ทำคอนโซล HQ ที่สร้างบอทงานใหม่จากบอทนี้เป็นแม่แบบ และดูแลบอททุกตัวได้จากที่เดียว",
        en: "After the show, built an HQ console that spins up bots for new events from this one and watches them all in one place",
      },
    ],
    stack: ["Node.js", "TypeScript", "Express", "SQLite", "React", "Tailwind CSS", "LINE Messaging API", "LIFF", "Cloudflare Tunnel"],
    shot: shotPink,
    app: pink,
    field: {
      title: { th: "วันงานจริง", en: "On the day" },
      intro: {
        th: "วันงาน ผมยืนอยู่หน้าฮอลล์ คอยชวนผู้ชมให้แอดไลน์ Jubilee เล่าว่าลงทะเบียนแล้วได้อะไร และช่วยจนกรอกเสร็จ วันเดียวได้รายชื่อลูกค้ากว่า 465 คน",
        en: "On show day I worked the hall entrance, getting concert-goers to add Jubilee on LINE: telling them what they'd get and helping until the form was done. That one day brought in more than 465 customer records.",
      },
      short: {
        th: "วันงานได้รายชื่อลูกค้ากว่า 465 คนในวันเดียว จากการยืนชวนทีละคน",
        en: "More than 465 customer records in one day, one conversation at a time.",
      },
      shots: [
        { src: onsitePoster, video: "/clips/pink-onsite", caption: { th: "ชวนผู้ชมลงทะเบียนหน้าฮอลล์", en: "Signing a guest up at the hall" } },
        { src: onsiteSignup, caption: { th: "จอชวนแอดไลน์ Jubilee พร้อม QR ที่หน้างาน", en: "The add-Jubilee screen and QR code at the venue" } },
        { src: onsiteTalk, caption: { th: "คุยกับผู้ชมก่อนเข้าฮอลล์", en: "Talking to guests before the show" } },
        { src: onsiteBackdrop, caption: { th: "หน้าฉากงาน Pink Symphonic Concert", en: "At the Pink Symphonic Concert backdrop" } },
        { src: onsiteLobby, caption: { th: "ผู้ชมกรอกข้อมูลในไลน์ระหว่างรอเข้างาน", en: "Guests signing up in LINE while they wait" } },
      ],
      picks: [1, 2, 4],
    },
    gallery: [
      { src: pinkConsoleDashboard, frame: "desktop", caption: { th: "แดชบอร์ดผู้จัด: ผู้ติดตาม ที่นั่ง และคำถามยอดฮิต (ข้อมูลสมมติ)", en: "Organiser dashboard: followers, seats and top questions (sample data)" } },
      { src: pinkConsoleCrm, frame: "desktop", caption: { th: "รายชื่อผู้ชมพร้อมสถานะความยินยอม และปุ่มส่งออก Excel", en: "Attendees with consent status and the Excel export" } },
      { src: pinkConsoleCheckins, frame: "desktop", caption: { th: "บันทึกการเข้างานจากคอมพิวเตอร์", en: "Door check-ins from a computer" } },
    ],
  },
  {
    slug: "onstage",
    name: "ONSTAGE",
    kind: { th: "เว็บผู้จัดคอนเสิร์ต + ระบบขายบัตร", en: "Concert promoter site + box office" },
    client: { th: "JUBILEE EXPERIENCE CO., LTD.", en: "JUBILEE EXPERIENCE CO., LTD." },
    year: "2026",
    summary: {
      th: "เว็บบริษัทจัดคอนเสิร์ตสองภาษา ที่สลับเป็นระบบขายบัตรได้ด้วยสวิตช์เดียวในหลังบ้าน มีผังที่นั่ง คิวรอ ชำระเงิน และ e-ticket พร้อม QR ตอนนี้เปิดเป็นเว็บผลงานก่อน ระบบขายบัตรทำเสร็จแล้วรอวันเปิดขาย",
      en: "A bilingual site for a concert promoter that turns into a box office with one switch in the admin: seat map, queue, checkout and QR e-tickets. It runs as a portfolio site for now; the box office is built and waiting for launch.",
    },
    role: { th: "ออกแบบ พัฒนา และขึ้นระบบ", en: "Design, development and deployment" },
    points: [
      { th: "ผังที่นั่ง: เลือกโซนแล้วเลือกที่นั่งทีละแถว ราคาและที่ว่างอัปเดตทันที จำกัด 4 ที่ต่อบัญชี ล็อกที่นั่ง 10 นาทีตอนจ่ายเงิน", en: "Seat map: pick a block, then seats row by row, with live prices and availability, 4 seats per account and a 10-minute hold at checkout" },
      { th: "หลังบ้านภาษาไทย 13 หน้า บันทึกอัตโนมัติ มี undo/redo และเตือนเมื่อมีคนแก้จากอีกเครื่อง", en: "A 13-page Thai admin with autosave, undo/redo and a warning when someone edits from another device" },
      { th: "เก็บข้อมูลได้ทั้งไฟล์บน VPS หรือ Postgres กับ Blob บน Vercel เลือกจาก env อย่างเดียว", en: "Stores data in files on a VPS or in Postgres and Blob on Vercel, picked by environment variables alone" },
      { th: "เนื้อหาบนเว็บตอนนี้ยังเป็นข้อมูลตัวอย่าง รอข้อมูลจริงจากลูกค้า", en: "The shows on the site are still sample content until the client's own arrives" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Neon Postgres", "Vercel"],
    url: "https://www.jubileex.co.th/",
    shot: shotOnstage,
    full: fullOnstage,
    mobile: mobileOnstage,
    video: "/work/onstage-scroll",
    gallery: [
      { src: onstageSeats, frame: "desktop", caption: { th: "เลือกที่นั่งจากผังโซน", en: "Choosing seats on the zone map" } },
      { src: onstageTicket, frame: "desktop", caption: { th: "e-ticket พร้อม QR หลังจ่ายเงิน", en: "The e-ticket with its QR code after payment" } },
      { src: onstageAdmin, frame: "desktop", caption: { th: "หลังบ้าน: สวิตช์เปิดขายบัตรและภาพรวม", en: "Admin: the box-office switch and overview" } },
      { src: onstagePhone, frame: "phone", caption: { th: "รายการคอนเสิร์ตบนมือถือ", en: "Upcoming shows on a phone" } },
    ],
  },
  {
    slug: "eleave",
    name: "E-Leave",
    kind: { th: "ระบบลางานออนไลน์", en: "Online leave system" },
    client: {
      th: "ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร สำนักงานปลัดกระทรวงมหาดไทย",
      en: "ICT Center, Office of the Permanent Secretary, Ministry of Interior",
    },
    year: "2026",
    summary: {
      th: "ระบบลาอิเล็กทรอนิกส์ให้เจ้าหน้าที่ส่วนกลาง 6 กลุ่มงานและศูนย์ฯ เขตอีก 12 เขต ยื่นลาและอนุมัติตามสายบังคับบัญชาได้ออนไลน์ วันลาถูกหักเมื่ออนุมัติขั้นสุดท้ายและคืนให้เองเมื่อยกเลิก ผู้บริหารดูรายงานได้ทั้งองค์กร",
      en: "An electronic leave system for 6 central workgroups and 12 regional centres: staff request leave and the chain of command approves it online. Days come off the balance at final approval and go back on cancellation, and management gets reports for the whole organisation.",
    },
    role: {
      th: "ร่วมทีมพัฒนาช่วงที่สอง (ก.ค.–ต.ค. 2026) ต่อจากเวอร์ชันแรก",
      en: "Joined the team for the second phase (Jul–Oct 2026), building on the first version",
    },
    points: [
      {
        th: "ย้ายหลังบ้านจาก Supabase มาเป็น PostgreSQL พร้อม migration ที่มีเวอร์ชัน และติดตั้งทั้งระบบได้ด้วย Docker คำสั่งเดียว",
        en: "Moved the backend off Supabase to PostgreSQL with versioned migrations, and set up the whole system to run with one Docker command",
      },
      {
        th: "เส้นทางอนุมัติของศูนย์เขต ผู้ปฏิบัติหน้าที่แทนต้องกดรับก่อน ยกเลิกได้ทุกขั้นผ่านสายเดิม และโอนสิทธิ์อนุมัติตอนไม่อยู่",
        en: "The regional approval route, acting colleagues who must accept first, cancellation at any step through the same chain, and delegating approval while away",
      },
      {
        th: "สิทธิ์วันลาพักผ่อนตามอายุราชการ อีเมลแจ้งเตือน และฟอร์มใบลา PDF ตามแบบราชการ",
        en: "Vacation entitlement by years of service, e-mail notifications, and the official PDF leave form",
      },
      {
        th: "แก้ตามรายการที่หน่วยงานขอจากการประชุมสองรอบ ปรับหน้าตาทั้งระบบ และทำคู่มือผู้ใช้ 31 หน้ากับสไลด์นำเสนอ",
        en: "Worked through two rounds of the agency's change requests, reworked the interface, and wrote the 31-page user manual and the presentation",
      },
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Docker", "GitHub Actions"],
    team: { th: "ทีม 4 คน", en: "Team of 4" },
    highlight: {
      line: {
        th: "ระบบลาออนไลน์ของเจ้าหน้าที่ส่วนกลาง 6 กลุ่มงาน และศูนย์เขตอีก 12 เขต ยื่นลาและอนุมัติตามสายบังคับบัญชาได้ในระบบเดียว",
        en: "An online leave system for 6 central workgroups and 12 regional centres, with requests and approvals following the chain of command in one place.",
      },
      facts: [
        { value: "4", label: { th: "ขั้นอนุมัติ", en: "approval steps" } },
        { value: "12", label: { th: "ศูนย์เขต", en: "regional centres" } },
        { value: "9", label: { th: "ประเภทการลา", en: "leave types" } },
      ],
    },
    shot: shotEleave,
    gallery: [
      { src: shotEleave, frame: "desktop", caption: { th: "หน้าแรกของเจ้าหน้าที่: วันลาคงเหลือและปฏิทินการลา (ข้อมูลสมมติ)", en: "Staff home: leave balances and the leave calendar (made-up people)" } },
      { src: eleaveRequest, frame: "desktop", caption: { th: "ยื่นลา: เลือกวันจากปฏิทินไทย พร้อมลำดับผู้อนุมัติ", en: "New request: a Thai calendar and the approval order" } },
      { src: eleaveApprove, frame: "desktop", caption: { th: "คิวของผู้อนุมัติ รอผู้ปฏิบัติหน้าที่แทนกดรับก่อน", en: "An approver's queue, waiting for the acting colleague to accept" } },
      { src: eleaveReport, frame: "desktop", caption: { th: "รายงานการลาทั้งศูนย์ ดาวน์โหลด CSV ได้", en: "The organisation-wide report with CSV download" } },
    ],
  },
  {
    slug: "fdc",
    name: "FDC",
    kind: { th: "โมดูลประจำปืนใหญ่ + ศูนย์อำนวยการยิง", en: "Artillery gun module + fire direction centre" },
    client: { th: "ต้นแบบที่ WF\u00a0LABs ร่วมพัฒนาให้เหล่าทหารปืนใหญ่ กองทัพบก\u2060ไทย", en: "A prototype WF LABs co-developed for the Royal Thai Army Artillery" },
    year: "2026",
    summary: {
      th: "อุปกรณ์มือถือสีเหลืองติด GPS เข็มทิศดิจิทัล และวิทยุ LoRa ประจำปืนแต่ละกระบอก บอกพิกัดและทิศของปืนเป็นมิล แล้วส่งเข้าเว็บแอปศูนย์อำนวยการยิงบนโน้ตบุ๊ก ศูนย์เห็นปืนทุกกระบอกบนแผนที่และส่งข้อมูลกลับไปที่จอของปืนได้ ทำงานได้กลางสนามโดยไม่ต้องมีอินเทอร์เน็ต",
      en: "Yellow handheld units with GPS, a digital compass and a LoRa radio, one per gun. Each shows the gun's grid reference and heading in mils and sends them to a fire direction web app on a laptop, which sees every gun on a map and sends data back to each gun's screen. It all works in the field with no internet.",
    },
    role: {
      th: "ร่วมพัฒนาต้นแบบกับทีม WF LABs และทำเฟส 2: เฟิร์มแวร์ วิทยุ เว็บแอป และศูนย์บัญชาการ",
      en: "Co-developed the prototype with the WF LABs team and built phase 2: firmware, radio, the web app and the command centre",
    },
    points: [
      {
        th: "เฟิร์มแวร์ประจำปืนบน ESP32-S3 (FreeRTOS สองคอร์) อ่านทิศจากเข็มทิศ RM3100 คาลิเบรตตัดผลจากโลหะของปืน และหาทิศเหนืออ้างอิงจาก GPS ระหว่างเคลื่อนที่",
        en: "Gun-unit firmware on an ESP32-S3 (FreeRTOS on both cores): heading from an RM3100 compass, calibration that cancels the gun's metal, and a north reference learned from GPS on the move",
      },
      {
        th: "ย้ายวิทยุมาใช้คลื่น 923 MHz ที่ใช้ได้ในไทย เข้ารหัสด้วย AES-128-CCM และกันการส่งซ้ำ",
        en: "Moved the radio to Thailand's 923 MHz band, encrypted with AES-128-CCM and protected against replay",
      },
      {
        th: "เว็บแอปศูนย์อำนวยการยิง: แผนที่ใช้ได้ออฟไลน์ สถานะปืนทุกกระบอกแบบสด ต่อดองเกิล USB แล้วเจอเองใน 1 วินาที แพ็กเป็นไฟล์เดียวเปิดใช้ได้ทันที",
        en: "Fire direction web app: an offline map, live status for every gun, a USB dongle found by itself within a second, packaged as one file that just opens",
      },
      {
        th: "ส่งข้อมูลต่อขึ้นศูนย์บัญชาการผ่าน MQTT แบบ mTLS พร้อมคิวเก็บไว้ตอนสัญญาณหลุด",
        en: "An uplink to higher command over MQTT with mutual TLS and a queue that holds data while the link is down",
      },
    ],
    stack: ["ESP32-S3", "C++", "FreeRTOS", "LoRa", "Python", "Flask", "Leaflet", "MQTT", "FastAPI", "PostGIS"],
    team: { th: "ทีม 2 คน", en: "Team of 2" },
    highlight: {
      line: {
        th: "โมดูลประจำปืนบอกพิกัดและทิศของปืน แล้วส่งทางวิทยุเข้าเว็บแอปศูนย์อำนวยการยิง ใช้กลางสนามได้โดยไม่ต้องมีเน็ต",
        en: "A module on each gun reports its position and heading by radio to a fire direction web app, out in the field with no internet.",
      },
      facts: [
        { value: "923", label: { th: "MHz วิทยุ LoRa", en: "MHz LoRa radio" } },
        { value: "AES", label: { th: "เข้ารหัสทุกข้อความ", en: "every message encrypted" } },
        { value: "0", label: { th: "เน็ตที่ต้องใช้", en: "internet needed" } },
      ],
    },
    shot: fdcLaptop,
    gallery: [
      { src: fdcLaptop, frame: "photo", caption: { th: "ศูนย์อำนวยการยิงบนโน้ตบุ๊ก ต่อดองเกิลวิทยุผ่าน USB", en: "The fire direction app on a laptop, with the radio dongle on USB" } },
      { src: fdcField, frame: "photo", caption: { th: "ทดสอบภาคสนามตอนกลางคืน", en: "A night field test" } },
      { src: fdcPair, frame: "photo", caption: { th: "ดองเกิลของศูนย์ (ซ้าย) กับอุปกรณ์ประจำปืนที่บอกทิศเป็นมิล (ขวา)", en: "The centre's dongle (left) and a gun unit showing its heading in mils (right)" } },
      { src: fdcApp, frame: "desktop", caption: { th: "เว็บแอปในโหมดสาธิต ปืน 4 กระบอกบนแผนที่ดาวเทียม (พิกัดสมมติ)", en: "The web app in demo mode: four guns on the satellite map (made-up positions)" } },
    ],
  },
]

export const ownSites = [
  { name: "WF LABs", url: "https://labs.whiteforces.com/", shot: shotLabs, video: "/work/labs-scroll", kind: { th: "เว็บสตูดิโอ 3 ภาษา", en: "Trilingual studio site" } },
  { name: "WF FixIT", url: "https://fixit.whiteforces.com/", shot: shotFixit, video: "/work/fixit-scroll", kind: { th: "เว็บร้านซ่อมคอม", en: "Repair shop site" } },
  { name: "White Forces", url: "https://www.whiteforces.com/", shot: shotWf, video: "/work/whiteforces-scroll", kind: { th: "เว็บรวมแบรนด์ของเรา", en: "Home of our brands" } },
]
