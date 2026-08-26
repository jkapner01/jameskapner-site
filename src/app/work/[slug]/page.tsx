import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, bySlug, categories } from "@/content/work";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ProjectJsonLd } from "@/components/JsonLd";
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
    <article className="mx-auto max-w-5xl px-6 pt-12 sm:pt-16">
      <ProjectJsonLd slug={p.slug} />

      {p.video ? (
        <VideoEmbed url={p.video} title={`${p.title} — directed by ${site.name}`} />
      ) : (
        <div
          className="relative w-full overflow-hidden bg-neutral-900"
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

      <header className="mt-10">
        <Link
          href={`/work?c=${p.category}`}
          className="text-xs tracking-[0.2em] uppercase opacity-40 transition-opacity hover:opacity-80"
        >
          {category?.label}
        </Link>
        <h1 className="mt-3 text-3xl tracking-tight sm:text-4xl">{p.title}</h1>
        <p className="mt-2 text-sm opacity-50">
          {[p.client, p.format, p.year].filter(Boolean).join(" · ")}
        </p>
      </header>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed opacity-80">
        {p.description}
      </p>

      {p.credits && p.credits.length > 0 && (
        <dl className="mt-12 grid max-w-md gap-y-3 border-t border-white/10 pt-8 text-sm sm:grid-cols-[10rem_1fr]">
          {p.credits.map((c) => (
            <div key={c.role} className="contents">
              <dt className="opacity-40">{c.role}</dt>
              <dd className="opacity-80">{c.name}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-16 border-t border-white/10 pt-8">
        <Link href="/work" className="text-sm opacity-60 hover:opacity-100">
          ← All work
        </Link>
      </div>
    </article>
  );
}
