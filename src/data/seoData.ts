import { SEO_CONSTANTS } from "@/utils/seoConstants";
import { SEOInput } from "@/utils/seo/seoBuilder";

// Static page SEO data
export const STATIC_PAGE_SEO: Record<string, Partial<SEOInput>> = {
  '/': {
    kind: 'home',
    title: 'UX Designer Portfolio — Hiram Barsky, Product Designer',
    description: 'Senior UX designer portfolio with case studies in AI, fintech, healthcare, and cyber — showing measurable user outcomes and product design impact.',
    image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
  },
  '/projects': {
    kind: 'page',
    title: 'UX Case Studies & Product Design Portfolio — Barsky Design',
    description: 'Explore UX case studies in healthcare, fintech, co-parenting, and AI platforms — measurable impact, user outcomes, and strategic design thinking.',
    image: 'https://barskydesign.pro/images/herbalink-desktop-1.webp'
  },
  '/services': {
    kind: 'page',
    title: 'UX/UI Design Services | Barsky Design',
    description: 'From user research to high-impact product design, I help teams turn complex ideas into simple, intuitive experiences that drive business results.',
    image: 'https://barskydesign.pro/images/macbookpro.png'
  },
  '/contact': {
    kind: 'page',
    title: 'Contact Barsky Design — Product Design & UX Consulting',
    description: 'Ready to transform your product? Book a call to discuss your vision, UX challenges, or collaboration opportunities in Clifton, NJ and beyond.',
    image: 'https://barskydesign.pro/images/macbookpro.png'
  },
  '/blog': {
    kind: 'page',
    title: 'UX Design Blog — Product Design Insights | Barsky Design',
    description: 'Expert insights on UX design, AI integration, design systems, and product strategy — practical lessons from 15+ years in the field.',
    image: 'https://barskydesign.pro/images/blog-ai-enhanced-ux.jpg'
  },
  '/about': {
    kind: 'page',
    title: 'About Hiram Barsky — 15+ Years Product Design',
    description: 'Senior UX/Product Designer with 15+ years creating data-driven, AI-powered platforms. Based in Clifton, NJ, serving clients nationwide.',
    image: 'https://barskydesign.pro/images/hiram-barsky-headshot.webp'
  },
  '/store': {
    kind: 'page',
    title: 'Design Resources & Templates — Barsky Design',
    description: 'Professional design resources, wireframe kits, and UX templates to accelerate your product development. Digital downloads available instantly.',
    image: 'https://barskydesign.pro/images/macbookpro.png'
  },
  '/design-services/ux-ui-design': {
    kind: 'page',
    title: 'UX/UI Design Services — User-Centered Product Design',
    description: 'Transform your product with expert UX/UI design. From user research to high-fidelity prototypes, I create intuitive experiences that drive results.',
    image: 'https://barskydesign.pro/images/herbalink-desktop-1.webp'
  },
  '/design-services/mobile-app-design': {
    kind: 'page',
    title: 'Mobile App Design — iOS & Android UX/UI | Barsky Design',
    description: 'Native and cross-platform mobile app design for iOS and Android. User-centered design that increases engagement and app store ratings.',
    image: 'https://barskydesign.pro/images/splittime-desktop-1.webp'
  },
  '/design-services/web-development': {
    kind: 'page',
    title: 'Web Development — React & Frontend | Barsky Design',
    description: 'Custom web development with React, TypeScript, and modern frameworks. Fast, responsive, and accessible web applications that scale.',
    image: 'https://barskydesign.pro/images/business-management-desktop-1.webp'
  }
};

