import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm tracking-[0.2em] uppercase">{site.name}</p>
          <p className="mt-2 text-sm opacity-50">
            {site.role} · {site.location}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {site.contact.email && (
            <a
              href={`mailto:${site.contact.email}`}
              className="opacity-60 transition-opacity hover:opacity-100"
            >
              {site.contact.email}
            </a>
          )}
          {site.socials
            .filter((s) => s.url)
            .map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="opacity-60 transition-opacity hover:opacity-100"
              >
                {s.label}
              </a>
            ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8 text-xs opacity-30">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
        <Link href="/" className="ml-2 hover:opacity-100">
          jameskapner.com
        </Link>
      </div>
    </footer>
  );
}
