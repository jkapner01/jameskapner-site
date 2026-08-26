import type { Metadata } from "next";
import Link from "next/link";
import { categories, projects, type CategorySlug } from "@/content/work";
import { ProjectCard } from "@/components/ProjectCard";
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
    <section className="mx-auto max-w-6xl px-6 pt-16 sm:pt-24">
      <WorkJsonLd />

      <h1 className="text-3xl tracking-tight sm:text-4xl">Work</h1>

      {/* Tabs — each is a real, crawlable URL */}
      <nav className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-b border-white/10 pb-4">
        <Tab href="/work" label="All" active={!active} />
        {categories.map((c) => (
          <Tab
            key={c.slug}
            href={`/work?c=${c.slug}`}
            label={c.label}
            active={active === c.slug}
          />
        ))}
      </nav>

      <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-12 opacity-50">Nothing here yet.</p>
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
      className={`text-sm tracking-[0.15em] uppercase transition-opacity ${
        active ? "opacity-100" : "opacity-40 hover:opacity-70"
      }`}
    >
      {label}
    </Link>
  );
}
