import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs + BreadcrumbList JSON-LD for a case study.
 *
 * 40 blog pages carried a BreadcrumbList and the three case studies — the pages
 * that actually sell the work — carried none.
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

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center text-sm text-muted-foreground gap-2 flex-wrap">
          <li>
            <Link to="/" className="flex items-center hover:text-primary transition-colors duration-200">
              <Home className="w-4 h-4 mr-1" aria-hidden="true" />
              Home
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
          <li>
            <Link to="/#case-studies" className="hover:text-primary transition-colors duration-200">
              Case studies
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
          <li aria-current="page" className="text-foreground font-medium">{title}</li>
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
};

export default CaseStudyBreadcrumbs;
