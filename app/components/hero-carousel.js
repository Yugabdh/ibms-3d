"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { blueprintGrid } from "./illustrations";
import { images } from "../config/images";

// One slide per service on the home page. `input` → `output` fills the badge.
const slides = [
  {
    title: "3D Floor Plans",
    image: images.officeLevel4,
    fit: "contain",
    input: "AutoCAD .dwg",
    output: "Layered 3D floor graphic",
  },
  {
    title: "Equipment Graphics",
    image: images.airHandlingUnit,
    fit: "cover",
    input: "Equipment schedule",
    output: "Animated equipment graphic",
  },
  {
    title: "Critical Rooms",
    image: images.upsRoom,
    fit: "cover",
    input: "Room layout .dwg",
    output: "Rack-level room graphic",
  },
  {
    title: "Buildings & Campus",
    image: images.buildingExterior,
    fit: "cover",
    input: "Site plan + elevations",
    output: "3D building model",
  },
];

const fits = {
  contain: "object-contain",
  cover: "rounded-lg object-cover",
};

const AUTO_ADVANCE_MS = 5000;

const controlClasses =
  "inline-flex h-8 w-8 touch-manipulation items-center justify-center rounded-full border border-line-dark text-mist transition-colors hover:border-brand-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const slide = slides[activeSlide];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [paused]);

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
      aria-label="Graphics we deliver"
      aria-roledescription="carousel"
      className="relative min-w-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={`${blueprintGrid} rounded-2xl border border-line-dark px-5 pb-16 pt-7`}>
        <div className="flex items-center justify-between gap-3 px-1.5 pb-3.5 text-[11px] uppercase tracking-[.12em] text-[#8fa6a5]">
          <span aria-live="polite" aria-atomic="true">
            3D render · {slide.title}
          </span>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 sm:flex" role="group" aria-label="Choose a graphic">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  aria-current={index === activeSlide ? "true" : undefined}
                  onClick={() => showSlide(index)}
                  className="inline-flex h-6 touch-manipulation items-center rounded-full px-0.5 focus-visible:outline-2 focus-visible:outline-brand-accent"
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeSlide ? "w-4 bg-brand-accent" : "w-1.5 bg-[#36504f]"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button type="button" aria-label="Previous graphic" onClick={() => showSlide(activeSlide - 1)} className={controlClasses}>
              <FiChevronLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Next graphic" onClick={() => showSlide(activeSlide + 1)} className={controlClasses}>
              <FiChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* All slides stay mounted and cross-fade; the box keeps the floor plan's ratio. */}
        <div
          className="relative aspect-[1.73] w-full"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "pan-y" }}
        >
          {slides.map((item, index) => (
            <div
              key={item.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${item.title}`}
              aria-hidden={index !== activeSlide}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                preload={index === 0}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={fits[item.fit]}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-5.5 left-0 sm:left-5  flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-[13px] text-brand-dark shadow-[0_12px_32px_rgba(0,0,0,.28)]">
        <span className="rounded-md border border-field px-2 py-1 font-mono text-xs">{slide.input}</span>
        <FiArrowRight aria-hidden="true" className="h-4.5 w-4.5 shrink-0 text-brand-primary" />
        <span className="font-medium">{slide.output}</span>
      </div>
    </div>
  );
}
