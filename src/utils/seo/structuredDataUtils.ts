
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

// Stable @id anchors. Without these every node was an island: Organization,
// WebSite, WebPage and the article entity had no way to reference each other, so
// they read as unrelated fragments instead of one graph.
const SITE = "https://barskydesign.pro";
export const ORG_ID = `${SITE}/#organization`;
export const PERSON_ID = `${SITE}/#hiram-barsky`;
export const WEBSITE_ID = `${SITE}/#website`;

// Only profiles that are linked from the site itself. The old SOCIAL_PROFILES
// list pointed at /in/hirambarsky and github.com/hirambarsky, neither of which
// matches the links in the footer, contact page or hero.
const SAME_AS = [
  "https://www.linkedin.com/in/hiram-barsky",
  "https://github.com/hbarsky00",
];

export const generateStructuredData = (seoData: SEOData) => {
  const canonicalUrl = seoData.canonicalUrl || seoData.canonical;

  // The page-level entity is ALWAYS WebPage. It used to be retyped as "Article"
  // whenever type === 'article', and carried `name` instead of `headline` — so 43
  // pages shipped an Article missing the one property Google requires, sitting
  // next to a perfectly good BlogPosting. The article entity is emitted below.
  const baseStructuredData: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonicalUrl ? `${canonicalUrl}#webpage` : undefined,
    name: seoData.title,
    description: seoData.description,
    url: canonicalUrl,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    ...(seoData.image && { primaryImageOfPage: seoData.image }),
    ...(seoData.image && { image: seoData.image })
  };

  // The canonical Person node. Hiram previously existed only nested inside
  // Organization.founder and inside each author — never as an addressable entity,
  // on a site whose entire ranking thesis is his name.
  const personSchema: any = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Hiram Barsky",
    url: `${SITE}/about`,
    jobTitle: "Product Designer & Front-End Developer",
    description:
      "Designs and develops SaaS, web apps, mobile apps and internal tools — one person, from product design through React front end, database and launch. 15+ years across fintech, healthcare and pharma.",
    knowsAbout: [
      "Product design",
      "UX research",
      "Design systems",
      "React",
      "Front-end development",
      "Accessibility",
      "Fintech",
      "Healthcare software",
      "Pharma workflows"
    ],
    sameAs: SAME_AS,
    worksFor: { "@id": ORG_ID }
  };

  const organizationSchema: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    // Was "Hiram Barsky Design" here and "Barsky Design" in index.html — two
    // names for one entity.
    name: "Barsky Design",
    url: SITE,
    logo: `${SITE}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hbarsky01@gmail.com"
    },
    founder: { "@id": PERSON_ID },
    sameAs: SAME_AS,
    areaServed: "US"
  };

  const schemas: any[] = [baseStructuredData, personSchema, organizationSchema];

  // A case study is not a blog post. Both branches used to fire for projects,
  // which is how /project/* ended up with Article AND BlogPosting.
  const isProject = seoData.kind === 'project';
  const isPost = !isProject && (seoData.type === 'article' || seoData.kind === 'post');

  if (isProject || isPost) {
    // No date fallback. This used to default to '2024-01-01T00:00:00Z' — a
    // fabricated publication date in structured data. Omit it instead.
    const datePublished = seoData.publishedTime || seoData.published;
    const articleSchema: any = {
      "@context": "https://schema.org",
      "@type": isProject ? "Article" : "BlogPosting",
      "@id": canonicalUrl ? `${canonicalUrl}#article` : undefined,
      headline: seoData.title,
      description: seoData.description,
      url: canonicalUrl,
      ...(datePublished && { datePublished }),
      // dateModified was absent on every article on the site.
      ...((seoData.modifiedTime || datePublished) && {
        dateModified: seoData.modifiedTime || datePublished
      }),
      author: { "@id": PERSON_ID },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: { "@id": canonicalUrl ? `${canonicalUrl}#webpage` : undefined },
      inLanguage: "en-US",
      ...(seoData.tags && { keywords: seoData.tags.join(', ') }),
      ...(seoData.image && { image: seoData.image })
    };
    schemas.push(articleSchema);
  }

  // The homepage FAQPage block was removed. Google restricted FAQ rich results to
  // government and health sites in August 2023, so it rendered no SERP feature —
  // and its first answer asserted "boost conversion by 40%+", an unverifiable
  // number sitting in machine-readable markup.

  // Strip undefined @id values rather than emitting `"@id": undefined`.
  const clean = (o: any): any => {
    if (Array.isArray(o)) return o.map(clean);
    if (o && typeof o === 'object') {
      return Object.fromEntries(
        Object.entries(o).filter(([, v]) => v !== undefined).map(([k, v]) => [k, clean(v)])
      );
    }
    return o;
  };

  const out = schemas.map(clean);
  return out.length === 1 ? out[0] : out;
};
