
interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  canonicalUrl?: string;
  image?: string;
  type?: 'website' | 'article';
  kind?: 'page' | 'post' | 'project' | 'service' | 'home';
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
    // hasOccupation with the O*NET code is what lets Google file him as a
    // specific occupation rather than a name with a job title string attached.
    // Carried over from barsky.design, which had it and this site did not.
    hasOccupation: {
      "@type": "Occupation",
      // Was "AI Product Designer", which contradicted `jobTitle` above on the
      // same entity and re-stated the retired AI-first positioning that the
      // 2026-11-14 run stripped out of og:site_name across all 66 pages. One
      // entity may not claim two occupations.
      name: "Product Designer & Front-End Developer",
      occupationalCategory: "15-1255.00",
      skills:
        "Product design, UX strategy, user research, design systems, prototyping, React, TypeScript",
      occupationLocation: [
        { "@type": "City", name: "New York" },
        { "@type": "City", name: "Clifton" }
      ]
    },
    // `areaServed` on the Organization says where he WORKS; nothing said where
    // he IS. `address` is the field search engines read for place, and with the
    // Business Profile and the sameAs set still pending it is the cheapest
    // entity signal left.
    //
    // The city is no longer omitted. The note that used to sit here said it was
    // "deliberately omitted rather than guessed" — but index.html's
    // LocalBusiness node already publishes addressLocality "Clifton" together
    // with Clifton's geo coordinates, and it shares @id #organization with the
    // Organization below, so the merged business entity carried the city either
    // way. Leaving it off here only made the two address nodes on one site
    // disagree about how much they knew.
    address: {
      "@type": "PostalAddress",
      addressLocality: "Clifton",
      addressRegion: "NJ",
      addressCountry: "US"
    },
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
      email: "hbarsky01@gmail.com",
      // The footer and /contact have shown (201) 668-4754 all along, but this
      // ContactPoint carried only an email and index.html's LocalBusiness node
      // carried +1-201-668-3324 — a number that appears nowhere a visitor can
      // see. Both nodes share @id #organization, so they merge, and the merged
      // business entity was handing Google a phone number the site itself
      // never shows. A Google Business Profile is matched on exactly this.
      telephone: "+1-201-668-4754"
    },
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressRegion: "NJ",
      addressCountry: "US"
    },
    sameAs: SAME_AS,
    // "US" told Google nothing a local searcher could match on.
    areaServed: [
      { "@type": "City", name: "New York" },
      { "@type": "City", name: "Brooklyn" },
      { "@type": "City", name: "Jersey City" },
      { "@type": "City", name: "Newark" },
      { "@type": "City", name: "Hoboken" },
      { "@type": "City", name: "Clifton" },
      { "@type": "City", name: "Montclair" },
      { "@type": "AdministrativeArea", name: "New Jersey" },
      { "@type": "AdministrativeArea", name: "New York City Metropolitan Area" },
      "Remote (United States)"
    ]
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

  // The seven service pages are the only commercial pages on the site, and they
  // were the only page type emitting no page-specific entity at all: just the
  // global WebPage/Person/Organization every route carries. All 49 posts had
  // BlogPosting. So the pages meant to answer "who designs SaaS products"
  // described themselves to a machine as nothing in particular.
  // Every field below already exists in seoData; nothing here is new copy.
  if (seoData.kind === 'service') {
    const serviceName = (seoData.title || '').split('|')[0].trim();
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": canonicalUrl ? `${canonicalUrl}#service` : undefined,
      // seoData.title is the <title>, which carries the " | Barsky Design"
      // suffix. That belongs in a SERP headline, not in a service's name.
      name: serviceName,
      description: seoData.description,
      url: canonicalUrl,
      provider: { "@id": ORG_ID },
      areaServed: organizationSchema.areaServed,
      serviceType: serviceName,
      inLanguage: "en-US"
    });
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
