import type { Metadata } from "next";
import Link from "next/link";
import { categories, projects, type CategorySlug } from "@/content/work";
import { ProjectCard } from "@/components/ProjectCard";
import { PageHeading } from "@/components/PageHeading";
import { WorkJsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Selected Work",
  description: `Narrative, commercial, and branded films directed by ${site.name}.`,
  alternates: { canonical: "/work" },
};

export default async function Work({ searchParams }: PageProps<"/work">) {
  const params = await searchParams;
  const raw = typeof params.c === "string" ? params.c : undefined;
  const active = categories.some((c) => c.slug === raw)
    ? (raw as CategorySlug)
    : null;

  const shown = active ? projects.filter((p) => p.category === active) : projects;

  return (
    <section className="mx-auto max-w-[1600px] px-6 pt-14 sm:px-10">
      <WorkJsonLd />

      <PageHeading>Selected Work</PageHeading>

      {/* Tabs — each is a real, crawlable URL, not client-side state. */}
      <nav className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
        <Tab href="/work" label="all" active={!active} />
        {categories.map((c) => (
          <Tab
            key={c.slug}
            href={`/work?c=${c.slug}`}
            label={c.label.toLowerCase()}
            active={active === c.slug}
          />
        ))}
      </nav>

      <div className="mt-14 grid gap-x-10 gap-y-16 sm:grid-cols-2">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-14 lowercase text-ink-soft">nothing here yet.</p>
      )}
    </section>
  );
}

function Tab({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`text-base tracking-[0.06em] lowercase transition-colors ${
        active
          ? "text-accent underline decoration-1 underline-offset-[6px]"
          : "text-ink-soft hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}
