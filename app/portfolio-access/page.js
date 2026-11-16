import { Suspense } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PortfolioAccessForm from "../components/portfolio-access-form";
import { CheckList, container } from "../components/section";
import { Eyebrow } from "../components/buttons";
import { safeNextPath } from "../lib/portfolio-access";

export const metadata = {
  title: "View our work | IBMS3D",
  description: "Enter your email to open the IBMS3D portfolio.",
  robots: { index: false, follow: false },
};

const inside = [
  "3D floor plans, before and after",
  "Equipment graphics and critical rooms",
  "Building and campus models",
];

// Reads searchParams, so it renders inside <Suspense>.
async function FormWithDestination({ searchParams }) {
  const { next } = await searchParams;
  return <PortfolioAccessForm next={safeNextPath(next)} />;
}

export default function PortfolioAccessPage({ searchParams }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface">
        <div className={`${container} grid items-start gap-8 pb-24 pt-14 sm:pt-18 lg:grid-cols-[minmax(0,1fr)_340px]`}>
          <div className="flex min-w-0 flex-col gap-8 rounded-[20px] border border-line bg-white p-5 sm:p-10">
            <div className="flex max-w-150 flex-col gap-4">
              <Eyebrow>Our work</Eyebrow>
              <h1 className="font-heading text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-.02em]">
                Enter your email to view the portfolio
              </h1>
              <p className="text-base leading-relaxed text-ink-soft">
                You only need to do this once on this browser.
              </p>
            </div>
            <Suspense fallback={<PortfolioAccessForm />}>
              <FormWithDestination searchParams={searchParams} />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-5 rounded-[20px] bg-brand-dark p-8 text-[#f5f8f7]">
            <Eyebrow light>What&apos;s inside</Eyebrow>
            <CheckList items={inside} className="gap-2.5 text-[15px] leading-normal text-mist-light" />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
