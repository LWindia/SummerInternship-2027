"use client";

// "Our Learners" success wall, shared by every course page.
// Rendered below the Course Content & Projects section in ProjectPageView and GenAIPageView.

/* eslint-disable @next/next/no-img-element -- Cloudinary already serves optimised
   thumbnails (f_auto,q_auto,w_*), so next/image and a remote config are not needed. */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { LEARNER_IMAGE_SIZE, cloudinaryThumb, learnerStoryImages } from "./learnerStories";

const THUMB_WIDTHS = [240, 400, 640];
const SIZES = "(min-width: 1024px) 16vw, (min-width: 768px) 32vw, 48vw";

// Vertical stagger per column (no cropping, all cards stay square):
// 2 cols on mobile, 3 on tablet, 6 on desktop.
const staggerClass = (i: number) =>
  [
    i % 2 === 1 ? "translate-y-5" : "translate-y-0",
    i % 3 === 1 ? "md:translate-y-8" : "md:translate-y-0",
    i % 2 === 1 ? "lg:translate-y-10" : "lg:translate-y-0",
  ].join(" ");

const altFor = (i: number) => `LinuxWorld learner success story ${i + 1} of ${learnerStoryImages.length}`;

export default function LearnerSuccessWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  // reveal once when the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="learners-heading"
      className="relative isolate overflow-hidden bg-[#000000] py-16 md:py-24"
    >
      <Ambient />

      {/* premium transition from the curriculum */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff0000] to-transparent opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#ff0000]/[0.07] to-transparent" />

      {/* heading */}
      <div
        className={`container relative mx-auto max-w-4xl px-4 text-center transition-all duration-700 motion-reduce:transition-none ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#ff0000] sm:w-20" />
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ff0000] sm:text-sm">Our Learners</p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#ff0000] sm:w-20" />
        </div>

        <h2 id="learners-heading" className="relative mt-4 text-3xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
          <Sparkle className="absolute -left-1 -top-3 h-4 w-4 text-[#ff0000] sm:-left-6 sm:h-6 sm:w-6" />
          Meet the People Behind{" "}
          <span className="text-[#ff0000]">
            Our Success
          </span>
          <Sparkle className="absolute -bottom-2 -right-1 h-3 w-3 text-[#ff0000] [animation-delay:1.2s] sm:-right-6 sm:h-5 sm:w-5" />
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
          Real learners. Real experiences. Real journeys. A community building the future with LinuxWorld.
        </p>

        <div className="mx-auto mt-7 h-[2px] w-40 rounded-full bg-gradient-to-r from-[#7a0b0b] via-[#ff0000] to-[#7a0b0b]" />
      </div>

      {/* wall */}
      <ul className="container relative mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-3 px-4 pb-10 sm:gap-4 md:mt-14 md:grid-cols-3 md:gap-5 md:pb-12 lg:grid-cols-6">
        {learnerStoryImages.map((src, i) => (
          <li key={src} className={staggerClass(i)}>
            {/* scroll reveal lives on this wrapper so its delay never slows hover */}
            <div
              className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
                revealed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: revealed ? `${i * 35}ms` : "0ms" }}
            >
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Open ${altFor(i)}`}
              className="group relative block w-full rounded-2xl bg-gradient-to-br from-[#ff0000]/50 via-white/10 to-[#ff0000]/50 p-[1.5px] text-left outline-none transition-all duration-300 ease-out motion-reduce:transition-none hover:-translate-y-1 hover:from-[#ff0000] hover:to-[#ff0000] hover:shadow-[0_14px_40px_-10px_rgba(255,0,0,0.65)] focus-visible:from-[#ff0000] focus-visible:to-[#ff0000] focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,0.6)]"
            >
              <span className="relative block overflow-hidden rounded-[calc(1rem-1.5px)] bg-[#111]">
                <img
                  src={cloudinaryThumb(src, 400)}
                  srcSet={THUMB_WIDTHS.map((w) => `${cloudinaryThumb(src, w)} ${w}w`).join(", ")}
                  sizes={SIZES}
                  width={LEARNER_IMAGE_SIZE}
                  height={LEARNER_IMAGE_SIZE}
                  alt={altFor(i)}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-square h-auto w-full object-contain transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.06]"
                />
                {/* hover glow + expand hint */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#ff0000]/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="pointer-events-none absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
              </span>
            </button>
            </div>
          </li>
        ))}
      </ul>

      {active !== null && <Lightbox index={active} onChange={setActive} onClose={() => setActive(null)} />}
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Lightbox({
  index,
  onChange,
  onClose,
}: {
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const total = learnerStoryImages.length;
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  const prev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange]);
  const next = useCallback(() => onChange((index + 1) % total), [index, total, onChange]);

  useEffect(() => setLoaded(false), [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [onClose, prev, next]);

  // preload neighbours so prev/next feel instant
  useEffect(() => {
    [index - 1, index + 1].forEach((n) => {
      const img = new Image();
      img.src = learnerStoryImages[(n + total) % total];
    });
  }, [index, total]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={altFor(index)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in-0 duration-200"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-[#ff0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-6 sm:top-6"
      >
        <X className="h-6 w-6" />
      </button>

      <NavButton side="left" onClick={prev} />
      <NavButton side="right" onClick={next} />

      <figure className="relative w-full max-w-[min(92vw,80vh)]" onClick={(e) => e.stopPropagation()}>
        <div className="rounded-2xl bg-gradient-to-br from-[#7a0b0b] via-[#ff0000] to-[#7a0b0b] p-[2px] shadow-[0_0_60px_rgba(255,0,0,0.45)]">
          <div className="relative overflow-hidden rounded-[calc(1rem-2px)] bg-[#111]">
            {!loaded && (
              <img
                src={cloudinaryThumb(learnerStoryImages[index], 640)}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-contain blur-sm"
              />
            )}
            <img
              key={index}
              src={learnerStoryImages[index]}
              alt={altFor(index)}
              width={LEARNER_IMAGE_SIZE}
              height={LEARNER_IMAGE_SIZE}
              onLoad={() => setLoaded(true)}
              className={`relative block aspect-square h-auto w-full object-contain transition-opacity duration-300 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
        <figcaption className="mt-3 text-center text-sm text-gray-300">
          {index + 1} / {total}
        </figcaption>
      </figure>
    </div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-[#ff0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:h-14 sm:w-14 ${
        side === "left" ? "left-2 sm:left-6" : "right-2 sm:right-6"
      }`}
    >
      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
    </button>
  );
}

/* ------------------------------------------------------------------ */

const LIGHTS = [
  [6, 18], [14, 72], [24, 40], [38, 88], [52, 12], [63, 64], [74, 30], [86, 80], [94, 22], [46, 52],
];

function Ambient() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <div className="absolute left-1/2 top-[30%] h-[28rem] w-[70%] -translate-x-1/2 rounded-full bg-[#ff0000]/20 blur-[140px] animate-glow" />
      <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-[#ff0000]/15 blur-[120px] animate-glow [animation-delay:2.5s]" />
      <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#ff0000]/10 blur-[120px] animate-glow [animation-delay:1.2s]" />
      {LIGHTS.map(([x, y], i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#ff0000] shadow-[0_0_10px_#ff0000] animate-pulse"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 5) * 0.5}s` }}
        />
      ))}
    </div>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`animate-pulse ${className}`} fill="currentColor" aria-hidden>
      <path d="M12 0 C 13 8, 16 11, 24 12 C 16 13, 13 16, 12 24 C 11 16, 8 13, 0 12 C 8 11, 11 8, 12 0 Z" />
    </svg>
  );
}
