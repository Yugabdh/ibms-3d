import { notFound } from "next/navigation";
import Link from "next/link";
import { Illustration } from "../components/illustrations";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Button, Eyebrow, ExternalArrow } from "../components/buttons";
import { container } from "../components/section";
import { destinationPages } from "../config/navigation";

// These paths have their own route folders under app/ (portfolio/* is handled
// by app/portfolio/[project], which redirects category slugs to the filter).
const dedicatedRoutes = new Set(["portfolio", "contact"]);

// Opt out of Next's dev-only instant-navigation validation. This route calls
// notFound() for every unknown path, and the validator reports that expected
// 404 as "an error prevented the target segment from rendering".
export const instant = false;

export function generateStaticParams() {
  return Object.keys(destinationPages)
    .filter((path) => !dedicatedRoutes.has(path) && !path.startsWith("portfolio/"))
    .map((path) => ({ slug: path.split("/") }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = destinationPages[slug.join("/")];

  return page
    ? { title: `${page.title} | IBMS3D`, description: page.description }
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
          <div className={`${container} grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-14`}>
            <div className="flex flex-col gap-6">
              <Eyebrow light>{page.eyebrow}</Eyebrow>
              <h1 className="max-w-155 font-heading text-[clamp(2.5rem,5vw,3.875rem)] font-normal leading-[1.04] tracking-[-.02em]">
                {page.title}
              </h1>
              <p className="max-w-135 text-base leading-relaxed text-mist-light sm:text-lg">{page.description}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/contact" size="lg">Send your drawings</Button>
                <Button href="/portfolio" size="lg" variant="ghostDark" arrow={false}>See the work</Button>
              </div>
            </div>
            <Illustration
              variant={page.variant}
              preload
              aspect="aspect-[1.65]"
              className="rounded-2xl border border-line-dark"
            />
          </div>
        </section>

        <section className="bg-surface">
          <div className={`${container} flex flex-col gap-10 py-20 sm:py-24`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-col gap-4">
                <Eyebrow>Explore more</Eyebrow>
                <h2 className="font-heading text-[clamp(2rem,3.6vw,2.875rem)] font-normal leading-[1.08] tracking-[-.015em]">
                  Connected views of your building.
                </h2>
              </div>
              <Link href="/" className="text-sm font-medium text-brand-primary transition-colors hover:text-brand-dark">
                Back to home
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPages.map(([path, relatedPage]) => (
                <Link
                  key={path}
                  href={`/${path}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-[#9db8b6] hover:shadow-[0_14px_32px_rgba(16,37,40,.09)]"
                >
                  <span className="text-[11px] font-medium uppercase tracking-[.12em] text-brand-primary">
                    {relatedPage.eyebrow}
                  </span>
                  <h3 className="font-heading text-xl font-medium group-hover:text-brand-primary">{relatedPage.title}</h3>
                  <p className="text-sm leading-[1.55] text-ink-soft">{relatedPage.description}</p>
                  <ExternalArrow className="mt-auto h-4.5 w-4.5 text-brand-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
