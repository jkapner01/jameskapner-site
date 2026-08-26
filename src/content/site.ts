/**
 * SITE CONTENT — edit this file to change the words on the site.
 * Everything here is plain text. No code knowledge required.
 */

export const site = {
  name: "James Kapner",
  role: "Film Director",
  location: "Los Angeles, CA",

  /** Used in the browser tab and by Google. Keep under ~60 characters. */
  title: "James Kapner — Film Director | Los Angeles",

  /** The one-sentence description Google and AI search engines read first. */
  description:
    "James Kapner is a Los Angeles–based film director working across narrative features, commercials, and branded content.",

  /** Short line under the name on the homepage. */
  tagline: "Director of narrative, commercial, and branded film.",

  /** The main reel that plays at the top of the homepage. */
  reel: {
    // Paste a Vimeo or YouTube link here.
    url: "https://vimeo.com/76979871",
    title: "Director's Reel",
    // Optional: a poster image in /public, e.g. "/reel-poster.jpg"
    poster: "",
  },

  /** The About page. Write in full paragraphs — one string per paragraph. */
  about: [
    "James Kapner is a film director based in Los Angeles. His work spans narrative features, commercial campaigns, and branded content, unified by a focus on character, restraint, and a distinct visual point of view.",
    "He has directed a feature film alongside work for brands and agencies, and continues to develop original narrative projects.",
  ],

  /** Selected press, festivals, or awards. Remove any you don't need. */
  recognition: [
    // { label: "Festival Name — Official Selection", year: "2024" },
  ] as { label: string; year?: string; url?: string }[],

  contact: {
    email: "hello@jameskapner.com",
    // Optional — leave as "" to hide.
    representation: "",
  },

  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "LinkedIn", url: "https://linkedin.com/in/" },
    { label: "IMDb", url: "" },
  ],

  /** Canonical production URL. Update once the domain is live. */
  url: "https://jameskapner.com",
};

export type Site = typeof site;
