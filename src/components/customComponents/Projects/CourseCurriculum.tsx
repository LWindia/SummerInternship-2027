// Compact "Course Content & Projects" section shared by every course page.
// Modules are grouped by the projects that follow them (curriculum[].projectsAfter).
// Every group is shown in order: its modules first, then its projects.
// Projects not attached to any module are shown in the last group.

import React from "react";
import {
  BookOpen,
  Bot,
  Braces,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  Cloud,
  CodeXml,
  Database,
  FileText,
  GitBranch,
  Globe,
  Layers,
  Network,
  ShieldCheck,
  ImagePlus,
  LayoutDashboard,
  Lightbulb,
  Mail,
  MessageSquare,
  PenTool,
  Rocket,
  Search,
  Server,
  Share2,
  Target,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ProjectPage } from "./projectPagesData";

type Module = ProjectPage["curriculum"][number];
type Project = ProjectPage["whatYouBuild"][number];
type Group = { modules: { m: Module; n: number }[]; projects: number[] };

const pad = (n: number) => String(n).padStart(2, "0");

// Icon from words in the project title (order matters: first match wins).
const PROJECT_ICONS: [RegExp, LucideIcon][] = [
  [/resume/i, FileText],
  [/idea/i, Lightbulb],
  [/study/i, BookOpen],
  [/chatbot/i, MessageSquare],
  [/coding/i, CodeXml],
  [/code/i, Braces],
  [/email/i, Mail],
  [/social/i, Share2],
  [/image/i, ImagePlus],
  [/content/i, PenTool],
  [/job/i, Briefcase],
  [/research/i, Search],
  [/decision/i, GitBranch],
  [/automation|workflow/i, Workflow],
  [/hosting|website|web app/i, Globe],
  [/secure|security|access|iam/i, ShieldCheck],
  [/vpc|network/i, Network],
  [/tier|architecture/i, Layers],
  [/assistant|agent/i, Bot],
  [/cloud|aws|serverless|vpc|infrastructure/i, Cloud],
  [/data|pipeline|storage|mysql|mongo/i, Database],
  [/api|backend|express|flask/i, Server],
  [/frontend|react|ui|dashboard|report/i, LayoutDashboard],
  [/crm|salesforce/i, Users],
  [/model|learning|ai|ml|predict|recommend|gan|vae/i, BrainCircuit],
];
const projectIcon = (title: string): LucideIcon => PROJECT_ICONS.find(([re]) => re.test(title))?.[1] ?? Rocket;

const labelParts = (week: string) => {
  const m = week.match(/^(.*?)\s*(\d+)\+?$/);
  return m ? { prefix: m[1], num: Number(m[2]) } : null;
};

const groupLabel = (g: Group) => {
  const first = g.modules[0].m.week;
  const last = g.modules[g.modules.length - 1].m.week;
  if (g.modules.length === 1) return first;
  const a = labelParts(first);
  const b = labelParts(last);
  return a && b && a.prefix === b.prefix ? `${a.prefix}s ${a.num}–${b.num}` : `${first} – ${last}`;
};

// Header for a project group. Uses the projects' own labels when they have them,
// e.g. "Mini Project 1" or "Capstone Projects 1–5"; otherwise "Projects 1–4".
const projectsLabel = (nums: number[], projects: Project[]) => {
  const labels = nums.map((n) => projects[n - 1]?.label);
  if (labels.every(Boolean)) {
    if (labels.length === 1) return labels[0]!;
    const a = labelParts(labels[0]!);
    const b = labelParts(labels[labels.length - 1]!);
    if (a && b && a.prefix === b.prefix) return `${a.prefix}s ${a.num}–${b.num}`;
  }
  return nums.length === 1 ? `Project ${nums[0]}` : `Projects ${nums[0]}–${nums[nums.length - 1]}`;
};

function buildGroups(curriculum: Module[], projectCount: number): Group[] {
  const groups: Group[] = [];
  const used = new Set<number>();
  let cur: Group = { modules: [], projects: [] };
  curriculum.forEach((m, i) => {
    cur.modules.push({ m, n: i + 1 });
    const after = (m.projectsAfter ?? []).filter((p) => p >= 1 && p <= projectCount && !used.has(p));
    if (after.length) {
      after.forEach((p) => used.add(p));
      cur.projects = after;
      groups.push(cur);
      cur = { modules: [], projects: [] };
    }
  });
  if (cur.modules.length) groups.push(cur);
  const leftover = Array.from({ length: projectCount }, (_, i) => i + 1).filter((p) => !used.has(p));
  if (leftover.length && groups.length) groups[groups.length - 1].projects.push(...leftover);
  return groups;
}

// Columns for N cards; on phones cards stack in one column.
const gridCols = (n: number) =>
  n >= 4 ? "sm:grid-cols-2 xl:grid-cols-4" : n === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : n === 2 ? "sm:grid-cols-2" : "sm:max-w-md";

