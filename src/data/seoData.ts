import { SEO_CONSTANTS } from "@/utils/seoConstants";
import { SEOInput, FaqItem } from "@/utils/seo/seoBuilder";

// Answer-first FAQ content for /services — single source of truth for both
// the visible FAQ section (Services.tsx) and the FAQPage schema
// (UnifiedSEO -> generateStructuredData). Every claim here is something
// Hiram could defend on a call; no invented percentages or fabricated
// project counts. Written 2026-08-05 (AEO lever 2) after finding the
// schema pipeline was previously injecting fabricated FAQ content
// (invented conversion-rate and turnaround numbers) onto the homepage
// where no FAQ section was even visibly rendered.
export const SERVICES_FAQS: FaqItem[] = [
  {
    question: "Does a designer who also builds the product cost more than hiring a designer alone?",
    answer:
      "There's no published flat rate — it depends on scope, and that gets settled on the call, not guessed at here. But the comparison worth making isn't \"designer\" vs \"designer who codes\" — it's paying for a design phase and then a separate development handoff, versus one person doing both with nothing lost in translation between them.",
  },
  {
    question: "Can one person really design and build a whole product?",
    answer:
      "The proof is live, not a claim: HerbaLink, NudgeMe, CatchBuddy, Ring-Rival, Fire Lion, and this ROI calculator are all shipped products — real auth, real databases, real users — designed and built by one person. Open one and judge for yourself rather than taking a portfolio's word for it.",
  },
  {
    question: "What does \"AI-assisted design\" actually mean day to day?",
    answer:
      "AI scaffolds the parts that are genuinely mechanical — boilerplate code, schema setup, first-draft copy variants. The calls that decide whether a product actually works — what to cut, when a parser is confident enough to skip a confirmation step, how much friction a trust-sensitive flow can tolerate — stay human. Every case study on this site names the specific call that wasn't delegated.",
  },
  {
    question: "How is this different from hiring a design agency?",
    answer:
      "One senior person end to end, not an account team billing hours between you and the person actually doing the work. That's a real tradeoff, not a pure upside — an agency brings more hands and more disciplines at once. It's the right fit for a founder who wants direct access to whoever's making the decisions, not a fit for a project that genuinely needs a ten-person team.",
  },
  {
    question: "What's the actual timeline for a new engagement?",
    answer:
      "Day 1 is a 30-minute call to scope the problem. Days 2 through 5 produce a working prototype of the riskiest part of the idea — not wireframes — so you know if it holds before committing real budget. From there it's weekly drops of working software, typically over 2 to 6 weeks depending on scope.",
  },
  {
    question: "Is the code production-quality, or just a working prototype?",
    answer:
      "Both are on the table, and which one you're getting is explicit up front rather than left ambiguous. The live products linked from this page are full production builds — real payments, real authentication, real deployed infrastructure — which is the evidence that \"production-quality\" isn't just a phrase on this page.",
  },
];

// Answer-first FAQ content for /about — single source of truth for both the
// visible FAQ section (About.tsx) and the FAQPage schema. Distinct angle from
// SERVICES_FAQS: these are entity/bio questions (who Hiram is, what his
// background actually covers), not engagement-process questions. Every fact
// here matches what's already established and vetted elsewhere in the
// codebase (ProfessionalJourney's employer list, PersonalStory's "15+ years"
// line, the Organization schema's Clifton NJ address) — no new claims
// introduced. Deliberately does NOT cite any of ProfessionalJourney's
// per-employer percentage stats (40% engagement, 25% satisfaction, etc.) —
// those are flagged separately in docs/aeo-log.md as unverified, and this
// FAQ shouldn't launder them into schema. Written 2026-08-06 (AEO lever 2,
// Cycle 2).
export const ABOUT_FAQS: FaqItem[] = [
  {
    question: "Is Hiram Barsky a UX designer or a developer?",
    answer:
      "Both, on purpose — that's the actual differentiator, not a marketing line. He designs the interface and ships the working code behind it: HerbaLink, NudgeMe, CatchBuddy, Ring-Rival, and Fire Lion are all live products he both designed and built, not concepts handed to a separate dev team.",
  },
  {
    question: "What kind of companies has Hiram Barsky designed for?",
    answer:
      "A run of enterprise roles before going independent: PNC, Bank of America, Deloitte, Tata Consultancy Services, KPMG, and Express Scripts — spanning banking, consulting, and healthcare-adjacent work. The employer names are real and checkable; specific performance numbers from those roles aren't published here since they can't be independently verified outside the original employer.",
  },
  {
    question: "How long has Hiram Barsky been working in UX design?",
    answer:
      "15+ years, starting in classic UX and shifting focus over the last few years toward generative-AI-integrated product design — the same arc described on this page's own story section.",
  },
  {
    question: "Where is Hiram Barsky based, and does he work with remote clients?",
    answer:
      "Based in Clifton, NJ, working with clients nationwide — engagements run remotely by default, the same as most of the product work shown in the case studies.",
  },
  {
    question: "What industries does Hiram Barsky have direct experience in?",
    answer:
      "Fintech and banking (PNC, Bank of America), healthcare-adjacent (Express Scripts, plus the HerbaLink case study), and enterprise consulting (Deloitte, TCS, KPMG) — the same span reflected in the case studies linked from this site, not a generic checklist of industries.",
  },
];

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
    title: 'Design Services That Ship — Hiram Barsky',
    description: 'Senior product design with an AI build crew: research, UI, and working software from one person. Fintech, healthcare, and zero-to-one products.',
    image: 'https://barskydesign.pro/images/default-og-image.jpg',
    faqs: SERVICES_FAQS,
  },
  '/free-audit': {
    kind: 'page',
    title: 'Free UX & Conversion Audit — Hiram Barsky',
    description: 'Request a free UX and conversion audit: a written report with actionable recommendations, delivered by email in 24-48 hours, no strings attached.',
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
    image: 'https://barskydesign.pro/images/hiram-barsky-profile.png',
    faqs: ABOUT_FAQS,
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
    image: 'https://barskydesign.pro/uploads/business-management-cover.jpg'
  }
};

