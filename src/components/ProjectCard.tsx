import Link from "next/link";
import Image from "next/image";
import { categories, type Project } from "@/content/work";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const categoryLabel = categories.find((c) => c.slug === project.category)?.label;

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block border border-line bg-panel transition-colors hover:border-signal/60"
    >
      <div
        className="relative w-full overflow-hidden bg-black"
        style={{ aspectRatio: "16 / 9" }}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
        />
        <span className="label absolute top-2 left-2 bg-black/70 px-1.5 py-1 text-dim">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-4 border-t border-line px-3 py-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-medium transition-colors group-hover:text-signal">
            {project.title}
          </h3>
          <p className="label mt-1 truncate text-dim">
            {project.client ? `${categoryLabel} / ${project.client}` : project.format}
          </p>
        </div>
        <span className="label shrink-0 tabular-nums text-dim">
          {project.year}
        </span>
      </div>
    </Link>
  );
}
