"use client";

// Navigation bar shared by every course page (fixed, dark glass).
// The site-wide Navbar hides itself on course routes so pages never show two bars.

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";
import LOGO from "../../../../public/assets/logo2.webp";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import BrochureFormDialog from "./BrochureFormDialog";
import { projectPages, type ProjectPage } from "./projectPagesData";

/* ------------------------------------------------------------------ */
/* Navigation config. Every link points at a destination that exists. */
/* ------------------------------------------------------------------ */

export const LISTING_URL = "/#Projects"; // Summer Internship listing (homepage course grid)

type NavItem = { label: string; href?: string; action?: "brochure"; external?: boolean };
type NavEntry = { label: string; href?: string; items?: NavItem[] };

const NAV: NavEntry[] = [
  {
    label: "Programs",
    items: projectPages.map((p) => ({ label: p.shortTitle, href: `/${p.slug}` })),
  },
  {
    label: "Internship",
    items: [
      { label: "Summer Internship 2027", href: LISTING_URL },
      { label: "Placement", href: "/#Placement" },
      { label: "Benefits", href: "/#Benefits" },
      { label: "Previous Summer", href: "/#Preivous" },
      { label: "Apply Now", href: "/application-form" },
    ],
  },
  // No page or URL exists for these yet. Add the real `href` to show them.
  { label: "Corporate Training", href: undefined },
  { label: "Blogs", href: undefined },
  {
    label: "Resources",
    items: [
      { label: "Download Brochure", action: "brochure" },
      { label: "Application Form", href: "/application-form" },
    ],
  },
];

const VISIBLE_NAV = NAV.filter((n) => n.href || (n.items && n.items.length > 0));

/* ------------------------------------------------------------------ */

export default function CourseNavbar({ page }: { page: ProjectPage }) {
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <CourseNavBar
        onEnroll={() => window.open(page.paymentLink, "_blank", "noopener,noreferrer")}
        onBrochure={() => setBrochureOpen(true)}
        onSearch={() => setSearchOpen(true)}
      />
      <BrochureFormDialog
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        courseName={page.shortTitle}
        brochurePdfUrl={page.brochurePdfUrl}
      />
      <CourseSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
/* ================================================================== */
/* Navbar                                                              */
/* ================================================================== */

function CourseNavBar({
  onEnroll,
  onBrochure,
  onSearch,
}: {
  onEnroll: () => void;
  onBrochure: () => void;
  onSearch: () => void;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const runItem = (item: NavItem) => {
    setOpenMenu(null);
    setMobileOpen(false);
    if (item.action === "brochure") onBrochure();
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 backdrop-blur-xl ${
          scrolled ? "border-white/10 bg-[#000000]/80 shadow-[0_8px_30px_rgba(0,0,0,0.5)]" : "border-white/5 bg-[#000000]/55"
        }`}
      >
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-[72px]">
          <Link href="/" className="flex shrink-0 items-center" aria-label="LinuxWorld home">
            <Image src={LOGO} alt="LinuxWorld" height={44} className="h-10 w-auto md:h-11" priority />
          </Link>

          {/* desktop links */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {VISIBLE_NAV.map((entry) =>
                entry.items ? (
                  <li
                    key={entry.label}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(entry.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={openMenu === entry.label}
                      aria-haspopup="true"
                      onClick={() => setOpenMenu(openMenu === entry.label ? null : entry.label)}
                      className="inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-[15px] text-gray-200 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000]"
                    >
                      {entry.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openMenu === entry.label ? "rotate-180 text-[#ff0000]" : ""}`}
                      />
                    </button>
                    {openMenu === entry.label && (
                      <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2 animate-in fade-in-0 zoom-in-95 duration-150">
                        <ul className="rounded-2xl border border-white/10 bg-[#0b0b0b]/95 p-2 shadow-2xl backdrop-blur-xl">
                          {entry.items.map((item) => (
                            <li key={item.label}>
                              <DropdownItem item={item} onSelect={() => runItem(item)} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={entry.label}>
                    <Link
                      href={entry.href!}
                      className="rounded-lg px-3.5 py-2 text-[15px] text-gray-200 transition-colors hover:text-white"
                    >
                      {entry.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={onSearch}
              aria-label="Search courses"
              className="rounded-full p-2.5 text-gray-200 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000]"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onEnroll}
              className="group hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#ff0000] px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_24px_-6px_rgba(255,0,0,0.8)] transition-all hover:bg-[#ff0000]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Enroll Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* mobile / tablet menu */}
        {mobileOpen && (
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-[#000000]/95 backdrop-blur-xl lg:hidden animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <nav aria-label="Mobile" className="container mx-auto max-w-7xl space-y-5 px-4 py-5">
              {VISIBLE_NAV.map((entry) => (
                <div key={entry.label}>
                  {entry.items ? (
                    <>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#ff0000]">{entry.label}</p>
                      <ul className="grid gap-1 sm:grid-cols-2">
                        {entry.items.map((item) => (
                          <li key={item.label}>
                            <DropdownItem item={item} onSelect={() => runItem(item)} />
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link href={entry.href!} onClick={() => setMobileOpen(false)} className="block py-1 text-base text-white">
                      {entry.label}
                    </Link>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onEnroll();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff0000] py-3 font-bold text-white sm:hidden"
              >
                Enroll Now <ArrowRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        )}
      </header>
      {/* keeps content clear of the fixed bar */}
      <div className="h-16 md:h-[72px] bg-[#000000]" aria-hidden />
    </>
  );
}

function DropdownItem({ item, onSelect }: { item: NavItem; onSelect: () => void }) {
  const cls =
    "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-gray-200 transition-colors hover:bg-white/[0.07] hover:text-white";
  const arrow = <ChevronRight className="h-4 w-4 shrink-0 text-[#ff0000]/80" />;
  if (item.action) {
    return (
      <button type="button" onClick={onSelect} className={cls}>
        {item.label}
        {arrow}
      </button>
    );
  }
  return (
    <Link href={item.href!} onClick={onSelect} className={cls}>
      {item.label}
      {arrow}
    </Link>
  );
}

/* ================================================================== */
/* Course search (searches the real course pages)                     */
/* ================================================================== */

function CourseSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return projectPages;
    return projectPages.filter((p) =>
      [p.shortTitle, p.seoDescription, ...p.keywords, ...p.tech].join(" ").toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setQ("");
      }}
    >
      <DialogContent className="max-w-lg border-white/10 bg-[#0b0b0b] p-0 text-white">
        <DialogTitle className="sr-only">Search courses</DialogTitle>
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="h-5 w-5 text-[#ff0000]" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses, e.g. Python, AWS, MERN"
            className="w-full bg-transparent py-1 text-base text-white placeholder:text-gray-500 focus:outline-none"
          />
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-gray-400">No courses found.</li>}
          {results.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${p.slug}`}
                onClick={() => onOpenChange(false)}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-200 hover:bg-white/[0.07] hover:text-white"
              >
                <span>{p.shortTitle}</span>
                <span className="shrink-0 text-xs text-gray-400">₹{p.price}</span>
              </Link>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

