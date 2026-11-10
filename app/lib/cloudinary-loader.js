"use client";

// Global next/image loader (wired up via `images.loaderFile` in next.config.mjs).
// Cloudinary handles resizing, format (f_auto) and quality (q_auto) at the edge.
//
// `src` conventions:
//   "v1794319945/Battery_room_3.jpg"  -> Cloudinary path (everything after /image/upload/)
//   "https://res.cloudinary.com/tnmhyk4e/image/upload/..." -> full URL also accepted
//   "/images/foo.png"                 -> local file in /public, served as-is

const CLOUDINARY_BASE = "https://res.cloudinary.com/tnmhyk4e/image/upload/";

export default function cloudinaryLoader({ src, width, quality }) {
  if (src.startsWith("/")) {
    return `${src}?w=${width}`;
  }

  const path = src.startsWith(CLOUDINARY_BASE) ? src.slice(CLOUDINARY_BASE.length) : src;
  const transforms = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];

  return `${CLOUDINARY_BASE}${transforms.join(",")}/${path}`;
}
