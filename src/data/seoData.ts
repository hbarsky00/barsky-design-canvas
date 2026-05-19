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
    image: 'https://barskydesign.pro/images/herbalink-desktop-1.webp'
  },
  '/services': {
    kind: 'page',
    title: 'UX/UI Design Services | Barsky Design',
    description: 'From user research to high-impact product design, I help teams turn complex ideas into simple, intuitive experiences that drive results.',
    image: 'https://barskydesign.pro/images/macbookpro.png'
  },
  '/contact': {
    kind: 'page',
    title: 'Contact Barsky Design — UX Consulting',
    description: 'Ready to transform your product? Book a call to discuss your vision, UX challenges, or collaboration in Clifton, NJ and beyond.',
    image: 'https://barskydesign.pro/images/macbookpro.png'
  },
  '/blog': {
    kind: 'page',
    title: 'UX Design Blog — Product Insights | Barsky',
    description: 'Insights on UX design, AI integration, design systems, and product strategy — practical lessons from 15+ years in the field.',
    image: 'https://barskydesign.pro/images/blog-ai-enhanced-ux.jpg'
  },
  '/about': {
    kind: 'page',
    title: 'About Hiram Barsky — 15+ Years in Design',
    description: 'Senior UX/Product Designer with 15+ years building data-driven, AI-powered platforms. Based in Clifton, NJ, serving clients nationwide.',
    image: 'https://barskydesign.pro/images/hiram-barsky-headshot.jpg'
  },
  '/store': {
    kind: 'page',
    title: 'Design Resources & Templates — Barsky',
    description: 'Professional design resources, wireframe kits, and UX templates to accelerate product development. Instant digital downloads.',
    image: 'https://barskydesign.pro/images/macbookpro.png'
  },
  '/design-services/ux-ui-design': {
    kind: 'page',
    title: 'UX/UI Design Services — Product Design',
    description: 'Expert UX/UI design — from user research to high-fidelity prototypes. Intuitive experiences that drive measurable business results.',
    image: 'https://barskydesign.pro/images/herbalink-desktop-1.webp'
  },
  '/design-services/mobile-app-design': {
    kind: 'page',
    title: 'Mobile App Design — iOS & Android | Barsky',
    description: 'Native and cross-platform mobile app design for iOS and Android. User-centered design that increases engagement and ratings.',
    image: 'https://barskydesign.pro/images/splittime-desktop-1.webp'
  },
  '/design-services/web-development': {
    kind: 'page',
    title: 'Web Development — React & Frontend | Barsky',
    description: 'Custom web development with React, TypeScript, and modern frameworks. Fast, responsive, accessible web apps that scale.',
    image: 'https://barskydesign.pro/images/business-management-desktop-1.webp'
  }
};

// Project-specific SEO mappings
export const PROJECT_SEO_MAP: Record<string, { title: string; description: string; image: string; }> = {
  "smarterhealth": {
    title: "Smarter Health — Healthcare App UX Case Study",
    description: "Healthcare app that made medication tracking 45% faster and lifted appointment adherence 60% for diabetic patients via empathy-driven design.",
    image: "https://barskydesign.pro/images/smarterhealth-desktop-1.webp"
  },
  "crypto": {
    title: "Crypto Trading — Fintech UX Case Study",
    description: "How I eliminated the fear that makes 60% of beginners quit before their first trade through trust-building UX design.",
    image: "https://barskydesign.pro/images/crypto-desktop-1.webp"
  },
  "herbalink": {
    title: "HerbaLink — Healthcare Marketplace UX Case Study",
    description: "HIPAA-compliant herbalist marketplace that lifted certified provider bookings 45% and patient retention 30% via trustworthy UX.",
    image: "https://barskydesign.pro/images/herbalink-desktop-1.webp"
  },
  "splittime": {
    title: "SplitTime — Co-Parenting App UX Case Study",
    description: "Co-parenting platform that reduces family conflict via intuitive scheduling, transparent expense tracking, and secure messaging.",
    image: "https://barskydesign.pro/images/splittime-desktop-1.webp"
  },
  "business-management": {
    title: "Enterprise Ops Platform — B2B UX Case Study",
    description: "Modular business management platform that cut manual work 60% by centralizing inventory, workflows, and team analytics.",
    image: "https://barskydesign.pro/images/business-management-desktop-1.webp"
  },
  "investor-loan-app": {
    title: "Fintech Loan Platform — Investment UX Case Study",
    description: "Streamlined fintech underwriting that cut loan processing time 40% while improving compliance and borrower experience.",
    image: "https://barskydesign.pro/images/investor-loan-app-desktop-1.webp"
  },
  "medication-app": {
    title: "Medication App — Patient Safety UX Case Study",
    description: "Mobile medication management improving adherence 35% with smart reminders, barcode scanning, and caregiver visibility.",
    image: "https://barskydesign.pro/images/medication-app-desktop-1.webp"
  },
  "gold2crypto": {
    title: "Crypto Exchange Onboarding — UX Case Study",
    description: "Reduced crypto exchange drop-off 50% with simpler KYC, progressive disclosure, and clear risk communication.",
    image: "https://barskydesign.pro/images/gold2crypto-desktop-1.webp"
  },
  "dae-search": {
    title: "Enterprise Data Search — UX Case Study",
    description: "Advanced search platform with faceted filters and relevance tuning that helps analysts find trustworthy data 3x faster.",
    image: "https://barskydesign.pro/images/dae-search-desktop-1.webp"
  },
  "barskyjoint": {
    title: "Restaurant Ordering — Food Tech UX Case Study",
    description: "End-to-end restaurant ordering that lifted average ticket size 25% via menu clarity, guided customization, and seamless checkout.",
    image: "https://barskydesign.pro/images/barskyjoint-desktop-1.webp"
  }
};

