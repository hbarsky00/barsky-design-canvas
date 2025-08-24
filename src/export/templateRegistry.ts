// Template registry - canonical sections for each page type

export interface TemplateSection {
  key: string;
  displayName: string;
  visibilityMode: "always" | "conditional";
  pageTypes: string[];
}

export const TEMPLATE_SECTIONS: TemplateSection[] = [
  // GLOBAL sections (appear once)
  { key: "header-nav", displayName: "Header Navigation", visibilityMode: "always", pageTypes: ["global"] },
  { key: "global-ctas", displayName: "Global CTAs", visibilityMode: "always", pageTypes: ["global"] },
  { key: "footer", displayName: "Footer", visibilityMode: "always", pageTypes: ["global"] },
  { key: "global-disclaimers", displayName: "Global Disclaimers", visibilityMode: "always", pageTypes: ["global"] },
  
  // Homepage sections
  { key: "hero", displayName: "Hero", visibilityMode: "always", pageTypes: ["homepage"] },
  { key: "case-studies", displayName: "Case Studies", visibilityMode: "always", pageTypes: ["homepage"] },
  { key: "recent-adventures", displayName: "Recent Adventures", visibilityMode: "always", pageTypes: ["homepage"] },
  { key: "bio", displayName: "Bio", visibilityMode: "always", pageTypes: ["homepage"] },
  { key: "contact-form", displayName: "Contact Form", visibilityMode: "always", pageTypes: ["homepage"] },
  { key: "blog-preview", displayName: "Blog Preview", visibilityMode: "always", pageTypes: ["homepage"] },
  { key: "faq", displayName: "FAQ", visibilityMode: "conditional", pageTypes: ["homepage"] },
  { key: "internal-linking", displayName: "Internal Linking", visibilityMode: "always", pageTypes: ["homepage"] },
  
  // Projects listing sections
  { key: "page-title", displayName: "Page Title", visibilityMode: "always", pageTypes: ["projects"] },
  { key: "intro-subtitle", displayName: "Intro/Subtitle", visibilityMode: "always", pageTypes: ["projects"] },
  { key: "project-cards", displayName: "Project Cards", visibilityMode: "always", pageTypes: ["projects"] },
  
  // Structured case study sections
  { key: "hero", displayName: "Hero", visibilityMode: "always", pageTypes: ["case-study"] },
  { key: "overview", displayName: "Overview", visibilityMode: "always", pageTypes: ["case-study"] },
  { key: "research", displayName: "Research", visibilityMode: "conditional", pageTypes: ["case-study"] },
  { key: "problem", displayName: "Problem", visibilityMode: "conditional", pageTypes: ["case-study"] },
  { key: "sprint-zero", displayName: "Sprint Zero", visibilityMode: "conditional", pageTypes: ["case-study"] },
  { key: "key-insights", displayName: "Key Insights", visibilityMode: "conditional", pageTypes: ["case-study"] },
  { key: "my-thought-process", displayName: "My Thought Process", visibilityMode: "conditional", pageTypes: ["case-study"] },
  { key: "ideation", displayName: "Ideation", visibilityMode: "conditional", pageTypes: ["case-study"] },
  { key: "iterations", displayName: "Iterations", visibilityMode: "conditional", pageTypes: ["case-study"] },
  { key: "validation-testing", displayName: "Validation & Testing", visibilityMode: "conditional", pageTypes: ["case-study"] },
  { key: "final-product", displayName: "The Final Product", visibilityMode: "conditional", pageTypes: ["case-study"] },
  { key: "outcome-impact", displayName: "Outcome & Impact", visibilityMode: "conditional", pageTypes: ["case-study"] },
  { key: "what-didnt-work", displayName: "What Didn't Work", visibilityMode: "conditional", pageTypes: ["case-study"] },
  { key: "more-work", displayName: "More Work", visibilityMode: "always", pageTypes: ["case-study"] },
  { key: "case-study-contact", displayName: "Contact", visibilityMode: "always", pageTypes: ["case-study"] },
  { key: "share-toolbar", displayName: "Share Toolbar", visibilityMode: "always", pageTypes: ["case-study"] },
  { key: "navigation", displayName: "Navigation", visibilityMode: "always", pageTypes: ["case-study"] },
  
  // About sections
  { key: "personal-story", displayName: "Personal Story", visibilityMode: "always", pageTypes: ["about"] },
  { key: "professional-journey", displayName: "Professional Journey", visibilityMode: "always", pageTypes: ["about"] },
  { key: "skills-showcase", displayName: "Skills Showcase", visibilityMode: "always", pageTypes: ["about"] },
  { key: "working-with-me", displayName: "Working With Me", visibilityMode: "always", pageTypes: ["about"] },
  { key: "call-to-action", displayName: "Call to Action", visibilityMode: "always", pageTypes: ["about"] },
  
  // Services sections
  { key: "hero", displayName: "Hero", visibilityMode: "always", pageTypes: ["services"] },
  { key: "services-grid", displayName: "Services Grid", visibilityMode: "always", pageTypes: ["services"] },
  { key: "cta-section", displayName: "CTA Section", visibilityMode: "always", pageTypes: ["services"] },
  
  // Service detail sections
  { key: "hero", displayName: "Hero", visibilityMode: "always", pageTypes: ["service-detail"] },
  { key: "section-1", displayName: "Section 1", visibilityMode: "always", pageTypes: ["service-detail"] },
  { key: "section-2", displayName: "Section 2", visibilityMode: "always", pageTypes: ["service-detail"] },
  { key: "section-3", displayName: "Section 3", visibilityMode: "always", pageTypes: ["service-detail"] },
  { key: "cta-section", displayName: "CTA Section", visibilityMode: "always", pageTypes: ["service-detail"] },
  
  // Contact sections
  { key: "page-title", displayName: "Page Title", visibilityMode: "always", pageTypes: ["contact"] },
  { key: "contact-information", displayName: "Contact Information", visibilityMode: "always", pageTypes: ["contact"] },
  { key: "contact-form", displayName: "Contact Form", visibilityMode: "always", pageTypes: ["contact"] },
  { key: "blog-preview", displayName: "Blog Preview", visibilityMode: "always", pageTypes: ["contact"] },
  
  // Blog index sections
  { key: "hero", displayName: "Hero", visibilityMode: "always", pageTypes: ["blog-index"] },
  { key: "posts-grid", displayName: "Posts Grid", visibilityMode: "always", pageTypes: ["blog-index"] },
  
  // Blog post sections
  { key: "header", displayName: "Header", visibilityMode: "always", pageTypes: ["blog-post"] },
  { key: "featured-image", displayName: "Featured Image", visibilityMode: "conditional", pageTypes: ["blog-post"] },
  { key: "body", displayName: "Body", visibilityMode: "always", pageTypes: ["blog-post"] },
  { key: "related-posts", displayName: "Related Posts", visibilityMode: "conditional", pageTypes: ["blog-post"] },
  { key: "breadcrumbs", displayName: "Breadcrumbs", visibilityMode: "always", pageTypes: ["blog-post"] }
];

export function getTemplateForPageType(pageType: string): TemplateSection[] {
  return TEMPLATE_SECTIONS.filter(section => section.pageTypes.includes(pageType));
}