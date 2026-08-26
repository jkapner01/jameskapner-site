import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Resume",
  description: `Filmography, commercial work, and awards for ${site.name}, ${site.role.toLowerCase()} based in ${site.location}.`,
  alternates: { canonical: "/resume" },
};

export default function Resume() {
  const sections = site.resume.sections.filter((s) => s.entries.length > 0);

  return (
    <PageShell slug="resume" title="Resume">
      <div className="mt-8 max-w-2xl space-y-5 leading-relaxed text-dim">
        {site.about.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {site.resume.pdf && (
        <a
          href={site.resume.pdf}
          className="label mt-6 inline-block border border-line px-3 py-2 text-dim transition-colors hover:border-signal hover:text-signal"
        >
          download pdf ↓
        </a>
      )}

      {sections.map((section) => (
        <section key={section.heading} className="mt-12">
          <h2 className="label border-b border-line pb-2 text-white/30">
            {section.heading}
          </h2>
          <dl>
            {section.entries.map((e) => (
              <div
                key={`${e.title}-${e.year ?? ""}`}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-3"
              >
                <div className="min-w-0">
                  <dt className="font-medium">{e.title}</dt>
                  {(e.role || e.detail) && (
                    <dd className="label mt-1 text-dim">
                      {[e.role, e.detail].filter(Boolean).join(" / ")}
                    </dd>
                  )}
                </div>
                {e.year && (
                  <dd className="label shrink-0 tabular-nums text-dim">
                    {e.year}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </section>
      ))}

      {sections.length === 0 && (
        <p className="label mt-12 text-dim">credits pending</p>
      )}
    </PageShell>
  );
}
