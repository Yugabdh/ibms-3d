import { FiArrowRight, FiArrowUpRight, FiBox } from "react-icons/fi";
import Link from "next/link";

const variants = {
  primary: "bg-brand-primary text-white hover:bg-[#056b70]",
  outlineLight: "border border-[#456265] bg-transparent text-white hover:border-brand-accent hover:bg-white/5",
  accent: "bg-brand-accent text-brand-dark hover:bg-[#8aeeea]",
  header: "bg-brand-primary text-white hover:bg-[#056b70]",
  lightOutline: "border border-[#d3e1df] bg-transparent text-brand-dark hover:border-brand-primary",
};

const baseButtonClasses =
  "inline-flex min-h-10 items-center justify-center gap-3 rounded-sm border border-transparent px-3.5 py-2 text-left text-xs font-medium leading-tight transition hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary";

export function Button({
  children,
  href,
  variant = "primary",
  arrow = true,
  className = "",
  ...props
}) {
  const classes = `${baseButtonClasses} ${variants[variant] ?? variants.primary} ${className}`;
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
      className={`m-0 text-[9px] font-semibold uppercase leading-relaxed tracking-widest ${
        light ? "text-brand-accent" : "text-brand-primary"
      } ${className}`}
    >
      {children}
    </p>
  );
}

export function BrandMark({ light = false, className = "" }) {
  return (
    <Link
      className={`inline-flex items-center gap-2 whitespace-nowrap text-base font-medium tracking-[-.04em] ${
        light ? "text-[#c9d5d4]" : "text-[#42575a]"
      } ${className}`}
      href="/"
      aria-label="IBMS3D home"
    >
      <FiBox
        aria-hidden="true"
        className={`h-6 w-6 ${light ? "text-brand-accent" : "text-brand-primary"}`}
      />
      <span>IBMS3D</span>
    </Link>
  );
}

export function ExternalArrow({ className = "" }) {
  return <FiArrowUpRight aria-hidden="true" className={`inline-block h-4 w-4 ${className}`} />;
}
