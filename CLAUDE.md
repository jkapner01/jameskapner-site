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
| Name, bio, reel link, resume, press, contact, socials, SEO copy | `src/content/site.ts` |
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
    page.tsx           home — the reel, full bleed
    work/page.tsx      work index with Narrative/Commercial/Branded filters
    work/[slug]/       one page per project
    resume/, press/, contact/
    sitemap.ts, robots.ts, llms.txt/
  components/
    reel/              the full-bleed player + command bar
    JsonLd.tsx         structured data (see SEO below)
    HudBar, PageShell, SiteFooter, VideoEmbed, ProjectCard
  lib/
    video.ts           Vimeo/YouTube URL parsing (privacy hashes!)
    timecode.ts        HH:MM:SS:FF formatting
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
- **The homepage's words live in a visually-hidden block.** A full-screen
  video gives a crawler nothing to read, so the name and bio are in the DOM
  via `sr-only`. Don't delete it — it's the landing page's only text.
- Copy should state facts plainly — "James Kapner is a Los Angeles–based film
  director" beats "a visionary storyteller." Literal phrasing is what gets
  retrieved and quoted.

## Look and feel

Minimal command centre. The homepage *is* the reel — full-bleed video with
a HUD over it; everything else is dark instrumentation.

- **Palette** — six CSS variables at the top of `src/app/globals.css`
  (`--bg`, `--panel`, `--fg`, `--dim`, `--line`, `--signal`). `--signal` is
  the single accent; use it sparingly, it means "active".
- **Type** — Inter for text, JetBrains Mono for every readout. The `.label`
  class is the recurring unit: 10px mono, uppercase, wide tracking. Reach for
  it before inventing a new small-text style.
- **Rules over shadows.** Panels are 1px `--line` borders on `--panel`.
  No rounded corners, no drop shadows.

## The reel player

`src/components/reel/` drives Vimeo through its official SDK rather than a
plain iframe, because the command bar replaces Vimeo's own controls.

- `useVimeo.ts` — owns the Player instance and exposes state + transport.
- `CommandBar.tsx` — the bar: status lamp, transport, scrub with tick marks,
  broadcast timecode, keyboard legend.
- `ReelStage.tsx` — full-bleed stage, scrim, keyboard shortcuts
  (space / m / arrows).

Three things here are load-bearing:

1. **Unlisted Vimeo links keep their privacy hash.** The reel URL is
   `vimeo.com/295650365/03e93492ae` — that trailing hash is required. The SDK
   is given the whole URL via its `url` option; passing a bare `id` returns
   403 and the player hangs on a spinner forever. `src/lib/video.ts` parses
   the hash out for plain iframes too (`?h=`).
2. **`controls: false` hides Vimeo's chrome** so ours is the only UI.
3. **The poster sits above the iframe, not behind it.** The player renders an
   opaque black box while loading, so a poster underneath would never be seen.
   It fades once frames are actually arriving.

Autoplay only works muted — every browser enforces this. Sound is opt-in
through the bar or the `m` key. Don't try to autoplay with audio.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Vercel.

## Workflow

- `main` is live. Push a branch → Vercel builds a preview URL → merge when it looks right.
- `npm run dev` for local at http://localhost:3000
- `npm run build` before pushing anything structural
