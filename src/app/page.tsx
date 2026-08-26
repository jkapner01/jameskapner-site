import Link from "next/link";
import { site } from "@/content/site";
import { featured } from "@/content/work";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  const work = featured();

  return (
    <>
      {/* Reel */}
      <section className="mx-auto max-w-6xl px-6 pt-12 sm:pt-16">
        <VideoEmbed url={site.reel.url} title={`${site.name} — ${site.reel.title}`} />
      </section>

      {/* Name + positioning. This block is what search engines read first. */}
      <section className="mx-auto max-w-6xl px-6 pt-12 sm:pt-16">
        <h1 className="text-4xl leading-[1.05] tracking-tight sm:text-6xl">
          {site.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg opacity-60 sm:text-xl">
          {site.role} based in {site.location}. {site.tagline}
        </p>
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-6xl px-6 pt-20">
        <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
          <h2 className="text-sm tracking-[0.2em] uppercase opacity-60">
            Selected Work
          </h2>
          <Link
            href="/work"
            className="text-sm opacity-60 transition-opacity hover:opacity-100"
          >
            All work →
          </Link>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {work.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
