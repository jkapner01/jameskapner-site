import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-16 sm:pt-24">
      <h1 className="text-3xl tracking-tight sm:text-4xl">About</h1>

      <div className="mt-8 space-y-6 text-lg leading-relaxed opacity-80">
        {site.about.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {site.recognition.length > 0 && (
        <div className="mt-16">
          <h2 className="text-sm tracking-[0.2em] uppercase opacity-60">
            Recognition
          </h2>
          <ul className="mt-6 divide-y divide-white/10 border-t border-white/10">
            {site.recognition.map((r) => (
              <li key={r.label} className="flex justify-between gap-6 py-4">
                <span>
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noreferrer" className="hover:opacity-60">
                      {r.label}
                    </a>
                  ) : (
                    r.label
                  )}
                </span>
                {r.year && <span className="shrink-0 opacity-40">{r.year}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-16 border-t border-white/10 pt-8">
        <a
          href={`mailto:${site.contact.email}`}
          className="text-lg underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
        >
          {site.contact.email}
        </a>
      </div>
    </section>
  );
}
