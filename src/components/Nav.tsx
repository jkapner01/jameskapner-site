"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";

const links = [
  { href: "/work", label: "selected work" },
  { href: "/resume", label: "resume" },
  { href: "/press", label: "press" },
  { href: "/contact", label: "contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const home = pathname === "/";

  return (
    <header className="relative z-50">
      <nav className="mx-auto flex max-w-[1600px] items-start justify-between gap-6 px-6 pt-9 sm:px-10">
        {/* On the homepage the name is the headline, so the mark is hidden here. */}
        <Link
          href="/"
          className={`display rough text-2xl transition-opacity hover:opacity-60 sm:text-3xl ${
            home ? "invisible" : ""
          }`}
          aria-hidden={home}
          tabIndex={home ? -1 : undefined}
        >
          {site.name}
        </Link>

        <ul className="hidden items-center gap-9 pt-2 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-[15px] tracking-[0.06em] lowercase transition-colors hover:text-accent ${
                  pathname.startsWith(l.href) ? "text-accent" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="pt-2 text-[15px] tracking-[0.06em] lowercase sm:hidden"
        >
          {open ? "close" : "menu"}
        </button>
      </nav>

      {open && (
        <ul className="mx-6 mt-6 border-t border-ink/20 pt-2 sm:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-xl lowercase"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
