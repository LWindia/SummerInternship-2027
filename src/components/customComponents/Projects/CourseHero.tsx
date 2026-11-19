"use client";

// Hero shared by every course page: breadcrumb with Back, badge, headline,
// feature badges, price and CTAs. The right column is passed in as `visual`
// (GenAI uses its AI showcase, other courses use CourseImageShowcase).

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Download,
  GraduationCap,
  Layers,
  Rocket,
  Video,
} from "lucide-react";
import BrochureFormDialog from "./BrochureFormDialog";
import { LISTING_URL } from "./CourseNavbar";
import type { ProjectPage } from "./projectPagesData";
/* ------------------------------------------------------------------ */

export default function CourseHero({ page, visual }: { page: ProjectPage; visual: React.ReactNode }) {
  const router = useRouter();
  const [brochureOpen, setBrochureOpen] = useState(false);

  const enroll = () => window.open(page.paymentLink, "_blank", "noopener,noreferrer");

  const goBack = () => {
    // Real previous page when there is one, otherwise the internship listing.
    if (window.history.length > 1) router.back();
    else router.push(LISTING_URL);
  };

  // Headline accent: text up to "to" in red-orange, the rest in golden yellow (e.g. "Prompt Engineering to" / "AI Agents").
  const [accentA, accentB] = useMemo(() => {
    const m = page.headlineAccent.match(/^(.*\bto)\s+(.+)$/);
    return m ? [m[1], m[2]] : [page.headlineAccent, ""];
  }, [page.headlineAccent]);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#000000]">
        <HeroBackground />

        {/* breadcrumb */}
        <div className="container mx-auto max-w-7xl px-4 pt-5 md:pt-7">
          <div className="flex items-center gap-3 text-xs md:text-sm text-gray-400 animate-in fade-in-0 duration-500 fill-mode-both motion-reduce:animate-none">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#ff0000]/60 bg-[#ff0000]/10 px-3 py-1 text-white transition-colors hover:bg-[#ff0000]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000]"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <span className="h-5 w-px shrink-0 bg-white/15" aria-hidden />
            <nav aria-label="Breadcrumb" className="min-w-0">
              <ol className="flex min-w-0 items-center gap-1.5">
                <li className="shrink-0">
                  <Link href="/" className="hover:text-white">Home</Link>
                </li>
                <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <li className="shrink-0 hidden sm:block">
                  <Link href={LISTING_URL} className="hover:text-white">Summer Internship 2027</Link>
                </li>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 hidden sm:block" aria-hidden />
                <li className="min-w-0 truncate text-gray-100" aria-current="page">
                  {page.shortTitle}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-8 md:pb-20 md:pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
          {/* -------- left column -------- */}
          <div className="min-w-0">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#ff0000]/50 bg-[#ff0000]/10 px-3.5 py-1.5 text-[11px] sm:text-sm font-semibold text-red-200 animate-in fade-in-0 slide-in-from-bottom-3 duration-700 fill-mode-both motion-reduce:animate-none">
              <GraduationCap className="h-4 w-4 shrink-0 text-[#ff0000]" />
              <span className="truncate">{page.badge}</span>
            </span>

            <h1 className="mt-5 font-extrabold leading-[0.98] tracking-tight text-[2.5rem] sm:text-6xl xl:text-[4.6rem] animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both motion-reduce:animate-none">
              <span className="block text-white">{page.headline}</span>
              <span className="block text-[#ff0000]">
                {accentA}
              </span>
              {accentB && (
                <span className="relative inline-block text-[#ff0000]">
                  {accentB}
                  <svg
                    viewBox="0 0 300 24"
                    preserveAspectRatio="none"
                    className="absolute -bottom-2 left-[38%] h-3 w-[110%] sm:h-4"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="genai-swoosh" x1="0" x2="1">
                        <stop offset="0" stopColor="#ff0000" />
                        <stop offset="0.6" stopColor="#ff0000" />
                        <stop offset="1" stopColor="#ff0000" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M2 20 C 90 4, 200 2, 298 8" fill="none" stroke="url(#genai-swoosh)" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              )}
            </h1>

            <p className="mt-6 text-lg sm:text-2xl text-gray-200 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both motion-reduce:animate-none">
              {page.subheadline}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both motion-reduce:animate-none">
              {[
                { icon: CalendarDays, text: page.duration },
                { icon: Video, text: page.mode },
                { icon: Layers, text: "Project Based" },
                { icon: BadgeCheck, text: "Industry Recognised" },
              ].map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-xs sm:text-sm text-gray-100 backdrop-blur"
                >
                  <Icon className="h-4 w-4 shrink-0 text-[#ff0000]" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both motion-reduce:animate-none">
              <span className="text-4xl sm:text-5xl font-extrabold text-white">₹{page.price}</span>
              <span className="text-xl sm:text-2xl text-gray-500 line-through decoration-[#ff0000]/70">
                ₹{page.originalPrice}
              </span>
              <span className="text-sm sm:text-base text-gray-400">+Taxes</span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both motion-reduce:animate-none">
              <button
                type="button"
                onClick={enroll}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff0000] px-7 py-3.5 text-base sm:text-lg font-bold text-white shadow-[0_8px_30px_-6px_rgba(255,0,0,0.7)] transition-all hover:shadow-[0_10px_40px_-4px_rgba(255,0,0,0.85)] hover:bg-[#ff0000]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <Rocket className="h-5 w-5" />
                Enroll Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => setBrochureOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/[0.03] px-7 py-3.5 text-base sm:text-lg font-semibold text-white backdrop-blur transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <Download className="h-5 w-5" />
                Download Brochure
              </button>
            </div>
          </div>

          {/* -------- right column -------- */}
          {visual}
        </div>
      </section>

      <BrochureFormDialog
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        courseName={page.shortTitle}
        brochurePdfUrl={page.brochurePdfUrl}
      />
    </>
  );
}


/* ================================================================== */
/* Visuals                                                             */
/* ================================================================== */

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(255,0,0,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(255,0,0,0.12),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      {/* light waves along the bottom */}
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-40 w-full md:h-56">
        <defs>
          <linearGradient id="genai-wave" x1="0" x2="1">
            <stop offset="0" stopColor="#ff0000" stopOpacity="0" />
            <stop offset="0.55" stopColor="#ff0000" stopOpacity="0.7" />
            <stop offset="1" stopColor="#ff0000" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {[0, 14, 28, 42, 56].map((o, i) => (
          <path
            key={o}
            d={`M0 ${200 - o} C 360 ${170 - o}, 720 ${215 - o}, 1080 ${140 - o} S 1440 ${60 - o}, 1440 ${60 - o}`}
            fill="none"
            stroke="url(#genai-wave)"
            strokeWidth={i === 2 ? 2 : 1}
            opacity={1 - i * 0.15}
          />
        ))}
      </svg>
    </div>
  );
}
