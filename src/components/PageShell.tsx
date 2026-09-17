import { HudBar } from "@/components/HudBar";
import { SiteFooter } from "@/components/SiteFooter";

/** Interior pages: HUD on top, content on the dark ground, readouts below. */
export function PageShell({
  title,
  sectionHeader = false,
  children,
}: {
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
          <div className="border-b border-line pb-4">
            <h1
              className={
                sectionHeader
                  ? "header-font text-[36px] sm:text-[43.2px]"
                  : "text-2xl font-medium tracking-[0.02em] sm:text-3xl"
              }
            >
              {title}
            </h1>
          </div>
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
