import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Button, Eyebrow } from "../components/buttons";
import { CheckList, container } from "../components/section";
import { destinationPages } from "../config/navigation";

const page = destinationPages.contact;

const FORM_ACTION = "https://formsubmit.co/sales@ibms3d.com";

export const metadata = {
  title: `Project enquiry | IBMS3D`,
  description: page.description,
};

const companyTypes = [
  "System integrator",
  "Equipment or controls OEM",
  "MEP consultant",
  "Facility owner or operator",
  "Other",
];

const needs = [
  "3D floor plans",
  "Equipment graphics",
  "Critical rooms",
  "Building & campus model",
  "Full graphics package",
  "IBMS3D Platform demo",
];

const bmsFrontEnds = [
  "Tridium Niagara 4",
  "Siemens Desigo CC",
  "Johnson Controls Metasys",
  "Honeywell",
  "Schneider EcoStruxure Building Operation",
  "Other or not decided",
];

const nextSteps = [
  ["01", "We reply within 01 working days — NDA first, if you asked for one."],
  ["02", "A written scope: views, level of detail, layer naming, price and date."],
  ["03", "First floor or unit for your approval, then the full set."],
];

const quoteHelpers = [
  "Floor plans as DWG (PDF is fine)",
  "Equipment schedule or make and model list",
  "Your points list or tag convention",
  "A screenshot of your current graphics template",
];

const labelClasses = "text-sm font-medium";

const fieldClasses =
  "block min-h-11.5 w-full rounded-lg border border-field bg-white px-3.5 text-[15px] text-brand-dark transition-colors placeholder:text-[#81a09e] focus:border-brand-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-primary";

const legendClasses = "pb-3 font-heading text-xl font-medium";

function Field({ id, label, optional = false, className = "", children, ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {optional && <span className="ml-1 font-normal text-ink-soft">(optional)</span>}
      </label>
      {children ?? <input id={id} name={id} className={fieldClasses} {...props} />}
    </div>
  );
}

function Select({ id, options, placeholder, ...props }) {
  return (
    <select id={id} name={id} className={`${fieldClasses} px-3`} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface">
        <div className={`${container} flex flex-col gap-10 pb-24 pt-14 sm:pt-18`}>
          <div className="flex max-w-180 flex-col gap-4">
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <h1 className="font-heading text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-.02em]">
              {page.title}
            </h1>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <form
              action={FORM_ACTION}
              method="POST"
              encType="multipart/form-data"
              target="_blank"
              className="flex min-w-0 flex-col gap-8 rounded-[20px] border border-line bg-white p-5 sm:p-10"
            >
              <input type="hidden" name="_subject" value="New IBMS3D project enquiry" />
              <input type="hidden" name="_template" value="table" />
              {/* Honeypot: bots fill this in, people never see it */}
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <fieldset className="flex flex-col gap-4">
                <legend className={legendClasses}>1 · About you</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="name" label="Full name" type="text" autoComplete="name" required />
                  <Field id="email" label="Work email" type="email" autoComplete="email" required />
                  <Field id="company" label="Company" type="text" autoComplete="organization" required />
                  <Field id="country" label="Country" type="text" autoComplete="country-name" required />
                  <Field id="company-type" label="Your company is a…" className="sm:col-span-2">
                    <Select id="company-type" options={companyTypes} placeholder="Select one" required />
                  </Field>
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-4">
                <legend className={legendClasses}>2 · What you need</legend>
                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {needs.map((need) => (
                    <label
                      key={need}
                      className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-[10px] border border-field px-3.5 text-sm transition-colors hover:border-brand-primary has-checked:border-brand-primary has-checked:bg-tint"
                    >
                      <input type="checkbox" name="needs" value={need} className="h-4.5 w-4.5 accent-brand-primary" />
                      {need}
                    </label>
                  ))}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="bms" label="BMS front end you'll deliver in">
                    <Select id="bms" options={bmsFrontEnds} />
                  </Field>
                  <Field id="needed-by" label="Needed by" type="date" />
                  <Field id="floors" label="Number of floors" optional type="number" min="1" />
                  <Field id="equipment" label="Equipment types" optional type="text" placeholder="e.g. 12 AHUs, 2 chillers, 40 FCUs" />
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-4">
                <legend className={legendClasses}>3 · Notes</legend>
                <Field id="notes" label="Project notes">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    placeholder="Building type, what the client needs to see, any template you follow"
                    className={`${fieldClasses} resize-y py-3 leading-normal`}
                  />
                </Field>
                <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm">
                  <input type="checkbox" name="nda" value="Yes" className="h-4.5 w-4.5 accent-brand-primary" />
                  Send me your NDA before I share drawings
                </label>
              </fieldset>

              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" size="xl" arrow={false}>
                  Send enquiry
                </Button>
                <span className="text-[13px] text-ink-soft">
                  Drawings are used only to scope and deliver your project. A confirmation opens in a new tab.
                </span>
              </div>
            </form>

            <aside className="flex min-w-0 flex-col gap-5">
              <div className="flex flex-col gap-5 rounded-[20px] bg-brand-dark p-8 text-[#f5f8f7]">
                <Eyebrow light>What happens next</Eyebrow>
                <ol className="flex flex-col gap-4.5">
                  {nextSteps.map(([number, text]) => (
                    <li className="flex gap-3.5" key={number}>
                      <span className="pt-0.5 font-mono text-[13px] text-brand-accent">{number}</span>
                      <span className="text-[15px] leading-[1.55]">{text}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex flex-col gap-3.5 rounded-[20px] border border-line bg-white p-7">
                <div className="font-heading text-lg font-medium">What helps us quote fast</div>
                <CheckList items={quoteHelpers} className="gap-2.5 text-sm leading-normal text-chip-text" />
              </div>
              <div className="flex flex-col gap-1.5 px-2 text-sm text-ink-soft">
                <span>Prefer email?</span>
                <a
                  className="text-base font-medium text-brand-primary transition-colors hover:text-brand-dark"
                  href="mailto:sales@ibms3d.com"
                >
                  sales@ibms3d.com
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
