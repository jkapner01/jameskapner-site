"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";

const links = [
  { href: "/work", label: "work" },
  { href: "/resume", label: "resume" },
  { href: "/press", label: "press" },
  { href: "/contact", label: "contact" },
];

/**
 * Top HUD. Sits over the reel on the homepage and pins to the top of
 * interior pages. `overlay` drops the panel fill so the video shows through.
 */
export function HudBar({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Over footage, mid-grey reads as noise — lift the idle state.
  const idle = overlay ? "text-white/75" : "text-dim";

  return (
    <header
      className={`pointer-events-auto ${
        overlay
          ? "absolute inset-x-0 top-0 z-30"
          : "sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between gap-6 px-4 py-4 sm:px-6">
        {/* identity */}
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="header-font text-[19.2px] transition-colors group-hover:text-signal">
            {site.name}
          </span>
          <span className={`label hidden sm:inline ${overlay ? "text-white/60" : "text-dim"}`}>
            {site.role} — {site.location.replace(", CA", "")}
          </span>
        </Link>

        <nav className="hidden sm:block">
          <ul className="flex items-center gap-6">
            {links.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`label transition-colors hover:text-signal ${
                      active ? "text-signal" : idle
                    }`}
                  >
                    <span className="text-white/25">
                      {active ? "[" : ""}
                    </span>
                    {l.label}
                    <span className="text-white/25">{active ? "]" : ""}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`label border border-line px-2 py-1 sm:hidden ${overlay ? "bg-black/50 text-white/80 backdrop-blur-sm" : "text-dim"}`}
        >
          {open ? "close" : "menu"}
        </button>
      </div>

      {open && (
        <ul className="border-t border-line bg-bg/95 px-4 pb-4 backdrop-blur-md sm:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="label block py-3 text-fg"
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
