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
    image: 'https://barskydesign.pro/images/herbalink/home-2026.jpg'
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
    image: 'https://barskydesign.pro/images/herbalink/home-2026.jpg'
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
  "stips": {
    title: "Stips — Prediction Markets UX Case Study",
    description: "Play-money prediction markets designed so the price reads as a probability — 67¢ means 67% likely, with the payout worked out before you commit.",
    image: "https://barskydesign.pro/images/stips/markets-board.jpg"
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
  "two-bugs-ai-wrote-that-i-had-to-find": "https://barskydesign.pro/blog/two-bugs-ai-wrote-that-i-had-to-find-cover.jpg",
  "taste-is-the-whole-job": "https://barskydesign.pro/blog/taste-is-the-whole-job-cover.jpg",
  "designer-who-codes-argument-is-over": "https://barskydesign.pro/blog/designer-who-codes-argument-is-over-cover.jpg",
  "shipping-got-cheap-hiring-got-harder": "https://barskydesign.pro/blog/shipping-got-cheap-hiring-got-harder-cover.jpg",
  "everyones-portfolio-looks-good-now": "https://barskydesign.pro/blog/everyones-portfolio-looks-good-now-cover.jpg",
  "what-ai-changed-and-what-it-didnt": "https://barskydesign.pro/blog/what-ai-changed-and-what-it-didnt-cover.jpg",
  "what-one-person-can-ship-now": "https://barskydesign.pro/blog/what-one-person-can-ship-now-cover.jpg",
  "designing-for-trust-when-the-product-is-the-risk": "https://barskydesign.pro/blog/designing-for-trust-when-the-product-is-the-risk-cover.jpg",
  "why-enterprise-tools-lose-to-excel": "https://barskydesign.pro/blog/why-enterprise-tools-lose-to-excel-cover.jpg",
  "scope-discipline-when-building-is-cheap": "https://barskydesign.pro/blog/scope-discipline-when-building-is-cheap-cover.jpg",
  "how-to-interview-a-designer-now": "https://barskydesign.pro/blog/how-to-interview-a-designer-now-cover.jpg"
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
  "what-one-person-can-ship-now": {
    title: "What One Person Can Actually Ship Now",
    description: "Four products built solo, and the four walls solo actually hits: distribution, institutional trust, operations, and nobody there to check your work.",
    published: "2026-08-08T09:00:00Z",
    modified: "2026-08-09T12:00:00Z"
  },
  "two-bugs-ai-wrote-that-i-had-to-find": {
    title: "Two Bugs AI Wrote That I Had to Find Myself",
    description: "Two real bugs from a product built with AI: a model with no clock generating expired dates, and row-level security that returns silence, not errors.",
    published: "2026-08-05T09:00:00Z",
    modified: "2026-08-09T12:00:00Z"
  },
  "designing-for-trust-when-the-product-is-the-risk": {
    title: "Designing for Trust When the Product Is the Risk",
    description: "When being wrong costs someone their health, money, or safety, trust is the product. Credentials as a gate, safety built first, and what it costs.",
    published: "2026-08-01T09:00:00Z",
    modified: "2026-08-09T12:00:00Z"
  },
  "why-enterprise-tools-lose-to-excel": {
    title: "Why Enterprise Tools Lose to Excel",
    description: "Your competitor is not the other vendor. It is a spreadsheet that fits exactly, never says no, and has never lost anyone's data. How to beat it.",
    published: "2026-07-25T09:00:00Z",
    modified: "2026-08-09T12:00:00Z"
  },
  "taste-is-the-whole-job": {
    title: "When Generating Is Free, Taste Is the Whole Job",
    description: "AI can produce fifty screens in a minute. It won't tell you to delete four of them. What taste actually is, and how Ring-Rival got twenty seconds faster.",
    published: "2026-07-22T09:00:00Z",
    modified: "2026-08-09T12:00:00Z"
  },
  "scope-discipline-when-building-is-cheap": {
    title: "Scope Discipline When Building Is Cheap",
    description: "Engineering cost used to do your prioritization for you. It stopped. Deciding what not to ship is now the only thing holding a product together.",
    published: "2026-07-18T09:00:00Z",
    modified: "2026-08-09T12:00:00Z"
  },
  "how-to-interview-a-designer-now": {
    title: "How to Interview a Designer Now",
    description: "Every portfolio is polished and every candidate has a demo. What to ask instead: what they deleted, where the number came from, what they overrode.",
    published: "2026-07-11T09:00:00Z",
    modified: "2026-08-09T12:00:00Z"
  },
  "designer-who-codes-argument-is-over": {
    title: "The Designer Who Codes Argument Is Over",
    description: "The gap between a design and a running product collapsed. What owning the build actually changes about the work, and what's genuinely worth learning.",
    published: "2026-07-09T09:00:00Z",
    modified: "2026-08-09T12:00:00Z"
  },
  "shipping-got-cheap-hiring-got-harder": {
    title: "Shipping Got Cheap. Hiring Got Harder.",
    description: "A working demo used to be evidence of skill. Now anyone can build one in a weekend. What design hiring should screen for instead, from 15+ years in.",
    published: "2026-06-26T09:00:00Z",
    modified: "2026-08-09T12:00:00Z"
  },
  "everyones-portfolio-looks-good-now": {
    title: "Everyone's Portfolio Looks Good Now",
    description: "Polish stopped being a signal the moment it became free. What still separates a designer: live products, written-down deletions, defensible numbers.",
    published: "2026-06-15T09:00:00Z",
    modified: "2026-08-09T12:00:00Z"
  },
  "what-ai-changed-and-what-it-didnt": {
    title: "What AI Changed About Design Work, and What It Didn't",
    description: "Building products solo with AI. What genuinely changed about design work, and the list of things that are exactly as hard as they always were.",
    published: "2026-06-04T09:00:00Z",
    modified: "2026-08-09T12:00:00Z"
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
