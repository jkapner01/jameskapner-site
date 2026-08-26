import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}, ${site.role.toLowerCase()} based in ${site.location}.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-16 sm:pt-24">
      <h1 className="text-3xl tracking-tight sm:text-4xl">Contact</h1>

      <p className="mt-6 max-w-xl text-lg opacity-60">
        For narrative, commercial, and branded projects.
      </p>

      <div className="mt-12 space-y-8 border-t border-white/10 pt-10">
        <Row label="Email">
          <a
            href={`mailto:${site.contact.email}`}
            className="underline underline-offset-4 hover:opacity-60"
          >
            {site.contact.email}
          </a>
        </Row>

        {site.contact.representation && (
          <Row label="Representation">{site.contact.representation}</Row>
        )}

        <Row label="Based in">{site.location}</Row>

        {site.socials.some((s) => s.url) && (
          <Row label="Elsewhere">
            <span className="flex flex-wrap gap-x-6 gap-y-2">
              {site.socials
                .filter((s) => s.url)
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 hover:opacity-60"
                  >
                    {s.label}
                  </a>
                ))}
            </span>
          </Row>
        )}
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[10rem_1fr]">
      <span className="text-sm tracking-[0.15em] uppercase opacity-40">
        {label}
      </span>
      <span className="text-lg">{children}</span>
    </div>
  );
}
