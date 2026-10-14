# Nattaphat Portfolio

My portfolio site, in Thai and English. It covers the projects I've worked on (websites, systems, LINE apps and a hardware prototype), my GitHub activity, the marketing clips I make for our shop, and how to reach me.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, shadcn/ui
- framer-motion
- lucide-react, simple-icons

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` when deploying. The share image, sitemap, robots.txt and the JSON-LD on the home page use it.

## Layout

```
app/                  layout, page, global styles, share image, sitemap, robots, manifest
components/site/      the page sections (hero, work, GitHub, story, contact, ...)
components/ui/        shadcn-style components (path set in components.json)
components/providers/ language, scrolling, intro and motion settings
lib/content.ts        all copy, as { th, en } pairs
lib/projects.ts       project data, app screens and photos
lib/github-stats.json numbers for the GitHub section
assets/               images imported statically
public/clips/         short muted clips (.mp4 + .webm)
public/work/          site recordings and folder images
scripts/              github-stats.mjs
```

## Updating

- Text: edit `lib/content.ts`.
- A new project: add screenshots to `assets/work/` (desktop 1600x1000, full page 960 wide, phone 585 wide) and an entry in `lib/projects.ts`.
- The "try them yourself" folders: a 544x368 image without the site's header goes in `public/work/folder-<slug>.webp`, and the entry in `components/site/archive.tsx`.
- GitHub numbers: `node scripts/github-stats.mjs` (uses `GITHUB_TOKEN` or the gh CLI login) rewrites `lib/github-stats.json`.
- Clips: every video has an `.mp4` and a `.webm` copy, no audio:

```bash
ffmpeg -ss 14.8 -t 5.5 -i clip.mp4 -an -vf "crop=576:768:0:80,scale=360:480" -c:v libx264 -crf 28 -movflags +faststart out.mp4
ffmpeg -i out.mp4 -c:v libvpx-vp9 -crf 36 -b:v 0 out.webm
```

## Notes

- Screenshots of client systems use demo or sample data. Faces of other people in the event photos and clips are blurred.
- The photos, screenshots and text are not licensed for reuse.
