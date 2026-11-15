import Link from "next/link";
import { Illustration, ImageSlot } from "./illustrations";
import { TagList } from "./section";
import { categoryLabels } from "../config/work";

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:border-[#9db8b6] hover:shadow-[0_14px_32px_rgba(16,37,40,.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
    >
      {project.image ? (
        <Illustration
          image={project.image}
          fit={project.fit}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          aspect="aspect-[1.65]"
        />
      ) : (
        <ImageSlot label={project.slot} className="aspect-[1.65]" />
      )}
      <div className="flex grow flex-col gap-2.5 px-6 pb-6 pt-5.5">
        <div className="text-[11px] font-medium uppercase tracking-[.12em] text-brand-primary">
          {categoryLabels[project.category]}
        </div>
        <h3 className="font-heading text-xl font-medium group-hover:text-brand-primary">{project.title}</h3>
        <p className="text-sm leading-[1.55] text-ink-soft">{project.description}</p>
        <TagList tags={project.tags} className="mt-auto pt-1.5" />
      </div>
    </Link>
  );
}
