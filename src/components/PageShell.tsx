import { HudBar } from "@/components/HudBar";
import { SiteFooter } from "@/components/SiteFooter";

/** Interior pages: HUD on top, content on the dark ground, readouts below. */
export function PageShell({
  slug,
  title,
  sectionHeader = false,
  children,
}: {
  slug: string;
  title: string;
  /** Use the header display face — reserved for the four top-level section pages. */
  sectionHeader?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <HudBar />
      <main className="flex-1 px-4 pt-12 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
            <h1
              className={
                sectionHeader
                  ? "header-font text-[36px] sm:text-[43.2px]"
                  : "text-2xl font-medium tracking-[0.02em] sm:text-3xl"
              }
            >
              {title}
            </h1>
            <span className="label shrink-0 text-dim">/{slug}</span>
          </div>
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
