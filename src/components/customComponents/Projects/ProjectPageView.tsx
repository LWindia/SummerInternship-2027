// Course page template, used by every course page.
// All sections share the course hero theme (see CourseSections.tsx).
// A course can pass its own hero `visual`; otherwise its image is shown.

import React from "react";
import CourseNavbar from "./CourseNavbar";
import CourseHero from "./CourseHero";
import CourseCurriculum from "./CourseCurriculum";
import LearnerSuccessWall from "./LearnerSuccessWall";
import CourseCompanies from "./CourseCompanies";
import CourseVideoTestimonials from "./CourseVideoTestimonials";
import CourseImageTestimonials from "./CourseImageTestimonials";
import {
  CourseImageShowcase,
  CurriculumCTA,
  FaqSection,
  FinalCTA,
  OutcomesSection,
  StatsStrip,
  TechStrip,
} from "./CourseSections";
import type { ProjectPage } from "./projectPagesData";

export default function ProjectPageView({ page, visual }: { page: ProjectPage; visual?: React.ReactNode }) {
  return (
    <main className="bg-[#000000] text-white">
      <CourseNavbar page={page} />
      <CourseHero page={page} visual={visual ?? <CourseImageShowcase page={page} />} />
      <TechStrip items={page.tech} />
      <StatsStrip stats={page.stats} />

      <CourseCurriculum
        curriculum={page.curriculum}
        projects={page.whatYouBuild}
        footer={<CurriculumCTA page={page} />}
      />

      <LearnerSuccessWall />
      <OutcomesSection outcomes={page.outcomes} />
      <CourseCompanies />
      <CourseVideoTestimonials videos={page.videos} courseName={page.shortTitle} />
      <FinalCTA page={page} />
      <CourseImageTestimonials />
      <FaqSection faqs={page.faqs} />
    </main>
  );
}
