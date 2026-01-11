import { SEO_CONSTANTS } from "@/utils/seoConstants";
import { SEOInput } from "@/utils/seo/seoBuilder";

// Static page SEO data
export const STATIC_PAGE_SEO: Record<string, Partial<SEOInput>> = {
  '/': {
    kind: 'home',
    title: 'Hiram Barsky | Lead Product Designer & AI Innovator — Barsky Design',
    description: 'Driving Design Strategy & Leadership | Passion for High Craft, Gen AI, Cyber & Fintech | Based in Clifton, NJ',
    image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
  },
  '/projects': {
    kind: 'page',
    title: 'UX Case Studies & Product Design Portfolio — Barsky Design',
    description: 'Explore UX case studies in healthcare, fintech, co-parenting, and AI platforms — showcasing measurable impact, user outcomes, and strategic design thinking.',
    image: 'https://barskydesign.pro/images/herbalink-desktop-1.webp'
  },
  '/services': {
    kind: 'page',
    title: 'Expert UX/UI Design Services | Mobile Apps & Web Development — Barsky Design',
    description: 'From user research to high-impact product design, I help teams turn complex ideas into simple, intuitive experiences that drive business results.',
    image: 'https://barskydesign.pro/images/macbookpro.png'
  },
  '/contact': {
    kind: 'page',
    title: 'Contact Barsky Design | Product Design & UX Consulting in NJ — Barsky Design',
    description: 'Ready to transform your product? Book a call to discuss your vision, UX challenges, or collaboration opportunities in Clifton, NJ and beyond.',
    image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
  },
  '/blog': {
    kind: 'page',
    title: 'UX Design Blog | Product Design Insights & Case Studies — Barsky Design',
    description: 'Expert insights on UX design, AI integration, design systems, and product strategy — practical lessons from 15+ years in the field.',
    image: 'https://barskydesign.pro/images/blog-ai-enhanced-ux.jpg'
  },
  '/about': {
    kind: 'page',
    title: 'About Hiram Barsky | 15+ Years Product Design Leadership — Barsky Design',
    description: 'Senior UX/Product Designer with 15+ years creating data-driven, AI-powered platforms. Based in Clifton, NJ, serving clients nationwide.',
    image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
  },
  '/store': {
    kind: 'page',
    title: 'Design Resources & Templates | Premium UX Tools — Barsky Design',
    description: 'Professional design resources, wireframe kits, and UX templates to accelerate your product development. Digital downloads available instantly.',
    image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
  },
  '/design-services/ux-ui-design': {
    kind: 'page',
    title: 'Expert UX/UI Design Services | User-Centered Product Design — Barsky Design',
    description: 'Transform your product with expert UX/UI design. From user research to high-fidelity prototypes, I create intuitive experiences that drive results.',
    image: 'https://barskydesign.pro/images/ux-ui-design-service.jpg'
  },
  '/design-services/mobile-app-design': {
    kind: 'page',
    title: 'Mobile App Design Services | iOS & Android UX/UI — Barsky Design',
    description: 'Native and cross-platform mobile app design for iOS and Android. User-centered design that increases engagement and app store ratings.',
    image: 'https://barskydesign.pro/images/mobile-app-design-service.jpg'
  },
  '/design-services/web-development': {
    kind: 'page',
    title: 'Modern Web Development | React & Frontend Development — Barsky Design',
    description: 'Custom web development with React, TypeScript, and modern frameworks. Fast, responsive, and accessible web applications that scale.',
    image: 'https://barskydesign.pro/images/web-development-service.jpg'
  }
};

