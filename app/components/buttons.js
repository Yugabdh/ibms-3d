import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

// Each CSS property is set by exactly one of base / size / variant. Tailwind
// resolves duplicate utilities by stylesheet order, not class-string order, so
// a property set in two places (or again via `className`) may not apply.
// Keep `className` for spacing and positioning only (margins, self-*, etc.).

// Colours only: background, text and border colour (border width is in base).
const variants = {
  primary: "border-transparent bg-brand-primary text-white hover:bg-[#056b70]",
  header: "border-transparent bg-brand-primary text-white hover:bg-[#056b70]",
  accent: "border-transparent bg-brand-accent text-brand-dark hover:bg-[#8aeeea]",
  white: "border-transparent bg-white text-brand-dark hover:bg-brand-light",
  outlineLight: "border-[#456265] bg-transparent text-white hover:border-brand-accent hover:bg-white/5",
  ghostDark: "border-[#36504f] bg-transparent text-[#f5f8f7] hover:border-brand-accent hover:text-white",
  lightOutline: "border-[#d3e1df] bg-transparent text-brand-dark hover:border-brand-primary",
  outlineWhite: "border-white/55 bg-transparent text-white hover:border-white hover:bg-white/10",
};

// Dimensions only: height, padding, gap, radius and font size.
const sizes = {
  sm: "min-h-10 gap-3 rounded-sm px-3.5 py-2 text-xs",
  md: "min-h-11 gap-2 rounded-lg px-5 py-2 text-sm",
  lg: "min-h-12 gap-2 rounded-lg px-6 py-2 text-[15px]",
  xl: "min-h-13 gap-2 rounded-lg px-7 py-2 text-base",
};

const baseButtonClasses =
  "inline-flex items-center border text-left font-medium leading-tight transition hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary";

export function Button({
  children,
  href,
  variant = "primary",
  size = "sm",
  arrow = true,
  fullWidth = false,
  className = "",
  ...props
}) {
  const width = fullWidth ? "w-full justify-between" : "justify-center";
  const classes = `${baseButtonClasses} ${width} ${sizes[size] ?? sizes.sm} ${variants[variant] ?? variants.primary} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <FiArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {content}
    </button>
  );
}

export function Eyebrow({ children, light = false, className = "" }) {
  return (
    <p
      className={`m-0 text-xs font-medium uppercase leading-normal tracking-[.14em] ${
        light ? "text-brand-accent" : "text-brand-primary"
      } ${className}`}
    >
      {children}
    </p>
  );
}

export function NewBadge() {
  return (
    <span className="rounded-sm bg-brand-accent px-1.5 py-0.5 text-[10px] font-semibold tracking-[.08em] text-brand-dark">
      NEW
    </span>
  );
}

export function BrandMark({ light = false, className = "" }) {
  return (
    <Link
      className={`inline-flex items-center gap-2.5 whitespace-nowrap font-heading text-xl font-medium tracking-[.02em] ${
        light ? "text-[#f5f8f7]" : "text-brand-dark"
      } ${className}`}
      href="/"
      aria-label="IBMS3D home"
    >
      <Image src="/images/ibms3d-mark.svg" alt="" width={32} height={32} unoptimized className="h-8 w-8 shrink-0" />
      <span>IBMS3D</span>
    </Link>
  );
}

export function ExternalArrow({ className = "" }) {
  return <FiArrowUpRight aria-hidden="true" className={`inline-block h-4 w-4 ${className}`} />;
}
