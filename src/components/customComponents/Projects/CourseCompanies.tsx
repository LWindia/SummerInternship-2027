"use client";

// "Our Summer Learner's Are Working At" for course pages, in the course hero theme.
// Uses the same company logos as the homepage section (which stays unchanged).

import React from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";
import { companiesRow1, companiesRow2 } from "@/components/customComponents/CompaniesCarousel/CompaniesCarousel";

function LogoRow({ items, reverse }: { items: { image: string }[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <ul
        className="flex w-max animate-marquee gap-3 py-2 hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-4"
        style={{ animationDuration: "70s", animationDirection: reverse ? "reverse" : "normal" }}
      >
        {loop.map((c, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/95 px-4 shadow-[0_6px_24px_-10px_rgba(255,0,0,0.5)] transition-transform duration-300 hover:-translate-y-0.5 md:h-20 md:w-44"
          >
            <Image
              src={c.image}
              alt={i < items.length ? `Company logo ${i + 1}` : ""}
              width={140}
              height={56}
              loading="lazy"
              className="h-10 w-auto max-w-full object-contain md:h-12"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CourseCompanies() {
  return (
    <section aria-labelledby="companies-heading" className="relative isolate overflow-hidden bg-[#000000] py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-64 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff0000]/15 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff0000]/60 to-transparent" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#ff0000]/40 bg-[#ff0000]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#ff0000] sm:text-sm">
          <Building2 className="h-4 w-4" /> Alumni Network
        </span>
        <h2 id="companies-heading" className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
          Our Summer Learner&apos;s{" "}
          <span className="text-[#ff0000]">
            Are Working At
          </span>
        </h2>
        <div className="mx-auto mt-5 h-[2px] w-32 rounded-full bg-gradient-to-r from-[#7a0b0b] via-[#ff0000] to-[#7a0b0b]" />
      </div>

      <div className="mt-10 space-y-3 md:space-y-4">
        <LogoRow items={companiesRow1} />
        <LogoRow items={companiesRow2} reverse />
      </div>
    </section>
  );
}
