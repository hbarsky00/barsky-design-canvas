
import { SEO_CONSTANTS } from "@/utils/seoConstants";

interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  canonicalUrl?: string;
  image?: string;
  type?: 'website' | 'article';
  kind?: 'page' | 'post' | 'project';
  publishedTime?: string;
  published?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  faqs?: { question: string; answer: string }[];
}

export const generateStructuredData = (seoData: SEOData) => {
  const canonicalUrl = seoData.canonicalUrl || seoData.canonical;
  
  // Always WebPage — it's the page container, not the content. This used to
  // flip to "Article" for blog/project pages, but it only ever populated
  // `name`, never the `headline` field Article actually requires, so it
  // shipped as a redundant, spec-incomplete duplicate of the dedicated
  // BlogPosting/Article block below (which already has a correct, complete
  // headline). Found via amazing-seo-skill's schema_recommended_fields.py
  // (AEO lever 4, 2026-08-06): completeness_score 17, required field
  // "headline" missing, on every blog post and case study.
  const baseStructuredData: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seoData.title,
    description: seoData.description,
    url: canonicalUrl,
    ...(seoData.image && { image: seoData.image })
  };

  // Add Organization schema for all pages
  const organizationSchema: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hiram Barsky Design",
    url: "https://barskydesign.pro",
    // Same description already used sitewide (SEO_CONSTANTS.DEFAULT_DESCRIPTION)
    // and same address already declared in the static shell's LocalBusiness
    // block (index.html) — flagged as "recommended: missing" by the lever-4
    // schema sweep; filled with facts already established elsewhere, not new
    // ones. foundingDate is also recommended but skipped — no verified date
    // for when "Hiram Barsky Design" as a branded practice started, distinct
    // from the 15+ year career length used elsewhere.
    description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Clifton",
      addressRegion: "NJ",
      addressCountry: "US",
    },
    // /logo.png doesn't exist (404) — this is the same headshot the static
    // shell's LocalBusiness block already uses for `image`.
    logo: "https://barskydesign.pro/images/hiram-barsky-profile.png",
    // Entities elsewhere on the web that represent the same person/brand —
    // NOT a place for product links (a product Hiram built isn't "the same
    // entity as" Hiram Barsky Design; that relationship belongs on the
    // product's own case-study page, not here).
    sameAs: SEO_CONSTANTS.SOCIAL_PROFILES,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hbarsky01@gmail.com"
    },
    founder: {
      "@type": "Person",
      name: "Hiram Barsky",
      jobTitle: "UX/UI Designer & AI Developer",
      description: "Product Designer & Gen AI Developer with 15+ years experience in fintech, healthcare, and SaaS",
      // Pulled verbatim from the skills actually listed on /about
      // (SkillsShowcase) — real, defensible expertise areas, not a
      // generic AEO-checklist list.
      knowsAbout: [
        "Product Design",
        "User Research",
        "Design Systems",
        "Gen AI Integration",
        "React Development",
        "TypeScript",
        "Supabase",
        "UX Strategy",
      ],
      // Real employment history from /about (ProfessionalJourney) — every
      // name here is something Hiram could defend on a call.
      alumniOf: [
        { "@type": "Organization", name: "PNC" },
        { "@type": "Organization", name: "Bank of America" },
        { "@type": "Organization", name: "Deloitte" },
        { "@type": "Organization", name: "Tata Consultancy Services" },
        { "@type": "Organization", name: "KPMG" },
        { "@type": "Organization", name: "Express Scripts" },
      ],
    },
    serviceArea: "United States",
    priceRange: "$$$"
  };

  const schemas: any[] = [baseStructuredData, organizationSchema];

  // Add specific schemas based on content type
  if (seoData.type === 'article' || seoData.kind === 'post') {
    const datePublished =
      seoData.publishedTime || seoData.published || '2024-01-01T00:00:00Z';
    const blogPostSchema: any = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: seoData.title,
      description: seoData.description,
      url: canonicalUrl,
      datePublished,
      ...(seoData.modifiedTime && { dateModified: seoData.modifiedTime }),
      author: {
        "@type": "Person",
        name: seoData.author || "Hiram Barsky"
      },
      ...(seoData.tags && { keywords: seoData.tags.join(', ') }),
      ...(seoData.image && { image: seoData.image })
    };
    schemas.push(blogPostSchema);
  }

  // Add Article schema for projects/case studies (editorial content, not products)
  if (seoData.kind === 'project') {
    const datePublished =
      seoData.publishedTime || seoData.published || '2024-01-01T00:00:00Z';
    const articleSchema: any = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: seoData.title,
      description: seoData.description,
      url: canonicalUrl,
      datePublished,
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
      ...(seoData.image && { image: seoData.image })
    };
    schemas.push(articleSchema);
  }

  // Add Product schema for store product pages
  const isProductPage = !!canonicalUrl && canonicalUrl.includes('/store/product/');
  if (isProductPage) {
    const productSchema: any = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: seoData.title,
      description: seoData.description,
      url: canonicalUrl,
      brand: {
        "@type": "Brand",
        name: "Barsky Design",
      },
      ...(seoData.image && { image: seoData.image }),
    };
    schemas.push(productSchema);
  }

  // FAQ schema is opt-in via seoData.faqs — the caller must pass the EXACT
  // Q&A content the page actually renders. This used to be hardcoded to fire
  // on the homepage with fabricated numbers ("boost conversion by 40%+",
  // "measurable improvements within 2-4 weeks") that didn't correspond to
  // any visible FAQ section on the homepage at all — a schema/content
  // mismatch on top of invented metrics. Fixed 2026-08-05 (AEO lever 2).
  if (seoData.faqs && seoData.faqs.length > 0) {
    const faqSchema: any = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seoData.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    };
    schemas.push(faqSchema);
  }

  return schemas.length === 1 ? schemas[0] : schemas;
};
