import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, bySlug, categories } from "@/content/work";
import { VideoEmbed } from "@/components/VideoEmbed";
import { PageShell } from "@/components/PageShell";
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
    <PageShell slug={`work/${p.slug}`} title={p.title}>
      <ProjectJsonLd slug={p.slug} />

      <div className="mt-6">
        {p.video ? (
          <VideoEmbed url={p.video} title={`${p.title} — directed by ${site.name}`} />
        ) : (
          <div
            className="relative w-full overflow-hidden border border-line bg-black"
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
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div>
          <Spec label="category">
            <Link
              href={`/work?c=${p.category}`}
              className="transition-colors hover:text-signal"
            >
              {category?.label.toLowerCase()}
            </Link>
          </Spec>
          <Spec label="format">{p.format.toLowerCase()}</Spec>
          {p.client && <Spec label="client">{p.client}</Spec>}
          <Spec label="year">{p.year}</Spec>

          <p className="mt-8 max-w-2xl leading-relaxed text-dim">
            {p.description}
          </p>
        </div>

        {p.credits && p.credits.length > 0 && (
          <div className="h-fit border border-line bg-panel p-4">
            <p className="label mb-3 text-white/30">credits</p>
            <dl>
              {p.credits.map((c) => (
                <div
                  key={c.role}
                  className="flex justify-between gap-4 border-t border-line py-2 text-sm"
                >
                  <dt className="label text-dim">{c.role}</dt>
                  <dd className="text-right">{c.name}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <Link
        href="/work"
        className="label mt-12 inline-block text-dim transition-colors hover:text-signal"
      >
        ← all work
      </Link>
    </PageShell>
  );
}

function Spec({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 border-b border-line py-2 text-sm">
      <span className="label w-24 shrink-0 pt-0.5 text-white/30">{label}</span>
      <span>{children}</span>
    </div>
  );
}
