const portfolioPages = [
  {
    slug: "battery-ups",
    title: "Battery & UPS Rooms",
    description: "Room layouts, racks, cabinets and safety zones.",
    variant: "room",
  },
  {
    slug: "electrical",
    title: "Electrical Panel Rooms",
    description: "Switchboards and MCC rooms, down to each panel.",
    variant: "electrical",
  },
  {
    slug: "floorplans",
    title: "Floor Plans & Service Routing",
    description: "3D floor plans with cabling and duct routes in view.",
    variant: "floorplan",
  },
  {
    slug: "hvac",
    title: "HVAC Equipment",
    description: "AHUs, FCUs and VRF models with internal components.",
    variant: "hvac",
  },
  {
    slug: "chillers",
    title: "Chiller Plants",
    description: "Connected cooling systems and colour-coded water loops.",
    variant: "hvac",
  },
  {
    slug: "building-exteriors",
    title: "Building Exteriors",
    description: "Day, night and maintenance views in their context.",
    variant: "campus",
  },
  {
    slug: "dashboards",
    title: "Dashboards",
    description: "Live metrics, energy use and building operations.",
    variant: "dashboard",
  },
];

const useCasePages = [
  {
    slug: "building-context",
    title: "Building context",
    description:
      "Connect building architecture, its surrounding campus and the systems inside.",
    variant: "campus",
  },
  {
    slug: "service-routing",
    title: "Service routing",
    description:
      "Trace cabling and duct routes through clear, coordinated 3D floor plans.",
    variant: "floorplan",
  },
  {
    slug: "building-operations",
    title: "Building operations",
    description:
      "Bring energy use, system performance and operational metrics into view.",
    variant: "dashboard",
  },
];

export const destinationPages = {
  portfolio: {
    title: "A portfolio at every scale",
    eyebrow: "01 / The portfolio",
    description:
      "Explore building systems from architecture and infrastructure to the information behind everyday operations.",
    variant: "campus",
    related: portfolioPages.map(({ slug }) => `portfolio/${slug}`),
  },
  ...Object.fromEntries(
    portfolioPages.map((page) => [
      `portfolio/${page.slug}`,
      {
        ...page,
        eyebrow: "The portfolio",
        related: ["portfolio", ...portfolioPages
          .filter((otherPage) => otherPage.slug !== page.slug)
          .slice(0, 3)
          .map((otherPage) => `portfolio/${otherPage.slug}`)],
      },
    ]),
  ),
  "use-cases": {
    title: "See the building in context",
    eyebrow: "02 / Use cases",
    description:
      "Connect the spaces, systems and operational information that make a building work.",
    variant: "campus",
    related: useCasePages.map(({ slug }) => `use-cases/${slug}`),
  },
  ...Object.fromEntries(
    useCasePages.map((page) => [
      `use-cases/${page.slug}`,
      {
        ...page,
        eyebrow: "Use cases",
        related: ["use-cases", ...useCasePages
          .filter((otherPage) => otherPage.slug !== page.slug)
          .map((otherPage) => `use-cases/${otherPage.slug}`)],
      },
    ]),
  ),
  about: {
    title: "Technical detail. Human understanding.",
    eyebrow: "About IBMS3D",
    description:
      "IBMS3D makes building automation and infrastructure easier to understand through connected 3D visualisation.",
    variant: "campus",
    related: ["contact", "portfolio"],
  },
  contact: {
    title: "Make your building easier to understand.",
    eyebrow: "About / your next project",
    description:
      "Tell us the audience and the views you need. Start a conversation about your building visualisation brief.",
    variant: "room",
    related: ["portfolio", "use-cases"],
  },
};

export const navigation = [
  { label: "Home", href: "/" },
  {
    label: "Portfolio",
    href: "/portfolio",
    children: portfolioPages.map(({ slug, title }) => ({
      label: title,
      href: `/portfolio/${slug}`,
    })),
  },
  {
    label: "Use cases",
    href: "/use-cases",
    children: useCasePages.map(({ slug, title }) => ({
      label: title,
      href: `/use-cases/${slug}`,
    })),
  },
  {
    label: "About / Contact",
    href: "/about",
    children: [
      { label: "About IBMS3D", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
