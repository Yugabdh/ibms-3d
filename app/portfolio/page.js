import { Suspense } from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import WorkGallery, { WorkGallerySkeleton } from "../components/work-gallery";
import { Button, Eyebrow } from "../components/buttons";
import { ImageSlot } from "../components/illustrations";
import { container } from "../components/section";
import { destinationPages } from "../config/navigation";
import { images } from "../config/images";
import { pageMetadata } from "../lib/seo";

const page = destinationPages.portfolio;

export const metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: "/portfolio",
  image: images.officeLevel4,
});

export default function PortfolioPage({ searchParams }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface">
        <div className={`${container} flex flex-col gap-12 pb-24 pt-14 sm:pt-18`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-170 flex-col gap-4">
              <Eyebrow>Work</Eyebrow>
              <h1 className="font-heading text-[clamp(2.375rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-.02em]">
                {page.title}
              </h1>
            </div>
            <p className="max-w-100 text-base leading-relaxed text-ink-soft">{page.description}</p>
          </div>

          <section
            aria-label="Featured project"
            className="flex flex-col gap-7 rounded-[20px] bg-brand-dark p-6 text-[#f5f8f7] sm:p-9"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <Eyebrow light>Featured · 3D Floor Plan</Eyebrow>
                <h2 className="font-heading text-[clamp(1.5rem,2.6vw,1.875rem)] font-normal">
                  Office Level 4 — from drawing to BMS graphic
                </h2>
              </div>
              <span className="text-sm text-mist">Workstations, cores and meeting wing, ready for zone tags</span>
            </div>
            <div className="grid items-stretch gap-5 md:grid-cols-[1fr_auto_1.6fr]">
              <div className="flex min-w-0 flex-col gap-2.5">
                <div className="font-mono text-xs text-mist">BEFORE · AutoCAD .dwg</div>
                {/* TODO: add the 2D CAD plan for this floor to app/config/images.js and show it here. */}
                <ImageSlot dark label="2D CAD drawing for this floor" note="Plan view image coming soon" className="min-h-65 grow" />
              </div>
              <div className="flex items-center justify-center">
                <FiArrowRight aria-hidden="true" className="h-8 w-8 rotate-90 text-brand-accent md:rotate-0" />
              </div>
              <div className="flex min-w-0 flex-col gap-2.5">
                <div className="font-mono text-xs text-brand-accent">AFTER · layered 3D graphic</div>
                <div className="rounded-xl bg-[#12282b] p-5">
                  <Image
                    src={images.officeLevel4.src}
                    alt={images.officeLevel4.alt}
                    width={images.officeLevel4.width}
                    height={images.officeLevel4.height}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    preload
                    className="block h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </section>

          <Suspense fallback={<WorkGallerySkeleton />}>
            <WorkGallery searchParams={searchParams} />
          </Suspense>

          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line bg-white px-6 py-7 sm:px-8">
            <div className="flex flex-col gap-1.5">
              <span className="font-heading text-[22px]">Need a graphic you don&apos;t see here?</span>
              <span className="text-[15px] text-ink-soft">If it&apos;s in your drawings or equipment schedule, we can model it.</span>
            </div>
            <Button href="/contact" size="lg" arrow={false}>Send your drawings</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
