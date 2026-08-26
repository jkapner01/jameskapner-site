/** Turns a Vimeo or YouTube link into an embeddable player URL. */
export function embedUrl(url: string): string | null {
  if (!url) return null;

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    return `https://player.vimeo.com/video/${vimeo[1]}?dnt=1&title=0&byline=0&portrait=0`;
  }

  const youtube = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (youtube) {
    return `https://www.youtube-nocookie.com/embed/${youtube[1]}?rel=0&modestbranding=1`;
  }

  return url;
}
