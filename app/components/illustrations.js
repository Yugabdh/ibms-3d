import Image from "next/image";
import { FiImage } from "react-icons/fi";
import { variantImages } from "../config/images";

// Faint teal grid lines; add a bg-size-[…] for the cell size.
export const gridLines =
  "bg-[linear-gradient(rgba(94,211,200,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(94,211,200,.06)_1px,transparent_1px)]";

// Faint teal grid behind 3D renders on dark surfaces.
export const blueprintGrid = `bg-[#0e2226] ${gridLines} bg-size-[32px_32px]`;

// cover fills the box over the placeholder grey; contain shows the whole
// render (floor plans) on the light image well.
const fits = {
  cover: { box: blueprintGrid, image: "object-cover" },
  contain: { box: blueprintGrid, image: "object-contain p-4" },
};

export function Illustration({
  variant = "room",
  image,
  fit = "cover",
  aspect = "aspect-[1.78]",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw",
  preload = false,
  className = "",
}) {
  const { src, alt } = image ?? variantImages[variant] ?? variantImages.room;
  const { box, image: imageClasses } = fits[fit] ?? fits.cover;

  return (
    <div className={`relative w-full overflow-hidden ${aspect} ${box} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={imageClasses} />
    </div>
  );
}

// Placeholder for a render that hasn't been produced or uploaded yet.
export function ImageSlot({ label, note, dark = false, className = "" }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2 p-4 text-center ${
        dark
          ? "rounded-xl border border-dashed border-[#36504f] text-mist"
          : "border-b border-dashed border-[#a9bab8] bg-[#e3eae9] text-ink-soft"
      } ${className}`}
    >
      <FiImage aria-hidden="true" className="h-7 w-7" />
      <span className="text-xs font-medium">{label}</span>
      {note && <span className="text-xs">{note}</span>}
    </div>
  );
}
