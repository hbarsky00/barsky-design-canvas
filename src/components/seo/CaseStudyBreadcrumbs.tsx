import React from 'react';

/**
 * BreadcrumbList JSON-LD for a case study.
 *
 * 40 blog pages carried a BreadcrumbList and the three case studies — the pages
 * that actually sell the work — carried none.
 *
 * The visible Home > Case studies > Title trail that used to sit above the hero
 * is gone: Hiram never asked for it and didn't want it on his case studies. The
 * structured data stays, because that is the half search engines read and it
 * costs the page nothing.
 */
const CaseStudyBreadcrumbs: React.FC<{ title: string; slug: string }> = ({ title, slug }) => {
  const url = `https://barskydesign.pro/project/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://barskydesign.pro/" },
      { "@type": "ListItem", position: 2, name: "Case studies", item: "https://barskydesign.pro/#case-studies" },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

export default CaseStudyBreadcrumbs;
