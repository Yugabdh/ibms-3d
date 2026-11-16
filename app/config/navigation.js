const portfolioPages = [
  {
    slug: "floorplans",
    title: "3D Floor Plans",
    description: "3D floor plans with cabling and duct routes in view.",
    variant: "floorplan",
  },
  {
    slug: "equipment-graphics",
    title: "Equipment Graphics",
    description: "Connected cooling systems and colour-coded water loops.",
    variant: "hvac",
  },
  {
    slug: "critical-rooms",
    title: "Critical Rooms",
    description: "Room layouts, racks, cabinets and safety zones.",
    variant: "room",
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

export const destinationPages = {
  portfolio: {
    title: "Graphics we've delivered for BMS front ends.",
    eyebrow: "Work",
    description:
      "Client names withheld — our integrator partners own the relationship. Ask us for a private walkthrough of full sets.",
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
  about: {
    // Also the page <title> and meta description. Keep both different from the
    // "Why IBMS3D" section below the hero and from the home page.
    title: "3D building graphics, made inside a BMS integrator.",
    eyebrow: "About IBMS3D",
    description:
      "IBMS3D is a 3D studio inside a building automation integrator, creating white-label BMS graphics for system integrators and OEMs, under NDA, ready for Niagara 4.",
    variant: "campus",
    related: ["contact", "portfolio"],
  },
  contact: {
    title: "Tell us about the project. We'll come back with scope and price.",
    eyebrow: "Project enquiry",
    description:
      "Send your drawings and project details. We reply with questions or a written scope: views, level of detail, layer naming, price and date.",
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
      href: `/portfolio?type=${slug}`,
    })),
  },
  {
    label: "Platform",
    href: "/#platform",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
