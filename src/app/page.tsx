import Link from "next/link";
import { site } from "@/content/site";
import { featured } from "@/content/work";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ProjectCard } from "@/components/ProjectCard";
import { InkRule, TornFrame } from "@/components/Texture";

export default function Home() {
  const work = featured();

  return (
    <>
      {/* Masthead: name + bio on the left, reel on the right. */}
      <section className="mx-auto max-w-[1600px] px-6 pt-10 sm:px-10 lg:pt-16">
        <div className="grid items-start gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Left column */}
          <div>
            {/* inline-block so the hand-drawn rule matches the name's width */}
            <div className="inline-block">
              <h1 className="display rough whitespace-nowrap text-[clamp(2.5rem,6.5vw,8rem)]">
                {site.name}
              </h1>
              <InkRule className="mt-1 text-ink" />
            </div>

            <div className="mt-9 max-w-xl space-y-7 text-[clamp(1rem,1.3vw,1.15rem)] font-normal leading-[1.55] text-ink">
              {site.intro.map((p, i) => (
                <p key={i}>
                  {i === 0 && (
                    <span className="sr-only">{site.name} </span>
                  )}
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right column — reel under its watermark */}
          <div className="lg:pt-24">
            <p
              aria-hidden
              className="display rough-soft mb-3 text-right text-[clamp(3rem,7vw,6rem)] text-ghost"
            >
              Reel
            </p>
            <TornFrame>
              <VideoEmbed
                url={site.reel.url}
                title={`${site.name} — ${site.reel.title}`}
              />
            </TornFrame>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section id="work" className="mx-auto max-w-[1600px] px-6 pt-28 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display rough text-[clamp(2.25rem,4.5vw,3.5rem)]">
            Selected Work
          </h2>
          <Link
            href="/work"
            className="pb-2 text-sm tracking-[0.12em] lowercase text-ink-soft transition-colors hover:text-accent"
          >
            see all →
          </Link>
        </div>
        <InkRule className="mt-1 mb-12 text-ink" />

        <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2">
          {work.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
