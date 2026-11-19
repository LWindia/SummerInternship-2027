// Sections shared by every course page, all in the course hero theme:
// #000000 background, #ff0000 / #ff0000 / #ff0000 accents, glass cards.

import React from "react";
import Image from "next/image";
import {
  Award,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  Radio,
  Rocket,
  Sparkles,
  Star,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProjectCTA from "./ProjectCTA";
import type { ProjectPage } from "./projectPagesData";

const GRADIENT_TEXT = "text-[#ff0000]";

export function SectionHeading({
  eyebrow,
  children,
  id,
}: {
  eyebrow: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff0000] sm:text-sm">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
        {children}
      </h2>
      <div className="mx-auto mt-5 h-[2px] w-32 rounded-full bg-gradient-to-r from-[#7a0b0b] via-[#ff0000] to-[#7a0b0b]" />
    </div>
  );
}

/* ---------------- hero visual for courses without a custom one ---------------- */

export function CourseImageShowcase({ page }: { page: ProjectPage }) {
  return (
    <div className="relative mx-auto w-full max-w-lg animate-in fade-in-0 zoom-in-95 duration-1000 delay-200 fill-mode-both motion-reduce:animate-none">
      <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff0000]/35 blur-[90px] animate-glow" />
      <div className="relative animate-float">
        <div className="rounded-[1.8rem] bg-gradient-to-br from-[#ff0000] via-[#ff0000] to-[#ff0000] p-[2px] shadow-[0_0_60px_-6px_rgba(255,0,0,0.7)]">
          <div className="rounded-[calc(1.8rem-2px)] bg-gradient-to-br from-[#2a0606] via-[#100303] to-[#2a0606] p-3">
            <div className="overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-white to-gray-200">
              <Image
                src={page.image.src}
                alt={page.image.alt}
                width={640}
                height={480}
                priority
                className="h-auto w-full object-contain p-6"
              />
            </div>
          </div>
        </div>
        <span className="absolute -top-4 right-2 inline-flex items-center gap-1.5 rounded-full border border-[#ff0000]/60 bg-[#ff0000] px-3 py-1.5 text-xs font-bold text-white shadow-[0_0_25px_rgba(255,0,0,0.75)] sm:text-sm">
          <Radio className="h-4 w-4" /> LIVE | Project Based
        </span>
        <span className="absolute -bottom-4 -left-2 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#000000]/85 px-4 py-2 shadow-xl backdrop-blur">
          <BadgeCheck className="h-5 w-5 text-[#ff0000]" />
          <span>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Certificate</span>
            <span className="block text-sm font-bold text-white">Industry Recognised</span>
          </span>
        </span>
      </div>
    </div>
  );
}

/* ---------------- tools / technology strip ---------------- */

