import { embedUrl } from "@/lib/video";

export function VideoEmbed({
  url,
  title,
  className = "",
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const src = embedUrl(url);
  if (!src) return null;

  return (
    <div
      className={`relative w-full overflow-hidden bg-neutral-950 ${className}`}
      style={{ aspectRatio: "16 / 9" }}
    >
      <iframe
        src={src}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
