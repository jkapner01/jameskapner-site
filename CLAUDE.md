# jameskapner.com

Personal portfolio site for **James Kapner**, film director (Los Angeles).

## What this site is for

1. Present the work with one consistent aesthetic
2. Rank for "James Kapner" and "LA-based film director" in Google **and** in AI answers
3. Act as a digital business card for inbound leads

Director-only. This is not a site for Runners, Banshee, or any other company.

## Editing content

Almost every change starts in one of two files — no other file should need
touching for routine updates:

| To change | Edit |
|---|---|
| Name, bio, reel, resume, press, contact, socials, SEO copy | `src/content/site.ts` |
| Projects — add, remove, reorder, retitle | `src/content/work.ts` |

Both files are heavily commented. Adding a project = copying a block in
`work.ts` and changing the values.

Images go in `public/work/` and are referenced as `/work/filename.jpg`.

## Structure

```
src/
  content/site.ts      all site-wide copy + SEO strings
  content/work.ts      the project list (single source of truth)
  app/
    page.tsx           home — name/bio + reel, then selected work
    work/page.tsx      work index with Narrative/Commercial/Branded tabs
    work/[slug]/       one page per project
    resume/, press/, contact/
    sitemap.ts, robots.ts, llms.txt/
  components/
    JsonLd.tsx         structured data (see SEO below)
    Texture.tsx        SVG roughen filters, ink rule, torn frame
    Nav, Footer, VideoEmbed, ProjectCard, PageHeading
```

## SEO / AI-search rules

These exist on purpose — don't strip them out:

- **`components/JsonLd.tsx`** emits schema.org `Person`, `WebSite`, `Movie`,
  and `VideoObject`. This is the main thing that lets an AI assistant answer
  "who directed X" or "find me an LA film director" with James's name.
  When a new project is added, its structured data is generated automatically.
- **`app/llms.txt/route.ts`** serves a plain-text profile at `/llms.txt` for
  AI crawlers.
- **Work tabs are real URLs** (`/work?c=narrative`), not client-side state,
  so each category is independently crawlable.
- Every page sets a unique `title`, `description`, and canonical URL.
- Copy should state facts plainly — "James Kapner is a Los Angeles–based film
  director" beats "a visionary storyteller." Literal phrasing is what gets
  retrieved and quoted.

## Look and feel

Modeled on James's existing site: aged paper ground, charcoal ink, distressed
condensed display type, hand-drawn rules, torn-edge image frames.

- **Palette** — six CSS variables at the top of `src/app/globals.css`
  (`--paper`, `--paper-deep`, `--ink`, `--ink-soft`, `--ghost`, `--accent`).
  Changing those six reskins the entire site.
- **Paper texture** is generated in CSS (`body::before`) from an SVG noise
  filter plus a few soft blotches. No image file, nothing to download.
- **Distressed edges** come from the `#roughen` SVG filter in
  `components/Texture.tsx`, applied via the `.rough` / `.rough-soft` classes.
  This is why headlines look chipped rather than crisp — it works on any
  typeface, so swapping fonts keeps the effect.
- **Type** — Anton (display) + Oswald (body), both from Google Fonts, chosen
  to match the condensed poster feel of the original. If James has the
  original licensed font, swap it in `app/layout.tsx` and the roughening
  still applies.
- Nav is lowercase throughout. That's deliberate, matching the reference.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Vercel.

## Workflow

- `main` is live. Push a branch → Vercel builds a preview URL → merge when it looks right.
- `npm run dev` for local at http://localhost:3000
- `npm run build` before pushing anything structural