export function TechStrip({ items }: { items: string[] }) {
  const marquee = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.03] py-3">
      <div className="flex w-max animate-marquee gap-3">
        {marquee.map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-white/15 bg-white/[0.05] px-4 py-1 text-sm text-gray-200"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- highlights ---------------- */

const STAT_ICONS: [RegExp, LucideIcon][] = [
  [/duration|weeks?|days?/i, Clock],
  [/project/i, Rocket],
  [/start/i, CalendarDays],
  [/pre-?requisite/i, GraduationCap],
  [/rating/i, Star],
  [/practical/i, Zap],
  [/topic/i, BookOpen],
  [/certificate/i, Award],
];
const statIcon = (label: string): LucideIcon => STAT_ICONS.find(([re]) => re.test(label))?.[1] ?? Sparkles;

export function StatsStrip({ stats }: { stats: ProjectPage["stats"] }) {
  return (
    <section className="container mx-auto max-w-7xl px-4 py-10 md:py-14">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {stats.map((s) => {
          const Icon = statIcon(s.label);
          return (
            <div
              key={s.label}
              className="group relative basis-[calc(50%-0.4rem)] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-3 py-5 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#ff0000]/60 hover:shadow-[0_10px_40px_-10px_rgba(255,0,0,0.55)] md:basis-[calc(33.333%-0.7rem)] md:py-7 lg:flex-1 lg:basis-0"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7a0b0b] via-[#ff0000] to-[#7a0b0b]" />
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff0000]/15 ring-1 ring-[#ff0000]/30 md:h-12 md:w-12">
                <Icon className="h-5 w-5 text-[#ff0000] md:h-6 md:w-6" />
              </span>
              <p className="mt-3 text-2xl font-extrabold leading-none md:text-4xl text-white">
                {s.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-gray-300 md:text-sm">{s.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- mid-page CTA (under course content) ---------------- */

export function CurriculumCTA({ page }: { page: ProjectPage }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur md:flex-row md:justify-between md:p-6">
      <p className="text-center text-lg font-bold text-white md:text-left md:text-2xl">
        Start building at <span className="text-[#ff0000]">₹{page.price}</span>{" "}
        <span className="text-sm font-normal text-gray-400">+Taxes</span>
      </p>
      <ProjectCTA
        courseName={page.shortTitle}
        paymentLink={page.paymentLink}
        brochurePdfUrl={page.brochurePdfUrl}
        size="default"
      />
    </div>
  );
}

/* ---------------- outcomes ---------------- */

export function OutcomesSection({ outcomes }: { outcomes: string[] }) {
  return (
    <section className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#ff0000]/15 via-[#000000] to-[#ff0000]/10 p-6 md:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#ff0000]/15 blur-[90px]" aria-hidden />
        <SectionHeading eyebrow="Outcomes">What you walk away with</SectionHeading>
        <ul className="relative mx-auto mt-8 grid max-w-4xl gap-3 md:grid-cols-2 md:gap-x-10 md:gap-y-4">
          {outcomes.map((o) => (
            <li key={o} className="flex items-start gap-3 text-base text-gray-100 md:text-lg">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff0000] md:h-6 md:w-6" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

export function FaqSection({ faqs }: { faqs: ProjectPage["faqs"] }) {
  return (
    <section className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
      <SectionHeading eyebrow="Frequently Asked Questions">FAQs</SectionHeading>
      <Accordion type="single" collapsible className="mt-8 space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={f.question}
            value={`faq-${i}`}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-5 backdrop-blur data-[state=open]:border-[#ff0000]/50"
          >
            <AccordionTrigger className="text-left text-base text-white hover:no-underline md:text-lg">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-300 md:text-base">{f.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/* ---------------- final CTA ---------------- */

export function FinalCTA({ page }: { page: ProjectPage }) {
  const starts = page.stats.find((s) => /start/i.test(s.label))?.value;
  return (
    <section className="container mx-auto max-w-6xl px-4 pb-20">
      <div className="rounded-3xl bg-gradient-to-r from-[#7a0b0b] via-[#ff0000] to-[#7a0b0b] p-[2px] shadow-[0_0_60px_-10px_rgba(255,0,0,0.5)]">
        <div className="flex flex-col items-center gap-6 rounded-[calc(1.5rem-2px)] bg-gradient-to-br from-[#1a0505] via-[#000000] to-[#1a0505] p-6 text-center md:flex-row md:p-10 md:text-left">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#ff0000] shadow-lg">
            <Rocket className="h-8 w-8 text-white" />
          </span>
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold leading-tight text-white md:text-4xl">
              Ready to start your <span className={GRADIENT_TEXT}>{page.shortTitle}</span> journey?
            </h2>
            <p className="mt-2 text-gray-300">
              {starts ? `${starts} Training Starts · ` : ""}₹{page.price} +Taxes
            </p>
          </div>
          <ProjectCTA courseName={page.shortTitle} paymentLink={page.paymentLink} brochurePdfUrl={page.brochurePdfUrl} />
        </div>
      </div>
    </section>
  );
}