// Project-specific SEO mappings
export const PROJECT_SEO_MAP: Record<string, { title: string; description: string; image: string; }> = {
  "smarterhealth": {
    title: "Smarter Health | Healthcare App UX Case Study — Barsky Design",
    description: "Healthcare app that made medication tracking 45% faster and appointment adherence 60% higher for diabetic patients through empathy-driven design.",
    image: "https://barskydesign.pro/images/smarterhealth-desktop-1.webp"
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
  
  "beautiful-interface-doesnt-convert": "https://barskydesign.pro/images/blog-beautiful-interface.jpg",
  "research-without-users": "https://barskydesign.pro/images/blog-research-without-users.jpg"
};

// Enhanced blog post SEO data
export const BLOG_SEO_MAP: Record<string, { title: string; description: string; published?: string; modified?: string; }> = {
  "a-filter-nobody-opens": {
    title: "A Filter Nobody Opens Isn't a Feature",
    description: "Some content is global, some regional. Put that in a filter menu and the person who most needs it never sees it, because they arrived from a link.",
    published: "2026-08-27",
    modified: "2026-09-13"
  },
  "the-work-is-deleting-not-generating": {
    title: "The Work Is Deleting, Not Generating",
    description: "AI made producing screens almost free. That moved the bottleneck from making things to deciding which ones to throw away \u2014 and no model will do that part\u2026",
    published: "2026-08-25",
    modified: "2026-09-13"
  },
  "when-trust-is-the-product": {
    title: "When Trust Is the Product, It Can't Be a Feature",
    description: "Getting two strangers to agree to meet at a park is easy. Getting them to feel fine about it's the entire product \u2014 and it's not something you bolt on\u2026",
    published: "2026-08-25",
    modified: "2026-09-13"
  },
  "if-you-make-people-do-math": {
    title: "If You Make People Do Maths, They Guess or They Leave",
    description: "A price of 67\u00a2 tells you the odds are 67%. Almost nobody works that out in their head, and the ones who try get it wrong. Do the arithmetic for them.",
    published: "2026-08-25",
    modified: "2026-09-13"
  },
  "finding-the-data-is-half-the-job": {
    title: "Finding the Data Is Half the Job",
    description: "An analyst searches for revenue and gets forty results. The search worked. The next twenty minutes \u2014 deciding which table to trust \u2014 is the part nobody\u2026",
    published: "2026-08-25",
    modified: "2026-09-13"
  },
  "verification-is-a-door-not-a-sticker": {
    title: "Verification Is a Door, Not a Sticker",
    description: "Most directories let anyone list, then put a badge on whoever checked out. Flipping that \u2014 nobody is visible until they're verified \u2014 gives you a smaller\u2026",
    published: "2026-08-25",
    modified: "2026-09-13"
  },
  "you-dont-replace-excel-by-being-better": {
    title: "You Don't Replace Excel by Being Better Than Excel",
    description: "A bank was running multi-million-dollar loan deals in spreadsheets. The software that replaces that has to lose to Excel on flexibility and win on the\u2026",
    published: "2026-08-25",
    modified: "2026-09-13"
  },
  "beginner-or-pro-is-a-false-choice": {
    title: "Beginner or Pro Is a False Choice, and Both Sides Pay for It",
    description: "Easy apps hide complexity and charge for it. Pro apps expose everything and assume confidence you may not have. The split is a business decision dressed\u2026",
    published: "2026-08-25",
    modified: "2026-09-13"
  },
  "a-to-do-app-doesnt-prove-anything": {
    title: "A To-Do App Doesn't Prove Anything",
    description: "Most “I built this with AI” portfolios pick something safe. Safe projects hide the only question worth answering: can you ship something that\u2026",
    published: "2026-08-25",
    modified: "2026-09-13"
  },
  "design-for-the-approval-gates": {
    title: "In Regulated Work, Design for the Gates \u2014 Not the AI",
    description: "A pharma email takes two weeks and touches five teams in five tools. The AI's job is the work between the humans, not the work the humans are legally\u2026",
    published: "2026-08-25",
    modified: "2026-09-13"
  },
  "i-just-wanted-to-send-someone-a-video": {
    title: "I Just Wanted to Send Someone a Video",
    description: "Recording your screen is free. Sending it is what everyone charges for — watermarks, five-minute caps, a sign-in wall for your viewer.",
    published: "2026-08-25",
    modified: "2026-09-13"
  },
  "demo-works-shipping-is-different": {
    title: "The Demo Works. Shipping Is a Different Job.",
    description: "A demo is the happy path with data you chose. The hard parts live where nobody demos: dates, permissions, empty screens, and jobs that run while you sleep.",
    published: "2026-08-10T09:00:00Z",
    modified: "2026-09-13"
  },
  "what-one-person-can-ship-now": {
    title: "What One Person Can Actually Ship Now",
    description: "Four products built solo, and the four walls solo actually hits: distribution, institutional trust, operations, and nobody there to check your work.",
    published: "2026-08-08T09:00:00Z",
    modified: "2026-09-13"
  },
  "two-bugs-ai-wrote-that-i-had-to-find": {
    title: "Two Bugs AI Wrote That I Had to Find Myself",
    description: "Two real bugs from a product built with AI: a model with no clock generating expired dates, and row-level security that returns silence, not errors.",
    published: "2026-08-05T09:00:00Z",
    modified: "2026-09-13"
  },
  "designing-for-trust-when-the-product-is-the-risk": {
    title: "Designing for Trust When the Product Is the Risk",
    description: "When being wrong costs someone their health, money, or safety, trust is the product. Credentials as a gate, safety built first, and what it costs.",
    published: "2026-08-01T09:00:00Z",
    modified: "2026-09-13"
  },
  "why-enterprise-tools-lose-to-excel": {
    title: "Why Enterprise Tools Lose to Excel",
    description: "Your competitor is not the other vendor. It is a spreadsheet that fits exactly, never says no, and has never lost anyone's data. How to beat it.",
    published: "2026-07-25T09:00:00Z",
    modified: "2026-09-13"
  },
  "taste-is-the-whole-job": {
    title: "When Generating Is Free, Taste Is the Whole Job",
    description: "AI can produce fifty screens in a minute. It won't tell you to delete four of them. What taste actually is, and how Ring-Rival got twenty seconds faster.",
    published: "2026-07-22T09:00:00Z",
    modified: "2026-09-13"
  },
  "scope-discipline-when-building-is-cheap": {
    title: "Scope Discipline When Building Is Cheap",
    description: "Engineering cost used to do your prioritization for you. It stopped. Deciding what not to ship is now the only thing holding a product together.",
    published: "2026-07-18T09:00:00Z",
    modified: "2026-09-13"
  },
  "how-to-interview-a-designer-now": {
    title: "How to Interview a Designer Now",
    description: "Every portfolio is polished and every candidate has a demo. What to ask instead: what they deleted, where the number came from, what they overrode.",
    published: "2026-07-11T09:00:00Z",
    modified: "2026-09-13"
  },
  "designer-who-codes-argument-is-over": {
    title: "The Designer Who Codes Argument Is Over",
    description: "The gap between a design and a running product collapsed. What owning the build actually changes about the work, and what's genuinely worth learning.",
    published: "2026-07-09T09:00:00Z",
    modified: "2026-09-13"
  },
  "shipping-got-cheap-hiring-got-harder": {
    title: "Shipping Got Cheap. Hiring Got Harder.",
    description: "A working demo used to be evidence of skill. Now anyone can build one in a weekend. What design hiring should screen for instead, from 15+ years in.",
    published: "2026-06-26T09:00:00Z",
    modified: "2026-09-13"
  },
  "everyones-portfolio-looks-good-now": {
    title: "Everyone's Portfolio Looks Good Now",
    description: "Polish stopped being a signal the moment it became free. What still separates a designer: live products, written-down deletions, defensible numbers.",
    published: "2026-06-15T09:00:00Z",
    modified: "2026-09-13"
  },
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