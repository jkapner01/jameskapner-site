/**
 * Structured data. This is what Google, and increasingly AI assistants,
 * read to understand who James is and what he has made.
 */
import { site } from "@/content/site";
import { projects } from "@/content/work";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    email: site.contact.email ? `mailto:${site.contact.email}` : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      addressCountry: "US",
    },
    knowsAbout: [
      "Film directing",
      "Narrative filmmaking",
      "Commercial directing",
      "Branded content",
    ],
    sameAs: site.socials.filter((s) => s.url).map((s) => s.url),
    worksFor: undefined,
    hasOccupation: {
      "@type": "Occupation",
      name: "Film Director",
      occupationLocation: {
        "@type": "City",
        name: "Los Angeles",
      },
    },
  };

  return <Script json={data} />;
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    author: { "@type": "Person", name: site.name },
  };
  return <Script json={data} />;
}

export function WorkJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Films directed by ${site.name}`,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": p.format.toLowerCase().includes("feature")
          ? "Movie"
          : "VideoObject",
        name: p.title,
        description: p.description,
        url: `${site.url}/work/${p.slug}`,
        director: { "@type": "Person", name: site.name },
      },
    })),
  };
  return <Script json={data} />;
}

export function ProjectJsonLd({ slug }: { slug: string }) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return null;

  const isFeature = p.format.toLowerCase().includes("feature");
  const data = {
    "@context": "https://schema.org",
    "@type": isFeature ? "Movie" : "VideoObject",
    name: p.title,
    description: p.description,
    url: `${site.url}/work/${p.slug}`,
    ...(isFeature ? { dateCreated: p.year } : { uploadDate: `${p.year}-01-01` }),
    director: { "@type": "Person", name: site.name, url: site.url },
    ...(p.client && {
      productionCompany: { "@type": "Organization", name: p.client },
    }),
  };
  return <Script json={data} />;
}

function Script({ json }: { json: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
