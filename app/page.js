import { Illustration } from "./components/illustrations";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Button, Eyebrow, ExternalArrow } from "./components/buttons";
import { FiArrowDown, FiArrowRight, FiBox } from "react-icons/fi";

const productCards = [
  {
    id: "battery-ups",
    title: "Battery & UPS Rooms",
    description: "Room layouts, racks, cabinets and safety zones.",
    detail: "Explore the room",
    variant: "room",
  },
  {
    id: "electrical",
    title: "Electrical Panel Rooms",
    description: "Switchboards and MCC rooms, down to each panel.",
    detail: "Explore electrical",
    variant: "electrical",
  },
  {
    id: "floorplans",
    title: "Floor Plans & Service Routing",
    description: "3D floor plans with cabling and duct routes in view.",
    detail: "Explore floor plans",
    variant: "floorplan",
  },
  {
    id: "hvac",
    title: "HVAC Equipment",
    description: "AHUs, FCUs and VRF models with internal components.",
    detail: "Explore HVAC",
    variant: "hvac",
  },
  {
    id: "chillers",
    title: "Chiller Plants",
    description: "Connected cooling systems and colour-coded water loops.",
    detail: "Explore chiller plants",
    variant: "hvac",
  },
  {
    id: "exteriors",
    title: "Building Exteriors",
    description: "Day, night and maintenance views in their context.",
    detail: "Explore exteriors",
    variant: "campus",
  },
  {
    id: "dashboards",
    title: "Dashboards",
    description: "Live metrics, energy use and building operations.",
    detail: "Explore dashboards",
    variant: "dashboard",
  },
];

const workflow = [
  ["01", "Define the view", "Set the audience, the systems and the level of detail needed."],
  ["02", "Make the connections clear", "Agree how layouts, equipment references and service routes relate."],
  ["03", "Review the visual language", "Align names, annotations and viewpoints across the collection."],
  ["04", "Bring it into context", "Present the views as a coherent building information picture."],
];

function SectionTitle({ eyebrow, title, className = "" }) {
  return (
    <div className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3.5 font-heading text-[clamp(2rem,3.6vw,2.95rem)] leading-[.99] tracking-[-.045em]">
        {title}
      </h2>
    </div>
  );
}

