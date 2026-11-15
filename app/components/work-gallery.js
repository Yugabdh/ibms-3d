import Link from "next/link";
import ProjectCard from "./project-card";
import { filterHref, projects, workCategories } from "../config/work";

const filters = [{ slug: "", label: "All" }, ...workCategories];

const chipClasses =
  "inline-flex min-h-11 touch-manipulation items-center gap-2 rounded-full border px-4.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary";

// Server component: filters by the `type` query param, e.g. /portfolio?type=critical-rooms.
// Render it inside <Suspense> because it reads searchParams.
export default async function WorkGallery({ searchParams }) {
  const { type } = await searchParams;
  const activeType = workCategories.some(({ slug }) => slug === type) ? type : "";
  const items = activeType ? projects.filter((project) => project.category === activeType) : projects;

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
        {filters.map(({ slug, label }) => {
          const isActive = slug === activeType;
          const count = slug ? projects.filter((project) => project.category === slug).length : projects.length;
          return (
            <Link
              key={label}
              href={filterHref(slug)}
              scroll={false}
              aria-current={isActive ? "page" : undefined}
              className={`${chipClasses} ${
                isActive
                  ? "border-brand-dark bg-brand-dark text-white"
                  : "border-field bg-white text-brand-dark hover:border-brand-primary"
              }`}
            >
              {label}
              <span className="font-mono text-xs opacity-75">{count}</span>
            </Link>
          );
        })}
      </nav>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Projects">
        {items.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Shown while the filtered list streams in.
export function WorkGallerySkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      <div className="flex flex-wrap gap-2">
        {filters.map(({ label }) => (
          <span key={label} className={`${chipClasses} border-field bg-white text-brand-dark/40`}>
            {label}
          </span>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div key={index} className="h-105 rounded-2xl border border-line bg-white" />
        ))}
      </div>
    </div>
  );
}
