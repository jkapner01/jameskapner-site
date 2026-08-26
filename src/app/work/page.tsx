import type { Metadata } from "next";
import Link from "next/link";
import { categories, projects, type CategorySlug } from "@/content/work";
import { ProjectCard } from "@/components/ProjectCard";
import { PageShell } from "@/components/PageShell";
import { WorkJsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
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
    <PageShell slug="work" title="Selected Work">
      <WorkJsonLd />

      {/* Filters — real URLs, so each category is independently crawlable */}
      <nav className="mt-5 flex flex-wrap items-center gap-2">
        <Tab href="/work" label="all" count={projects.length} active={!active} />
        {categories.map((c) => (
          <Tab
            key={c.slug}
            href={`/work?c=${c.slug}`}
            label={c.label.toLowerCase()}
            count={projects.filter((p) => p.category === c.slug).length}
            active={active === c.slug}
          />
        ))}
      </nav>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="label mt-10 text-dim">no entries</p>
      )}
    </PageShell>
  );
}

function Tab({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`label border px-3 py-2 transition-colors ${
        active
          ? "border-signal text-signal"
          : "border-line text-dim hover:border-dim hover:text-fg"
      }`}
    >
      {label}
      <span className="ml-2 tabular-nums text-white/25">
        {String(count).padStart(2, "0")}
      </span>
    </Link>
  );
}
