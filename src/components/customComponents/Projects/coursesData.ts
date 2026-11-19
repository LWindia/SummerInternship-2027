// Course cards shown on the homepage. Generated from projectPagesData so the
// homepage and the individual course pages always list the same 8 courses.
import { projectPages } from "./projectPagesData";

export interface Course {
  title: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  price: string;
  originalPrice?: string;
  paymentLink: string;
  brochurePdfUrl: string;
  slug: string; // URL of the course page: /<slug>
}

export const courses: Course[] = projectPages.map((p) => ({
  title: p.shortTitle,
  image: { src: p.image.src, alt: p.image.alt, width: 400, height: 300 },
  price: p.price,
  originalPrice: p.originalPrice,
  paymentLink: p.paymentLink,
  brochurePdfUrl: p.brochurePdfUrl,
  slug: p.slug,
}));
