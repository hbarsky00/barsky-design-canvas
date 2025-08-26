import { SEO_CONSTANTS } from "@/utils/seoConstants";
import { SEOInput } from "@/utils/seo/seoBuilder";

// Static page SEO data
export const STATIC_PAGE_SEO: Record<string, Partial<SEOInput>> = {
  '/': {
    kind: 'home',
    title: SEO_CONSTANTS.SITE_NAME,
    description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
    image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
  },
  '/projects': {
    kind: 'page',
    title: 'Design Case Studies – Barsky Design',
    description: 'Explore UX case studies in healthcare, fintech, co-parenting, and AI platforms — showcasing impact, outcomes, and design thinking.',
    image: 'https://barskydesign.pro/images/herbalink-desktop-1.webp'
  },
  '/services': {
    kind: 'page',
    title: 'UX & Product Design Services – Barsky Design',
    description: 'From user research to high-impact product design, I help teams turn complex ideas into simple, intuitive experiences.',
    image: 'https://barskydesign.pro/images/macbookpro.png'
  },
  '/contact': {
    kind: 'page',
    title: 'Contact Hiram Barsky – Product Designer',
    description: 'Let\'s connect. Book a call to discuss your product vision, UX challenges, or collaboration opportunities.',
    image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
  },
  '/blog': {
    kind: 'page',
    title: 'Design Insights & Case Studies – Barsky Blog',
    description: 'Thoughts on UX, AI, and design strategy — lessons learned from projects and experiments.',
    image: 'https://barskydesign.pro/images/blog-ai-enhanced-ux.jpg'
  },
  '/about': {
    kind: 'page',
    title: 'About Hiram Barsky – Product Designer',
    description: 'Senior UX/Product Designer with 15+ years of experience creating data-driven, AI-powered, and mobile-first digital platforms.',
    image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
  }
};

// Project-specific SEO mappings
export const PROJECT_SEO_MAP: Record<string, { title: string; description: string; image: string; }> = {
  "herbalink": {
    title: "HerbaLink – Herbalist Marketplace Case Study",
    description: "How I designed a HIPAA-conscious marketplace that increased certified herbalist bookings and patient retention through trustworthy UX and streamlined scheduling.",
    image: "https://barskydesign.pro/images/herbalink-desktop-1.webp"
  },
  "splittime": {
    title: "SplitTime – Co‑Parenting Planner Case Study",
    description: "A thoughtful co‑parenting app that reduces conflict with shared calendars, smart reminders, and transparent expense tracking designed for real families facing complex schedules.",
    image: "https://barskydesign.pro/images/splittime-desktop-1.webp"
  },
  "business-management": {
    title: "Business Management – Operations Platform Case Study",
    description: "Designing a modular operations platform that centralizes inventory, workflows, and analytics to cut manual work, create visibility across teams, and surface actionable insights.",
    image: "https://barskydesign.pro/images/business-management-desktop-1.webp"
  },
  "investor-loan-app": {
    title: "Investor Loan App – Fintech Case Study",
    description: "Streamlined underwriting flows and data collection that cut loan processing time by 40% while improving compliance, decision clarity, internal collaboration, and borrower experience.",
    image: "https://barskydesign.pro/images/investor-loan-app-desktop-1.webp"
  },
  "medication-app": {
    title: "Medication App – Adherence & Safety Case Study",
    description: "Mobile-first medication management that improves adherence with contextual reminders, clear scanning, accessible affordances, and caregiver visibility across devices and roles.",
    image: "https://barskydesign.pro/images/medication-app-desktop-1.webp"
  },
  "gold2crypto": {
    title: "Gold2Crypto – Exchange Onboarding Case Study",
    description: "Reducing drop‑off with plain‑language KYC, progressive disclosure, and clear risk cues to help users confidently convert assets between gold and crypto with fewer errors.",
    image: "https://barskydesign.pro/images/gold2crypto-desktop-1.webp"
  },
  "dae-search": {
    title: "DAE Search – Data Discovery Case Study",
    description: "A powerful search experience with faceted filters, previews, and relevance tuning that helps analysts find trustworthy data assets quickly and consistently across sources.",
    image: "https://barskydesign.pro/images/dae-search-desktop-1.webp"
  },
  "barskyjoint": {
    title: "BarskyJoint – Restaurant Ordering Case Study",
    description: "Designed an end‑to‑end ordering experience that increases average ticket size with menu clarity, guided customization, and seamless checkout across web and kiosk.",
    image: "https://barskydesign.pro/images/barskyjoint-desktop-1.webp"
  }
};

// Blog post image mappings
export const BLOG_IMAGE_MAP: Record<string, string> = {
  "finding-first-ux-job-guide": "https://barskydesign.pro/images/blog-finding-ux-job.jpg",
  "design-systems-that-get-used": "https://barskydesign.pro/images/blog-design-systems.jpg",
  "portfolio-red-flags-no-interviews": "https://barskydesign.pro/images/blog-portfolio-red-flags.jpg",
  "ai-enhanced-ux-designer-future": "https://barskydesign.pro/images/blog-ai-enhanced-ux.jpg",
  "user-research-shoestring-budget": "https://barskydesign.pro/images/blog-user-research-budget.jpg",
  "built-product-without-real-data": "https://barskydesign.pro/images/blog-built-product-without-real-data.jpg",
  "building-products-nobody-asked-for": "https://barskydesign.pro/images/blog-building-products-nobody-asked-for.jpg",
  "wireframes-to-wow-visual-hierarchy": "https://barskydesign.pro/images/blog-wireframes-to-wow-visual-hierarchy.jpg",
  "case-study-writing": "https://barskydesign.pro/images/blog-case-study-writing.jpg",
  "ai-in-design": "https://barskydesign.pro/images/blog-ai-in-design.jpg"
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
  if (!image) return null;
  
  return {
    kind: 'post',
    image
  };
}