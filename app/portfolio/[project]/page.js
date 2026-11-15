import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ProjectCard from "../../components/project-card";
import { Button, Eyebrow } from "../../components/buttons";
import { Illustration, ImageSlot } from "../../components/illustrations";
import { TagList, container } from "../../components/section";
import { categoryLabels, filterHref, projects, workCategories } from "../../config/work";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ project: slug }));
}

export async function generateMetadata({ params }) {
  const { project: slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return project
    ? { title: `${project.title} | IBMS3D`, description: project.description }
    : { title: "Project not found | IBMS3D" };
}

export default async function ProjectPage({ params }) {
  const { project: slug } = await params;

  // Old category URLs (/portfolio/critical-rooms, used by the navbar dropdown) open the filtered list.
  if (workCategories.some((category) => category.slug === slug)) {
    redirect(filterHref(slug));
  }

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const sameCategory = projects.filter((item) => item.category === project.category && item.slug !== project.slug);
  const related = (sameCategory.length ? sameCategory : projects.filter((item) => item.slug !== project.slug)).slice(0, 3);
  const categoryLabel = categoryLabels[project.category];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface">
        <div className={`${container} flex flex-col gap-12 pb-24 pt-14 sm:pt-18`}>
          <Link
            href="/portfolio"
            className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-brand-primary transition-colors hover:text-brand-dark"
          >
            <FiArrowLeft aria-hidden="true" className="h-4 w-4" />
            All work
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-170 flex-col gap-4">
              <Eyebrow>{categoryLabel}</Eyebrow>
              <h1 className="font-heading text-[clamp(2.375rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-.02em]">
                {project.title}
              </h1>
            </div>
            <p className="max-w-100 text-base leading-relaxed text-ink-soft">{project.description}</p>
          </div>

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="overflow-hidden rounded-[20px] border border-line bg-white">
              {project.image ? (
                <Illustration
                  image={project.image}
                  fit={project.fit}
                  preload
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  aspect="aspect-[1.65]"
                />
              ) : (
                <ImageSlot label={project.slot} className="aspect-[1.65]" />
              )}
            </div>

            <aside className="flex flex-col gap-5">
              <dl className="flex flex-col rounded-[20px] border border-line bg-white p-7">
                <div className="flex flex-col gap-1.5 border-b border-line pb-4">
                  <dt className="text-[11px] font-medium uppercase tracking-[.12em] text-brand-primary">Category</dt>
                  <dd>
                    <Link
                      href={filterHref(project.category)}
                      className="font-heading text-lg font-medium transition-colors hover:text-brand-primary"
                    >
                      {categoryLabel}
                    </Link>
                  </dd>
                </div>
                <div className="flex flex-col gap-2.5 pt-4">
                  <dt className="text-[11px] font-medium uppercase tracking-[.12em] text-brand-primary">Highlights</dt>
                  <dd>
                    <TagList tags={project.tags} />
                  </dd>
                </div>
              </dl>
              <div className="flex flex-col items-start gap-4 rounded-[20px] bg-brand-dark p-7 text-[#f5f8f7]">
                <Eyebrow light>Need one like this?</Eyebrow>
                <p className="text-[15px] leading-relaxed text-mist-light">
                  Send your drawings and we&apos;ll come back with scope, price and timeline.
                </p>
                <Button href="/contact" size="lg" arrow={false}>Send your drawings</Button>
              </div>
            </aside>
          </div>

          <section className="flex flex-col gap-6" aria-labelledby="related-heading">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-heading" className="font-heading text-[clamp(1.5rem,2.6vw,1.875rem)] font-normal">
                {sameCategory.length ? `More ${categoryLabel.toLowerCase()}` : "More work"}
              </h2>
              <Link
                href={filterHref(sameCategory.length ? project.category : "")}
                className="text-sm font-medium text-brand-primary transition-colors hover:text-brand-dark"
              >
                View all
              </Link>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProjectCard project={item} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
