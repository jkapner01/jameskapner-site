import { site } from "@/content/site";

export function SiteFooter() {
  const socials = site.socials.filter((s) => s.url);

  return (
    <footer className="border-t border-line px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <span className="label text-dim">
          {site.name} — {site.role}
        </span>
        <div className="label flex flex-wrap items-center gap-x-6 gap-y-2">
          {site.contact.email && (
            <a
              href={`mailto:${site.contact.email}`}
              className="text-dim transition-colors hover:text-signal"
            >
              {site.contact.email}
            </a>
          )}
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="text-dim transition-colors hover:text-signal"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