function ProductCard({ item }) {
  return (
    <article
      className="min-w-0 border border-[#e1e9e7] bg-[#f5f7f6] transition hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(16,37,40,.09)]"
      id={item.id}
    >
      <div className="bg-[#edf2f0] p-2.5 pb-0">
        <div className="relative z-10 flex min-h-6 justify-between text-[8px] tracking-[.07em] text-[#27858a]">
          <span>3D / MODEL VIEW</span>
          <ExternalArrow />
        </div>
        <Illustration variant={item.variant} className="aspect-[1.78]" />
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-normal tracking-[-.025em]">{item.title}</h3>
        <p className="mb-3 mt-2 text-[11px] leading-relaxed text-[#697b7d]">{item.description}</p>
        <a className="inline-flex items-center gap-1.5 text-[10px] font-medium text-brand-primary" href="#contact">
          {item.detail}
          <ExternalArrow className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home">
        <section className="overflow-hidden bg-brand-dark text-[#f5f8f7]">
          <div className="mx-auto grid min-h-[500px] w-[calc(100%-2rem)] max-w-[1380px] items-center gap-10 py-12 sm:w-[calc(100%-4rem)] sm:py-16 lg:grid-cols-[.82fr_1.18fr] lg:gap-20 lg:py-[70px]">
            <div>
              <Eyebrow light>3D / building / systems</Eyebrow>
              <h1 className="mb-4 mt-5 max-w-[540px] font-heading text-[clamp(2.65rem,5.3vw,4.75rem)] leading-[.99] tracking-[-.045em]">
                See the building.
                <br />
                Understand the systems.
              </h1>
              <p className="max-w-[445px] text-xs leading-[1.7] text-[#b1c1c1] sm:text-[13px]">
                Explore architecture, infrastructure and operations through precise 3D views. From a single panel to an entire campus.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Button href="#portfolio">Explore the portfolio</Button>
                <Button href="#contact" variant="outlineLight">Get in touch</Button>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[8px] tracking-[.08em] text-[#90a7a6] lg:mt-14">
                <span>3D MODEL</span>
                <span>BUILDING SYSTEMS</span>
                <span>VISUALISATION</span>
              </div>
            </div>
            <div className="min-w-0 bg-[#f4f6f3] p-2.5 text-brand-dark shadow-[0_22px_70px_rgba(0,0,0,.2)]">
              <div className="flex items-center justify-between gap-3 px-2 pb-2.5 pt-1.5 text-[8px] tracking-[.04em] text-[#627477]">
                <span>3D / PLANT ROOM</span>
                <span>MODEL VIEWER</span>
              </div>
              <Illustration variant="room" className="aspect-[1.68]" />
              <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3 text-[9px] text-[#627477]">
                <span>Battery & UPS Room</span>
                <span className="inline-flex items-center">
                  Interactive model <ExternalArrow className="ml-1 h-3.5 w-3.5 text-brand-primary" />
                </span>
              </div>
            </div>
          </div>
          <div className="mx-auto flex min-h-12 w-[calc(100%-2rem)] max-w-[1380px] items-center justify-between gap-4 border-t border-[#1e3538] text-[8px] tracking-[.09em] text-[#91a7a7] sm:w-[calc(100%-4rem)]">
            <span>DETAIL / CONTEXT / CLARITY</span>
            <a href="#portfolio" className="inline-flex items-center gap-1.5 text-right">
              SCROLL TO EXPLORE <FiArrowDown aria-hidden="true" className="h-3.5 w-3.5 text-brand-accent" />
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-14 sm:px-8 sm:py-20 lg:py-24" id="portfolio">
          <div className="mb-8 grid items-end gap-4 sm:grid-cols-[1fr_minmax(250px,.72fr)] sm:gap-12 lg:gap-[70px]">
            <SectionTitle eyebrow="01 / The portfolio" title={<>Every scale.<br />One clear view.</>} />
            <p className="mb-1 max-w-[435px] text-xs leading-[1.8] text-[#697b7d]">
              Seven collections trace a building from architecture to equipment to the data behind its operation. Choose a system to explore the detail.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5.5">
            {productCards.map((item) => <ProductCard item={item} key={item.id} />)}
            <aside className="flex min-h-[220px] flex-col items-start justify-center bg-[#dff2ef] p-6 sm:col-span-2 sm:p-10 lg:p-14">
              <Eyebrow>From detail to whole</Eyebrow>
              <h3 className="mb-2.5 mt-4 font-heading text-[clamp(1.75rem,3vw,2.45rem)] leading-none tracking-[-.04em]">
                Complex infrastructure.
                <br />
                A simpler conversation.
              </h3>
              <p className="max-w-[390px] text-xs leading-[1.7] text-[#5f7777]">
                Find the right visual language for your building automation project.
              </p>
              <Button href="#contact" className="mt-5">Show your brief</Button>
            </aside>
          </div>
        </section>

        <section className="bg-brand-dark text-[#f4f8f7]" id="use-cases">
          <div className="mx-auto grid min-h-[400px] w-[calc(100%-2rem)] max-w-[1380px] items-center gap-7 py-12 sm:w-[calc(100%-4rem)] sm:py-16 md:grid-cols-[1.1fr_.9fr] md:gap-16">
            <Illustration variant="campus" className="aspect-[1.65]" />
            <div>
              <Eyebrow light>02 / Beyond the equipment</Eyebrow>
              <h2 className="mb-4 mt-4 font-heading text-[clamp(2.2rem,4vw,3.2rem)] leading-none tracking-[-.045em]">
                The whole building.
                <br />
                Not just the facade.
              </h2>
              <p className="max-w-[430px] text-xs leading-[1.75] text-[#9eb0b0]">
                Day and night views reveal exteriors, interiors and the systems inside. Connect the model to the building, its use and the surrounding campus.
              </p>
              <div className="my-5 flex flex-wrap gap-4 text-[8px] tracking-[.08em] text-[#81a09e]">
                <span>3D / MODEL</span><span>CONTEXT</span><span>OPERATIONS</span>
              </div>
              <Button href="#exteriors" variant="outlineLight">Explore exteriors</Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-14 sm:px-8 sm:py-20">
          <SectionTitle
            eyebrow="03 / Room-level detail"
            title={<>Room-scale clarity.<br />Panel-level precision.</>}
            className="mb-6 sm:mb-9"
          />
          <div className="grid items-start gap-7 md:grid-cols-2">
            <article>
              <Illustration variant="electrical" className="aspect-[1.82]" />
              <div className="px-1 pt-4">
                <Eyebrow>01 / Electrical</Eyebrow>
                <h3 className="mt-2 font-heading text-xl tracking-[-.025em]">Electrical panel rooms</h3>
                <p className="mb-3 mt-2 max-w-[480px] text-[11px] leading-relaxed text-[#697b7d]">
                  See panel bays, access space and overhead services together.
                </p>
                <a className="inline-flex items-center gap-1.5 text-[10px] font-medium text-brand-primary" href="#electrical">
                  Explore electrical <ExternalArrow className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
            <article className="md:mt-14">
              <Illustration variant="room" className="aspect-[1.82]" />
              <div className="px-1 pt-4">
                <Eyebrow>02 / Power</Eyebrow>
                <h3 className="mt-2 font-heading text-xl tracking-[-.025em]">Battery & UPS rooms</h3>
                <p className="mb-3 mt-2 max-w-[480px] text-[11px] leading-relaxed text-[#697b7d]">
                  Rack layouts, clearances and safety equipment in a coordinated room view.
                </p>
                <a className="inline-flex items-center gap-1.5 text-[10px] font-medium text-brand-primary" href="#battery-ups">
                  Explore power systems <ExternalArrow className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="grid items-center gap-6 bg-[#f0f4f3] px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-[.8fr_1.2fr] md:gap-16 lg:px-[max(2rem,calc((100vw-1380px)/2))]" id="floorplan-feature">
          <div>
            <Eyebrow>04 / Plan the connections</Eyebrow>
            <h2 className="mb-4 mt-4 font-heading text-[clamp(2.1rem,4vw,3.1rem)] leading-none tracking-[-.045em]">
              A floor plan with
              <br />
              another layer of understanding.
            </h2>
            <p className="max-w-[430px] text-xs leading-[1.75] text-[#6d8080]">
              Start with a 3D floor plan. Add cabling and duct routes, isolate a zone, or trace the network in context. The same approach works across larger campuses too.
            </p>
            <Button href="#floorplans" className="mt-5">Explore service routing</Button>
            <div className="my-5 flex flex-wrap gap-4 text-[8px] tracking-[.08em] text-[#81a09e]">
              <span>WIRING</span><span>DUCTING</span><span>ROUTES</span>
            </div>
          </div>
          <Illustration variant="floorplan" className="aspect-[1.7] bg-transparent" />
        </section>

        <section className="bg-brand-dark px-5 py-14 text-[#f4f8f7] sm:px-8 sm:py-20 lg:px-[max(2rem,calc((100vw-1380px)/2))]" id="dashboards">
          <div className="mx-auto grid max-w-[1380px] items-center gap-6 md:grid-cols-[.74fr_1.26fr] md:gap-16">
            <div>
              <Eyebrow light>05 / The operational layer</Eyebrow>
              <h2 className="mb-4 mt-4 font-heading text-[clamp(2.2rem,4vw,3.2rem)] leading-none tracking-[-.045em]">
                From systems
                <br />
                to signals.
              </h2>
              <p className="max-w-[430px] text-xs leading-[1.75] text-[#a5b6b6]">
                Water loops, air quality and consumption. Energy demand by zone. Connect the systems behind the building to the information people need to make decisions.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Button href="#contact" variant="outlineLight">Discuss a project</Button>
                <Button href="#dashboards" variant="accent">View dashboards</Button>
              </div>
            </div>
            <Illustration variant="dashboard" className="aspect-[1.8]" />
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-14 sm:px-8 sm:py-20">
          <SectionTitle
            eyebrow="06 / A clearer way to work"
            title="Start with what needs to be understood."
            className="mb-6 sm:mb-9"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map(([number, title, description]) => (
              <article className="border-t border-[#dce5e3] py-4 sm:pr-5" key={number}>
                <span className="mb-5 block text-[9px] tracking-[.08em] text-brand-primary">{number}</span>
                <h3 className="font-heading text-[17px] font-normal tracking-[-.025em]">{title}</h3>
                <p className="mt-2 max-w-[245px] text-[11px] leading-[1.7] text-[#697b7d]">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f0f4f3] px-5 py-10 sm:px-8 sm:py-14">
          <div className="mx-auto grid max-w-[1380px] items-center gap-5 md:grid-cols-2 md:gap-[75px]">
            <div>
              <div className="flex items-center gap-2 text-[23px] tracking-[-.05em] text-[#607477]">
                <FiBox aria-hidden="true" className="h-7 w-7 text-brand-primary" />
                <span>IBMS3D</span>
              </div>
              <h2 className="mt-3.5 font-heading text-[26px] leading-none tracking-[-.045em] sm:text-[29px]">
                Technical detail.
                <br />
                Human understanding.
              </h2>
            </div>
            <div>
              <p className="mb-3.5 max-w-[520px] text-[11px] leading-[1.75] text-[#6e8081]">
                IBMS3D presents the building automation visualisation of 3D ideas. The collection spans rooms, equipment, service routing, dashboards and the spaces that connect them.
              </p>
              <a className="mb-3.5 block font-heading text-lg tracking-[-.02em] text-brand-primary" href="#contact">
                3D Ideas <FiArrowRight aria-hidden="true" className="mx-1 inline h-4 w-4" /> Your Intelligent Building Partner
              </a>
              <Button href="#contact" variant="lightOutline" className="min-h-9">About / Contact</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
