import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}, ${site.role.toLowerCase()} based in ${site.location}.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  const socials = site.socials.filter((s) => s.url);

  return (
    <PageShell slug="contact" title="Contact" sectionHeader>
      <p className="mt-8 max-w-xl leading-relaxed text-dim">
        For features, commercials, branded content, and music videos.
      </p>

      <dl className="mt-10 max-w-2xl">
        <Row label="email">
          <a
            href={`mailto:${site.contact.email}`}
            className="transition-colors hover:text-signal"
          >
            {site.contact.email}
          </a>
        </Row>
        {site.contact.representation && (
          <Row label="representation">{site.contact.representation}</Row>
        )}
        <Row label="based in">{site.location}</Row>
        {socials.length > 0 && (
          <Row label="elsewhere">
            <span className="flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-signal"
                >
                  {s.label}
                </a>
              ))}
            </span>
          </Row>
        )}
      </dl>
    </PageShell>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1 border-b border-line py-4">
      <dt className="label w-32 shrink-0 pt-1 text-white/30">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