// Project-specific SEO mappings
export const PROJECT_SEO_MAP: Record<string, { title: string; description: string; image: string; }> = {
  "smarterhealth": {
    title: "Smarter Health | Healthcare App UX Case Study — Barsky Design",
    description: "Healthcare app that made medication tracking 45% faster and appointment adherence 60% higher for diabetic patients through empathy-driven design.",
    image: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/smarterhealth/frontpage.png"
  },
  "crypto": {
    title: "Crypto Trading Platform | Fintech UX Case Study — Barsky Design",
    description: "How I eliminated the fear that makes 60% of beginners quit before their first trade through trust-building UX design.",
    image: "https://barskydesign.pro/images/crypto-desktop-1.webp"
  },
  "herbalink": {
    title: "HerbaLink Healthcare Marketplace | UX Case Study — Barsky Design",
    description: "HIPAA-compliant herbalist marketplace design that increased certified provider bookings 45% and patient retention 30% through trustworthy UX and streamlined scheduling.",
    image: "https://barskydesign.pro/images/herbalink-desktop-1.webp"
  },
  "splittime": {
    title: "SplitTime Co-Parenting App | Mobile UX Case Study — Barsky Design",
    description: "Designing a co-parenting platform that reduces family conflict through intuitive scheduling, transparent expense tracking, and secure messaging between divorced parents.",
    image: "https://barskydesign.pro/images/splittime-desktop-1.webp"
  },
  "business-management": {
    title: "Enterprise Operations Platform | B2B UX Case Study — Barsky Design",
    description: "Modular business management platform that reduced manual work 60% by centralizing inventory, workflows, and analytics with actionable insights across teams.",
    image: "https://barskydesign.pro/images/business-management-desktop-1.webp"
  },
  "investor-loan-app": {
    title: "Fintech Loan Platform | Investment App UX Case Study — Barsky Design",
    description: "Streamlined fintech underwriting that cut loan processing time 40% while improving compliance, decision clarity, and borrower experience through better UX.",
    image: "https://barskydesign.pro/images/investor-loan-app-desktop-1.webp"
  },
  "medication-app": {
    title: "Healthcare Medication App | Patient Safety UX Case Study — Barsky Design",
    description: "Mobile-first medication management improving adherence 35% with smart reminders, barcode scanning, and caregiver visibility across iOS and Android.",
    image: "https://barskydesign.pro/images/medication-app-desktop-1.webp"
  },
  "gold2crypto": {
    title: "Crypto Exchange Onboarding | Fintech UX Case Study — Barsky Design",
    description: "Reduced crypto exchange drop-off 50% with simplified KYC, progressive disclosure, and clear risk communication for gold-to-cryptocurrency conversion.",
    image: "https://barskydesign.pro/images/gold2crypto-desktop-1.webp"
  },
  "dae-search": {
    title: "Enterprise Data Discovery | Search UX Case Study — Barsky Design",
    description: "Advanced search platform with faceted filters and relevance tuning that helps data analysts find trustworthy assets 3x faster across enterprise sources.",
    image: "https://barskydesign.pro/images/dae-search-desktop-1.webp"
  },
  "barskyjoint": {
    title: "Restaurant Ordering System | Food Tech UX Case Study — Barsky Design",
    description: "End-to-end restaurant ordering experience that increased average ticket size 25% through menu clarity, guided customization, and seamless web/kiosk checkout.",
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
  "design-system-that-gets-used": "https://barskydesign.pro/images/blog-design-systems.jpg",
  "beautiful-interface-doesnt-convert": "https://barskydesign.pro/images/blog-beautiful-interface.jpg",
  "research-without-users": "https://barskydesign.pro/images/blog-research-without-users.jpg"
};

// Enhanced blog post SEO data
export const BLOG_SEO_MAP: Record<string, { title: string; description: string; }> = {
  "finding-first-ux-job-guide": {
    title: "Finding a UX Job in 2025 | Job Search Guide for UX Designers — Barsky Design",
    description: "Practical strategies for landing your first UX job in 2025. Portfolio tips, networking tactics, and insider advice from 15+ years in the field."
  },
  "design-systems-that-get-used": {
    title: "Building Design Systems That Work | Practical Implementation Guide — Barsky Design",
    description: "Stop building design systems that get ignored. Learn how to create systems teams actually use with practical governance, documentation, and adoption strategies."
  },
  "portfolio-red-flags-no-interviews": {
    title: "UX Portfolio Red Flags | Why You're Not Getting Interviews — Barsky Design",
    description: "Common UX portfolio mistakes that kill your chances. Learn what hiring managers look for and how to showcase your UX process effectively."
  },
  "ai-enhanced-ux-designer-future": {
    title: "AI in UX Design | How Designers Can Leverage AI Tools — Barsky Design",
    description: "Practical guide to using AI in UX design. From research synthesis to prototyping, learn how AI enhances (not replaces) design work."
  },
  "user-research-shoestring-budget": {
    title: "Low-Budget User Research | Maximum Impact Methods — Barsky Design",
    description: "Get valuable user insights without big budgets. Guerrilla research tactics, free tools, and lean methods that actually work."
  },
  "built-product-without-real-data": {
    title: "Building Products Without Real Data | UX Research Mistakes — Barsky Design",
    description: "Why assumptions kill products and how to validate ideas with real user data. Learn from common research pitfalls and solutions."
  },
  "building-products-nobody-asked-for": {
    title: "Building Products Nobody Asked For | Product Strategy Lessons — Barsky Design",
    description: "How to avoid building features users don't want. Product strategy insights on user validation, market research, and customer discovery."
  },
  "wireframes-to-wow-visual-hierarchy": {
    title: "Visual Hierarchy in UX Design | From Wireframes to Wow — Barsky Design",
    description: "Master visual hierarchy to guide user attention. Practical tips for typography, spacing, and layout that improve user experience."
  },
  "case-study-writing": {
    title: "UX Case Study Writing | Portfolio That Gets Results — Barsky Design",
    description: "Write case studies that win clients and jobs. Structure, storytelling, and presentation tips from reviewing hundreds of UX portfolios."
  },
  "ai-in-design": {
    title: "Future of AI in Design | Designer's Perspective 2025 — Barsky Design",
    description: "How AI is transforming design work. Practical insights on tools, ethics, and career implications for UX and product designers."
  },
  "design-system-that-gets-used": {
    title: "Design Systems That Actually Get Used | Practical Guide — Barsky Design",
    description: "How to build design systems teams actually adopt. Governance, documentation, and adoption strategies from real-world experience."
  },
  "beautiful-interface-doesnt-convert": {
    title: "Why Beautiful Interfaces Don't Convert | UX Psychology — Barsky Design",
    description: "Pretty designs don't guarantee conversions. Learn the UX psychology behind why aesthetics alone fail and what actually drives user action."
  },
  "research-without-users": {
    title: "User Research Without Users | Validation Strategies — Barsky Design",
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