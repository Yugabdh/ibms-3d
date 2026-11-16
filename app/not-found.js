import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Button, Eyebrow } from "./components/buttons";
import { container } from "./components/section";

export const metadata = {
  title: "Page not found | IBMS3D",
};

const destinations = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "IBMS3D Platform", href: "/#platform" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface">
        <div className={`${container} pb-24 pt-14 sm:pt-18`}>
          <div className="flex flex-col gap-8 rounded-[20px] border border-line bg-white p-5 sm:p-10">
            <div className="flex max-w-150 flex-col gap-4">
              <Eyebrow>404 / Page not found</Eyebrow>
              <h1 className="font-heading text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-.02em]">
                This page isn&apos;t in the model.
              </h1>
              <p className="text-base leading-relaxed text-ink-soft">
                The link may be out of date, or the page may have moved. Start from the home page or pick a section
                below.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href="/" size="lg">
                Back to home
              </Button>
              <Button href="/contact" size="lg" variant="lightOutline" arrow={false}>
                Contact us
              </Button>
            </div>

            <nav aria-label="Popular pages" className="border-t border-line pt-6">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {destinations.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="inline-flex min-h-11 items-center text-sm font-medium text-brand-primary transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
