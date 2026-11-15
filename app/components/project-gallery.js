"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from "react-icons/fi";

// Fallback size for images registered without width/height (reserves space only;
// the image still renders at its natural ratio once loaded).
const FALLBACK = { width: 1600, height: 900 };

const controlClasses =
  "inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-line-dark bg-brand-dark/80 text-[#f5f8f7] transition-colors hover:border-brand-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent disabled:opacity-40";

// Masonry grid of project images; clicking one opens a lightbox slideshow.
export default function ProjectGallery({ images, title }) {
  const [openIndex, setOpenIndex] = useState(null);
  const touchStartX = useRef(null);
  const isOpen = openIndex !== null;
  const current = isOpen ? images[openIndex] : null;
  const hasMany = images.length > 1;

  const show = (index) => setOpenIndex((index + images.length) % images.length);
  const close = () => setOpenIndex(null);

  const handleKeyDown = (event) => {
    if (!hasMany) return;
    if (event.key === "ArrowRight") show(openIndex + 1);
    if (event.key === "ArrowLeft") show(openIndex - 1);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (!hasMany || Math.abs(distance) < 40) return;
    show(openIndex + (distance < 0 ? 1 : -1));
  };

  return (
    <>
      <ul className="columns-1 gap-5 sm:columns-2" aria-label={`${title} images`}>
        {images.map((image, index) => (
          <li key={image.src} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open image ${index + 1} of ${images.length}: ${image.alt}`}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:border-[#9db8b6] hover:shadow-[0_14px_32px_rgba(16,37,40,.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? FALLBACK.width}
                height={image.height ?? FALLBACK.height}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="block h-auto w-full bg-[#dce2df]"
              />
              <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark/80 text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <FiMaximize2 aria-hidden="true" className="h-4 w-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <div className="fixed inset-0 bg-brand-dark/95" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-6">
          <DialogPanel
            onKeyDown={handleKeyDown}
            className="flex h-full w-full max-w-345 flex-col gap-3 text-[#f5f8f7]"
          >
            <div className="flex items-center justify-between gap-4">
              <DialogTitle className="min-w-0 truncate font-heading text-lg">{title}</DialogTitle>
              <div className="flex items-center gap-3">
                {hasMany && (
                  <span className="font-mono text-xs text-mist" aria-live="polite">
                    {openIndex + 1} / {images.length}
                  </span>
                )}
                <button type="button" onClick={close} aria-label="Close" className={controlClasses}>
                  <FiX aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative flex min-h-0 grow items-center gap-3">
              {hasMany && (
                <button
                  type="button"
                  onClick={() => show(openIndex - 1)}
                  aria-label="Previous image"
                  className={`${controlClasses} absolute left-1 z-10 sm:static`}
                >
                  <FiChevronLeft aria-hidden="true" className="h-5 w-5" />
                </button>
              )}
              <div
                className="relative h-full min-w-0 grow"
                onTouchStart={(event) => {
                  touchStartX.current = event.touches[0].clientX;
                }}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: "pan-y" }}
              >
                {current && (
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                )}
              </div>
              {hasMany && (
                <button
                  type="button"
                  onClick={() => show(openIndex + 1)}
                  aria-label="Next image"
                  className={`${controlClasses} absolute right-1 z-10 sm:static`}
                >
                  <FiChevronRight aria-hidden="true" className="h-5 w-5" />
                </button>
              )}
            </div>

            {current && <p className="mx-auto max-w-180 text-center text-[13px] leading-normal text-mist">{current.alt}</p>}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
