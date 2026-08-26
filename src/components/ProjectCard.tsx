import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/work";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div
        className="relative w-full overflow-hidden bg-neutral-900"
        style={{ aspectRatio: "16 / 9" }}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-base tracking-wide">{project.title}</h3>
        <span className="shrink-0 text-xs opacity-40">{project.year}</span>
      </div>
      <p className="mt-1 text-sm opacity-50">
        {[project.client, project.format].filter(Boolean).join(" · ")}
      </p>
    </Link>
  );
}
