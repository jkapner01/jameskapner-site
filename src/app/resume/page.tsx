import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Resume",
  description: `Filmography, commercial work, and awards for ${site.name}, ${site.role.toLowerCase()} based in ${site.location}.`,
  alternates: { canonical: "/resume" },
};

export default function Resume() {
  const sections = site.resume.sections.filter((s) => s.entries.length > 0);

  return (
    <section className="mx-auto max-w-4xl px-6 pt-14 sm:px-10">
      <PageHeading>Resume</PageHeading>

      <div className="mt-10 max-w-2xl space-y-6 text-lg leading-[1.55]">
        {site.about.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {site.resume.pdf && (
        <a
          href={site.resume.pdf}
          className="mt-8 inline-block text-sm lowercase text-ink-soft underline underline-offset-4 transition-colors hover:text-accent"
        >
          download resume (pdf)
        </a>
      )}

      {sections.map((section) => (
        <div key={section.heading} className="mt-16">
          <h2 className="display rough-soft text-3xl">{section.heading}</h2>
          <dl className="mt-5 border-t border-ink/20">
            {section.entries.map((e) => (
              <div
                key={`${e.title}-${e.year ?? ""}`}
                className="grid gap-x-6 gap-y-1 border-b border-ink/10 py-4 sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <dt className="text-lg">{e.title}</dt>
                  {(e.role || e.detail) && (
                    <dd className="mt-0.5 text-sm lowercase text-ink-soft">
                      {[e.role, e.detail].filter(Boolean).join(" · ")}
                    </dd>
                  )}
                </div>
                {e.year && (
                  <dd className="text-sm text-ink-soft sm:text-right">
                    {e.year}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      ))}

      {sections.length === 0 && (
        <p className="mt-14 lowercase text-ink-soft">
          credits coming soon.
        </p>
      )}
    </section>
  );
}
