import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Illustration } from "../components/illustrations";
import { Button, Eyebrow, ExternalArrow } from "../components/buttons";
import { destinationPages } from "../config/navigation";

const page = destinationPages.contact;

const FORM_ACTION = "https://formsubmit.co/darshan@sdiotecs.com";

export const metadata = {
  title: `${page.title} | IBMS3D`,
  description: page.description,
};

const briefSteps = [
  ["01", "The audience", "Who needs to understand the building, and what decisions they make."],
  ["02", "The systems", "Rooms, equipment, service routes or dashboards you want in view."],
  ["03", "The level of detail", "From a campus overview down to a single panel or component."],
];

const labelClasses =
  "mb-1.5 block text-[9px] font-semibold uppercase tracking-[.1em] text-brand-primary";

const fieldClasses =
  "block min-h-11 w-full border border-[#e1e9e7] bg-white px-3.5 py-2.5 text-xs text-brand-dark transition-colors placeholder:text-[#81a09e] hover:border-[#d3e1df] focus:border-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary";

function Field({ id, label, optional = false, className = "", ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {optional && <span className="ml-1 font-normal normal-case tracking-normal text-[#697b7d]">(optional)</span>}
      </label>
      <input id={id} className={fieldClasses} {...props} />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        <section
          id="contact-form"
          className="mx-auto grid max-w-345 scroll-mt-17 items-start gap-10 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-[.8fr_1.2fr] md:gap-16 lg:py-24"
        >
          <div>
            <Eyebrow>Reach Out</Eyebrow>
            <h2 className="mt-3.5 font-heading text-[clamp(2rem,3.6vw,2.95rem)] leading-[.99] tracking-[-.045em]">
              Start with what
              <br />
              needs to be understood.
            </h2>
            <p className="mt-4 max-w-107.5 text-xs leading-[1.75] text-[#697b7d]">
              A few lines are enough to begin. Tell us about the building and the people who need to see it, and we will come back to you with next steps.
            </p>

            <div className="mt-8">
              {briefSteps.map(([number, title, description]) => (
                <article className="border-t border-[#dce5e3] py-4" key={number}>
                  <span className="mb-2 block text-[9px] tracking-[.08em] text-brand-primary">{number}</span>
                  <h3 className="font-heading text-[17px] font-normal tracking-tight">{title}</h3>
                  <p className="mt-1.5 max-w-90 text-[11px] leading-[1.7] text-[#697b7d]">{description}</p>
                </article>
              ))}
            </div>

            <div className="border-t border-[#dce5e3] pt-5">
              <Eyebrow>Prefer email?</Eyebrow>
              <a
                className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium text-brand-primary transition-colors hover:text-brand-dark"
                href="mailto:darshan@sdiotecs.com"
              >
                darshan@sdiotecs.com
                <ExternalArrow className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <form
            action={FORM_ACTION}
            method="POST"
            target="_blank"
            className="border border-[#e1e9e7] bg-[#f5f7f6] p-5 sm:p-8 lg:p-10"
          >
            <input type="hidden" name="_subject" value="New IBMS3D project enquiry" />
            <input type="hidden" name="_template" value="table" />
            {/* Honeypot: bots fill this in, people never see it */}
            <input
              type="text"
              name="_honey"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="mb-6 flex items-center justify-between gap-4 text-[8px] tracking-[.08em] text-[#81a09e]">
              <span>PROJECT ENQUIRY</span>
              <span>ALL FIELDS REQUIRED UNLESS MARKED</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <Field
                id="first-name"
                name="first-name"
                label="First name"
                type="text"
                autoComplete="given-name"
                placeholder="Jane"
                required
              />
              <Field
                id="last-name"
                name="last-name"
                label="Last name"
                type="text"
                autoComplete="family-name"
                placeholder="Doe"
                required
              />
              <Field
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="jane@company.com"
                required
              />
              <Field
                id="company"
                name="company"
                label="Company"
                type="text"
                autoComplete="organization"
                optional
              />
              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClasses}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us about the building, the audience and the views you need."
                  className={`${fieldClasses} resize-y leading-[1.7]`}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit">Send enquiry</Button>
              <p className="text-[10px] leading-relaxed text-[#697b7d]">
                A confirmation opens in a new tab.
              </p>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
