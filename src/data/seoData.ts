import { SEO_CONSTANTS } from "@/utils/seoConstants";
import { SEOInput } from "@/utils/seo/seoBuilder";

// Static page SEO data
export const STATIC_PAGE_SEO: Record<string, Partial<SEOInput>> = {
  '/': {
    kind: 'home',
    title: 'UX Designer Portfolio — Hiram Barsky',
    description: 'Senior UX designer portfolio with case studies in AI, fintech, healthcare, and cyber — measurable user outcomes and product design impact.',
    image: SEO_CONSTANTS.DEFAULT_OG_IMAGE
  },
  '/projects': {
    kind: 'page',
    title: 'UX Case Studies & Product Design — Barsky Design',
    description: 'UX case studies in healthcare, fintech, co-parenting, and AI platforms — measurable impact, user outcomes, and strategic design thinking.',
    image: 'https://barskydesign.pro/images/herbalink-promo.png'
  },
  '/services': {
    kind: 'page',
    title: 'UX/UI Design Services | Barsky Design',
    description: 'From user research to high-impact product design, I help teams turn complex ideas into simple, intuitive experiences that drive results.',
    image: 'https://barskydesign.pro/images/hiram-barsky-profile.png'
  },
  '/contact': {
    kind: 'page',
    title: 'Contact Barsky Design — UX Consulting',
    description: 'Ready to transform your product? Book a call to discuss your vision, UX challenges, or collaboration in Clifton, NJ and beyond.',
    image: 'https://barskydesign.pro/images/hiram-barsky-profile.png'
  },
  '/blog': {
    kind: 'page',
    title: 'UX Design Blog — Product Insights | Barsky',
    description: 'Insights on UX design, AI integration, design systems, and product strategy — practical lessons from 15+ years in the field.',
    image: 'https://barskydesign.pro/blog-ai-enhanced-ux.jpg'
  },
  '/about': {
    kind: 'page',
    title: 'About Hiram Barsky — 15+ Years in Design',
    description: 'Senior UX/Product Designer with 15+ years building data-driven, AI-powered platforms. Based in Clifton, NJ, serving clients nationwide.',
    image: 'https://barskydesign.pro/images/hiram-barsky-profile.png'
  },
  '/store': {
    kind: 'page',
    title: 'Design Resources & Templates — Barsky',
    description: 'Professional design resources, wireframe kits, and UX templates to accelerate product development. Instant digital downloads.',
    image: 'https://barskydesign.pro/images/hiram-barsky-profile.png'
  },
  '/design-services/ux-ui-design': {
    kind: 'page',
    title: 'UX/UI Design Services — Product Design',
    description: 'Expert UX/UI design — from user research to high-fidelity prototypes. Intuitive experiences that drive measurable business results.',
    image: 'https://barskydesign.pro/images/herbalink-promo.png'
  },
  '/design-services/mobile-app-design': {
    kind: 'page',
    title: 'Mobile App Design — iOS & Android | Barsky',
    description: 'Native and cross-platform mobile app design for iOS and Android. User-centered design that increases engagement and ratings.',
    image: 'https://barskydesign.pro/images/catchbuddy-hero-landing.png'
  },
  '/design-services/web-development': {
    kind: 'page',
    title: 'Web Development — React & Frontend | Barsky',
    description: 'Custom web development with React, TypeScript, and modern frameworks. Fast, responsive, accessible web apps that scale.',
    image: 'https://barskydesign.pro/images/dae-search/hero.jpg'
  }
};

