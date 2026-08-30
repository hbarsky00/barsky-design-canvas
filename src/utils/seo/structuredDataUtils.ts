import type { BuiltSEO } from "./seoBuilder";

import { homepageFaqs } from "@/data/seoFaqs";

// Both callers — UnifiedSEO and scripts/inject-seo-html — pass a BuiltSEO, so
// take one. There used to be a local SEOData interface here with `canonicalUrl`
// and `published` alternates that BuiltSEO does not have (so they always read
// undefined) and a `kind` union missing "home", which is what made BuiltSEO
// unassignable and forced an `as any` at the script call site.
export const generateStructuredData = (seoData: BuiltSEO) => {
  const canonicalUrl = seoData.canonical;
  const publishedDate = seoData.publishedTime;
  // Fall back to the publish date rather than emitting today's — a dateModified
  // that moves every deploy tells crawlers the page changed when it didn't.
  const modifiedDate = seoData.modifiedTime || publishedDate;
  
  // Always WebPage here, even for posts/projects — the more specific BlogPosting
  // or Article schema is pushed separately below with richer (headline/author/
  // publisher) data. Emitting "Article" here too just produced two overlapping,
  // near-duplicate Article-typed blocks on the same page for no added value.
  const baseStructuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seoData.title,
    description: seoData.description,
    url: canonicalUrl,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", "@id": "https://barskydesign.pro/#website" },
    ...(seoData.image && {
      image: seoData.image,
      primaryImageOfPage: { "@type": "ImageObject", url: seoData.image },
    }),
    ...(publishedDate && { datePublished: publishedDate }),
    ...(modifiedDate && { dateModified: modifiedDate }),
  };

  // Add Organization schema for all pages
  const organizationSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hiram Barsky Design",
    url: "https://barskydesign.pro",
    logo: "https://barskydesign.pro/images/hiram-barsky-profile.png",
    sameAs: [
      "https://www.linkedin.com/in/hiram-barsky/",
      "https://github.com/hbarsky00"
    ],
    knowsAbout: [
      "SaaS Product Design and Development",
      "Web Application Development",
      "Mobile App Design and Development",
      "Internal Tools and Admin Interfaces",
      "AI-Assisted Product Design",
      "UX/UI Design",
      "Design Systems",
      "React & TypeScript Development",
      "Fintech UX",
      "Healthcare UX",
      "Product Strategy"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hbarsky01@gmail.com"
    },
    founder: {
      "@type": "Person",
      name: "Hiram Barsky",
      jobTitle: "Product Designer & Software Developer",
      description: "Designs and develops SaaS, web apps, mobile apps and internal tools. 15+ years in fintech, healthcare and enterprise software."
    },
    description:
      "Design and development of SaaS, web apps, mobile apps and internal tools \u2014 one person, start to finish. 15+ years across fintech, healthcare and pharma.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Clifton",
      addressRegion: "NJ",
      addressCountry: "US",
    },
    serviceArea: "United States",
    priceRange: "$$$"
  };

  const schemas: Record<string, unknown>[] = [baseStructuredData, organizationSchema];

  // Add specific schemas based on content type. Discriminate on `kind`, not
  // `type` — buildSEO() sets `type: 'article'` for BOTH posts and projects, so
  // checking `type === 'article'` here made every case study emit a BlogPosting
  // block in addition to its own Article block below (kind is the precise signal).
  if (seoData.kind === 'post') {
    const datePublished = seoData.publishedTime;
    const blogPostSchema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: seoData.title,
      description: seoData.description,
      url: canonicalUrl,
      ...(datePublished && { datePublished }),
      ...(seoData.modifiedTime && { dateModified: seoData.modifiedTime }),
      author: {
        "@type": "Person",
        name: seoData.author || "Hiram Barsky"
      },
      publisher: {
        "@type": "Organization",
        name: "Hiram Barsky Design",
        logo: {
          "@type": "ImageObject",
          url: "https://barskydesign.pro/images/hiram-barsky-profile.png",
        },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      articleSection: seoData.tags?.[0] || "Design",
      inLanguage: "en-US",
      ...(seoData.tags && { keywords: seoData.tags.join(', ') }),
      ...(seoData.image && { image: seoData.image })
    };
    schemas.push(blogPostSchema);
  }

  // Add Article schema for projects/case studies (editorial content, not products)
  if (seoData.kind === 'project') {
    const datePublished = seoData.publishedTime;
    const articleSchema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: seoData.title,
      description: seoData.description,
      url: canonicalUrl,
      ...(datePublished && { datePublished }),
      ...(seoData.modifiedTime && { dateModified: seoData.modifiedTime }),
      author: {
        "@type": "Person",
        name: seoData.author || "Hiram Barsky"
      },
      publisher: {
        "@type": "Organization",
        name: "Hiram Barsky Design",
        logo: {
          "@type": "ImageObject",
          url: "https://barskydesign.pro/images/hiram-barsky-profile.png"
        }
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      articleSection: "Case Study",
      inLanguage: "en-US",
      ...(seoData.tags && { keywords: seoData.tags.join(', ') }),
      ...(seoData.image && { image: seoData.image })
    };
    schemas.push(articleSchema);
  }

  // Add FAQ schema for homepage.
  //
  // Generated from seoFaqs — the same array SeoFaqSection renders — rather than
  // a separate hardcoded list. Google requires FAQPage markup to match the
  // question-and-answer content actually visible on the page; this file used to
  // declare three questions while the visible section showed eight different
  // ones, so neither matched the other. One source now feeds both.
  if (canonicalUrl?.includes('barskydesign.pro') &&
      !canonicalUrl?.includes('/blog/') &&
      !canonicalUrl?.includes('/project/') &&
      (canonicalUrl?.endsWith('/') || canonicalUrl?.endsWith('barskydesign.pro'))) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: "Working with Hiram Barsky — common questions",
      inLanguage: "en-US",
      mainEntity: homepageFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return schemas.length === 1 ? schemas[0] : schemas;
};
