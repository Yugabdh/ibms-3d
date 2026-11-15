import { FiCheck } from "react-icons/fi";
import { Eyebrow } from "./buttons";

export const container = "mx-auto w-full max-w-345 px-5 sm:px-8";

export function SectionTitle({ eyebrow, title, light = false, as: Heading = "h2", className = "" }) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <Heading className="font-heading text-[clamp(2rem,3.6vw,2.875rem)] font-normal leading-[1.08] tracking-[-.015em]">
        {title}
      </Heading>
    </div>
  );
}

export function Tag({ children }) {
  return (
    <span className="rounded-full bg-chip px-2.5 py-1 text-xs text-chip-text">{children}</span>
  );
}

export function TagList({ tags, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  );
}

export function CheckList({ items, className = "" }) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {items.map((item) => (
        <li className="flex gap-2.5" key={item}>
          <FiCheck aria-hidden="true" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}
