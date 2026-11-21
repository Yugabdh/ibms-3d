import { FiArrowDown, FiWind } from "react-icons/fi";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Button, Eyebrow } from "../components/buttons";
import { Illustration, ImageSlot, gridLines } from "../components/illustrations";
import { SectionTitle, container } from "../components/section";
import { destinationPages } from "../config/navigation";
import { images } from "../config/images";

const page = destinationPages.platform;

export const metadata = {
  title: `${page.title} | IBMS3D`,
  description: page.description,
};

const coverage = ["Data-centre halls", "UPS and battery rooms", "MDF/IDF rooms", "Niagara · BACnet · Modbus · MQTT"];

// Illustrative alarm pinned to the battery cabinets in the render.
// x / y are percentages over the image.
const alarm = {
  room: "UPS & battery room",
  name: "Battery string B3",
  tag: "BATT-B3 · T",
  reason: "Cell temperature above 35 °C",
  value: "38.0 °C",
  limit: "35 °C",
  point: "ibms3d/demo/battery-room/BATT-B3/T",
  x: 57,
  y: 50,
};

// Where the feature callout's line turns upward, as a % of the image width.
const calloutBend = 62;

// Model Studio steps; the active one is highlighted as in the screenshot.
const modelSteps = [
  ["Model", "Drop the export: GLB, glTF, FBX, OBJ or COLLADA"],
  ["Align", "Units and up axis guessed for you; set north"],
  ["Equipment", "Matches found in object names, accepted in one click"],
  ["Test", "Watch it run on simulated live data"],
  ["Publish", "One twin package and model, served from your site"],
];
const activeModelStep = 2;

// Importer output for the sample server hall (feature 03).
const drawingImport = {
  inputs: ["AHD_AS_BUILT_3F.dxf", "register.xlsx"],
  output: "ahd-3f.twin.json",
  summary: "98 items · 441 live points · 1 report",
};

// Measured for the AHD server hall twin (feature 04). The highlighted stat is shown in accent.
const edgeStats = [
  ["2 vCPU", "2 GB RAM, 16 GB disk for a whole server hall"],
  ["3.3 %", "of one CPU core, on average", true],
  ["92 MB", "memory for the server process"],
  ["66 MB", "graphics memory per 1080p screen"],
];

const deployments = [
  ["Edge", "On site. Screens keep working when the WAN is down.", true],
  ["Cloud", "Many small sites into one central NOC."],
  ["Hybrid", "A box per site, every site in one view."],
];

// Equipment states, worst first (feature 05).
const statuses = [
  ["ALARM", "A rule says act now: a leak, a trip, a hot cell", "bg-[#ff6b5b]"],
  ["WARNING", "Drifting out of range, before it becomes an alarm", "bg-[#f5b83d]"],
  ["OFFLINE", "Every point has gone stale: the link is the problem", "bg-[#7e9695]"],
  ["UNKNOWN", "Has never reported since the twin started", "bg-ink-soft"],
  ["STANDBY", "Stopped by design, ready to take over", "bg-mist"],
  ["ACTIVE", "Doing something worth seeing: a door open, a battery discharging", "bg-[#4fb2ff]"],
  ["NORMAL", "Fresh values, inside every limit", "bg-[#3ddc97]"],
];

const smallCaps = "font-mono text-xs uppercase tracking-[.1em]";

// Room packs ("Where it works"). image: null shows a placeholder until the
// render is uploaded; roadmap marks packs that are not available yet.
const industries = [
  {
    title: "Data-centre halls",
    text: "Cooling units, PDUs, rack inlets, leaks and doors across the whole hall.",
    tags: ["PAC", "PDU", "RACK", "THS", "LEAK", "DOOR"],
    image: null,
    placeholder: "Row of cooling units in a data hall with live temperatures",
  },
  {
    title: "UPS and battery rooms",
    text: "String temperature, hydrogen, exhaust fans and UPS mode, in one view.",
    tags: ["UPS", "BATT", "H2", "EXF"],
    image: images.batteryRoom1,
  },
  {
    title: "MDF/IDF rooms",
    text: "Many small rooms: temperature, UPS, doors and leaks in each one.",
    tags: ["RACK", "THS", "UPS", "DOOR", "LEAK"],
    image: images.upsRoom,
  },
  {
    title: "Cleanrooms",
    text: "Pressure cascades, particle counts and validated records.",
    tags: ["ΔP", "PARTICLES", "AHU", "FFU"],
    roadmap: true,
  },
];

function AlarmPin() {
  return (
    <span
      aria-hidden="true"
      style={{ left: `${alarm.x}%`, top: `${alarm.y}%` }}
      className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#ff6b5b]"
    >
      <span className="h-2 w-2 rounded-full bg-[#ff6b5b]" />
    </span>
  );
}

