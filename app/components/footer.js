import { BrandMark } from "./buttons";
import { container } from "./section";

const footerLinks = {
  Services: [
    ["3D Floor Plans", "/#services"],
    ["Equipment Graphics", "/#services"],
    ["Critical Rooms", "/#services"],
    ["Buildings & Campus", "/#services"],
    ["Full graphics package", "/#services"],
  ],
  Platform: [
    ["IBMS3D Platform", "/#platform"],
    ["Book a demo", "/contact"],
  ],
  Company: [
    ["Work", "/portfolio"],
    ["How we work", "/#process"],
    ["About", "/#about"],
    ["Contact", "/contact"],
  ],
};

const linkClasses = "text-mist transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-mist">
      <div className={`${container} flex flex-col gap-10 pb-8 pt-14`}>
        <div className="grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-3">
            <BrandMark light />
            <p className="leading-relaxed">
              3D graphics and live 3D front ends for building management systems. A studio of SD IoTecs LLP.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div className="flex flex-col items-start gap-2.5" key={title}>
              <span className="text-xs uppercase tracking-[.12em] text-[#f5f8f7]">{title}</span>
              {links.map(([label, href]) => (
                <a className={linkClasses} href={href} key={label}>
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-line-dark pt-6 text-[13px]">
          <span>© 2026 IBMS3D · SD IoTecs LLP, Pune, India</span>
          <a className={linkClasses} href="mailto:sales@ibms3d.com">
            sales@ibms3d.com
          </a>
        </div>
      </div>
    </footer>
  );
}