// Project-specific SEO mappings
// Every description below must match (or be a safe paraphrase of) the
// honest description already vetted in structuredCaseStudies.ts for the
// same id. Found 2026-08-06 (AEO lever 6): 8 of these carried specific,
// unsubstantiated percentage claims ("45% faster", "3x faster", etc.) that
// appear nowhere in the actual case-study content — a fabrication the
// 2026-07-15 honesty pass fixed in the page bodies but missed here, in the
// meta layer AI engines and search snippets actually read.
export const PROJECT_SEO_MAP: Record<string, { title: string; description: string; image: string; }> = {
  // smarterhealth / medication-app / gold2crypto: no live route (all three
  // 301 to /case-studies in netlify.toml) and no real case-study content
  // anywhere in the codebase. Entries kept only so nothing reads a
  // fabricated stat if ever referenced; not indexed, not in any sitemap.
  "smarterhealth": {
    title: "Smarter Health — Healthcare App UX Concept",
    description: "An unshipped healthcare app concept — no case-study writeup exists yet for this one.",
    image: "https://barskydesign.pro/images/default-og-image.jpg"
  },
  "crypto": {
    title: "Crypto Trading — Fintech UX Case Study",
    description: "A self-initiated trading concept designed for two audiences the industry insists you have to choose between.",
    image: "https://barskydesign.pro/images/default-og-image.jpg"
  },
  "herbalink": {
    title: "HerbaLink — Healthcare Marketplace UX Case Study",
    description: "Verified herbalists, designed around trust — in a category where bad advice has medical consequences. Designed, built, and shipped solo.",
    image: "https://barskydesign.pro/images/herbalink-promo.png"
  },
  "splittime": {
    title: "SplitTime — Co-Parenting App UX Case Study",
    description: "A co-parenting app designed around the fact that every interaction is potential evidence.",
    image: "https://barskydesign.pro/images/desktop-signup-1.png"
  },
  // business-management: /project/business-management now 301s to
  // /case-studies (netlify.toml) — structuredCaseStudies.ts has no entry
  // for it and no honest source of real content exists anywhere in the
  // codebase to write one from. Entry kept for the same reason as above.
  "business-management": {
    title: "Enterprise Ops Platform — B2B UX Concept",
    description: "An enterprise operations platform concept — no case-study writeup exists yet for this one.",
    image: "https://barskydesign.pro/uploads/business-management-cover.jpg"
  },
  "investor-loan-app": {
    title: "Fintech Loan Platform — Investment UX Case Study",
    description: "Replacing Excel as the system of record for multi-million-dollar loan deals — without anyone losing their workflow.",
    image: "https://barskydesign.pro/images/default-og-image.jpg"
  },
  "medication-app": {
    title: "Medication App — Patient Safety UX Concept",
    description: "An unshipped medication-tracking app concept — no case-study writeup exists yet for this one.",
    image: "https://barskydesign.pro/images/default-og-image.jpg"
  },
  "gold2crypto": {
    title: "Crypto Exchange Onboarding — UX Concept",
    description: "An unshipped crypto-exchange onboarding concept — no case-study writeup exists yet for this one.",
    image: "https://barskydesign.pro/images/default-og-image.jpg"
  },
  "dae-search": {
    title: "Enterprise Data Search — UX Case Study",
    description: "Enterprise search redesigned around the inconvenient truth that finding the data is only half the job — knowing whether to trust it is the rest.",
    image: "https://barskydesign.pro/uploads/dae/dashboard-search.png"
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
    image: "https://barskydesign.pro/uploads/roi-design/01-landing.png"
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
