import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPageView from "@/components/customComponents/Projects/ProjectPageView";
import GenAIPageView from "@/components/customComponents/Projects/GenAIPageView";
import CloudPageView from "@/components/customComponents/Projects/CloudPageView";

// Courses with their own hero visual. Every other course uses ProjectPageView.
const CUSTOM_VIEWS: Record<string, typeof ProjectPageView> = {
  "generative-ai-machine-learning-summer-internship": GenAIPageView,
  "aws-cloud-computing-summer-internship": CloudPageView,
};
import {
  getProjectPage,
  projectPages,
} from "@/components/customComponents/Projects/projectPagesData";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectPages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getProjectPage(params.slug);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.keywords,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      type: "website",
      url: `/${page.slug}`,
      images: [{ url: page.image.src, alt: page.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.seoDescription,
      images: [page.image.src],
    },
  };
}

export default function ProjectPageRoute({ params }: { params: { slug: string } }) {
  const page = getProjectPage(params.slug);
  if (!page) notFound();
  const View = CUSTOM_VIEWS[page.slug] ?? ProjectPageView;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: page.seoTitle,
        description: page.seoDescription,
        provider: { "@type": "Organization", name: "The Creator" },
        offers: {
          "@type": "Offer",
          price: page.price.replace(/,/g, "").trim(),
          priceCurrency: "INR",
          url: page.paymentLink,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <View page={page} />
    </>
  );
}