function AlarmBadge() {
  return (
    <span className="rounded-md bg-[#ff6b5b]/15 px-2 py-1 font-mono text-[11px] font-semibold tracking-[.08em] text-[#ffd4ce]">
      ALARM
    </span>
  );
}

export default function PlatformPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className={`bg-brand-dark text-[#f5f8f7] ${gridLines} bg-size-[48px_48px]`}>
          <div className={`${container} grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[.8fr_1.2fr] lg:gap-14 lg:py-24`}>
            <div className="flex flex-col gap-6">
              <Eyebrow light>{page.eyebrow}</Eyebrow>
              <h1 className="max-w-155 font-heading text-[clamp(2.5rem,5vw,3.875rem)] font-normal leading-[1.04] tracking-[-.02em]">
                Your BMS knows something is wrong. Do you know <span className="text-[#ff6b5b]">where?</span>
              </h1>
              <p className="max-w-135 text-base leading-relaxed text-mist-light sm:text-lg">{page.description}</p>

              <ul className="grid gap-x-8 gap-y-3 pt-2 font-mono text-sm text-mist-light sm:grid-cols-2">
                {coverage.map((item) => (
                  <li className="flex items-center gap-2.5" key={item}>
                    <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#3ddc97]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex flex-col gap-4 border-t border-line-dark pt-6">
                <p className="font-heading text-xl">Try it on one of your rooms: a 2-week pilot.</p>
                <div className="flex flex-wrap gap-3">
                  <Button href="/contact" size="lg">Start a pilot</Button>
                  <Button href="/portfolio" size="lg" variant="ghostDark" arrow={false}>See the work</Button>
                </div>
              </div>
            </div>

            <div className="relative sm:pb-16">
              <div className="relative">
                <Illustration
                  image={{ ...images.batteryRoom, alt: `IBMS3D Platform live view of a UPS and battery room with ${alarm.name} in alarm` }}
                  preload
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="rounded-2xl border border-line-dark shadow-[0_22px_70px_rgba(0,0,0,.2)]"
                />
                <AlarmPin />
                <span
                  aria-hidden="true"
                  style={{ left: `${alarm.x}%`, top: `calc(${alarm.y}% + 0.75rem)` }}
                  className="absolute bottom-0 hidden w-0.5 -translate-x-1/2 bg-[#ff6b5b] sm:block"
                />
              </div>

              <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-[#ff6b5b]/60 bg-[#0e2226] px-6 py-5 shadow-[0_22px_70px_rgba(0,0,0,.2)] sm:absolute sm:bottom-0 sm:left-[30%] sm:right-[4%] sm:mt-0 sm:max-w-105">
                <div className="flex items-center justify-between gap-3">
                  <AlarmBadge />
                  <span className="font-mono text-xs text-mist">{alarm.room}</span>
                </div>
                <div className="mt-1 font-heading text-[22px]">{alarm.name}</div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="text-sm text-mist-light">{alarm.reason}</span>
                  <span className="font-mono text-3xl font-medium text-[#ff6b5b]">{alarm.value}</span>
                </div>
                <div className="truncate font-mono text-xs text-mist">{alarm.point}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 01 / Find it */}
        <section className="bg-surface">
          <div className={`${container} flex flex-col gap-10 py-20 sm:py-24`}>
            <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-5">
              <SectionTitle
                eyebrow="01 / Find it"
                title="The alarm is the loudest thing on the screen."
                className="max-w-170"
              />
              <p className="max-w-135 text-base leading-relaxed text-ink-soft sm:text-lg">
                Colour is kept for equipment state, so a fault stands out at once. One click shows its trend, its
                neighbours and the MQTT topic behind every value.
              </p>
            </div>

            <div className="relative">
              <Illustration
                image={{ ...images.batteryRoom, alt: `${alarm.name} shown in red at ${alarm.value} among normal battery strings in the 3D view` }}
                aspect="aspect-[2.2]"
                sizes="(max-width: 1380px) 100vw, 1380px"
                className="rounded-2xl border border-line"
              />
              <AlarmPin />
              <span
                aria-hidden="true"
                style={{ left: `calc(${alarm.x}% + 0.75rem)`, width: `calc(${calloutBend - alarm.x}% - 0.75rem)`, top: `${alarm.y}%` }}
                className="absolute hidden border-t-2 border-[#ff6b5b] lg:block"
              />
              <span
                aria-hidden="true"
                style={{ left: `${calloutBend}%`, right: "19.5rem", bottom: `calc(${100 - alarm.y}% - 2px)` }}
                className="absolute top-22 hidden border-l-2 border-t-2 border-[#ff6b5b] lg:block"
              />

              <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-[#ff6b5b]/60 bg-[#0e2226] px-5.5 py-5 text-[#f5f8f7] shadow-[0_22px_70px_rgba(0,0,0,.2)] sm:max-w-80 lg:absolute lg:right-6 lg:top-6 lg:mt-0 lg:w-72">
                <div className="flex items-center gap-2.5">
                  <AlarmBadge />
                  <span className="font-mono text-sm text-mist-light">{alarm.tag}</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-3xl font-medium text-[#ff6b5b]">{alarm.value}</span>
                  <span className="text-sm text-mist-light">limit {alarm.limit}</span>
                </div>
                <div className="truncate font-mono text-xs text-mist">{alarm.point}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 / Your 3D model */}
        <section className={`bg-brand-dark text-[#f5f8f7] bg-size-[48px_48px]`}>
          <div className={`${container} grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[.8fr_1.2fr] lg:gap-14`}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <SectionTitle light eyebrow="02 / Your 3D model" title="Already paid for a 3D model? Put it to work." />
                <p className="max-w-135 text-base leading-relaxed text-mist-light sm:text-lg">
                  Drop the SketchUp, Revit, 3ds Max or Blender export into Model Studio. It finds the equipment by name, you
                  check the matches, test with simulated data and publish.
                </p>
              </div>

              <ol className="border-b border-line-dark">
                {modelSteps.map(([title, text], index) => {
                  const active = index === activeModelStep;
                  return (
                    <li className="flex items-start gap-4 border-t border-line-dark py-3.5" key={title}>
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm border border-[#36504f]"
                      >
                        {index + 1}
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="font-medium">{title}</span>
                        <span className="text-sm text-mist">{text}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="flex flex-col gap-4">
              {/* TODO: add the Model Studio screenshot (battery room model with equipment matches) to app/config/images.js and show it here. */}
              <ImageSlot
                dark
                label="Model Studio matching objects in a SketchUp battery room model to equipment types"
                note="Screenshot coming soon"
                className="aspect-[1.78]"
              />
              <p className="flex items-center gap-3 font-mono text-sm text-mist">
                <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#3ddc97]" />
                Sample SketchUp battery room: 31 pieces of equipment found from object names
              </p>
            </div>
          </div>
        </section>

        {/* 03 / From the drawing */}
        <section className="bg-surface">
          <div className={`${container} flex flex-col gap-10 py-20 sm:py-24`}>
            <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-5">
              <SectionTitle
                eyebrow="03 / From the drawing"
                title="No 3D model? Your as-built DXF is enough."
                className="max-w-170"
              />
              <p className="max-w-135 text-base leading-relaxed text-ink-soft sm:text-lg">
                Add the equipment register you already keep in Excel. The importer builds the room, places every tagged unit
                and lists every tag that does not match.
              </p>
            </div>

            <div className="relative">
              {/* TODO: swap in the server hall built from the as-built DXF once it is in app/config/images.js. */}
              <Illustration
                image={images.floorPlan}
                aspect="aspect-[2.3]"
                sizes="(max-width: 1380px) 100vw, 1380px"
                className="rounded-2xl border border-line"
              />
              <div className="mt-3 flex flex-col gap-2.5 rounded-2xl border border-line-dark bg-brand-dark/92 px-5 py-4.5 font-mono text-sm text-[#f5f8f7] sm:max-w-101 lg:absolute lg:left-6 lg:top-6 lg:mt-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  {drawingImport.inputs.map((file, index) => (
                    <span className="contents" key={file}>
                      {index > 0 && <span className="text-mist">+</span>}
                      <span className="rounded-md border border-[#36504f] px-2 py-1">{file}</span>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2.5 text-brand-accent">
                  <FiArrowDown aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {drawingImport.output}
                </div>
                <div className="text-mist-light">{drawingImport.summary}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 / Runs on site */}
        <section className="bg-brand-dark text-[#f5f8f7]">
          <div className={`${container} grid items-start gap-12 py-20 sm:py-24 lg:grid-cols-[.8fr_1.2fr] lg:gap-14`}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <SectionTitle light eyebrow="04 / Runs on site" title="One small box per site. No internet needed." />
                <p className="max-w-135 text-base leading-relaxed text-mist-light sm:text-lg">
                  Broker, server and screens run inside your BMS network. The capacity planner gives you the hardware before
                  you buy it, from measured benchmarks.
                </p>
              </div>

              <dl className="grid grid-cols-2 border-t border-[#36504f]">
                {edgeStats.map(([value, label, highlight], index) => (
                  <div
                    className={`flex flex-col-reverse gap-1.5 py-6 ${index % 2 ? "pl-6" : "border-r border-line-dark pr-6"} ${
                      index < 2 ? "border-b border-line-dark" : ""
                    }`}
                    key={value}
                  >
                    <dt className="text-sm text-mist">{label}</dt>
                    <dd className={`font-mono text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-none ${highlight ? "text-brand-accent" : ""}`}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="font-mono text-xs leading-relaxed text-mist">
                Measured for the AHD server hall twin: 441 live points, 88 messages per second, on a 2 vCPU Xeon at 2.1 GHz.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* TODO: add the capacity planner screenshot to app/config/images.js and show it here. */}
              <ImageSlot
                dark
                label="IBMS3D capacity planner showing the hardware needed for an edge deployment"
                note="Screenshot coming soon"
                className="aspect-[1.78]"
              />
              <div className="grid gap-6 sm:grid-cols-3 sm:gap-7">
                {deployments.map(([title, text, highlight]) => (
                  <div
                    className={`flex flex-col gap-2 pt-4 ${highlight ? "border-t-2 border-brand-accent" : "border-t border-[#36504f]"}`}
                    key={title}
                  >
                    <h3 className="font-heading text-lg font-medium">{title}</h3>
                    <p className="text-sm leading-relaxed text-mist-light">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 05 / Honest data */}
        <section className="bg-surface">
          <div className={`${container} grid items-start gap-12 py-20 sm:py-24 lg:grid-cols-[.85fr_1.15fr] lg:gap-16`}>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <SectionTitle eyebrow="05 / Honest data" title="Missing data never stays green." />
                <p className="max-w-135 text-base leading-relaxed text-ink-soft sm:text-lg">
                  A screen that keeps showing the last good value after a gateway dies is lying to you. Here a value turns
                  stale after three missed updates, and equipment that has gone quiet turns grey.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <div className={`${smallCaps} text-[#7e9695]`}>A stale screen</div>
                  <div className="flex min-h-42 flex-col justify-between gap-4 rounded-2xl border border-line bg-white p-5">
                    <div className="flex items-center gap-2.5 font-medium">
                      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#3ddc97]" />
                      CRAC-1
                    </div>
                    <div className="font-mono text-3xl font-medium">24.1 °C</div>
                    <div className="font-mono text-xs text-[#7e9695]">last value received 2 h ago</div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className={`${smallCaps} text-brand-primary`}>IBMS3D Platform</div>
                  <div className="flex min-h-42 flex-col justify-between gap-4 rounded-2xl border border-field bg-chip p-5">
                    <div className="flex items-center gap-2.5 font-medium">
                      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#7e9695]" />
                      CRAC-1
                    </div>
                    <div className="font-mono text-3xl font-medium text-ink-soft">OFFLINE</div>
                    <div className="font-mono text-xs text-[#7e9695]">every point stale · check the gateway</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className={`${smallCaps} pb-4 text-[#7e9695]`}>Every status, worst first</div>
              <dl className="border-b border-line">
                {statuses.map(([label, text, swatch]) => (
                  <div className="grid gap-x-6 gap-y-1.5 border-t border-line py-4.5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center" key={label}>
                    <dt className="flex items-center gap-3 font-mono text-lg font-medium tracking-[.06em]">
                      <span aria-hidden="true" className={`h-4 w-4 shrink-0 rounded-sm ${swatch}`} />
                      {label}
                    </dt>
                    <dd className="text-[15px] leading-relaxed text-ink-soft">{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Where it works */}
        <section className="bg-brand-dark text-[#f5f8f7]">
          <div className={`${container} flex flex-col gap-12 py-20 sm:py-24`}>
            <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-5">
              <SectionTitle
                light
                eyebrow="Where it works"
                title="Built for the rooms that cannot go down."
                className="max-w-175"
              />
              <p className="max-w-135 text-base leading-relaxed text-mist-light sm:text-lg">
                One platform, with a pack for each kind of critical room: the equipment it holds, the limits that matter and
                the views its operators need.
              </p>
            </div>

            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map(({ title, text, tags, image, placeholder, roadmap }) => (
                <div className="flex flex-col gap-4" key={title}>
                  {roadmap ? (
                    <div className="relative flex aspect-[1.13] items-center justify-center rounded-2xl border border-dashed border-[#36504f]">
                      <FiWind aria-hidden="true" className="h-10 w-10 text-mist" />
                      <span className="absolute left-4 top-4 rounded-md border border-[#36504f] px-2 py-1 font-mono text-[11px] tracking-[.1em] text-mist-light">
                        ON THE ROADMAP
                      </span>
                    </div>
                  ) : image ? (
                    <Illustration image={image} aspect="aspect-[1.13]" className="rounded-2xl border border-line-dark" />
                  ) : (
                    // TODO: add the data hall render to app/config/images.js and set `image` above.
                    <ImageSlot dark label={placeholder} note="Render coming soon" className="aspect-[1.13]" />
                  )}
                  <h3 className="font-heading text-xl font-medium">{title}</h3>
                  <p className="text-sm leading-relaxed text-mist-light">{text}</p>
                  <p className="mt-auto border-t border-line-dark pt-3 font-mono text-xs tracking-[.04em] text-mist">
                    {tags.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
