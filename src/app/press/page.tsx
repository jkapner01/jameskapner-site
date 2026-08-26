import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Press",
  description: `Press, interviews, and features about ${site.name}.`,
  alternates: { canonical: "/press" },
};

export default function Press() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-14 sm:px-10">
      <PageHeading>Press</PageHeading>

      {site.press.length > 0 ? (
        <ul className="mt-12 border-t border-ink/20">
          {site.press.map((item) => {
            const inner = (
              <>
                <span className="text-sm tracking-[0.06em] lowercase text-ink-soft">
                  {item.outlet}
                </span>
                <span className="mt-1 block text-xl leading-snug transition-colors group-hover:text-accent">
                  {item.headline}
                </span>
              </>
            );

            return (
              <li key={item.headline} className="border-b border-ink/10">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-baseline justify-between gap-6 py-6"
                  >
                    <span>{inner}</span>
                    {item.year && (
                      <span className="shrink-0 text-sm text-ink-soft">
                        {item.year}
                      </span>
                    )}
                  </a>
                ) : (
                  <div className="flex items-baseline justify-between gap-6 py-6">
                    <span>{inner}</span>
                    {item.year && (
                      <span className="shrink-0 text-sm text-ink-soft">
                        {item.year}
                      </span>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-14 lowercase text-ink-soft">press coming soon.</p>
      )}
    </section>
  );
}
