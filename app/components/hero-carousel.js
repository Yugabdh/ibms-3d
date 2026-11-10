"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ExternalArrow } from "./buttons";
import { images } from "../config/images";

const slides = [
  {
    label: "ROOM OVERVIEW",
    title: "Battery & UPS Room",
    image: images.upsRoom,
  },
  {
    label: "AERIAL VIEW",
    title: "Aerial view of the building",
    image: images.buildingExterior,
  },
  {
    label: "ROOM ACCESS",
    title: "Layout, lighting and access",
    image: images.batteryRoom,
  },
];

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(null);
  const slide = slides[activeSlide];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  const showSlide = (index) => {
    setActiveSlide((index + slides.length) % slides.length);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 40) return;
    showSlide(activeSlide + (distance < 0 ? 1 : -1));
  };

  return (
    <div
      role="region"
      aria-label="Featured building views"
      aria-roledescription="carousel"
      className="min-w-0 bg-[#f4f6f3] p-2.5 text-brand-dark shadow-[0_22px_70px_rgba(0,0,0,.2)]"
    >
      <div className="flex items-center justify-between gap-3 px-2 pb-2.5 pt-1.5 text-[8px] tracking-[.04em] text-[#627477]">
        <span>3D / {slide.label}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous view"
            onClick={() => showSlide(activeSlide - 1)}
            className="inline-flex touch-manipulation items-center justify-center rounded-full hover:bg-[#e7eeeb] focus-visible:outline-2 focus-visible:outline-brand-primary"
          >
            <FiChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next view"
            onClick={() => showSlide(activeSlide + 1)}
            className="inline-flex touch-manipulation items-center justify-center rounded-full hover:bg-[#e7eeeb] focus-visible:outline-2 focus-visible:outline-brand-primary"
          >
            <FiChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="relative aspect-[1.68] w-full overflow-hidden bg-[#dce2df]"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        <Image
          src={slide.image.src}
          alt={slide.image.alt}
          fill
          preload
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 px-2 pb-1 pt-3 text-[9px] text-[#627477] sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <span aria-live="polite" aria-atomic="true">
          {slide.title}
        </span>
        <div className="flex items-center gap-1" role="group" aria-label="Choose a view">
          {slides.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-label={`Show ${item.label.toLowerCase()}`}
              aria-current={index === activeSlide ? "true" : undefined}
              onClick={() => showSlide(index)}
              className={`inline-flex touch-manipulation items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-brand-primary ${
                index === activeSlide ? "text-brand-primary" : "text-[#9aa9a7]"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-all ${
                  index === activeSlide ? "w-4 bg-brand-primary" : "w-1.5 bg-current"
                }`}
              />
            </button>
          ))}
          <Link
            href="/portfolio/battery-ups"
            className="ml-2 inline-flex items-center whitespace-nowrap"
          >
            Explore More <ExternalArrow className="ml-1 h-3.5 w-3.5 text-brand-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}
