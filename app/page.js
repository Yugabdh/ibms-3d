import {
  FiBell,
  FiBox,
  FiLayers,
  FiLink,
  FiMapPin,
  FiMonitor,
  FiServer,
  FiTrendingUp,
} from "react-icons/fi";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import PlatformViewer from "./components/platform-viewer";
import HeroCarousel from "./components/hero-carousel";
import { Button, Eyebrow, NewBadge } from "./components/buttons";
import { Illustration } from "./components/illustrations";
import { CheckList, SectionTitle, TagList, container } from "./components/section";
import { images } from "./config/images";

const heroFacts = [
  ["White-label", "Your brand, your client, under NDA"],
  ["Bind-ready", "Layers named to your points list"],
  ["Integrator-built", "We commission BMS ourselves"],
];

const services = [
  {
    title: "3D Floor Plans",
    description: "Your AutoCAD drawings turned into a 3D floor the operator can read at a glance.",
    image: images.officeLevel4,
    fit: "contain",
    tags: ["Room & zone tags", "Cable & duct routes", "Multi-floor stacks"],
  },
  {
    title: "Equipment Graphics",
    description: "AHUs, FCUs, VRF, chillers and pumps — with cutaways and animated running states.",
    image: images.airHandlingUnit,
    tags: ["Fan, damper & valve states", "Cutaway views", "Chiller plant loops"],
  },
  {
    title: "Critical Rooms",
    description: "Server halls, battery & UPS rooms, LT panel rooms and MDF/IDF rooms, down to each rack and panel.",
    image: images.upsRoom,
    tags: ["Rack & panel layouts", "Safety clearances", "Sensor positions"],
  },
  {
    title: "Buildings & Campus",
    description: "Exterior models in their site context — the home screen your client sees first.",
    image: images.buildingExterior,
    tags: ["Day & night views", "Campus context", "Floor-stack cutaways"],
  },
];

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

const deliverables = [
  [".png", "Layered, transparent backgrounds", "Each equipment part on its own layer"],
  [".svg", "Scalable vector graphics", "Sharp on any screen size"],
  [".gif", "Animated running states", "Fans turning, valves opening, water flowing"],
  ["AHU-01_SAF", "Named to your points list", "Your tag convention, not ours"],
];

const platformFeatures = [
  [FiLayers, "Drill down in one path", "Campus, building, floor, room, equipment — orbit and zoom without switching screens."],
  [FiMapPin, "Live values in place", "Temperature, humidity, load and run status pinned where the sensor or equipment actually is."],
  [FiBell, "Alarms you can see", "Equipment in alarm changes colour on the model, so operators find the room before they read the list."],
  [FiTrendingUp, "Trends on click", "Open the history of any point from the model itself, without leaving the view."],
  [FiLink, "Connects to your BMS", "Reads live data from your existing head-end — no rip-and-replace.", "Niagara · BACnet/IP · Modbus TCP · MQTT"],
  [FiServer, "On-premise or cloud", "Run it on site for secure facilities, or in the cloud for multi-site portfolios."],
];

const platformSectors = ["Data centre server halls", "MDF / IDF critical rooms", "Cleanrooms"];

// TODO: replace the bracketed placeholders with real figures.
const stats = [
  ["[00]+", "Buildings modelled"],
  ["[00]", "Integrator partners"],
  ["[0] days", "Typical turnaround, one floor"],
  ["[00] h", "Reply to a new brief"],
];

const process = [
  ["01", "Send drawings", "DWG or PDF floor plans, equipment schedules, your points list and any template you follow."],
  ["02", "Scope & quote", "We agree views, level of detail, layer naming and delivery date — in writing, before work starts."],
  ["03", "Review first views", "You approve the first floor or unit before we produce the rest, so the whole set stays consistent."],
  ["04", "Hand-off & support", "Layered files named to your points, plus help while your team binds them on site."],
];

