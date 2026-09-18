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
      { role: "Cinematographer", name: "Mike Simpson" },
      { role: "Distributor", name: "Vertical Entertainment" },
    ],
    featured: true,
  },
  {
    slug: "commercial-spot",
    title: "Chris Pratt x The Perfect Pant",
    category: "commercial",
    format: "Spot",
    client: "TravisMathew",
    year: "2022",
    video: "https://www.youtube.com/watch?v=xdCGayDmFP0",
    thumbnail: "/work/commercial-spot.png",
    description:
      "Chris Pratt wistfully ponders whether the TravisMathew Perfect Pant can make him perfect as well. Spoiler alert - probably not.",
    featured: true,
  },
  {
    slug: "easton-spot",
    title: "Stay Ready with Alex Bregman",
    category: "commercial",
    format: "Spot",
    client: "Easton",
    year: "2019",
    video: "https://vimeo.com/444627797",
    thumbnail: "/work/easton-spot.png",
    description:
      "MLB superstar Alex Bregman returns home after a hard fought season. But that doesn't mean his work is done. Get a sneak peek at his HQ, which is furnished with an Easton branded batting cage, so he can be ready 24/7. There are no days off on the path to greatness.",
    featured: true,
  },
  {
    slug: "commercial-spot-3",
    title: "Locomotion",
    category: "commercial",
    format: "Spot",
    client: "Porsche",
    year: "2018",
    video: "https://vimeo.com/306155008",
    thumbnail: "/work/commercial-spot-3.png",
    description: "A cavalcade headed up the coast never looked so good.",
    featured: true,
  },
  {
    slug: "music-video-1",
    title: "Dear Diamond",
    category: "music-video",
    format: "Music Video",
    client: "Mad Decent",
    year: "2014",
    video: "https://www.youtube.com/watch?v=O05xBkCKqaw",
    thumbnail: "/work/music-video-1.png",
    description:
      "Seminal label Mad Decent released this genre bending track from legendary Baltimore multi-instrumentalist/DJ/producer Blaqstarr, who enlisted legacy hip-hop artist Common to add to the melancholic and beautiful framework of the song. The collab elicited something wholly unique, beautiful, and timeless, which the visuals sought to capture in a blend of past, present, and future.",
    logline: "Starring actress Jodie Turner-Smith.",
    featured: true,
  },
  {
    slug: "music-video-2",
    title: "Step Yo Game Up",
    category: "music-video",
    format: "Music Video",
    client: "Mass Appeal",
    year: "2010",
    video: "https://www.youtube.com/watch?v=i2nOLGNjWnk",
    thumbnail: "/work/music-video-2.png",
    description:
      "Legendary member of Jurassic 5 and Ozomatli and one of hip hop's most iconic voices, Chali 2na, stars in this sunshine neo-noir which finds him navigating a byzantine mystery that leads him down a more and more dangerous path to confront his greatest enemy - himself.",
    featured: true,
  },
  {
    slug: "branded-campaign",
    title: "Damnation: Legacy of the Heartland",
    category: "branded",
    format: "Campaign",
    client: "USA Networks",
    year: "2017",
    video: "https://vimeo.com/253307343/d7a373f9d0",
    thumbnail: "/work/damnation.png",
    description:
      "A peek at the real world historical events that inspired the seemingly larger than life prohibition era stories explored in the acclaimed USA Networks show Damnation.",
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
