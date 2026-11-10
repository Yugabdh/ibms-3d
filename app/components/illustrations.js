import Image from "next/image";
import { variantImages } from "../config/images";

export function Illustration({ variant = "room", image, className = "" }) {
  const { src, alt } = image ?? variantImages[variant] ?? variantImages.room;

  return (
    <div className={`relative aspect-[1.78] w-full overflow-hidden bg-[#dce2df] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 40vw"
        className="object-cover"
      />
      <span className="absolute bottom-2 right-2 bg-[#f7faf8e0] px-1.5 py-1 text-[7px] tracking-[.06em] text-[#536769]">
        IBMS3D / LIVE VIEW
      </span>
    </div>
  );
}
