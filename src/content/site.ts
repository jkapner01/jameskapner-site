/**
 * SITE CONTENT — edit this file to change the words on the site.
 * Everything here is plain text. No code knowledge required.
 */

export const site = {
  name: "James Kapner",
  role: "Film Director",
  location: "Los Angeles, CA",

  /** Browser tab + Google result headline. Keep under ~60 characters. */
  title: "James Kapner — Film Director | Los Angeles",

  /** The sentence Google and AI search engines read first. */
  description:
    "James Kapner is an award-winning Los Angeles based film director whose work spans feature films, shorts, commercials, branded content, and music videos.",

  /**
   * Homepage bio. The first paragraph is written to follow the name,
   * so it opens with "is an award winning..." — that's intentional.
   */
  intro: [
    "is an award winning Los Angeles based film director whose work spans across feature films, shorts, commercials, and an extensive catalog of branded content and music videos.",
    "He is noted for a refined visual style and sensibility that often incorporates a sumptuous atmosphere, vibrant color palettes, and a deft blend of dark humor and suspense.",
  ],

  /** The reel that fills the homepage. */
  reel: {
    // Unlisted Vimeo links keep their privacy hash — don't trim it.
    url: "https://vimeo.com/295650365/03e93492ae",
    title: "RUNNERS Director Reel",
    /** First frame, shown while the player loads. In /public. */
    poster: "/reel-poster.jpg",
  },

  /** Longer bio for the resume page. Full sentences, one string per paragraph. */
  about: [
    "James Kapner is an award winning Los Angeles based film director whose work spans across feature films, shorts, commercials, and an extensive catalog of branded content and music videos.",
    "He is noted for a refined visual style and sensibility that often incorporates a sumptuous atmosphere, vibrant color palettes, and a deft blend of dark humor and suspense.",
  ],

  /** Resume page. Delete any section you don't want — empty ones disappear. */
  resume: {
    /** Optional PDF in /public, e.g. "/james-kapner-resume.pdf". "" hides the link. */
    pdf: "",
    sections: [
      {
        heading: "Film",
        entries: [
          // { title: "Feature Title", role: "Director", detail: "Production Co.", year: "2024" },
        ],
      },
      {
        heading: "Commercial & Branded",
        entries: [
          // { title: "Client", role: "Director", detail: "Agency", year: "2024" },
        ],
      },
      {
        heading: "Awards & Festivals",
        entries: [
          // { title: "Festival Name", role: "Official Selection", detail: "", year: "2024" },
        ],
      },
    ] as {
      heading: string;
      entries: { title: string; role?: string; detail?: string; year?: string }[];
    }[],
  },

  /** Press page. Each item is a link out to the article. */
  press: [
    // { outlet: "Publication", headline: "Title of the piece", url: "https://", year: "2024" },
  ] as { outlet: string; headline: string; url?: string; year?: string }[],

  contact: {
    email: "hello@jameskapner.com",
    /** Optional — leave "" to hide the row. */
    representation: "",
  },

  socials: [
    { label: "Instagram", url: "" },
    { label: "LinkedIn", url: "" },
    { label: "IMDb", url: "" },
    { label: "Vimeo", url: "" },
  ],

  /** Canonical production URL. Update when the domain goes live. */
  url: "https://jameskapner.com",
};

export type Site = typeof site;
