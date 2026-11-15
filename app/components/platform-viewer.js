"use client";

import { useState } from "react";
import Image from "next/image";
import { images } from "../config/images";
import { blueprintGrid } from "./illustrations";

const states = {
  ok: { label: "NORMAL", dot: "bg-[#3ddc97]", stroke: "stroke-[#3ddc97]" },
  warn: { label: "WATCH", dot: "bg-[#f5b83d]", stroke: "stroke-[#f5b83d]" },
  alarm: { label: "ALARM", dot: "bg-[#ff6b5b]", stroke: "stroke-[#ff6b5b]" },
};

// Illustrative data. x / y are percentages over the Level 4 render.
const points = [
  {
    id: "hall", name: "Server hall", kind: "Room", where: "Level 4", value: "22.4 °C · 46 %RH", state: "ok", x: 21, y: 30,
    rows: [["Temperature", "22.4 °C"], ["Humidity", "46 %RH"], ["Dew point", "10.2 °C"], ["Leak detection", "Dry"]],
    trendLabel: "Temperature", spark: "0,36 20,34 40,35 60,33 80,34 100,32 120,33 140,35 160,34 180,33 200,34 220,33 240,34",
  },
  {
    id: "ups", name: "UPS-01", kind: "Equipment", where: "UPS room", value: "Load 62 %", state: "ok", x: 33, y: 22,
    rows: [["Load", "62 %"], ["Battery", "100 %"], ["Runtime", "28 min"], ["Mode", "Online"]],
    trendLabel: "Load", spark: "0,30 20,28 40,26 60,27 80,24 100,22 120,23 140,25 160,24 180,26 200,25 220,24 240,25",
  },
  {
    id: "crac2", name: "CRAC-02", kind: "Equipment", where: "Server hall", value: "Return 27.9 °C", state: "alarm", x: 62, y: 24,
    alarm: "High return air temperature — above 27 °C for 6 min. Priority 2.",
    rows: [["Return air", "27.9 °C"], ["Supply air", "18.6 °C"], ["Fan speed", "82 %"], ["Compressor", "Stage 2"]],
    trendLabel: "Return air temp", spark: "0,40 20,39 40,40 60,38 80,37 100,36 120,33 140,30 160,26 180,22 200,18 220,14 240,12",
  },
  {
    id: "ahu", name: "AHU-L4", kind: "Equipment", where: "Plant room", value: "Running · 74 %", state: "ok", x: 84, y: 30,
    rows: [["Status", "Running"], ["Fan speed", "74 %"], ["Supply air", "16.8 °C"], ["Filter ΔP", "182 Pa"]],
    trendLabel: "Supply air temp", spark: "0,32 20,31 40,32 60,33 80,32 100,31 120,32 140,31 160,32 180,33 200,32 220,31 240,32",
  },
  {
    id: "east", name: "Zone E · open office", kind: "Zone", where: "Level 4", value: "23.1 °C · CO₂ 640", state: "warn", x: 72, y: 54,
    rows: [["Temperature", "23.1 °C"], ["CO₂", "640 ppm"], ["Occupancy", "48"], ["VAV damper", "64 %"]],
    trendLabel: "CO₂", spark: "0,46 20,44 40,40 60,36 80,32 100,28 120,26 140,25 160,24 180,24 200,23 220,22 240,22",
  },
  {
    id: "conf", name: "Conference wing", kind: "Zone", where: "Level 4", value: "24.0 °C", state: "ok", x: 42, y: 76,
    rows: [["Temperature", "24.0 °C"], ["Setpoint", "24.0 °C"], ["Lighting", "On"], ["Booked", "3 of 4 rooms"]],
    trendLabel: "Temperature", spark: "0,34 20,33 40,34 60,34 80,33 100,32 120,33 140,34 160,34 180,33 200,34 220,34 240,34",
  },
];

const tree = [
  ["Campus overview", 0],
  ["Tower A", 0],
  ["Level 3", 1],
  ["Level 4", 1, true],
  ["Server hall", 2],
  ["UPS room", 2],
  ["Conference wing", 2],
  ["Level 5", 1],
  ["Chiller plant", 0],
];

const indents = ["pl-2", "pl-5", "pl-8.5"];

const smallCaps = "text-[11px] uppercase tracking-[.12em] text-[#7e9695]";

