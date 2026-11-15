
"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

import { BrandMark, Button } from "./buttons";
import { container } from "./section";
import { navigation } from "../config/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState(null);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setExpandedMobileItem(null);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line-dark bg-brand-dark">
        <nav
          aria-label="Main navigation"
          className={`${container} flex h-17 items-center justify-between gap-6  font-normal`}
        >
          <BrandMark light />

          {/* Desktop navigation */}
          <div className="ml-auto hidden items-center gap-8 md:flex">
            {navigation.map(({ label, href, children }) => (
              <div className="group relative h-17" key={label}>
                <Link
                  href={href}
                  aria-haspopup={children?.length ? "true" : undefined}
                  className="inline-flex h-full items-center gap-1 text-sm text-[#c9d6d5] transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                >
                  {label}
                  {children?.length > 0 && (
                    <FaPlus className="h-3 w-3" />
                  )}
                </Link>

                {children?.length > 0 && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-1 rounded-lg border border-line-dark bg-brand-dark p-2 opacity-0 shadow-[0_12px_30px_rgba(0,0,0,.35)] transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block whitespace-nowrap rounded-md px-3 py-2.5 text-xs text-[#c9d6d5] transition-colors hover:bg-[#173a3e] hover:text-white focus-visible:bg-[#173a3e] focus-visible:text-white focus-visible:outline-none"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              href="/contact"
              variant="header"
              size="md"
            >
              Discuss a project
            </Button>
          </div>

          {/* Mobile menu trigger: matching the working project */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open main menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="-m-2.5 inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-md p-2.5 text-[#c9d6d5] hover:text-white"
            >
              <FiMenu aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <Dialog
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        className="relative z-50 md:hidden"
      >
        {/* Simple backdrop, matching the working project */}
        <div
          className="fixed inset-0 bg-brand-dark/35"
          aria-hidden="true"
        />

        <DialogPanel
          id="mobile-navigation"
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto bg-brand-dark px-5 py-5 shadow-xl ring-1 ring-line-dark"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-line-dark pb-4">
            <DialogTitle as="div">
              <BrandMark light />
            </DialogTitle>

            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close main menu"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2.5 text-[#c9d6d5] hover:text-white"
            >
              <FiX aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile navigation */}
          <div className="flex flex-1 flex-col gap-1 py-5">
            {navigation.map(({ label, href, children }) => {
              const hasChildren =
                Array.isArray(children) && children.length > 0;

              const isExpanded = expandedMobileItem === label;

              return (
                <div className="border-b border-line-dark" key={label}>
                  <div className="flex min-h-12 items-center justify-between gap-3">
                    <Link
                      href={href}
                      onClick={closeMobileMenu}
                      className="flex min-h-12 flex-1 items-center px-1 text-sm text-[#f5f8f7] transition-colors hover:text-brand-accent"
                    >
                      {label}
                    </Link>

                    {hasChildren && (
                      <button
                        type="button"
                        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${label} submenu`}
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedMobileItem(
                            isExpanded ? null : label
                          )
                        }
                        className="mr-1 inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center text-brand-accent"
                      >
                        <span
                          aria-hidden="true"
                          className="text-lg leading-none"
                        >
                          {isExpanded ? "−" : "+"}
                        </span>
                      </button>
                    )}
                  </div>

                  {hasChildren && isExpanded && (
                    <div className="flex flex-col pb-2 pl-3">
                      {children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMobileMenu}
                          className="py-3 text-xs text-mist transition-colors hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile CTA appears inside the drawer only */}
            <Button
              href="/contact"
              size="md"
              fullWidth
              className="mt-4"
              onClick={closeMobileMenu}
            >
              Discuss a project
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
