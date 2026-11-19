"use client";

// "Summer Interns felt 'It's a Life Changing Program'" for course pages, in the
// course hero theme. Same testimonial screenshots and photos as the homepage
// section (which stays unchanged).

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Heart } from "lucide-react";
import ImageSlideshow from "@/components/customComponents/Testimonials/ImageSlideshow";
import { landingPageTestimonialPosts } from "@/components/customComponents/Testimonials/data";

const INITIAL = 10;

export default function CourseImageTestimonials() {
  const [showAll, setShowAll] = useState(false);
  const posts = showAll ? landingPageTestimonialPosts : landingPageTestimonialPosts.slice(0, INITIAL);
  const hasMore = landingPageTestimonialPosts.length > INITIAL;

  return (
    <section aria-labelledby="love-heading" className="relative isolate overflow-hidden bg-[#000000] py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-[#ff0000]/15 blur-[120px] animate-glow" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#ff0000]/12 blur-[120px] animate-glow [animation-delay:2s]" />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ff0000]/40 bg-[#ff0000]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#ff0000] sm:text-sm">
            <Heart className="h-4 w-4" /> Wall of Love
          </span>
          <h2 id="love-heading" className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Summer Interns felt
            <span className="block text-[#ff0000]">
              “It’s a Life Changing Program”
            </span>
          </h2>
          <p className="mt-4 text-lg font-semibold text-gray-200">Let&apos;s Hear From Them Why ?</p>
          <div className="mx-auto mt-5 h-[2px] w-32 rounded-full bg-gradient-to-r from-[#7a0b0b] via-[#ff0000] to-[#7a0b0b]" />
        </div>

        <div className="mt-10 columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3">
          {posts.map((t) => (
            <div key={t.id} className="break-inside-avoid space-y-4">
              <figure className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#ff0000]/40 via-white/10 to-[#ff0000]/40 p-[1.5px] transition-shadow duration-300 hover:shadow-[0_12px_40px_-12px_rgba(255,0,0,0.6)]">
                <div className="rounded-[calc(1rem-1.5px)] bg-[#0b0b0b] p-3">
                  <Image
                    src={t.testimonialScreenShot}
                    alt={`Learner testimonial ${t.id}`}
                    width={400}
                    height={96}
                    loading="lazy"
                    className="h-auto w-full rounded-lg object-cover"
                  />
                </div>
              </figure>
              {"images" in t && t.images && t.images.length > 0 && (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] p-3">
                  <ImageSlideshow images={t.images} />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[#ff0000]">And many more...</p>

        {hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/[0.03] px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {showAll ? "View Less" : "See our Wall of Love"}
              <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
