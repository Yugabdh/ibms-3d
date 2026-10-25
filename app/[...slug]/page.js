import { notFound } from "next/navigation";
import Link from "next/link";
import { Illustration } from "../components/illustrations";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Button, Eyebrow } from "../components/buttons";
import { destinationPages } from "../config/navigation";

export function generateStaticParams() {
  return Object.keys(destinationPages).map((path) => ({ slug: path.split("/") }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = destinationPages[slug.join("/")];

  return page
    ? { title: `${page.title} | IBMS3D` }
    : { title: "Page not found | IBMS3D" };
}

export default async function DestinationPage({ params }) {
  const { slug } = await params;
  const page = destinationPages[slug.join("/")];

  if (!page) {
    notFound();
  }

  const relatedPages = page.related
    .map((path) => [path, destinationPages[path]])
    .filter(([, relatedPage]) => relatedPage);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-brand-dark text-[#f5f8f7]">
          <div className="mx-auto grid w-[calc(100%-2rem)] max-w-[1380px] items-center gap-8 py-12 sm:w-[calc(100%-4rem)] sm:py-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-16 lg:py-20">
            <div>
              <Eyebrow light>{page.eyebrow}</Eyebrow>
              <h1 className="mb-4 mt-5 max-w-[620px] font-heading text-[clamp(2.5rem,5vw,4.25rem)] leading-[.99] tracking-[-.045em]">
                {page.title}
              </h1>
              <p className="max-w-[500px] text-xs leading-[1.8] text-[#b1c1c1] sm:text-[13px]">
                {page.description}
              </p>
              <Button href="/contact" className="mt-6">
                Discuss a project
              </Button>
            </div>
            <Illustration variant={page.variant} className="aspect-[1.65]" />
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-14 sm:px-8 sm:py-20">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Explore more</Eyebrow>
              <h2 className="mt-3 font-heading text-[clamp(1.8rem,3vw,2.5rem)] leading-none tracking-[-.04em]">
                Connected views of your building.
              </h2>
            </div>
            <Link
              href="/"
              className="text-xs text-brand-primary transition-colors hover:text-brand-dark"
            >
              Back to home
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPages.map(([path, relatedPage]) => (
              <Link
                key={path}
                href={`/${path}`}
                className="group border border-[#e1e9e7] bg-[#f5f7f6] p-5 transition hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(16,37,40,.09)]"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[.1em] text-brand-primary">
                  {relatedPage.eyebrow}
                </span>
                <h3 className="mt-3 font-heading text-lg tracking-[-.025em] group-hover:text-brand-primary">
                  {relatedPage.title}
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-[#697b7d]">
                  {relatedPage.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
