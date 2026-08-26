import Link from "next/link";
import { site } from "@/content/site";
import { HudBar } from "@/components/HudBar";
import { ReelStage } from "@/components/reel/ReelStage";

/**
 * Homepage is the reel, full bleed. Everything else is overlay.
 * The copy below is visually hidden but present in the DOM — search
 * engines and AI crawlers need words on the landing page, and a
 * full-screen video gives them nothing to read.
 */
export default function Home() {
  return (
    <>
      <ReelStage
        url={site.reel.url}
        label={site.reel.title}
        poster={site.reel.poster}
      />

      <div className="pointer-events-none fixed inset-0 z-30">
        <HudBar overlay />

        <div className="pointer-events-auto absolute bottom-24 left-4 sm:bottom-28 sm:left-6">
          <Link
            href="/work"
            className="label inline-flex items-center gap-2 border border-white/25 bg-black/55 px-3 py-2 text-white/85 backdrop-blur-sm transition-colors hover:border-signal hover:text-signal"
          >
            selected work
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <h1 className="sr-only">
        {site.name} — {site.role} based in {site.location}
      </h1>
      <div className="sr-only">
        {site.intro.map((p, i) => (
          <p key={i}>
            {i === 0 ? `${site.name} ${p}` : p}
          </p>
        ))}
      </div>
    </>
  );
}