export default function CourseCurriculum({
  curriculum,
  projects,
  footer,
}: {
  curriculum: Module[];
  projects: Project[];
  footer?: React.ReactNode;
}) {
  const groups = buildGroups(curriculum, projects.length);
  const staged = groups.length > 1;

  const first = labelParts(curriculum[0]?.week ?? "");
  const isModules = first?.prefix === "Module";

  return (
    <section
      id="course-content"
      aria-labelledby="course-content-heading"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#000000] py-14 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/2 top-0 h-72 w-[70%] -translate-x-1/2 rounded-full bg-[#ff0000]/15 blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        {/* heading */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff0000] sm:text-sm">Course Content &amp; Projects</p>
          <h2 id="course-content-heading" className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">
            {isModules ? `${curriculum.length} Modules` : "Training Roadmap"} ·{" "}
            <span className="text-[#ff0000]">
              {projects.length} {projects.length === 1 ? "Project" : "Projects"}
            </span>
          </h2>
          <div className="mx-auto mt-5 h-[2px] w-32 rounded-full bg-gradient-to-r from-[#7a0b0b] via-[#ff0000] to-[#7a0b0b]" />
        </div>

        {/* every stage: its modules first, then its projects */}
        <div className="mt-10 space-y-10">
          {groups.map((g, gi) => (
            <div key={gi}>
              {staged && (
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#ff0000]">{groupLabel(g)}</p>
              )}

              {/* modules */}
              <ul className={`grid gap-3 sm:gap-4 ${gridCols(g.modules.length)}`}>
                {g.modules.map(({ m, n }) => (
                  <li key={m.week}>
                    <ModuleCard m={m} n={n} />
                  </li>
                ))}
              </ul>

              {/* projects for this stage */}
              {g.projects.length > 0 && (
                <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#7a0b0b] via-[#ff0000] to-[#7a0b0b] p-[1.5px] shadow-[0_0_40px_-12px_rgba(255,0,0,0.6)]">
                  <div className="rounded-[calc(1rem-1.5px)] bg-gradient-to-br from-[#1a0505] via-[#000000] to-[#1a0505] p-4 md:p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff0000] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                        <Rocket className="h-3.5 w-3.5" /> {g.projects.length > 1 ? "Projects" : "Project"}
                      </span>
                      <span className="text-sm font-semibold text-gray-200">{projectsLabel(g.projects, projects)}</span>
                    </div>
                    <ul className={`grid gap-3 ${gridCols(g.projects.length)}`}>
                      {g.projects.map((pn) => (
                        <li key={pn}>
                          <ProjectCard p={projects[pn - 1]} n={pn} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

       {footer && <div className="mt-8">{footer}</div>}
      </div>
    </section>
  );
}

function ModuleCard({ m, n }: { m: Module; n: number }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition-colors duration-300 hover:border-[#ff0000]/50 hover:bg-white/[0.06] md:p-5">
      <div className="flex items-start gap-3">
        <span className="shrink-0 text-4xl font-extrabold leading-none text-[#ff0000]">
          {pad(n)}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff0000]">{m.week}</p>
          <h3 className="text-base font-bold leading-snug text-white md:text-lg">{m.title}</h3>
        </div>
      </div>

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Course Topics</p>
      <ul className="mt-1.5 flex-1 space-y-1.5">
        {m.topics.map((t) =>
          t.trim().endsWith(":") ? (
            // sub-heading inside a module, as printed in the brochure
            <li key={t} className="pt-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              {t}
            </li>
          ) : (
            <li key={t} className="flex items-start gap-2 text-[13px] leading-snug text-gray-200 md:text-sm">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff0000]" />
              <span>{t}</span>
            </li>
          )
        )}
      </ul>

      {m.outcome && (
        <div className="mt-3 rounded-lg border-l-2 border-[#ff0000] bg-[#ff0000]/10 px-3 py-2">
          <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#ff0000]">
            <Target className="h-3 w-3" /> Learning Outcome
          </p>
          <p className="mt-0.5 text-xs leading-snug text-white md:text-[13px]">{m.outcome}</p>
        </div>
      )}
    </article>
  );
}

function ProjectCard({ p, n }: { p: Project; n: number }) {
  const Icon = projectIcon(p.title);
  return (
    <div className="group flex h-full flex-col rounded-xl border border-white/15 bg-white/[0.05] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff0000]/70 hover:bg-white/[0.08]">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ff0000] transition-transform group-hover:scale-110">
          <Icon className="h-4 w-4 text-white" />
        </span>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#ff0000]">{p.label ?? `Project ${pad(n)}`}</p>
      </div>
      <h4 className="mt-2.5 text-sm font-extrabold leading-snug text-white md:text-base">{p.title}</h4>
      <ul className="mt-2 space-y-1">
        {(p.points ?? [p.description]).map((pt) => (
          <li key={pt} className="flex items-start gap-2 text-[13px] leading-snug text-gray-300">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ff0000]" />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
