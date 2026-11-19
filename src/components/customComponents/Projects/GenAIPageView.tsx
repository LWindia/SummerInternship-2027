// "Mastering GenAI : Prompt Engineering to AI Agents" page.
// Same template and theme as every course page; only the hero visual differs.
// Content comes from projectPagesData.ts (brochure).

import React from "react";
import ProjectPageView from "./ProjectPageView";
import GenAIShowcase from "./GenAIShowcase";
import type { ProjectPage } from "./projectPagesData";

export default function GenAIPageView({ page }: { page: ProjectPage }) {
  return <ProjectPageView page={page} visual={<GenAIShowcase />} />;
}
