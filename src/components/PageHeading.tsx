import { InkRule } from "@/components/Texture";

export function PageHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h1 className="display rough text-[clamp(2.75rem,6vw,5rem)]">
        {children}
      </h1>
      <InkRule className="mt-1 text-ink" />
    </div>
  );
}
