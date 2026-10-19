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
import bearSearch from "@/assets/work/memo/bear-search.webp"
import bearParty from "@/assets/work/memo/bear-party.webp"
import bearCheck from "@/assets/work/memo/bear-check.webp"
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
    { value: "4 in 1", label: { th: "โน้ต นัด รายจ่าย งานทีม", en: "notes, reminders, expenses, tasks" } },
    { value: "0", label: { th: "แอปที่ต้องโหลดเพิ่ม", en: "apps to install" } },
    { value: "Drive / NAS", label: { th: "ไฟล์อยู่ในพื้นที่ของคุณเอง", en: "files stay in your own storage" } },
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
      sticker: bearSearch,
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
      sticker: bearCheck,
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
        th: "ช่างเลือกของใส่ตะกร้าในมือถือ ได้ใบเบิกที่มี QR พอคลังสแกนก็ตัดสต็อกทันที ตอนคืนของก็ทำแบบเดียวกัน",
        en: "Crews pick items into a cart on their phone and get a slip with a QR code. The warehouse scans it once, and only then does stock come off. Returns work the same way",
      },
      {
        th: "มีหลายคลังที่แยกยอดกัน ติดป้าย QR ที่ชั้นวาง เครื่องมือแต่ละชิ้นรู้ว่าอยู่กับใคร (จะยืมต้องมีคนอนุมัติ) และทุกเที่ยวส่งของถ่ายรูปไว้ทั้งตอนส่งและตอนรับ",
        en: "Several warehouses with their own stock, QR labels on the shelves, every tool tracked one by one (borrowing one needs approval), and each delivery photographed when it leaves and when it arrives",
      },
      {
        th: "มีรายงาน นำเข้าและส่งออกเป็น Excel ได้ เตือนก่อนของหมด และแบ่งผู้ใช้ 4 ระดับ แอดมินเลือกได้ว่าแต่ละระดับเห็นเมนูไหน",
        en: "Reports, Excel import and export, low-stock alerts, and four user roles, with the admin deciding which menus each one sees",
      },
      {
        th: "มีเทสอัตโนมัติ 1,454 เคสในระบบคลังและ 202 เคสในเว็บ คอยเช็กว่าแก้จุดหนึ่งแล้วไม่ไปพังอีกจุด ทุกครั้งที่ขึ้นระบบจะเทสให้เอง ถ้าขึ้นแล้วมีปัญหาก็ถอยกลับเวอร์ชันเดิมเอง และสำรองฐานข้อมูลทุกคืน",
        en: "1,454 automated tests on the inventory system and 202 on the website make sure a fix in one place doesn't break another. Every release is tested automatically and rolls itself back if something goes wrong, and the database is backed up every night",
      },
      {
        th: "เว็บบริษัทสองภาษา โชว์ผลงานก่อสร้าง 21 งานใน 8 หมวด แอดมินแก้เนื้อหาเองได้ทั้งสองภาษา",
        en: "A bilingual company site showing 21 finished projects in 8 categories, which the admin edits in both languages",
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
    role: { th: "ทำเว็บสองภาษา หลังบ้าน ระบบขอใบเสนอราคา และ SEO", en: "Built the bilingual site, the admin, quote requests and SEO" },
    points: [
      { th: "ทั้งเว็บและสินค้าทุกตัวมีภาษาไทยกับอังกฤษ กดสลับภาษาแล้วยังอยู่หน้าเดิม ไม่เด้งกลับหน้าแรก", en: "Thai and English for the whole site and every product, and switching language keeps you on the same page" },
      { th: "ลูกค้ากดขอใบเสนอราคาแล้ว ข้อความเข้าหลังบ้านและอีเมลของบริษัททันที มีระบบกันสแปมบอท (honeypot และจำกัดจำนวนครั้ง)", en: "A quote request goes straight to the admin inbox and the office email, with spam protection (a honeypot and rate limiting)" },
      { th: "พนักงานแก้สินค้า หมวดหมู่ หน้าแรก ข่าว และรูปภาพเองได้จากหลังบ้าน แบ่งสิทธิ์แอดมินกับคนแก้เนื้อหา", en: "Staff edit products, categories, the home page, news and images themselves, with separate admin and editor roles" },
      { th: "ทำ SEO ให้ Google เจอหน้าสินค้าได้ทั้งสองภาษา (hreflang, sitemap จากฐานข้อมูล และ structured data ของสินค้า)", en: "SEO so Google finds every product in both languages (hreflang, a sitemap built from the database, product structured data)" },
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
      th: "บอท LINE และแอปในไลน์ที่ช่วยทีมออฟฟิศ พิมพ์เหมือนคุยกับคน เมมโม่แยกเองว่าเป็นโน้ต นัด รายจ่าย หรืองานของทีม เก็บไฟล์เข้า Drive หรือ NAS ของทีม อ่านยอดจากสลิปและใบแจ้งหนี้ แล้วเตือนก่อนครบกำหนด",
      en: "A LINE bot and an in-LINE app for office teams. Type the way you'd talk and MeMo files it as a note, a reminder, an expense or a team task. It keeps chat files in Google Drive or the team's own NAS, reads amounts off slips and invoices, and reminds you before they're due.",
    },
    role: { th: "คิดผลิตภัณฑ์ พัฒนา และดูแลระบบจริง", en: "Product, development and running the live service" },
    points: [
      { th: "พิมพ์ภาษาไทยแบบที่คุยกันปกติ เมมโม่ก็รู้ว่าเป็นนัด โน้ต หรือรายจ่าย ข้อความส่วนใหญ่แยกด้วยกฎภาษาไทยของระบบเอง ส่วนประโยคที่กำกวมค่อยให้ AI ช่วยอ่านอีกที", en: "Type in everyday Thai and MeMo works out whether it's a reminder, a note or an expense. Its own Thai rules handle most messages, and AI only reads the unclear ones" },
      { th: "ส่งรูปสลิปหรือใบแจ้งหนี้มา เมมโม่อ่านยอด เลขที่ และวันครบกำหนดให้เอง (OCR ผ่าน Google Drive ของผู้ใช้) และค้นไฟล์จากคำที่อยู่ข้างในได้", en: "Send a photo of a slip or an invoice and MeMo reads the amount, the number and the due date (OCR through the user's own Google Drive). Files can be searched by the words inside them" },
      { th: "ใช้ในกลุ่มไลน์ของทีมได้ ดูตารางรวม มอบงาน แจ้งลา และเช็กชื่อตอนเช้า", en: "Works in a team's LINE group too: a shared schedule, task assignment, leave and a morning check-in" },
      { th: "มีเทสอัตโนมัติ 2,835 เคส ทุกครั้งที่อัปเดตจะลองบนระบบทดสอบก่อน ถ้ามีอะไรพังก็ถอยกลับเอง ไม่ให้ไปถึงคนใช้", en: "2,835 automated tests, and every update goes through a test server first and rolls itself back if anything fails, so a bad update doesn't reach users" },
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
        th: "ลงทะเบียนจบในหน้าเดียว แลกกับสิทธิ์ถ่ายรูปฟรีที่ซุ้ม ขอความยินยอม PDPA แยกกับการรับข่าวสาร วันงานมีคนลงทะเบียนอย่างน้อย 465 คน",
        en: "One-screen sign-up in exchange for a free photo at the booth, with PDPA consent asked separately from news opt-in. At least 465 people signed up on the day",
      },
      {
        th: "ผู้จัดมีหน้าจัดการของตัวเอง ดูภาพรวม ดูข้อมูลผู้ชมทีละคนพร้อมแท็กและสถานะความยินยอม และส่งออกเป็น Excel พร้อมกราฟได้",
        en: "The organiser gets their own console: an overview, a record for each guest with tags and consent status, and an Excel export with charts",
      },
      {
        th: "เลขที่นั่งที่กรอกจะเช็กกับผังจริงของฮอลล์ทั้ง 1,053 ที่นั่ง ทีมหน้าประตูพิมพ์เลขที่นั่งแล้วรู้เลยว่าใครเข้างานแล้ว",
        en: "Seat numbers are checked against the hall's real 1,053-seat chart, and the door crew types a seat to see who's come in",
      },
      {
        th: "ก่อนวันงานลองให้คนลงทะเบียนพร้อมกัน 1,000 คนต่อนาที เกือบทุกคำขอยังตอบภายใน 0.06 วินาที มีเซิร์ฟเวอร์สำรองที่ขึ้นมาแทนเองถ้าตัวหลักล่ม (ซ้อมสลับจริงแล้ว) และสำรองข้อมูลทุก 5 นาทีระหว่างงาน",
        en: "Before the show I pushed 1,000 sign-ups a minute through it, and nearly every request was still answered within 0.06 seconds. A standby server takes over by itself if the main one fails (rehearsed before the show), and data was backed up every 5 minutes during the event",
      },
      {
        th: "หลังงาน ทำคอนโซล HQ ที่ใช้บอทนี้เป็นแม่แบบ สร้างบอทให้งานใหม่ได้เลย และดูแลบอททุกตัวได้จากที่เดียว",
        en: "After the show, I built an HQ console that uses this bot as a template for new events and keeps an eye on all of them in one place",
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
    kind: { th: "เว็บผู้จัดคอนเสิร์ต", en: "Concert promoter site" },
    client: { th: "JUBILEE EXPERIENCE CO., LTD.", en: "JUBILEE EXPERIENCE CO., LTD." },
    year: "2026",
    summary: {
      th: "เว็บบริษัทจัดคอนเสิร์ตสองภาษา มีหลังบ้านภาษาไทยให้ทีมงานแก้เนื้อหาบนเว็บได้เอง",
      en: "A bilingual site for a concert promoter, with a Thai admin panel so the team can update the site themselves.",
    },
    role: { th: "ออกแบบ พัฒนา และขึ้นระบบ", en: "Design, development and deployment" },
    points: [
      { th: "หลังบ้านภาษาไทย 13 หน้า บันทึกให้เอง กดย้อนกลับได้ และเตือนถ้ามีคนแก้จากอีกเครื่องพร้อมกัน", en: "A 13-page Thai admin that saves as you go, has undo and redo, and warns you if someone else is editing from another device" },
      { th: "ย้ายไปรันได้ทั้งบนเซิร์ฟเวอร์ของตัวเอง (VPS) หรือบน Vercel แค่เปลี่ยนค่าตั้งค่า ไม่ต้องแก้โค้ด", en: "Runs on its own server (VPS) or on Vercel, switched with settings alone, no code changes" },
      { th: "เนื้อหาบนเว็บตอนนี้ยังเป็นข้อมูลตัวอย่าง รอข้อมูลจริงจากลูกค้า", en: "The shows on the site are still sample content until the client's own arrives" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Neon Postgres", "Vercel"],
    url: "https://www.jubileex.co.th/",
    shot: shotOnstage,
    full: fullOnstage,
    mobile: mobileOnstage,
    video: "/work/onstage-scroll",
    gallery: [{ src: onstagePhone, frame: "phone", caption: { th: "รายการคอนเสิร์ตบนมือถือ", en: "Upcoming shows on a phone" } }],
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
    role: { th: "พัฒนาระบบและส่งมอบให้หน่วยงาน", en: "Built the system and handed it over to the agency" },
    points: [
      {
        th: "ติดตั้งทั้งระบบได้ด้วยคำสั่งเดียว (Docker) และอัปเดตโครงสร้างฐานข้อมูล PostgreSQL ได้ทีละขั้น ข้อมูลเดิมไม่หาย",
        en: "The whole system installs with one command (Docker), and the PostgreSQL database is updated step by step without losing data",
      },
      {
        th: "ใบลาของศูนย์เขตส่งไปหาผู้อนุมัติตามสายของเขตเอง คนที่ถูกฝากงานต้องกดรับก่อน ยกเลิกได้ทุกขั้น และหัวหน้าฝากสิทธิ์อนุมัติให้คนอื่นตอนไม่อยู่ได้",
        en: "Requests from regional centres go up their own chain of approvers, the colleague covering for you has to accept first, a request can be cancelled at any step, and approvers can hand over approval while they're away",
      },
      {
        th: "คิดวันลาพักผ่อนตามอายุราชการให้เอง มีอีเมลแจ้งเตือน และพิมพ์ใบลาเป็น PDF ตามแบบฟอร์มราชการได้",
        en: "Vacation days worked out from years of service, email notifications, and the official leave form as a PDF",
      },
      {
        th: "แก้ตามรายการที่หน่วยงานขอจากการประชุมสองรอบ รวมถึงหน้าตาของระบบ และทำคู่มือผู้ใช้ 31 หน้ากับสไลด์นำเสนอ",
        en: "Worked through two rounds of the agency's change requests, including the interface, and wrote the 31-page user manual and the presentation",
      },
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Docker", "GitHub Actions"],
    highlight: {
      line: {
        th: "ระบบลาออนไลน์ของเจ้าหน้าที่ส่วนกลาง 6 กลุ่มงาน และศูนย์เขตอีก 12 เขต ยื่นลาและอนุมัติตามสายบังคับบัญชาได้ในระบบเดียว",
        en: "An online leave system for 6 central workgroups and 12 regional centres, with requests and approvals following the chain of command in one place.",
      },
      facts: [
        { value: "4", label: { th: "ขั้นอนุมัติ", en: "approval steps" } },
        { value: "12", label: { th: "ศูนย์เขต", en: "regional centres" } },
        { value: "9", label: { th: "ประเภทการ\u2060ลา", en: "leave types" } },
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
    client: { th: "ต้นแบบให้เหล่าทหารปืนใหญ่ กองทัพบก\u2060ไทย", en: "A prototype for the Royal Thai Army Artillery" },
    year: "2026",
    summary: {
      th: "อุปกรณ์สีเหลืองประจำปืนแต่ละกระบอก มี GPS เข็มทิศดิจิทัล และวิทยุ LoRa บอกพิกัดและทิศของปืนเป็นหน่วยมิล แล้วส่งเข้าเว็บแอปศูนย์อำนวยการยิงบนโน้ตบุ๊ก ศูนย์เห็นปืนทุกกระบอกบนแผนที่และส่งข้อมูลกลับไปที่จอของปืนได้ ใช้งานกลางสนามได้โดยไม่ต้องมีอินเทอร์เน็ต",
      en: "Yellow handheld units with GPS, a digital compass and a LoRa radio, one per gun. Each shows the gun's grid reference and heading in mils and sends them to a fire direction web app on a laptop, which sees every gun on a map and sends data back to each gun's screen. It all works in the field with no internet.",
    },
    role: {
      th: "ทำเฟิร์มแวร์ วิทยุ เว็บแอปศูนย์อำนวยการยิง และระบบส่งข้อมูลขึ้นศูนย์บัญชาการ",
      en: "Built the firmware, the radio link, the fire direction web app and the uplink to command",
    },
    points: [
      {
        th: "ตัวเครื่องประจำปืนอ่านทิศจากเข็มทิศดิจิทัล ชดเชยค่าที่เพี้ยนจากเหล็กของตัวปืน และใช้ GPS ช่วยหาทิศเหนือตอนเคลื่อนที่ (ESP32-S3, FreeRTOS)",
        en: "The gun unit reads its heading from a digital compass, corrects for the gun's own steel, and uses GPS to find north while moving (ESP32-S3, FreeRTOS)",
      },
      {
        th: "วิทยุใช้คลื่น 923 MHz ที่ใช้ได้ถูกกฎหมายในไทย ทุกข้อความเข้ารหัส (AES-128) และกันการดักแล้วส่งซ้ำ",
        en: "The radio uses the 923 MHz band that's legal in Thailand, and every message is encrypted (AES-128) and protected against replay",
      },
      {
        th: "เว็บแอปศูนย์อำนวยการยิงใช้แผนที่ได้แม้ไม่มีเน็ต เห็นสถานะปืนทุกกระบอกแบบสด เสียบดองเกิลวิทยุแล้วเจอเองใน 1 วินาที และรวมเป็นไฟล์เดียว ดับเบิลคลิกก็เปิดใช้ได้",
        en: "The fire direction app works offline with a live map of every gun, finds the USB radio dongle by itself within a second, and comes as a single file you just open",
      },
      {
        th: "ส่งข้อมูลต่อขึ้นศูนย์บัญชาการแบบเข้ารหัส (MQTT + mTLS) ถ้าสัญญาณหลุดก็เก็บไว้ส่งทีหลัง ข้อมูลไม่หาย",
        en: "Data goes on to higher command over an encrypted link (MQTT with mutual TLS), and if the link drops it waits in a queue, so nothing is lost",
      },
    ],
    stack: ["ESP32-S3", "C++", "FreeRTOS", "LoRa", "Python", "Flask", "Leaflet", "MQTT", "FastAPI", "PostGIS"],
    highlight: {
      line: {
        th: "โมดูลประจำปืนบอกพิกัดและทิศของปืน แล้วส่งทางวิทยุเข้าเว็บแอปศูนย์อำนวยการยิง ใช้กลางสนามได้โดยไม่ต้องมีเน็ต",
        en: "A module on each gun reports its position and heading by radio to a fire direction web app, out in the field with no internet.",
      },
      facts: [
        { value: "923", label: { th: "MHz คลื่นที่ใช้ได้ในไทย", en: "MHz, legal in Thailand" } },
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