// Project-specific SEO mappings
export const PROJECT_SEO_MAP: Record<string, { title: string; description: string; image: string; }> = {
  "smarterhealth": {
    title: "Smarter Health — Healthcare App UX Case Study",
    description: "Healthcare app that made medication tracking 45% faster and lifted appointment adherence 60% for diabetic patients via empathy-driven design.",
    image: "https://barskydesign.pro/images/hiram-barsky-profile.png"
  },
  "crypto": {
    title: "Crypto Trading — Fintech UX Case Study",
    description: "How I eliminated the fear that makes 60% of beginners quit before their first trade through trust-building UX design.",
    image: "https://barskydesign.pro/images/crypto/hero.jpg"
  },
  "herbalink": {
    title: "HerbaLink — Healthcare Marketplace UX Case Study",
    description: "HIPAA-compliant herbalist marketplace that lifted certified provider bookings 45% and patient retention 30% via trustworthy UX.",
    image: "https://barskydesign.pro/images/herbalink/home-hero.png"
  },
  "splittime": {
    title: "SplitTime — Co-Parenting App UX Case Study",
    description: "Co-parenting platform that reduces family conflict via intuitive scheduling, transparent expense tracking, and secure messaging.",
    image: "https://barskydesign.pro/images/splittime/hero.jpg"
  },
  "business-management": {
    title: "Blue Sky — Business Management UX Case Study",
    description: "Unified operations platform for small businesses — cut manual errors 68% by consolidating scheduling, invoicing, and tasks into one dashboard.",
    image: "https://barskydesign.pro/images/business-management/hero-three-laptops.jpg"
  },
  "investor-loan-app": {
    title: "Fintech Loan Platform — Investment UX Case Study",
    description: "Streamlined fintech underwriting that cut loan processing time 40% while improving compliance and borrower experience.",
    image: "https://barskydesign.pro/images/investor-loan-app/hero.png"
  },
  "medication-app": {
    title: "Medication App — Patient Safety UX Case Study",
    description: "Mobile medication management improving adherence 35% with smart reminders, barcode scanning, and caregiver visibility.",
    image: "https://barskydesign.pro/images/hiram-barsky-profile.png"
  },
  "gold2crypto": {
    title: "Crypto Exchange Onboarding — UX Case Study",
    description: "Reduced crypto exchange drop-off 50% with simpler KYC, progressive disclosure, and clear risk communication.",
    image: "https://barskydesign.pro/images/hiram-barsky-profile.png"
  },
  "dae-search": {
    title: "Enterprise Data Search — UX Case Study",
    description: "Advanced search platform with faceted filters and relevance tuning that helps analysts find trustworthy data 3x faster.",
    image: "https://barskydesign.pro/images/dae-search/hero.jpg"
  },
  "fire-lion": {
    title: "Fire Lion — AI-Built Game Design Case Study",
    description: "A shipped mobile web game built solo with AI as co-builder — three modes, hand-tuned game feel, and a deletion list longer than the feature list.",
    image: "https://barskydesign.pro/images/firelion-hero-title.png"
  },
  "ring-rival": {
    title: "Ring-Rival — AI Boxing Game Case Study",
    description: "A shipped boxing game with distinct AI opponents, generated trash talk, and hand-tuned game feel.",
    image: "https://barskydesign.pro/images/ringrival-hero-title.png"
  },
  "catchbuddy": {
    title: "CatchBuddy — Safe Sports Matching Case Study",
    description: "Same-day pickup sports built solo with AI — phone verification, a panic button, and curated meeting spots designed in from day one, not bolted on.",
    image: "https://barskydesign.pro/images/catchbuddy-hero-landing.png"
  },
  "email-creation-ai": {
    title: "ManuscriptRx — Pharma Email AI Case Study",
    description: "A concept for AI-assisted pharma HCP email production, designed around the approval gates — AI handles the work between humans, not the decisions.",
    image: "https://barskydesign.pro/images/emailai-screen1-content-planning.png"
  }
};

// Blog post OG-image overrides. Only list a slug here if it has a real, dedicated
// social-share image on disk that's reachable as a plain public URL — anything else
// falls through to the post's own coverImage (see getBlogSEO below). Kept as plain
// URL strings rather than importing blogData.ts's bundled asset imports directly,
// because this file is also read by scripts/inject-seo-html.ts under plain tsx
// (no Vite asset-loader), which can't resolve `@/assets/*.jpg` imports.
export const BLOG_IMAGE_MAP: Record<string, string> = {
  "finding-first-ux-job-guide": "https://barskydesign.pro/blog-finding-ux-job.jpg",
  "design-systems-that-get-used": "https://barskydesign.pro/blog-design-systems.jpg",
  "ai-enhanced-ux-designer-future": "https://barskydesign.pro/blog-ai-enhanced-ux.jpg",
  "user-research-shoestring-budget": "https://barskydesign.pro/blog-user-research-budget.jpg",
  "case-study-writing": "https://barskydesign.pro/blog-case-study-writing.jpg",
  "wireframes-to-wow-visual-hierarchy": "https://barskydesign.pro/blog-visual-hierarchy.jpg",
  "built-product-without-real-data": "https://barskydesign.pro/lovable-uploads/b05265c4-6699-47ae-9319-0fdea04fd57f.png",
  "building-products-nobody-asked-for": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop",
  "beautiful-interface-doesnt-convert": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&h=630&fit=crop",
  "research-without-users": "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&h=630&fit=crop"
};