// Blog post image mappings with enhanced SEO-optimized data
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
  "ai-in-design": "https://barskydesign.pro/images/blog-ai-in-design.jpg",
  
  "beautiful-interface-doesnt-convert": "https://barskydesign.pro/images/blog-beautiful-interface.jpg",
  "research-without-users": "https://barskydesign.pro/images/blog-research-without-users.jpg"
};

// Enhanced blog post SEO data
export const BLOG_SEO_MAP: Record<string, { title: string; description: string; }> = {
  "finding-first-ux-job-guide": {
    title: "Finding a UX Job in 2025 — Barsky Design",
    description: "Practical strategies for landing your first UX job in 2025. Portfolio tips, networking tactics, and insider advice from 15+ years."
  },
  "design-systems-that-get-used": {
    title: "Design Systems That Actually Get Used",
    description: "Stop building design systems that get ignored. Practical governance, documentation, and adoption tactics teams actually use."
  },
  "portfolio-red-flags-no-interviews": {
    title: "UX Portfolio Red Flags Killing Interviews",
    description: "Common UX portfolio mistakes that kill your chances. What hiring managers look for and how to showcase your UX process."
  },
  "ai-enhanced-ux-designer-future": {
    title: "AI in UX Design — Leverage AI Tools",
    description: "Practical guide to using AI in UX design. From research synthesis to prototyping, learn how AI enhances design work."
  },
  "user-research-shoestring-budget": {
    title: "Low-Budget User Research Methods",
    description: "Get valuable user insights without big budgets. Guerrilla research tactics, free tools, and lean methods that work."
  },
  "built-product-without-real-data": {
    title: "Building Products Without Real Data",
    description: "Why assumptions kill products and how to validate ideas with real user data. Lessons from common research pitfalls."
  },
  "building-products-nobody-asked-for": {
    title: "Building Products Nobody Asked For",
    description: "How to avoid building features users don't want. Strategy insights on validation, market research, and customer discovery."
  },
  "wireframes-to-wow-visual-hierarchy": {
    title: "Visual Hierarchy — Wireframes to Wow",
    description: "Master visual hierarchy to guide user attention. Practical tips for typography, spacing, and layout that improve UX."
  },
  "case-study-writing": {
    title: "UX Case Studies That Win Interviews",
    description: "Write case studies that win clients and jobs. Structure, storytelling, and presentation tips from hundreds of portfolios."
  },
  "ai-in-design": {
    title: "Future of AI in Design — 2025 View",
    description: "How AI is transforming design work. Practical insights on tools, ethics, and career implications for designers."
  },
  "beautiful-interface-doesnt-convert": {
    title: "Why Beautiful Interfaces Don't Convert",
    description: "Pretty designs don't guarantee conversions. The UX psychology behind why aesthetics fail and what drives user action."
  },
  "research-without-users": {
    title: "Validating Products Without Users",
    description: "How to validate product ideas before you have users. Practical research methods for early-stage products and startups."
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
    image
  };
}
