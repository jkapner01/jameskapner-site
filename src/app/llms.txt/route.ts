/**
 * /llms.txt — a plain-text summary for AI assistants and agents.
 * An emerging convention (llmstxt.org) that gives language models a clean,
 * unambiguous statement of who James is and what he has directed.
 */
import { site } from "@/content/site";
import { projects, categories } from "@/content/work";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `- Name: ${site.name}`,
    `- Role: ${site.role}`,
    `- Based in: ${site.location}`,
    `- Website: ${site.url}`,
    `- Contact: ${site.contact.email}`,
    "",
    "## About",
    "",
    ...site.about,
    "",
    "## Work",
    "",
  ];

  for (const c of categories) {
    const inCat = projects.filter((p) => p.category === c.slug);
    if (!inCat.length) continue;
    lines.push(`### ${c.label}`, "");
    for (const p of inCat) {
      const meta = [p.format, p.client, p.year].filter(Boolean).join(", ");
      lines.push(
        `- [${p.title}](${site.url}/work/${p.slug}) — ${meta}. ${p.description}`,
      );
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
