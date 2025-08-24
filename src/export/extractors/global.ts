// Global content extractor

import { getTemplateForPageType } from "../templateRegistry";

export interface SectionExport {
  key: string;
  displayName: string;
  visibility: "rendered" | "hidden" | "conditional";
  fields: {
    h1?: string;
    h2?: string;
    h3?: string;
    body?: string;
    bullets?: string[];
    captions?: string[];
    formLabels?: string[];
    tooltips?: string[];
    ctas?: Array<{ label: string; url: string }>;
    notes?: string;
  };
}

export interface PageExport {
  title: string;
  url: string;
  sections: SectionExport[];
}

export function extractGlobalContent(): SectionExport[] {
  const template = getTemplateForPageType("global");
  
  return template.map(section => {
    switch (section.key) {
      case "header-nav":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "",
            h3: "",
            body: "",
            bullets: [
              "Projects",
              "Services", 
              "About",
              "Contact",
              "Blog"
            ],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [
              { label: "Projects", url: "/projects" },
              { label: "Services", url: "/services" },
              { label: "About", url: "/about" },
              { label: "Contact", url: "/contact" },
              { label: "Blog", url: "/blog" }
            ],
            notes: "Main navigation labels"
          }
        };

      case "global-ctas":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "",
            h3: "",
            body: "",
            bullets: [],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [
              { label: "Book A Free Consultation", url: "/contact" },
              { label: "Get Started", url: "/contact" },
              { label: "Schedule Consultation", url: "/contact" }
            ],
            notes: "Shared CTA buttons across components"
          }
        };

      case "footer":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "",
            h3: "",
            body: "Engineered with precision and passion",
            bullets: [
              "Projects",
              "Services",
              "About", 
              "Contact",
              "Blog"
            ],
            captions: [],
            formLabels: [],
            tooltips: [
              "Mail",
              "LinkedIn", 
              "GitHub",
              "Calendly"
            ],
            ctas: [
              { label: "Projects", url: "/projects" },
              { label: "Services", url: "/services" },
              { label: "About", url: "/about" },
              { label: "Contact", url: "/contact" },
              { label: "Blog", url: "/blog" }
            ],
            notes: "Footer navigation and social links with aria-labels"
          }
        };

      case "global-disclaimers":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "hidden" as const,
          fields: {
            h1: "",
            h2: "",
            h3: "",
            body: "",
            bullets: [],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: "<EMPTY SECTION (present in template)>"
          }
        };

      default:
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "hidden" as const,
          fields: {
            h1: "",
            h2: "",
            h3: "",
            body: "",
            bullets: [],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: "<EMPTY SECTION (present in template)>"
          }
        };
    }
  });
}