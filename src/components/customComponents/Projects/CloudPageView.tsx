// "Cloud Computing" (AWS + Azure) page.
// Same template and theme as every course page; only the hero visual differs.
// Content comes from projectPagesData.ts (Cloud Computing brochure).

import React from "react";
import ProjectPageView from "./ProjectPageView";
import CloudShowcase from "./CloudShowcase";
import type { ProjectPage } from "./projectPagesData";

export default function CloudPageView({ page }: { page: ProjectPage }) {
  return <ProjectPageView page={page} visual={<CloudShowcase />} />;
}
