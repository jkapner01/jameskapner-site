import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}, ${site.role.toLowerCase()} based in ${site.location}.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  const socials = site.socials.filter((s) => s.url);

  return (
    <section className="mx-auto max-w-4xl px-6 pt-14 sm:px-10">
      <PageHeading>Contact</PageHeading>

      <p className="mt-10 max-w-xl text-lg leading-[1.55]">
        For features, commercials, branded content, and music videos.
      </p>

      <div className="mt-12 space-y-8 border-t border-ink/20 pt-10">
        <Row label="email">
          <a
            href={`mailto:${site.contact.email}`}
            className="underline underline-offset-4 transition-colors hover:text-accent"
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
            <span className="flex flex-wrap gap-x-6 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-accent"
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

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[11rem_1fr]">
      <span className="text-sm tracking-[0.08em] lowercase text-ink-soft">
        {label}
      </span>
      <span className="text-lg">{children}</span>
    </div>
  );
}