const body = "text-base leading-relaxed text-ink-soft";
const card = "rounded-2xl border border-line bg-white";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home">
        {/* Hero */}
        <section className="bg-brand-dark text-[#f5f8f7]">
          <div className={`${container} grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[.85fr_1.15fr] lg:pb-22`}>
            <div className="flex min-w-0 flex-col gap-6">
              <Eyebrow light>3D graphics for building management systems</Eyebrow>
              <h1 className="font-heading text-[clamp(2.5rem,5vw,3.875rem)] font-normal leading-[1.04] tracking-[-.02em]">
                3D BMS graphics, built for system integrators and OEMs.
              </h1>
              <p className="max-w-135 text-base leading-relaxed text-mist-light sm:text-lg">
                Send us your AutoCAD drawings. We return 3D floor plans, equipment and critical-room graphics — layered,
                named to your points list and ready to bind in your BMS. White-label, under your brand.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/contact" size="lg">Send your drawings</Button>
                <Button href="/portfolio" size="lg" variant="ghostDark" arrow={false}>See the work</Button>
              </div>
              <div className="mt-2 grid gap-4 border-t border-line-dark pt-6 grid-cols-3">
                {heroFacts.map(([title, text]) => (
                  <div className="flex flex-col gap-1" key={title}>
                    <div className="text-sm font-medium text-[#f5f8f7]">{title}</div>
                    <div className="text-[13px] leading-normal text-mist">{text}</div>
                  </div>
                ))}
              </div>
            </div>

            <HeroCarousel />
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-17 bg-surface">
          <div className={`${container} flex flex-col gap-12 py-20 sm:pb-24 sm:pt-26`}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle eyebrow="01 / Services" title="Four kinds of graphics. One consistent library." className="max-w-160" />
              <p className={`${body} max-w-105`}>
                Order one graphic for a single AHU, or a full set from campus down to a single panel — drawn in one visual
                language.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <article className={`${card} flex flex-col overflow-hidden`} key={service.title}>
                  <Illustration
                    image={service.image}
                    fit={service.fit}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    aspect="aspect-[1.4]"
                  />
                  <div className="flex grow flex-col gap-3 p-6">
                    <div className="font-mono text-xs text-brand-primary">{String(index + 1).padStart(2, "0")}</div>
                    <h3 className="font-heading text-[22px] font-medium">{service.title}</h3>
                    <p className="text-[15px] leading-[1.55] text-ink-soft">{service.description}</p>
                    <TagList tags={service.tags} className="mt-auto pt-2" />
                  </div>
                </article>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-brand-dark px-6 py-8 text-[#f5f8f7] sm:px-9">
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-2">
                <Eyebrow light>Need all of it?</Eyebrow>
                <div className="font-heading text-2xl leading-snug">The complete IBMS graphics package</div>
                <p className="text-[15px] leading-relaxed text-mist-light">
                  Home dashboard, navigation from campus to equipment, and every graphic layered and named — one hand-off,
                  ready to bind.
                </p>
              </div>
              <Button href="/contact" size="lg" arrow={false}>Scope a full package</Button>
            </div>
          </div>
        </section>

        {/* Who we work with */}
        <section className="bg-white">
          <div className={`${container} flex flex-col gap-11 py-20 sm:py-24`}>
            <SectionTitle
              eyebrow="02 / Who we work with"
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
                  <p className={body}>{description}</p>
                  <CheckList items={points} className="text-[15px] leading-normal" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="border-t border-line bg-surface">
          <div className={`${container} grid gap-12 py-20 sm:py-22 lg:grid-cols-[1fr_2fr]`}>
            <div className="flex flex-col gap-4">
              <Eyebrow>What you receive</Eyebrow>
              <h2 className="font-heading text-[clamp(1.875rem,3.2vw,2.5rem)] font-normal leading-[1.1] tracking-[-.015em]">
                Files your engineers can use on day one.
              </h2>
              <p className={body}>Ready for Tridium Niagara 4 and any BMS front end that accepts images.</p>
            </div>
            <div className="grid content-start gap-3 sm:grid-cols-2">
              {deliverables.map(([format, title, text]) => (
                <div className="flex flex-col gap-1.5 rounded-xl border border-line bg-white p-5" key={format}>
                  <span className="font-mono text-[13px] text-brand-primary">{format}</span>
                  <span className="text-[15px] font-medium">{title}</span>
                  <span className="text-[13px] leading-normal text-ink-soft">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform */}
        <section id="platform" className="scroll-mt-17 bg-brand-dark text-[#f5f8f7]">
          <div className={`${container} flex flex-col gap-12 pb-24 pt-20 sm:pb-26 sm:pt-28`}>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div className="flex min-w-0 max-w-175 flex-[1_1_460px] flex-col gap-4.5">
                <div className="flex items-center gap-2.5">
                  <Eyebrow light>03 / IBMS3D Platform</Eyebrow>
                  <NewBadge />
                </div>
                <h2 className="font-heading text-[clamp(2.25rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-.02em]">
                  Your building, live, in 3D.
                </h2>
                <p className="text-base leading-relaxed text-mist-light sm:text-lg">
                  The IBMS3D Platform turns the 3D model into the operator&apos;s front end. Move from campus to floor to room
                  to a single CRAC unit — with live values, alarms and trends sitting on the equipment they belong to.
                </p>
              </div>
              <Button href="/contact" size="lg" arrow={false}>Book a platform demo</Button>
            </div>

            <PlatformViewer />

            <div className="grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
              {platformFeatures.map(([Icon, title, text, note]) => (
                <div className="flex flex-col gap-2.5 bg-brand-dark p-7" key={title}>
                  <Icon aria-hidden="true" className="h-6 w-6 text-brand-accent" />
                  <h3 className="font-heading text-[19px] font-medium">{title}</h3>
                  <p className="text-sm leading-relaxed text-mist">{text}</p>
                  {note && <div className="font-mono text-xs text-[#f5b83d]">{note}</div>}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-mist">
              <Eyebrow light>Built first for</Eyebrow>
              {platformSectors.map((sector) => (
                <span className="rounded-full border border-[#2a4245] px-3.5 py-2 text-[#f5f8f7]" key={sector}>
                  {sector}
                </span>
              ))}
              <span className="basis-full">
                For integrators: offer it as the 3D front end on your next critical-facility bid.
              </span>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-17 bg-white">
          <div className={`${container} grid gap-14 py-20 sm:pb-24 sm:pt-26 lg:grid-cols-2`}>
            <div className="flex flex-col gap-5">
              <SectionTitle eyebrow="04 / Why IBMS3D" title="Drawn by people who commission BMS." />
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

        {/* Process */}
        <section id="process" className="scroll-mt-17 bg-surface">
          <div className={`${container} flex flex-col gap-10 py-20 sm:py-24`}>
            <SectionTitle eyebrow="05 / How we work" title="From your drawings to bind-ready graphics." className="max-w-160" />
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {process.map(([number, title, text]) => (
                <li className={`${card} flex flex-col gap-3 p-7`} key={number}>
                  <span className="font-mono text-[13px] text-brand-primary">{number}</span>
                  <span className="font-heading text-xl font-medium">{title}</span>
                  <span className="text-sm leading-relaxed text-ink-soft">{text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-primary text-white">
          <div className={`${container} flex flex-wrap items-center justify-between gap-8 py-16 sm:py-18`}>
            <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3">
              <h2 className="font-heading text-[clamp(1.875rem,3.4vw,2.75rem)] font-normal leading-[1.1]">
                Send one floor. See it in 3D.
              </h2>
              <p className="text-[17px] leading-relaxed text-[#e2f4f3]">
                Share a DWG or PDF of a single floor and we&apos;ll come back with scope, price and timeline.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" size="lg" variant="white" arrow={false}>Send your drawings</Button>
              <Button href="mailto:sales@ibms3d.com" size="lg" variant="outlineWhite" arrow={false}>
                sales@ibms3d.com
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
