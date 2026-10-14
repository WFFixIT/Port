// NEXT_PUBLIC_SITE_URL when set, otherwise the production domain Vercel provides at build time
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL

export const publicUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? (vercel ? `https://${vercel}` : "")).replace(/\/+$/, "")
export const siteUrl = publicUrl || "http://localhost:3000"
