/**
 * WORK — every project on the site lives in this list.
 * To add a project, copy an existing block and change the values.
 * To reorder, move a block up or down. To hide one, delete it.
 */

export const categories = [
  { slug: "narrative", label: "Narrative" },
  { slug: "commercial", label: "Commercial" },
  { slug: "music-video", label: "Music Video" },
  { slug: "branded", label: "Branded" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export type Project = {
  /** URL-safe id. Shows up as /work/this-part */
  slug: string;
  title: string;
  category: CategorySlug;
  /** e.g. "Feature Film", "Spot", "Campaign" */
  format: string;
  client?: string;
  year: string;
  /** Vimeo or YouTube link. Leave "" for a stills-only project. */
  video: string;
  /** Thumbnail in /public/work — e.g. "/work/name.jpg" */
  thumbnail: string;
  /** One or two sentences. Shown on the project page and read by search engines. */
  description: string;
  /** Optional logline, shown italicized as its own paragraph below the description. */
  logline?: string;
  /** Optional credits, one per line. */
  credits?: { role: string; name: string }[];
  /** Show on the homepage's selected work strip. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "feature-film",
    title: "The Estate",
    category: "narrative",
    format: "Feature Film",
    year: "2021",
    video: "https://www.youtube.com/watch?v=nTItUEujzCw",
    thumbnail: "/work/the-estate.png",
    description:
      "Kapner's directorial debut is The Estate, a dark comedic thriller that made its North American premiere at Newport Beach Film Festival in 2020, and its streaming premiere on Hulu.",
    logline:
      "When a narcissistic son (Chris Baker), yearning for a life of luxury, and his father's erratic gold-digging wife (Eliza Coupe) decide to kill their way into their inheritance, they employ the help of an absurdly handsome, mysterious hitman (Greg Finley), initiating a psychosexual love triangle that spirals into more than anyone bargained for. Deftly balancing sharp humor and horror, THE ESTATE delivers a perfectly campy, wildly enjoyable thrill ride that Rob Rector of FILM THREAT gave \"....9 stars out of 10\".",
    credits: [
      { role: "Director", name: "James Kapner" },
      { role: "Cinematographer", name: "—" },
    ],
    featured: true,
  },
  {
    slug: "commercial-spot",
    title: "Chris Pratt x The Perfect Pant",
    category: "commercial",
    format: "Spot",
    client: "TravisMathew",
    year: "2024",
    video: "https://www.youtube.com/watch?v=xdCGayDmFP0",
    thumbnail: "/work/commercial-spot.png",
    description: "A one-line description of the spot and what it was for.",
    featured: true,
  },
  {
    slug: "easton-spot",
    title: "Commercial spot",
    category: "commercial",
    format: "Spot",
    client: "Client Name",
    year: "2024",
    video: "https://vimeo.com/444627797",
    thumbnail: "/work/easton-spot.png",
    description: "A one-line description of the spot and what it was for.",
    featured: true,
  },
  {
    slug: "branded-campaign",
    title: "Branded campaign",
    category: "branded",
    format: "Campaign",
    client: "Brand Name",
    year: "2023",
    video: "",
    thumbnail: "/work/placeholder.svg",
    description: "A one-line description of the branded piece.",
    featured: true,
  },
];

export const featured = () => projects.filter((p) => p.featured);
export const byCategory = (c: CategorySlug) =>
  projects.filter((p) => p.category === c);
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
/** Description + logline combined into one string, for SEO metadata and JSON-LD. */
export const fullDescription = (p: Project) =>
  [p.description, p.logline].filter(Boolean).join(" ");