export default function PlatformViewer() {
  const [pickedId, setPickedId] = useState("crac2");
  const selected = points.find((point) => point.id === pickedId) ?? points[0];
  const selectedState = states[selected.state];
  const alarmCount = points.filter((point) => point.state === "alarm").length;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#23393d] bg-[#0e2226]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#23393d] bg-[#102a2e] px-4.5 py-3">
        <nav aria-label="Location" className="flex flex-wrap items-center gap-2 text-[13px] text-mist">
          <span>Campus</span>
          <span aria-hidden="true">›</span>
          <span>Tower A</span>
          <span aria-hidden="true">›</span>
          <span className="font-medium text-[#f5f8f7]">Level 4</span>
        </nav>
        <div className="flex items-center gap-4 text-xs text-mist">
          <span className="inline-flex items-center gap-1.5 font-semibold tracking-[.08em] text-[#3ddc97]">
            <span className="h-2 w-2 rounded-full bg-[#3ddc97]" />
            LIVE
          </span>
          <span className="font-mono">
            {alarmCount} alarm · {points.length - alarmCount} normal
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[210px_minmax(0,1fr)_270px]">
        <div className="hidden flex-col gap-1 border-r border-[#23393d] px-3.5 py-4.5 text-[13px] lg:flex">
          <div className={`${smallCaps} px-2 pb-2`}>Navigation</div>
          {tree.map(([label, depth, active]) => (
            <div
              key={label}
              className={`${indents[depth]} py-2 pr-2 ${
                active ? "rounded-md bg-[#173a3e] font-medium text-[#f5f8f7]" : "text-mist"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        <div className={`${blueprintGrid} flex items-center px-3 py-7 sm:px-5`}>
          <div className="relative w-full">
            <Image
              src={images.officeLevel4.src}
              alt="Level 4 in 3D with live value tags pinned to rooms and equipment"
              width={images.officeLevel4.width}
              height={images.officeLevel4.height}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="block h-auto w-full"
            />
            {points.map((point) => {
              const isSelected = point.id === pickedId;
              return (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => setPickedId(point.id)}
                  aria-pressed={isSelected}
                  aria-label={`${point.name}, ${point.value}, ${states[point.state].label.toLowerCase()}`}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  className="absolute flex -translate-x-5.5 -translate-y-1/2 touch-manipulation items-center gap-1 p-2.5 focus-visible:outline-2 focus-visible:outline-brand-accent"
                >
                  <span
                    className={`h-6 w-6 shrink-0 rounded-full border-3 border-brand-dark ${states[point.state].dot} ${
                      isSelected ? "shadow-[0_0_0_4px_rgba(94,211,200,.55)]" : ""
                    }`}
                  />
                  <span
                    className={`hidden flex-col items-start gap-px whitespace-nowrap rounded-lg border bg-brand-dark/92 px-2.5 py-1.5 text-left text-[#f5f8f7] sm:flex ${
                      isSelected ? "border-brand-accent" : "border-[#2a4245]"
                    }`}
                  >
                    <span className="text-[11px] text-mist">{point.name}</span>
                    <span className="font-mono text-xs font-medium">{point.value}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          aria-live="polite"
          className="flex flex-col gap-4 border-t border-[#23393d] bg-[#0c1f22] px-5 py-5.5 lg:border-l lg:border-t-0"
        >
          <div className="flex flex-col gap-1.5">
            <div className={smallCaps}>
              {selected.kind} · {selected.where}
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="font-heading text-[22px]">{selected.name}</div>
              <span className={`rounded-md px-2 py-1 text-[11px] font-semibold tracking-[.08em] text-brand-dark ${selectedState.dot}`}>
                {selectedState.label}
              </span>
            </div>
          </div>
          {selected.alarm && (
            <div className="rounded-lg border border-[#ff6b5b] bg-[#ff6b5b]/10 px-3 py-2.5 text-[13px] leading-[1.45] text-[#ffd4ce]">
              {selected.alarm}
            </div>
          )}
          <dl>
            {selected.rows.map(([key, value]) => (
              <div className="flex justify-between gap-3 border-b border-line-dark py-2.5 text-[13px]" key={key}>
                <dt className="text-mist">{key}</dt>
                <dd className="font-mono text-[#f5f8f7]">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-2">
            <div className={`${smallCaps} flex justify-between tracking-widest`}>
              <span>{selected.trendLabel}</span>
              <span>24 h</span>
            </div>
            <svg
              viewBox="0 0 240 64"
              width="100%"
              height="64"
              role="img"
              aria-label={`${selected.trendLabel} over the last 24 hours`}
              className="block rounded-lg bg-[#102a2e]"
            >
              <polyline
                points={selected.spark}
                fill="none"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                className={selectedState.stroke}
              />
            </svg>
          </div>
          <div className="mt-auto text-[11px] text-[#7e9695]">Illustrative data · select any tag on the model</div>
        </div>
      </div>
    </div>
  );
}
