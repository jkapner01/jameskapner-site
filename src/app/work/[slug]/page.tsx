import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, bySlug, categories } from "@/content/work";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ProjectJsonLd } from "@/components/JsonLd";
import { TornFrame, InkRule } from "@/components/Texture";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return {};

  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: `${p.title} — ${site.name}`,
      description: p.description,
      type: "video.other",
      images: p.thumbnail ? [p.thumbnail] : undefined,
    },
  };
}

export default async function Project({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();

  const category = categories.find((c) => c.slug === p.category);

  return (
    <article className="mx-auto max-w-[1400px] px-6 pt-12 sm:px-10">
      <ProjectJsonLd slug={p.slug} />

      <TornFrame>
        {p.video ? (
          <VideoEmbed
            url={p.video}
            title={`${p.title} — directed by ${site.name}`}
          />
        ) : (
          <div
            className="relative w-full overflow-hidden bg-paper-deep"
            style={{ aspectRatio: "16 / 9" }}
          >
            <Image
              src={p.thumbnail}
              alt={p.title}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        )}
      </TornFrame>

      <div className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <Link
            href={`/work?c=${p.category}`}
            className="text-sm tracking-[0.06em] lowercase text-ink-soft transition-colors hover:text-accent"
          >
            {category?.label.toLowerCase()}
          </Link>
          <h1 className="display rough mt-2 text-[clamp(2.5rem,5.5vw,4.5rem)]">
            {p.title}
          </h1>
          <InkRule className="mt-1 text-ink" />
          <p className="mt-4 text-sm lowercase text-ink-soft">
            {[p.client, p.format, p.year].filter(Boolean).join(" · ")}
          </p>

          <p className="mt-8 max-w-2xl text-lg leading-[1.55]">
            {p.description}
          </p>
        </div>

        {p.credits && p.credits.length > 0 && (
          <dl className="h-fit border-t border-ink/20 pt-6 text-[15px]">
            {p.credits.map((c) => (
              <div
                key={c.role}
                className="flex justify-between gap-6 border-b border-ink/10 py-3"
              >
                <dt className="lowercase text-ink-soft">{c.role}</dt>
                <dd className="text-right">{c.name}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="mt-20">
        <Link
          href="/work"
          className="text-sm lowercase text-ink-soft transition-colors hover:text-accent"
        >
          ← all work
        </Link>
      </div>
    </article>
  );
}
