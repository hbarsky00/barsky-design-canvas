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
  '/case-studies': {
    kind: 'page',
    title: 'Case Studies — UX Decisions, Tradeoffs & Outcomes | Barsky',
    description: 'Selected case studies across health, financial, and enterprise — what I decided, what I cut, what shipped. Honest writeups, not portfolio fluff.',
    image: '/images/dae-search/hero.webp'
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
  "fire-lion": {
    title: "Fire Lion — AI-Built Game Design Case Study",
    description: "Shipping a multi-mode game with ruthless deletion discipline and AI-scaffolded design.",
    image: "https://barskydesign.pro/images/firelion-hero-title.webp"
  },
  "ring-rival": {
    title: "Ring-Rival — AI Boxing Game Case Study",
    description: "A shipped boxing game with distinct AI opponents, generated trash talk, and hand-tuned game feel.",
    image: "https://barskydesign.pro/images/ringrival-hero-title.webp"
  },
  "catchbuddy": {
    title: "CatchBuddy — Safe Sports Matching Case Study",
    description: "Designing a safety-first matching loop before layering monetization.",
    image: "https://barskydesign.pro/images/catchbuddy-hero-landing.webp"
  },
  "email-creation-ai": {
    title: "ManuscriptRx — Pharma Email AI Case Study",
    description: "AI handles the work between humans across a 6-step regulated email workflow.",
    image: "https://barskydesign.pro/images/emailai-screen1-content-planning.webp"
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
  "qr-code-builder": {
    title: "QR Code Builder — Branded QR Generator Case Study",
    description: "Branded QR code generator with custom styling, logos, and analytics for marketing campaigns.",
    image: "https://barskydesign.pro/images/qr-code-builder-hero.png"
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
