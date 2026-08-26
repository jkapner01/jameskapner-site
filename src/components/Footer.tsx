import { site } from "@/content/site";
import { InkRule } from "@/components/Texture";

export function Footer() {
  const socials = site.socials.filter((s) => s.url);

  return (
    <footer className="mx-auto mt-32 max-w-[1600px] px-6 pb-14 sm:px-10">
      <InkRule className="text-ink" />
      <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="display rough text-3xl">{site.name}</p>
          <p className="mt-1 text-sm text-ink-soft lowercase">
            {site.role} · {site.location}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm lowercase">
          {site.contact.email && (
            <a
              href={`mailto:${site.contact.email}`}
              className="text-ink-soft transition-colors hover:text-accent"
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
              className="text-ink-soft transition-colors hover:text-accent"
            >
              {s.label.toLowerCase()}
            </a>
          ))}
        </div>
      </div>

      <p className="mt-10 text-xs text-ink-soft/60">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
