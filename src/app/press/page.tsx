import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Press",
  description: `Press, interviews, and features about ${site.name}.`,
  alternates: { canonical: "/press" },
};

export default function Press() {
  return (
    <PageShell slug="press" title="Press">
      {site.press.length > 0 ? (
        <ul className="mt-8">
          {site.press.map((item) => {
            const body = (
              <>
                <div className="min-w-0">
                  <span className="label text-white/30">{item.outlet}</span>
                  <span className="mt-1 block text-lg leading-snug transition-colors group-hover:text-signal">
                    {item.headline}
                  </span>
                </div>
                {item.year && (
                  <span className="label shrink-0 tabular-nums text-dim">
                    {item.year}
                  </span>
                )}
              </>
            );

            return (
              <li key={item.headline} className="border-b border-line">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-baseline justify-between gap-6 py-5"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="group flex items-baseline justify-between gap-6 py-5">
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="label mt-12 text-dim">no entries</p>
      )}
    </PageShell>
  );
}
