/**
 * WORK — every project on the site lives in this list.
 * To add a project, copy an existing block and change the values.
 * To reorder, move a block up or down. To hide one, delete it.
 */

export const categories = [
  { slug: "narrative", label: "Narrative" },
  { slug: "commercial", label: "Commercial" },
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
  /** Optional credits, one per line. */
  credits?: { role: string; name: string }[];
  /** Show on the homepage's selected work strip. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "feature-film",
    title: "Feature film title",
    category: "narrative",
    format: "Feature Film",
    year: "2024",
    video: "https://www.youtube.com/watch?v=nTItUEujzCw",
    thumbnail: "/work/placeholder.svg",
    description:
      "Replace this with a short synopsis of the feature — one or two sentences that read well in a search result.",
    credits: [
      { role: "Director", name: "James Kapner" },
      { role: "Cinematographer", name: "—" },
    ],
    featured: true,
  },
  {
    slug: "short-film",
    title: "Short film title",
    category: "narrative",
    format: "Short Film",
    year: "2023",
    video: "",
    thumbnail: "/work/placeholder.svg",
    description: "A one-line description of the short.",
    featured: true,
  },
  {
    slug: "commercial-spot",
    title: "Commercial spot",
    category: "commercial",
    format: "Spot",
    client: "Client Name",
    year: "2024",
    video: "",
    thumbnail: "/work/placeholder.svg",
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
