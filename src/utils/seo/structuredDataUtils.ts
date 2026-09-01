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
    isPartOf: { "@id": "https://barskydesign.pro/#website" },
    publisher: { "@id": "https://barskydesign.pro/#business" },
    ...(seoData.image && {
      image: seoData.image,
      primaryImageOfPage: { "@type": "ImageObject", url: seoData.image },
    }),
    ...(publishedDate && { datePublished: publishedDate }),
    ...(modifiedDate && { dateModified: modifiedDate }),
  };

  // No Organization block here. The site-wide entity graph lives in index.html
  // (#business, #hiram, #website) and is served on every route, so this file
  // references those nodes by @id instead of re-declaring a second, differently
  // named organization on top of them. Re-adding one here recreates the exact
  // duplicate-entity defect the 2026-09-01 sweep removed.
  const BUSINESS = { "@id": "https://barskydesign.pro/#business" };
  const AUTHOR = { "@id": "https://barskydesign.pro/#hiram" };

  const schemas: Record<string, unknown>[] = [baseStructuredData];

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
      author: AUTHOR,
      publisher: BUSINESS,
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
      author: AUTHOR,
      publisher: BUSINESS,
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
