/**
 * Video link parsing.
 *
 * Vimeo links for unlisted videos carry a privacy hash as a second path
 * segment — vimeo.com/295650365/03e93492ae. That hash is REQUIRED in the
 * embed as ?h=..., otherwise the player returns "private video".
 * Anything that drops it will silently fail, so it is parsed out here.
 */

export type ParsedVideo =
  | { kind: "vimeo"; id: string; hash?: string }
  | { kind: "youtube"; id: string };

export function parseVideo(url: string): ParsedVideo | null {
  if (!url) return null;

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([0-9a-zA-Z]+))?/);
  if (vimeo) {
    return { kind: "vimeo", id: vimeo[1], hash: vimeo[2] || undefined };
  }

  const youtube = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (youtube) return { kind: "youtube", id: youtube[1] };

  return null;
}

/** Embed URL for a plain iframe (used where custom controls aren't needed). */
export function embedUrl(
  url: string,
  opts: { background?: boolean } = {},
): string | null {
  const v = parseVideo(url);
  if (!v) return null;

  if (v.kind === "vimeo") {
    const p = new URLSearchParams({ dnt: "1", title: "0", byline: "0", portrait: "0" });
    if (v.hash) p.set("h", v.hash);
    if (opts.background) {
      p.set("background", "1");
      p.set("autoplay", "1");
      p.set("loop", "1");
      p.set("muted", "1");
    }
    return `https://player.vimeo.com/video/${v.id}?${p.toString()}`;
  }

  return `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`;
}
