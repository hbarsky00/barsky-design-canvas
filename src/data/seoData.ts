import { SEO_CONSTANTS } from "@/utils/seoConstants";
import { SEOInput } from "@/utils/seo/seoBuilder";

// Static page SEO data
export const STATIC_PAGE_SEO: Record<string, Partial<SEOInput>> = {
  '/': {
    kind: 'home',
    title: 'UX Designer Portfolio — Hiram Barsky',
    description: 'Senior UX designer portfolio with case studies in AI, fintech, healthcare, and cyber — measurable user outcomes and product design impact.',
    image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
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
    image: 'https://barskydesign.pro/images/default-og-image.jpg'
  },
  '/contact': {
    kind: 'page',
    title: 'Contact Barsky Design — UX Consulting',
    description: 'Ready to transform your product? Book a call to discuss your vision, UX challenges, or collaboration in Clifton, NJ and beyond.',
    image: 'https://barskydesign.pro/images/default-og-image.jpg'
  },
  '/blog': {
    kind: 'page',
    title: 'UX Design Blog — Product Insights | Barsky',
    description: 'Insights on UX design, AI integration, design systems, and product strategy — practical lessons from 15+ years in the field.',
    image: 'https://barskydesign.pro/blog-ai-enhanced-ux.jpg'
  },
  '/case-studies': {
    kind: 'page',
    title: 'Case Studies — UX Decisions, Tradeoffs & Outcomes | Barsky',
    description: 'Selected case studies across health, financial, and enterprise — what I decided, what I cut, what shipped. Honest writeups, not portfolio fluff.',
    image: 'https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae-search/DAE-Project-1.jpg'
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
    image: 'https://barskydesign.pro/images/default-og-image.jpg'
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
    image: 'https://barskydesign.pro/images/desktop-signup-1.png'
  },
  '/design-services/web-development': {
    kind: 'page',
    title: 'Web Development — React & Frontend | Barsky',
    description: 'Custom web development with React, TypeScript, and modern frameworks. Fast, responsive, accessible web apps that scale.',
    image: 'https://barskydesign.pro/lovable-uploads/business-management-cover.jpg'
  }
};

// Project-specific SEO mappings
export const PROJECT_SEO_MAP: Record<string, { title: string; description: string; image: string; }> = {
  "smarterhealth": {
    title: "Smarter Health — Healthcare App UX Case Study",
    description: "Healthcare app that made medication tracking 45% faster and lifted appointment adherence 60% for diabetic patients via empathy-driven design.",
    image: "https://barskydesign.pro/images/default-og-image.jpg"
  },
  "crypto": {
    title: "Crypto Trading — Fintech UX Case Study",
    description: "How I eliminated the fear that makes 60% of beginners quit before their first trade through trust-building UX design.",
    image: "https://barskydesign.pro/images/default-og-image.jpg"
  },
  "herbalink": {
    title: "HerbaLink — Healthcare Marketplace UX Case Study",
    description: "HIPAA-compliant herbalist marketplace that lifted certified provider bookings 45% and patient retention 30% via trustworthy UX.",
    image: "https://barskydesign.pro/images/herbalink-promo.png"
  },
  "splittime": {
    title: "SplitTime — Co-Parenting App UX Case Study",
    description: "Co-parenting platform that reduces family conflict via intuitive scheduling, transparent expense tracking, and secure messaging.",
    image: "https://barskydesign.pro/images/desktop-signup-1.png"
  },
  "business-management": {
    title: "Enterprise Ops Platform — B2B UX Case Study",
    description: "Modular business management platform that cut manual work 60% by centralizing inventory, workflows, and team analytics.",
    image: "https://barskydesign.pro/lovable-uploads/business-management-cover.jpg"
  },
  "investor-loan-app": {
    title: "Fintech Loan Platform — Investment UX Case Study",
    description: "Streamlined fintech underwriting that cut loan processing time 40% while improving compliance and borrower experience.",
    image: "https://barskydesign.pro/images/default-og-image.jpg"
  },
  "medication-app": {
    title: "Medication App — Patient Safety UX Case Study",
    description: "Mobile medication management improving adherence 35% with smart reminders, barcode scanning, and caregiver visibility.",
    image: "https://barskydesign.pro/images/default-og-image.jpg"
  },
  "gold2crypto": {
    title: "Crypto Exchange Onboarding — UX Case Study",
    description: "Reduced crypto exchange drop-off 50% with simpler KYC, progressive disclosure, and clear risk communication.",
    image: "https://barskydesign.pro/images/default-og-image.jpg"
  },
  "dae-search": {
    title: "Enterprise Data Search — UX Case Study",
    description: "Advanced search platform with faceted filters and relevance tuning that helps analysts find trustworthy data 3x faster.",
    image: "https://barskydesign.pro/lovable-uploads/dae/dashboard-search.png"
  },
  "fire-lion": {
    title: "Fire Lion — AI-Built Game Design Case Study",
    description: "Shipping a multi-mode game with ruthless deletion discipline and AI-scaffolded design.",
    image: "https://barskydesign.pro/images/firelion-hero-title.png"
  },
  "ring-rival": {
    title: "Ring-Rival — AI Boxing Game Case Study",
    description: "A shipped boxing game with distinct AI opponents, generated trash talk, and hand-tuned game feel.",
    image: "https://barskydesign.pro/images/ringrival-hero-title.png"
  },
  "catchbuddy": {
    title: "CatchBuddy — Safe Sports Matching Case Study",
    description: "Designing a safety-first matching loop before layering monetization.",
    image: "https://barskydesign.pro/images/catchbuddy-hero-landing.png"
  },
  "email-creation-ai": {
    title: "ManuscriptRx — Pharma Email AI Case Study",
    description: "AI handles the work between humans across a 6-step regulated email workflow.",
    image: "https://barskydesign.pro/images/emailai-screen1-content-planning.png"
  },
  "valora-bet": {
    title: "Valora Bet — Social Prediction Markets Case Study",
    description: "Social prediction markets platform turning opinions into shared outcomes with transparent odds and community-driven markets.",
    image: "https://barskydesign.pro/images/valorabet-hero.png"
  },
  "nudgeme": {
    title: "NudgeMe — Natural Language Reminder App Case Study",
    description: "Progressive web app that turns plain-language input into smart reminders with multi-channel delivery and RFC 5545 recurrence.",
    image: "https://barskydesign.pro/images/nudgeme-hero.png"
  },
  "roi-design-builder": {
    title: "ROI Design Builder — Design Value Calculator Case Study",
    description: "Interactive calculator that turns design investment into projected ROI, helping teams make the business case for UX work.",
    image: "https://barskydesign.pro/lovable-uploads/roi-design/01-landing.png"
  },
  "qr-code-builder": {
    title: "QR Code Builder — Branded QR Generator Case Study",
    description: "Branded QR code generator with custom styling, logos, and analytics for marketing campaigns.",
    image: "https://barskydesign.pro/images/default-og-image.jpg"
  }
};

// Optional per-slug OG image overrides. Blog images normally come straight
// from each post's coverImage in blogData.ts (resolved to the built asset by
// prerender-seo.ts and used directly by UnifiedSEO at runtime) — only add an
// entry here to override a specific post.
export const BLOG_IMAGE_MAP: Record<string, string> = {};

// Optional per-slug title/description overrides for blog posts. Titles and
// descriptions normally come from each post's title/excerpt in blogData.ts —
// only add an entry here to override a specific post.
export const BLOG_SEO_MAP: Record<string, { title: string; description: string; }> = {};

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
    image
  };
}
