"use client";

// Enroll Now + Download Brochure buttons used across course pages.
// Styled to match the course hero buttons.

import React, { useState } from "react";
import { ArrowRight, Download, Rocket } from "lucide-react";
import BrochureFormDialog from "./BrochureFormDialog";

interface ProjectCTAProps {
  courseName: string;
  paymentLink: string;
  brochurePdfUrl: string;
  size?: "default" | "lg";
}

export default function ProjectCTA({
  courseName,
  paymentLink,
  brochurePdfUrl,
  size = "lg",
}: ProjectCTAProps) {
  const [open, setOpen] = useState(false);
  const pad = size === "lg" ? "px-7 py-3.5 text-base sm:text-lg" : "px-5 py-2.5 text-sm sm:text-base";

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.open(paymentLink, "_blank", "noopener,noreferrer")}
          className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff0000] font-bold text-white shadow-[0_8px_30px_-6px_rgba(255,0,0,0.7)] transition-all hover:shadow-[0_10px_40px_-4px_rgba(255,0,0,0.85)] hover:bg-[#ff0000]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${pad}`}
        >
          <Rocket className="h-5 w-5" />
          Enroll Now
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/[0.03] font-semibold text-white backdrop-blur transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${pad}`}
        >
          <Download className="h-5 w-5" />
          Download Brochure
        </button>
      </div>

      <BrochureFormDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        courseName={courseName}
        brochurePdfUrl={brochurePdfUrl}
      />
    </>
  );
}
