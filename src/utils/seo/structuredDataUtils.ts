
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
}

export const generateStructuredData = (seoData: SEOData) => {
  const canonicalUrl = seoData.canonicalUrl || seoData.canonical;
  const publishedDate = seoData.publishedTime || seoData.published;
  // Fall back to the publish date rather than emitting today's — a dateModified
  // that moves every deploy tells crawlers the page changed when it didn't.
  const modifiedDate = seoData.modifiedTime || publishedDate;
  
  // Always WebPage here, even for posts/projects — the more specific BlogPosting
  // or Article schema is pushed separately below with richer (headline/author/
  // publisher) data. Emitting "Article" here too just produced two overlapping,
  // near-duplicate Article-typed blocks on the same page for no added value.
  const baseStructuredData: any = {
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
  const organizationSchema: any = {
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
      jobTitle: "UX/UI Designer & AI Developer",
      description: "Product Designer & Gen AI Developer with 15+ years experience in fintech, healthcare, and SaaS"
    },
    description:
      "Lead product designer specialising in AI-first and enterprise software. 15+ years across fintech, healthcare and pharma, designing and shipping end to end.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Clifton",
      addressRegion: "NJ",
      addressCountry: "US",
    },
    serviceArea: "United States",
    priceRange: "$$$"
  };

  const schemas: any[] = [baseStructuredData, organizationSchema];

  // Add specific schemas based on content type. Discriminate on `kind`, not
  // `type` — buildSEO() sets `type: 'article'` for BOTH posts and projects, so
  // checking `type === 'article'` here made every case study emit a BlogPosting
  // block in addition to its own Article block below (kind is the precise signal).
  if (seoData.kind === 'post') {
    const datePublished = seoData.publishedTime || seoData.published;
    const blogPostSchema: any = {
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
    const datePublished = seoData.publishedTime || seoData.published;
    const articleSchema: any = {
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

  // Add FAQ schema for homepage
  if (canonicalUrl?.includes('barskydesign.pro') && 
      !canonicalUrl?.includes('/blog/') && 
      !canonicalUrl?.includes('/project/') &&
      (canonicalUrl?.endsWith('/') || canonicalUrl?.endsWith('barskydesign.pro'))) {
    const faqSchema: any = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: "Working with Hiram Barsky — common questions",
      inLanguage: "en-US",
      mainEntity: [
        // Answers are the claims Hiram would make on a call. The previous
        // versions promised "conversion by 40%+" and "measurable improvements
        // within 2-4 weeks" — numbers that trace to nothing in this codebase,
        // sitting in structured data, which is the format an answer engine is
        // most likely to quote back verbatim.
        {
          "@type": "Question",
          name: "What makes your design approach different?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "I design and build. The front end ships in React and TypeScript, written by me, so what I hand over is a working product rather than a file someone else has to interpret. That closes the gap where most design intent gets lost, and it means I can test an idea in a real browser on a real phone instead of arguing about it in a review."
          }
        },
        {
          "@type": "Question",
          name: "What does AI-assisted design actually mean day to day?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI produces the raw material fast — screens, variations, working code — which moves the bottleneck from making things to judging them. The work is deciding what to keep. On Ring-Rival that meant cutting time-to-first-punch from 22 seconds to 6 by deleting the splash screen, mode select, fighter select and tutorial. No model tells you which four things to delete."
          }
        },
        {
          "@type": "Question",
          name: "Do you work with fintech and healthcare companies?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most of my 15+ years has been in regulated enterprise software — PNC, Bank of America, Deloitte, KPMG, AstraZeneca — across finance, healthcare and pharma. That work comes with accessibility conformance, audit trails and compliance review as constraints from the start, not as a pass at the end."
          }
        }
      ]
    };
    schemas.push(faqSchema);
  }

  return schemas.length === 1 ? schemas[0] : schemas;
};
