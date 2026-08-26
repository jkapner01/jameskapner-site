import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects, categories } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/work`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/resume`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/press`, lastModified: now, priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, priority: 0.7 },
    ...categories.map((c) => ({
      url: `${site.url}/work?c=${c.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
