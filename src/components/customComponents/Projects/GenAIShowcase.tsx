// GenAI course hero visual: "Generative AI + ML" panel with AI tool cards.

import React from "react";
import Image from "next/image";
import { BrainCircuit, Cpu, Layers, Sparkles } from "lucide-react";
import HeroShowcase from "./HeroShowcase";

const ICON = "h-6 w-6 sm:h-8 sm:w-8";

export default function GenAIShowcase() {
  return (
    <HeroShowcase
      config={{
        centerLeft: (
          <Image src="/assets/TechStackLogo/ChatGPT-Logo.svg.png" alt="" width={80} height={80} className="h-10 w-10 invert sm:h-14 sm:w-14" />
        ),
        centerRight: <Cpu className="h-7 w-7 text-white sm:h-10 sm:w-10" />,
        titleTop: "Generative AI",
        titleBottom: "+ ML",
        left: [
          { label: "Claude", icon: <ClaudeMark /> },
          {
            label: "ChatGPT",
            icon: <Image src="/assets/TechStackLogo/ChatGPT-Logo.svg.png" alt="" width={40} height={40} className={`${ICON} invert`} />,
          },
          { label: "Gemini", icon: <GeminiMark /> },
        ],
        right: [
          { label: "LLMs", icon: <BrainCircuit className={`${ICON} text-[#ff0000]`} /> },
          { label: "Prompt Engineering", icon: <Layers className={`${ICON} text-white`} /> },
          { label: "Agentic AI", icon: <Sparkles className={`${ICON} text-[#ff0000]`} /> },
        ],
      }}
    />
  );
}
function ClaudeMark() {
  // Simple starburst glyph in Claude's orange.
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="16"
          y1="16"
          x2={16 + 13 * Math.cos((i * Math.PI) / 6)}
          y2={16 + 13 * Math.sin((i * Math.PI) / 6)}
          stroke="#D97757"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function GeminiMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden>
      <defs>
        <linearGradient id="genai-gemini" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4F8DFD" />
          <stop offset="1" stopColor="#A06BF7" />
        </linearGradient>
      </defs>
      <path d="M16 1 C 17 10, 22 15, 31 16 C 22 17, 17 22, 16 31 C 15 22, 10 17, 1 16 C 10 15, 15 10, 16 1 Z" fill="url(#genai-gemini)" />
    </svg>
  );
}
