import { BrandMark, Button, Eyebrow, ExternalArrow } from "./buttons";

const footerLinks = {
  Explore: [
    ["Battery & UPS Rooms", "/portfolio/battery-ups"],
    ["Electrical Panel Rooms", "/portfolio/electrical"],
    ["Floor Plans & Service Routing", "/portfolio/floorplans"],
    ["HVAC Equipment", "/portfolio/hvac"],
    ["Chiller Plants", "/portfolio/chillers"],
    ["Building Exteriors", "/portfolio/building-exteriors"],
    ["Dashboards", "/portfolio/dashboards"],
  ],
  "Get in touch": [
    ["About / Contact", "/about"],
    ["Project enquiry", "/contact"],
  ],
};

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-dark px-5 text-[#e9f0ef] sm:px-8">
      <div className="mx-auto flex min-h-[245px] max-w-[1380px] flex-col items-start justify-center gap-5 border-b border-[#1c3437] py-10 md:flex-row md:items-center md:justify-between md:gap-8">
        <div>
          <Eyebrow light>About / your next project</Eyebrow>
          <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3rem)] leading-[.98] tracking-[-.045em]">
            Make your building
            <br />
            easier to understand.
          </h2>
          <p className="mt-2 text-[11px] text-[#9fb2b2]">
            Tell us the audience and the views you need. Start with a visual brief.
          </p>
        </div>
        <Button href="mailto:hello@ibms3d.com" variant="accent">
          Start a conversation
        </Button>
      </div>
      <div className="mx-auto grid max-w-[1380px] grid-cols-2 gap-x-5 gap-y-7 py-8 md:grid-cols-[1.7fr_1fr_1fr] md:gap-16">
        <div className="col-span-2 md:col-span-1">
          <BrandMark light />
          <p className="my-3 max-w-[340px] text-[10px] leading-relaxed text-[#94a9a8]">
            A portfolio of building systems in 3D: architecture, infrastructure and operations made clear, connected and useful.
          </p>
          <a
            className="inline-flex items-center gap-1.5 text-[10px] text-brand-accent transition-colors hover:text-white"
            href="mailto:hello@ibms3d.com"
          >
            hello@ibms3d.com
            <ExternalArrow className="h-3.5 w-3.5" />
          </a>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div className="flex flex-col items-start gap-2.5" key={title}>
            <Eyebrow light className="mb-1">{title}</Eyebrow>
            {links.map(([label, href]) => (
              <a
                className="text-[10px] text-[#b4c2c1] transition-colors hover:text-brand-accent"
                href={href}
                key={label}
              >
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto flex min-h-12 max-w-[1380px] items-center justify-between gap-4 border-t border-[#1c3437] text-[8px] text-[#69817f]">
        <span>© 2026 IBMS3D. All rights reserved.</span>
        <span>Designed for buildings that work better.</span>
      </div>
    </footer>
  );
}
