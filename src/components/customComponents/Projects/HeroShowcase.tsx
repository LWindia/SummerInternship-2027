// 3D hero visual shared by course pages that have one (GenAI, Cloud Computing):
// a glowing tilted panel on a lit podium, with 3 floating cards on each side.
// Each course passes its own panel icons, title and cards.

import React from "react";
import { Radio } from "lucide-react";

export type ShowcaseCard = { label: string; icon: React.ReactNode };
export type ShowcaseConfig = {
  centerLeft: React.ReactNode; // icon left of the "+"
  centerRight: React.ReactNode; // icon right of the "+" (shown in a white outlined box)
  titleTop: string; // white line
  titleBottom: string; // red line
  left: [ShowcaseCard, ShowcaseCard, ShowcaseCard];
  right: [ShowcaseCard, ShowcaseCard, ShowcaseCard];
};
// Fixed positions keep server and client render identical.
const PARTICLES = [
  [8, 12, 2], [18, 78, 3], [27, 30, 2], [35, 92, 2], [46, 6, 3], [58, 86, 2], [66, 18, 2],
  [74, 64, 3], [83, 8, 2], [91, 40, 2], [12, 52, 2], [52, 48, 2], [96, 82, 3], [40, 70, 2],
];

const NODES: [number, number][] = [
  [8, 20], [22, 8], [40, 16], [62, 6], [82, 14], [94, 30], [90, 60], [6, 64], [16, 88], [92, 86],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [0, 7], [7, 8], [6, 9], [2, 4],
];

export default function HeroShowcase({ config }: { config: ShowcaseConfig }) {
  const [l1, l2, l3] = config.left;
  const [r1, r2, r3] = config.right;
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[600px] sm:aspect-[6/5] animate-in fade-in-0 zoom-in-95 duration-1000 delay-200 fill-mode-both motion-reduce:animate-none"
      aria-hidden
    >
      {/* network graphic */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-50">
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            stroke="#ff0000"
            strokeOpacity="0.35"
            strokeWidth="0.25"
          />
        ))}
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.8" fill="#ff0000" fillOpacity="0.8" />
        ))}
      </svg>

      {/* particles */}
      {PARTICLES.map(([x, y, s], i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#ff0000] shadow-[0_0_8px_#ff0000] animate-pulse"
          style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${(i % 7) * 0.4}s` }}
        />
      ))}

      {/* back glow */}
      <div className="absolute left-1/2 top-[44%] h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff0000]/40 blur-[90px] animate-glow" />

      {/* podium */}
      <div className="absolute bottom-[5%] left-1/2 h-[16%] w-[66%] -translate-x-1/2">
        <div className="absolute inset-x-0 bottom-0 h-full rounded-[50%] bg-gradient-to-b from-[#2a0606] to-black shadow-[0_0_60px_rgba(255,0,0,0.45)]" />
        <div className="absolute inset-x-[4%] top-0 h-[55%] rounded-[50%] border-2 border-[#ff0000] bg-gradient-to-b from-[#ff0000]/50 to-[#3a0606] shadow-[0_0_35px_rgba(255,0,0,0.9),inset_0_0_25px_rgba(255,0,0,0.45)]" />
      </div>

      {/* central 3D panel */}
      <div className="absolute left-1/2 top-[11%] w-[60%] -translate-x-1/2 [perspective:1200px]">
        <div className="animate-float">
          <div className="relative aspect-[4/3.3] rounded-[1.6rem] border-2 border-[#ff0000] bg-gradient-to-br from-[#3d0707] via-[#160303] to-[#2a0606] p-[6%] shadow-[0_0_45px_rgba(255,0,0,0.75),inset_0_0_40px_rgba(255,0,0,0.35)] [transform:rotateY(-16deg)_rotateX(6deg)]">
            <div className="absolute inset-[3%] rounded-[1.25rem] border border-[#ff0000]/30" />
            <div className="relative flex h-full flex-col items-center justify-center text-center">
              <div className="flex items-center gap-[6%]">
                <span className="flex h-10 w-10 items-center justify-center sm:h-14 sm:w-14">{config.centerLeft}</span>
                <span className="text-2xl font-bold text-white sm:text-4xl">+</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/70 sm:h-14 sm:w-14">
                  {config.centerRight}
                </span>
              </div>
              <p className="mt-[5%] text-2xl font-extrabold italic leading-none text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] sm:text-[2.6rem]">
                {config.titleTop}
              </p>
              <p className="mt-1 text-2xl font-extrabold italic leading-none text-[#ff0000] drop-shadow-[0_0_14px_rgba(255,0,0,0.6)] sm:text-[2.6rem]">
                {config.titleBottom}
              </p>
              {/* panel wave */}
              <svg viewBox="0 0 200 30" preserveAspectRatio="none" className="absolute bottom-[2%] left-0 h-[16%] w-full opacity-60">
                <path d="M0 22 C 40 8, 80 30, 120 14 S 180 4, 200 12" fill="none" stroke="#ff0000" strokeWidth="1.2" />
                <path d="M0 26 C 50 14, 90 30, 130 20 S 180 10, 200 18" fill="none" stroke="#ff0000" strokeWidth="0.8" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE badge */}
      <span className="absolute right-[6%] top-[3%] z-20 inline-flex items-center gap-1.5 rounded-full border border-[#ff0000]/60 bg-[#ff0000] px-3 py-1.5 text-[11px] font-bold text-white shadow-[0_0_25px_rgba(255,0,0,0.75)] sm:px-4 sm:text-sm">
        <Radio className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        LIVE | Project Based
      </span>

      {/* floating tool cards */}
      <FloatCard className="left-[1%] top-[14%]" delay="0s" {...l1} />
      <FloatCard className="left-[-1%] top-[40%]" delay="1.2s" {...l2} />
      <FloatCard className="left-[2%] top-[66%]" delay="2.4s" {...l3} />
      <FloatCard className="right-[1%] top-[19%]" delay="0.6s" {...r1} />
      <FloatCard className="right-[-1%] top-[43%]" delay="1.8s" {...r2} />
      <FloatCard className="right-[2%] top-[67%]" delay="3s" {...r3} />
    </div>
  );
}

function FloatCard({
  className,
  delay,
  label,
  icon,
}: {
  className: string;
  delay: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={`absolute z-10 ${className}`}>
      <div
        className="flex w-[70px] flex-col items-center gap-1.5 rounded-2xl border border-white/15 bg-white/[0.07] px-1.5 py-2.5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_18px_rgba(255,0,0,0.25)] backdrop-blur-md animate-float sm:w-[92px] sm:py-3"
        style={{ animationDelay: delay }}
      >
        {icon}
        <span className="text-[10px] font-semibold leading-tight text-gray-100 sm:text-xs">{label}</span>
      </div>
    </div>
  );
}

