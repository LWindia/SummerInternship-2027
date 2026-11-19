"use client";

// "Hear What Our Summer Learner's have to say" for COURSE PAGES only.
// Layout: text on the left, grid of video cards on the right. Videos play inline
// inside their card (no pop-up); starting one stops the previous one.
// The number of columns is chosen from the number of videos (e.g. 6 -> 3 x 2),
// followed by an "& many more stories" strip.
// The homepage keeps its own VideoTestimonials component.
// Videos come from each course's `videos` list in projectPagesData.ts.
// With no videos yet, the grid shows placeholder cards.

/* eslint-disable @next/next/no-img-element -- YouTube thumbnails are plain remote images */

import React, { useMemo, useState } from "react";
import { GraduationCap, Play, Rocket, TrendingUp, Youtube } from "lucide-react";

export interface CourseVideo {
  youtubeUrl: string; // any YouTube link: youtu.be/ID, watch?v=ID, shorts/ID, embed/ID
  name?: string; // learner name shown on the card, e.g. "Ananya Singhal"
  college?: string; // shown under the name, e.g. "JECRC Foundation"
  title?: string; // used when there is no name
}

// Pulls the 11-character video ID out of any common YouTube URL format.
export function youtubeId(url: string): string | null {
  const u = url.trim();
  const m =
    u.match(/youtu\.be\/([\w-]{11})/) ||
    u.match(/[?&]v=([\w-]{11})/) ||
    u.match(/youtube(?:-nocookie)?\.com\/(?:embed|shorts|live)\/([\w-]{11})/);
  return m ? m[1] : null;
}

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const PLACEHOLDERS = 8;

type Item = { id: string; name: string; college?: string };

const FEATURES = [
  { icon: GraduationCap, label: "Real Experiences" },
  { icon: Rocket, label: "Learning Journey" },
  { icon: TrendingUp, label: "Career Impact" },
];

// Columns chosen from the number of cards so rows come out even:
// 1-4 -> one row, multiples of 3 (6, 9, ...) -> 3 columns, otherwise 4.
// Phones always use 2 columns.
const columnsFor = (n: number) => {
  const cols = n <= 4 ? n : n % 3 === 0 ? 3 : 4;
  return (
    {
      1: "grid-cols-1 sm:max-w-xs",
      2: "grid-cols-2",
      3: "grid-cols-2 sm:grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4",
    } as Record<number, string>
  )[cols];
};