// Enhanced blog post SEO data. `published` is the real ISO date matching each
// post's on-page date in blogData.ts — kept here (not derived from blogData.ts's
// `date` string at runtime) for the same reason as BLOG_IMAGE_MAP: this file is
// imported by scripts/inject-seo-html.ts under plain tsx, so it stays free of any
// import that would drag in blogData.ts's Vite asset imports.
//
// Before this was wired up, every blog post's JSON-LD fell back to a hardcoded
// `datePublished: 2024-01-01` (see structuredDataUtils.ts) regardless of the real,
// distinct date shown on the page — identical fake dates across all 10 posts is
// exactly the kind of templated signal that hurts trust with search/AI engines.
export const BLOG_SEO_MAP: Record<string, { title: string; description: string; published: string; modified?: string; }> = {
  "finding-first-ux-job-guide": {
    title: "Finding a UX Job – What Actually Works — Barsky Design",
    description: "Most portfolios fail because they're built to show range instead of depth. Real strategies for landing a UX role, from 15+ years in the field.",
    published: "2025-01-15T12:00:00Z",
    modified: "2026-08-08T12:00:00Z"
  },
  "design-systems-that-get-used": {
    title: "Building Design Systems That Actually Get Used",
    description: "Stop building design systems that get ignored. Practical governance, documentation, and adoption tactics teams actually use.",
    published: "2025-01-08T12:00:00Z",
    modified: "2026-08-08T12:00:00Z"
  },
  "ai-enhanced-ux-designer-future": {
    title: "The AI-Enhanced UX Designer: Future-Proofing Your Career",
    description: "AI didn't replace UX designers — it replaced the version of the job that stopped at the mockup. Notes from shipping products with AI as a build partner.",
    published: "2025-12-15T12:00:00Z",
    modified: "2026-08-08T12:00:00Z"
  },
  "user-research-shoestring-budget": {
    title: "User Research on a Shoestring Budget",
    description: "Get valuable user insights without big budgets. Guerrilla research tactics, free tools, and lean methods that work.",
    published: "2025-12-01T12:00:00Z",
    modified: "2026-08-08T12:00:00Z"
  },
  "built-product-without-real-data": {
    title: "Shipping a Product with Placeholder Data and No Marketing Budget",
    description: "No users yet, no ad budget, no team. What actually gets a solo-built product seen — from someone who ships this way by default.",
    published: "2025-05-16T12:00:00Z",
    modified: "2026-08-08T12:00:00Z"
  },
  "building-products-nobody-asked-for": {
    title: "What I Learned Building Products Nobody Asked For",
    description: "Ring-Rival, Fire Lion, CatchBuddy — three solo-built products nobody requested. What actually shipping them taught me that no course did.",
    published: "2025-04-28T12:00:00Z",
    modified: "2026-08-08T12:00:00Z"
  },
  "wireframes-to-wow-visual-hierarchy": {
    title: "From Wireframes to Wow: What Actually Makes Hierarchy Work",
    description: "Visual hierarchy isn't a styling pass at the end — it's a decision about what matters, made before a single pixel moves. How I actually work through it.",
    published: "2025-10-18T12:00:00Z",
    modified: "2026-08-08T12:00:00Z"
  },
  "case-study-writing": {
    title: "Case Studies That Win Clients — Beyond Pretty Screens",
    description: "Write case studies that win clients and jobs. Structure, storytelling, and presentation tips from hundreds of portfolios.",
    published: "2025-12-28T12:00:00Z",
    modified: "2026-08-08T12:00:00Z"
  },
  "beautiful-interface-doesnt-convert": {
    title: "Why Your Beautiful Interface Doesn't Convert",
    description: "A checkout flow can be flawless and still lose. Polish isn't the same as removing friction — where I actually put my attention now.",
    published: "2025-03-30T12:00:00Z",
    modified: "2026-08-08T12:00:00Z"
  },
  "research-without-users": {
    title: "How to Research When You Don't Have Users Yet",
    description: "How to validate product ideas before you have users. Practical research methods for early-stage products and startups.",
    published: "2025-03-18T12:00:00Z",
    modified: "2026-08-08T12:00:00Z"
  }
};

// Helper functions for getting SEO data
export function getStaticPageSEO(path: string): Partial<SEOInput> | null {
  return STATIC_PAGE_SEO[path] || null;
}

export function getProjectSEO(projectId: string): Partial<SEOInput> | null {
  const project = PROJECT_SEO_MAP[projectId];
  if (!project) return null;

  return {
    kind: 'project',
    title: project.title,
    description: project.description,
    image: project.image
  };
}

export function getBlogSEO(slug: string): Partial<SEOInput> | null {
  const image = BLOG_IMAGE_MAP[slug];
  const seoData = BLOG_SEO_MAP[slug];
  if (!image && !seoData) return null;

  return {
    kind: 'post',
    title: seoData?.title,
    description: seoData?.description,
    published: seoData?.published,
    modified: seoData?.modified,
    // Omit entirely (not `image: undefined`) when there's no dedicated OG image —
    // an explicit undefined key still overwrites the post's real coverImage when
    // spread into seoInput in UnifiedSEO.tsx.
    ...(image ? { image } : {}),
  };
}
