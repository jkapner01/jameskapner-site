import { embedUrl } from "@/lib/video";

/** Plain embed for project pages — full Vimeo chrome, no custom transport. */
export function VideoEmbed({
  url,
  title,
  placeholder = "no signal",
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
      className={`relative w-full overflow-hidden border border-line bg-black ${className}`}
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
          <span className="label text-dim">{placeholder}</span>
        </div>
      )}
    </div>
  );
}