export default function CourseVideoTestimonials({
  videos,
  courseName,
}: {
  videos: CourseVideo[];
  courseName: string;
}) {
  const items = useMemo<Item[]>(
    () =>
      videos.flatMap((v, i) => {
        const id = youtubeId(v.youtubeUrl);
        if (!id) return [];
        return [
          {
            id,
            name: v.name?.trim() || v.title?.trim() || `Learner story ${i + 1}`,
            college: v.college?.trim() || undefined,
          },
        ];
      }),
    [videos]
  );
  const [playing, setPlaying] = useState<number | null>(null);
  const count = items.length > 0 ? items.length : PLACEHOLDERS;

  return (
    <section aria-labelledby="course-videos-heading" className="relative isolate bg-[#000000] py-16 md:py-24">
      {/* ambient light */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -left-24 top-1/4 h-[26rem] w-[26rem] rounded-full bg-[#ff0000]/15 blur-[130px] animate-glow" />
        <div className="absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[#ff0000]/10 blur-[120px] animate-glow [animation-delay:2s]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff0000]/60 to-transparent" />
      </div>

      <div className="container mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:gap-12">
        {/* ---------- left: text, aligned to the top of the video grid ---------- */}
        <div className="lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ff0000]/50 bg-[#ff0000]/10 px-4 py-1.5 text-sm font-bold text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff0000]">
              <Play className="ml-0.5 h-3 w-3 fill-white text-white" />
            </span>
            Creator Stories
          </span>

          <h2 id="course-videos-heading" className="mt-6 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
            Hear What Our <span className="block text-[#ff0000]">Summer Learner&apos;s</span>
            have to say
          </h2>
          <svg viewBox="0 0 200 12" className="mt-3 h-3 w-48" aria-hidden>
            <path d="M2 9 C 60 2, 140 2, 198 6" fill="none" stroke="#ff0000" strokeWidth="3" strokeLinecap="round" />
          </svg>

          <p className="mt-6 max-w-md text-base leading-relaxed text-gray-300 md:text-lg">
            Real stories from our students as they share their learning experience, projects and journey with LinuxWorld.
          </p>

          <ul className="mt-7 grid max-w-md grid-cols-3 gap-3">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-4 text-center"
              >
                <Icon className="h-6 w-6 text-[#ff0000]" />
                <span className="text-xs font-semibold leading-tight text-gray-100 sm:text-sm">{label}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-gray-500">
            {items.length > 0
              ? `Videos from ${courseName} learners 2026`
              : `Videos from ${courseName} learners coming soon`}
          </p>
        </div>

        {/* ---------- right: video grid (columns follow the number of videos) ---------- */}
        <div>
        <ul aria-label="Learner videos" className={`grid gap-3 sm:gap-4 ${columnsFor(count)}`}>
          {items.length > 0
            ? items.map((v, i) => (
                <li key={`${v.id}-${i}`}>
                  <VideoCard item={v} playing={playing === i} onPlay={() => setPlaying(i)} />
                </li>
              ))
            : Array.from({ length: PLACEHOLDERS }).map((_, i) => (
                <li key={i}>
                  <PlaceholderCard index={i} />
                </li>
              ))}
        </ul>

        {items.length > 0 && <ManyMore />}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function VideoCard({ item, playing, onPlay }: { item: Item; playing: boolean; onPlay: () => void }) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border-2 bg-[#111] shadow-[0_12px_40px_-14px_rgba(255,0,0,0.6)] transition-colors duration-300 ${
        playing ? "border-[#ff0000]" : "border-white/15 hover:border-[#ff0000]"
      }`}
    >
      <div className="relative aspect-[3/4] w-full">
        {playing ? (
          // plays right here on the page
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={`${item.name}${item.college ? `, ${item.college}` : ""}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`Play video: ${item.name}`}
            className="group absolute inset-0 block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
          >
            <img
              src={thumb(item.id)}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10" />

            <span className="absolute left-2.5 top-2.5 inline-flex items-center rounded-lg bg-[#ff0000] p-1.5 text-white shadow">
              <Youtube className="h-3.5 w-3.5" />
            </span>

            <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/90 bg-black/30 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:border-[#ff0000] group-hover:bg-[#ff0000] sm:h-12 sm:w-12">
              <Play className="ml-0.5 h-5 w-5 fill-white text-white sm:h-6 sm:w-6" />
            </span>

            <span className="absolute inset-x-0 bottom-0 p-3">
              <Caption item={item} />
            </span>
          </button>
        )}
      </div>

      {/* while playing, the name moves below the video so it does not cover the player controls */}
      {playing && (
        <div className="border-t border-white/10 px-3 py-2.5 sm:px-4">
          <Caption item={item} />
        </div>
      )}
    </article>
  );
}

function Caption({ item }: { item: Item }) {
  return (
    <>
      <span className="block text-sm font-extrabold leading-tight text-white sm:text-base">{item.name}</span>
      {item.college && <span className="mt-0.5 block text-[11px] leading-snug text-gray-300 sm:text-xs">{item.college}</span>}
      <span className="mt-1.5 block h-1 w-10 rounded-full bg-[#ff0000]" />
    </>
  );
}

// Strip after the last video.
function ManyMore() {
  return (
    <div className="mt-4 flex items-center gap-4 rounded-2xl border border-[#ff0000]/40 bg-gradient-to-r from-[#ff0000]/15 via-white/[0.03] to-transparent px-5 py-4">
      <span className="flex -space-x-2" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-[#ff0000]"
            style={{ opacity: 1 - i * 0.25 }}
          >
            <Play className="ml-0.5 h-3.5 w-3.5 fill-white text-white" />
          </span>
        ))}
      </span>
      <p className="text-base font-extrabold text-white sm:text-lg">
        &amp; many more <span className="text-[#ff0000]">stories</span>
      </p>
    </div>
  );
}

function PlaceholderCard({ index }: { index: number }) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-2 border-dashed border-white/15 bg-gradient-to-b from-[#1a0505] to-[#0b0b0b]">
      <span
        className="absolute inset-0 animate-pulse bg-white/[0.03] motion-reduce:animate-none"
        style={{ animationDelay: `${index * 0.25}s` }}
      />
      <span className="absolute left-2.5 top-2.5 inline-flex items-center rounded-lg bg-white/10 p-1.5 text-white/50">
        <Youtube className="h-3.5 w-3.5" />
      </span>
      <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/20 sm:h-14 sm:w-14">
        <Play className="ml-0.5 h-5 w-5 text-white/30 sm:h-6 sm:w-6" />
      </span>
      <span className="absolute inset-x-0 bottom-0 space-y-2 p-3 sm:p-4">
        <span className="block h-3 w-3/4 rounded-full bg-white/10" />
        <span className="block h-2.5 w-1/2 rounded-full bg-white/[0.07]" />
        <span className="block h-1 w-12 rounded-full bg-[#ff0000]/40" />
      </span>
    </div>
  );
}
