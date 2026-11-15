"use client";

import { useState } from "react";
import Link from "next/link";
import { Illustration, ImageSlot } from "./illustrations";
import { TagList } from "./section";
import { images } from "../config/images";

const categories = [
  { id: "all", label: "All" },
  { id: "floor", label: "Floor Plans" },
  { id: "equip", label: "Equipment" },
  { id: "room", label: "Critical Rooms" },
  { id: "bldg", label: "Buildings & Campus" },
  { id: "dash", label: "Dashboards" },
];

const categoryLabels = Object.fromEntries(categories.map(({ id, label }) => [id, label]));

const work = [
  {
    category: "floor",
    title: "Office Level 4 floor plan",
    description: "Full floor from AutoCAD — workstations, cores and meeting wing, ready for zone tags.",
    image: images.officeLevel4,
    fit: "contain",
    href: "/portfolio/floorplans",
    tags: ["From .dwg", "Zone-ready"],
  },
  {
    category: "floor",
    title: "Floor plan with service routing",
    description: "Cabling and duct routes traced across the floor, with zones isolated.",
    image: images.floorPlan,
    fit: "contain",
    href: "/portfolio/floorplans",
    tags: ["Cable routes", "Duct routes"],
  },
  {
    category: "equip",
    title: "Air handling unit, cutaway",
    description: "Filters, coil piping and fan exposed, with separate layers for each animated part.",
    image: images.airHandlingUnit,
    href: "/portfolio/hvac",
    tags: ["Cutaway", "Animated states"],
  },
  {
    category: "equip",
    title: "Chiller plant",
    description: "Chillers, pumps and cooling towers on colour-coded chilled and condenser water loops.",
    slot: "Chiller plant render coming soon",
    href: "/portfolio/chillers",
    tags: ["Water loops", "Plant overview"],
  },
  {
    category: "room",
    title: "UPS room",
    description: "UPS cabinet beside the line of electrical panels, with overhead services.",
    image: images.upsRoom,
    href: "/portfolio/battery-ups",
    tags: ["Cabinets", "Overhead services"],
  },
  {
    category: "room",
    title: "Battery room",
    description: "Battery racks and cabinets with clearances and safety equipment in view.",
    image: images.batteryRoom,
    href: "/portfolio/battery-ups",
    tags: ["Racks", "Safety zones"],
  },
  {
    category: "room",
    title: "Electrical panel room",
    description: "A long line-up of switchboard panels, each one addressable.",
    image: images.electricalRoom,
    href: "/portfolio/electrical",
    tags: ["Switchboards", "Panel-level"],
  },
  {
    category: "bldg",
    title: "Corporate tower, aerial",
    description: "Curved-façade tower with its landscaped forecourt — the BMS home screen.",
    image: images.buildingExterior,
    href: "/portfolio/building-exteriors",
    tags: ["Aerial", "Site context"],
  },
  {
    category: "bldg",
    title: "Campus overview",
    description: "The building within its surrounding campus and road network.",
    image: images.buildingContext,
    href: "/use-cases/building-context",
    tags: ["Campus", "Day view"],
  },
  {
    category: "dash",
    title: "Water management dashboard",
    description: "Storage, consumption and quality metrics on one operator screen.",
    image: images.dashboard,
    href: "/portfolio/dashboards",
    tags: ["KPIs", "Trends"],
  },
];

export default function WorkGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const items = work.filter((item) => activeCategory === "all" || item.category === activeCategory);

  return (
    <div className="flex flex-col gap-6">
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {categories.map(({ id, label }) => {
          const isActive = id === activeCategory;
          const count = id === "all" ? work.length : work.filter((item) => item.category === id).length;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(id)}
              className={`inline-flex min-h-11 touch-manipulation items-center gap-2 rounded-full border px-4.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                isActive
                  ? "border-brand-dark bg-brand-dark text-white"
                  : "border-field bg-white text-brand-dark hover:border-brand-primary"
              }`}
            >
              {label}
              <span className="font-mono text-xs opacity-75">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:border-[#9db8b6] hover:shadow-[0_14px_32px_rgba(16,37,40,.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            {item.image ? (
              <Illustration
                image={item.image}
                fit={item.fit}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                aspect="aspect-[1.65]"
              />
            ) : (
              <ImageSlot label={item.slot} className="aspect-[1.65]" />
            )}
            <div className="flex grow flex-col gap-2.5 px-6 pb-6 pt-5.5">
              <div className="text-[11px] font-medium uppercase tracking-[.12em] text-brand-primary">
                {categoryLabels[item.category]}
              </div>
              <h3 className="font-heading text-xl font-medium group-hover:text-brand-primary">{item.title}</h3>
              <p className="text-sm leading-[1.55] text-ink-soft">{item.description}</p>
              <TagList tags={item.tags} className="mt-auto pt-1.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
