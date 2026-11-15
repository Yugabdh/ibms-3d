import { images } from "./images";

// Filter categories for /portfolio?type=<slug>. The slugs match the Portfolio
// dropdown entries in navigation.js, so /portfolio/<slug> redirects to the
// matching filter.
export const workCategories = [
  { slug: "floorplans", label: "Floor Plans" },
  { slug: "equipment-graphics", label: "Equipment" },
  { slug: "critical-rooms", label: "Critical Rooms" },
  { slug: "building-exteriors", label: "Buildings & Campus" },
  { slug: "dashboards", label: "Dashboards" },
];

export const categoryLabels = Object.fromEntries(workCategories.map(({ slug, label }) => [slug, label]));

// One entry per project; each gets a page at /portfolio/<slug>.
// Projects without an image show a placeholder until one is added.
// `gallery` (optional): images shown in the masonry grid + lightbox on the
// project page. Give each image width/height in images.js so the grid can
// reserve space before it loads.
export const projects = [
  {
    slug: "office-level-4-floor-plan",
    category: "floorplans",
    title: "Office Level 4 floor plan",
    description: "Full floor from AutoCAD — workstations, cores and meeting wing, ready for zone tags.",
    image: images.officeLevel4,
    fit: "contain",
    tags: ["From .dwg", "Zone-ready"],
    gallery: [images.officeLevel4Plan1, images.officeLevel4Plan2, images.officeLevel4Plan3, images.officeLevel4Plan4, images.officeLevel4Plan5],
  },
  {
    slug: "floor-plan-service-routing",
    category: "floorplans",
    title: "Floor plan with service routing",
    description: "Cabling and duct routes traced across the floor, with zones isolated.",
    image: images.floorPlan,
    fit: "contain",
    tags: ["Cable routes", "Duct routes"],
    gallery: [images.floorPlan1, images.floorPlan2, images.floorPlan3, images.floorPlan4,],
  
  },
  {
    slug: "air-handling-unit-cutaway",
    category: "equipment-graphics",
    title: "Air handling unit, cutaway",
    description: "Filters, coil piping and fan exposed, with separate layers for each animated part.",
    image: images.airHandlingUnit,
    tags: ["Cutaway", "Animated states"],
  },
  {
    slug: "chiller-plant",
    category: "equipment-graphics",
    title: "Chiller plant",
    description: "Chillers, pumps and cooling towers on colour-coded chilled and condenser water loops.",
    image: images.chillerPlant1,
    slot: "Chiller plant render coming soon",
    tags: ["Water loops", "Plant overview"],
    gallery: [images.chillerPlant1, images.chillerPlant2, images.chillerPlant3],
  },
  {
    slug: "ups-room",
    category: "critical-rooms",
    title: "UPS room",
    description: "UPS cabinet beside the line of electrical panels, with overhead services.",
    image: images.upsRoom,
    tags: ["Cabinets", "Overhead services"],
    gallery: [images.upsRoom1, images.upsRoom2, images.upsRoom3, images.upsRoom4, images.upsRoom5, images.upsRoom6, images.upsRoom7],
  },
  {
    slug: "battery-room",
    category: "critical-rooms",
    title: "Battery room",
    description: "Battery racks and cabinets with clearances and safety equipment in view.",
    image: images.batteryRoom,
    tags: ["Racks", "Safety zones"],
  },
  {
    slug: "electrical-panel-room",
    category: "critical-rooms",
    title: "Electrical panel room",
    description: "A long line-up of switchboard panels, each one addressable.",
    image: images.electricalRoom,
    tags: ["Switchboards", "Panel-level"],
  },
  {
    slug: "corporate-tower-aerial",
    category: "building-exteriors",
    title: "Corporate tower, aerial",
    description: "Curved-façade tower with its landscaped forecourt — the BMS home screen.",
    image: images.buildingExterior,
    tags: ["Aerial", "Site context"],
  },
  {
    slug: "campus-overview",
    category: "building-exteriors",
    title: "Campus overview",
    description: "The building within its surrounding campus and road network.",
    image: images.buildingContext,
    tags: ["Campus", "Day view"],
  },
  {
    slug: "water-management-dashboard",
    category: "dashboards",
    title: "Water management dashboard",
    description: "Storage, consumption and quality metrics on one operator screen.",
    image: images.dashboard,
    gallery: [images.dashboard, images.dashboardEnergy, images.dashboardWater, images.dashboardFloors],
    tags: ["KPIs", "Trends"],
  },
];

export function filterHref(categorySlug) {
  return categorySlug ? `/portfolio?type=${categorySlug}` : "/portfolio";
}
