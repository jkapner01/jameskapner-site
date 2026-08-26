import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/work";
import { TornFrame } from "@/components/Texture";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <TornFrame>
        <div
          className="relative w-full overflow-hidden bg-paper-deep"
          style={{ aspectRatio: "16 / 9" }}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
      </TornFrame>

      <div className="mt-6 flex items-baseline justify-between gap-5">
        <h3 className="display rough-soft text-2xl transition-colors group-hover:text-accent sm:text-3xl">
          {project.title}
        </h3>
        <span className="shrink-0 text-sm text-ink-soft">{project.year}</span>
      </div>
      <p className="mt-1 text-sm lowercase text-ink-soft">
        {[project.client, project.format].filter(Boolean).join(" · ")}
      </p>
    </Link>
  );
}
