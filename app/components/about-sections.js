import { FiBox, FiMonitor } from "react-icons/fi";
import { CheckList, SectionTitle, container } from "./section";

// "Who we work with" and "Why IBMS3D", shared by the home page and /about.
// `eyebrow` is passed in because each page numbers its sections differently.

const audiences = [
  {
    title: "System integrators",
    icon: FiMonitor,
    description:
      "Win the bid with a front end that looks finished — and hand over graphics your client's operators actually use.",
    points: [
      "White-label delivery, NDA signed before you share drawings",
      "Layers named to your points list, so binding takes hours, not days",
      "Overflow capacity when your graphics team is full",
      "Remote delivery for integrators in the US, UK, Middle East and India",
    ],
  },
  {
    title: "Equipment & controls OEMs",
    icon: FiBox,
    description:
      "One accurate 3D library of your product line, so every integrator in your network shows your equipment the same way.",
    points: [
      "Models matched to your product range and variants",
      "Animated states for your standard control templates",
      "A graphics pack you can ship to partners with every unit",
      "Updates as your range changes, in the same visual language",
    ],
  },
];

// TODO: replace the bracketed placeholders with real figures.
const stats = [
  ["51+", "Buildings modelled"],
  ["5+", "Integrator partners"],
  ["01 days", "Typical turnaround, one floor"],
  ["03 hrs", "Reply to a new brief"],
];

export function WhoWeWorkWith({ eyebrow = "Who we work with", className = "" }) {
  return (
    <section className={`bg-white ${className}`}>
      <div className={`${container} flex flex-col gap-11 py-20 sm:py-24`}>
        <SectionTitle
          eyebrow={eyebrow}
          title="We sit behind your team, not in front of your client."
          className="max-w-180"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {audiences.map(({ title, icon: Icon, description, points }) => (
            <div className="flex flex-col gap-5 rounded-2xl border border-line p-7 sm:p-9" key={title}>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-tint">
                  <Icon aria-hidden="true" className="h-5.5 w-5.5 text-brand-primary" />
                </div>
                <h3 className="font-heading text-2xl font-medium">{title}</h3>
              </div>
              <p className="text-base leading-relaxed text-ink-soft">{description}</p>
              <CheckList items={points} className="text-[15px] leading-normal" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutStudio({ eyebrow = "Why IBMS3D", className = "" }) {
  return (
    <section id="about" className={`scroll-mt-17 bg-white ${className}`}>
      <div className={`${container} grid gap-14 py-20 sm:pb-24 sm:pt-26 lg:grid-cols-2`}>
        <div className="flex flex-col gap-5">
          <SectionTitle eyebrow={eyebrow} title="Drawn by people who commission BMS." />
          <p className="text-[17px] leading-[1.65] text-ink-soft">
            IBMS3D is the 3D studio of SD IoTecs LLP, a building automation integrator in Pune, India — and an
            authorised Tridium Niagara, LOYTEC and EasyIO partner. We know what a graphic has to do once points are bound
            and an operator is looking at it at 2 a.m.
          </p>
          <p className="text-[17px] leading-[1.65] text-ink-soft">
            So we draw for that moment: clear states, honest colours, nothing decorative that hides a fault.
          </p>
        </div>
        <div className="grid content-start gap-3 sm:grid-cols-2">
          {stats.map(([value, label]) => (
            <div className="flex flex-col gap-1.5 rounded-xl bg-surface p-6" key={label}>
              <span className="font-heading text-[40px] leading-tight text-brand-primary">{value}</span>
              <span className="text-sm text-ink-soft">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
