import { embedUrl } from "@/lib/video";

export function VideoEmbed({
  url,
  title,
  placeholder = "reel coming soon",
  className = "",
}: {
  url: string;
  title: string;
  placeholder?: string;
  className?: string;
}) {
  const src = embedUrl(url);

  return (
    <div
      className={`relative w-full overflow-hidden bg-paper-deep/55 ${className}`}
      style={{ aspectRatio: "16 / 9" }}
    >
      {src ? (
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm tracking-[0.18em] lowercase text-ink-soft/60">
            {placeholder}
          </span>
        </div>
      )}
    </div>
  );
}
