import { SEO_CONSTANTS } from "@/utils/seoConstants";
import { SEOInput } from "@/utils/seo/seoBuilder";

// Static page SEO data
export const STATIC_PAGE_SEO: Record<string, Partial<SEOInput>> = {
  '/': {
    kind: 'home',
    title: 'I Design and Develop SaaS, Apps & Internal Tools',
    description: 'I design and develop SaaS, web apps, mobile apps and internal tools. One person, start to finish: design, front end, database, launch. Five live now.',
    image: SEO_CONSTANTS.DEFAULT_OG_IMAGE
  },
  '/projects': {
    kind: 'page',
    title: 'Case Studies — Products I Designed and Built',
    description: 'Case studies from 15+ years: SaaS, mobile apps, internal tools and marketplaces. The decisions, the trade-offs, and what I cut along the way.',
    image: 'https://barskydesign.pro/images/og/page-projects.png'
  },
  '/services': {
    kind: 'page',
    title: 'What I Design and Develop — Hiram Barsky',
    description: 'SaaS, web apps, mobile apps and internal tools. Product design, React and TypeScript front end, database and auth. One person, no handoff round-trip.',
    image: 'https://barskydesign.pro/images/og/page-services.png'
  },
  '/contact': {
    kind: 'page',
    title: 'Contact — Tell Me What You Are Building',
    description: 'SaaS, an app, or the internal tool nobody wants to touch. I work remotely with teams anywhere, on US Eastern time, and reply to everything myself.',
    image: 'https://barskydesign.pro/images/og/page-contact.png'
  },
  '/blog': {
    kind: 'page',
    title: 'Blog — Designing and Building Software',
    description: 'Notes on designing and developing software as one person: AI-assisted workflow, design systems, and what shipping solo actually takes.',
    image: 'https://barskydesign.pro/images/og/page-blog.png'
  },
  '/about': {
    kind: 'page',
    title: 'About Hiram Barsky — Designer and Developer',
    description: '15+ years designing and developing software in regulated industries: PNC, Bank of America, Deloitte, KPMG, AstraZeneca. I design it and I build it.',
    image: 'https://barskydesign.pro/images/og/page-about.png'
  },
  '/store': {
    kind: 'page',
    title: 'Design Resources & Templates — Barsky',
    description: 'Wireframe kits and UX templates pulled from my own product work — the files I actually use, not stock. Instant download, yours to keep and edit.',
    image: 'https://barskydesign.pro/images/og/page-store.png'
  },
  '/design-services/ux-ui-design': {
    kind: 'page',
    title: 'UX/UI Design Services — Hiram Barsky',
    description: 'Product design from research through high-fidelity UI: user flows, wireframes, prototypes, and the design system that keeps it consistent as it grows.',
    image: 'https://barskydesign.pro/images/og/service-ux-ui-design.png'
  },
  '/design-services/mobile-app-design': {
    kind: 'page',
    title: 'Mobile App Design and Development',
    description: 'iOS and Android app design, plus the build to go with it. Designed and developed end to end by one person, from first sketch to the store listing.',
    image: 'https://barskydesign.pro/images/og/service-mobile-app-design.png'
  },
  '/design-services/web-development': {
    kind: 'page',
    title: 'Web Development — React & TypeScript',
    description: 'Custom web apps in React and TypeScript: front end, database, auth and deploy. Fast, accessible, and built by the same person who designed it.',
    image: 'https://barskydesign.pro/images/og/service-web-development.png'
  }
};

// Project-specific SEO mappings
// `published` / `modified` are real dates taken from this repo's git history for
// each case-study page — the commit that introduced it and the commit that last
// touched it. Not invented, and not a blanket "today": the Article schema was
// scoring 67% completeness purely for missing them.
export const PROJECT_SEO_MAP: Record<string, { title: string; description: string; image: string; published?: string; modified?: string; }> = {
  "smarterhealth": {
    title: "Smarter Health — Healthcare App UX Case Study",
    description: "A medication-tracking app for diabetic patients, designed around what people actually do between appointments rather than what a dashboard wants to show them.",
    image: "https://barskydesign.pro/images/hiram-barsky-profile.png"
  },
  "crypto": {
    title: "Crypto Trading — Fintech UX Case Study",
    description: "Turning a commodity-to-crypto trading flow into something a first-timer can follow, by designing for the fear rather than around it.",
    image: "https://barskydesign.pro/images/og/crypto.png",
    published: "2025-08-24",
    modified: "2026-08-29"
  },
  "herbalink": {
    title: "HerbaLink — Healthcare Marketplace UX Case Study",
    description: "A booking platform for verified herbalists, built solo end to end. Nobody is listed until their credentials check out — the problem was trust, not search.",
    image: "https://barskydesign.pro/images/og/herbalink.png",
    published: "2025-08-07",
    modified: "2026-08-29"
  },
  "splittime": {
    title: "SplitTime — Co-Parenting App UX Case Study",
    description: "Co-parenting platform that reduces family conflict via intuitive scheduling, transparent expense tracking, and secure messaging.",
    image: "https://barskydesign.pro/images/og/splittime.png"
  },
  "stips": {
    title: "Stips — Prediction Markets UX Case Study",
    description: "Play-money prediction markets designed so the price reads as a probability — 67¢ means 67% likely, with the payout worked out before you commit.",
    image: "https://barskydesign.pro/images/og/stips.png",
    published: "2026-08-08",
    modified: "2026-08-29"
  },
  "investor-loan-app": {
    title: "Fintech Loan Platform — Investment UX Case Study",
    description: "Replacing Excel as the system of record for multi-million-dollar loan deals, without anyone losing the workflow they already had.",
    image: "https://barskydesign.pro/images/og/investor-loan-app.png",
    published: "2025-08-10",
    modified: "2026-08-29"
  },
  "medication-app": {
    title: "Medication App — Patient Safety UX Case Study",
    description: "Mobile medication management — smart reminders, barcode scanning, and visibility for the caregiver as well as the patient.",
    image: "https://barskydesign.pro/images/hiram-barsky-profile.png"
  },
  "gold2crypto": {
    title: "Crypto Exchange Onboarding — UX Case Study",
    description: "A crypto exchange onboarding flow rebuilt around simpler KYC, progressive disclosure, and saying plainly what the risks are.",
    image: "https://barskydesign.pro/images/hiram-barsky-profile.png"
  },
  "business-management": {
    title: "QuickFlow — Wholesale Distribution Software Case Study",
    description: "A wholesale distributor was paying for software that fought them. Excel scripts first, then a product built around how the business actually runs.",
    image: "https://barskydesign.pro/images/business-management/v2/overview.webp",
    published: "2026-08-30",
    modified: "2026-08-30"
  },
  "dae-search": {
    title: "Enterprise Data Search — UX Case Study",
    description: "Enterprise search redesigned around the inconvenient truth that finding the data is only half the job — knowing whether to trust it is the rest.",
    image: "https://barskydesign.pro/images/og/dae-search.png",
    published: "2026-05-20",
    modified: "2026-08-29"
  },
  "fire-lion": {
    title: "Fire Lion — AI-Built Game Design Case Study",
    description: "A shipped mobile web game built solo with AI as co-builder — three modes, hand-tuned game feel, and a deletion list longer than the feature list.",
    image: "https://barskydesign.pro/images/og/fire-lion.png",
    published: "2026-05-19",
    modified: "2026-08-29"
  },
  "recast": {
    title: "Recast — Cross-Platform Screen Recorder Case Study",
    description: "Record once, send a link. Native Mac and Android capture with a web library — including the browser recorder I built, then deleted.",
    image: "https://barskydesign.pro/images/og/recast.png",
    published: "2026-08-25",
    modified: "2026-08-29"
  },
  "bz-essentials": {
    title: "BZ Essentials — Enterprise Knowledge Portal Case Study",
    description: "An internal knowledge portal built from a client PRD, where region is a lens over the whole app instead of a filter nobody opens.",
    image: "https://barskydesign.pro/images/og/bz-essentials.png",
    published: "2026-08-27",
    modified: "2026-08-29"
  },
  "ring-rival": {
    title: "Ring-Rival — AI Boxing Game Case Study",
    description: "A shipped boxing game: distinct AI opponents, generated trash talk, hand-tuned feel. Time-to-first-punch cut from 22 seconds to 6 by deleting four screens.",
    image: "https://barskydesign.pro/images/og/ring-rival.png",
    published: "2026-05-19",
    modified: "2026-08-29"
  },
  "catchbuddy": {
    title: "CatchBuddy — Safe Sports Matching Case Study",
    description: "Same-day pickup sports built solo with AI — phone verification, a panic button, and curated meeting spots designed in from day one, not bolted on.",
    image: "https://barskydesign.pro/images/og/catchbuddy.png",
    published: "2026-05-19",
    modified: "2026-08-29"
  },
  "email-creation-ai": {
    title: "ManuscriptRx — Pharma Email AI Case Study",
    description: "A concept for AI-assisted pharma HCP email production, designed around the approval gates — AI handles the work between humans, not the decisions.",
    image: "https://barskydesign.pro/images/og/email-creation-ai.png",
    published: "2026-05-20",
    modified: "2026-08-29"
  }
};

// Blog post OG-image overrides. Only list a slug here if it has a real, dedicated
// social-share image on disk that's reachable as a plain public URL — anything else
// falls through to the post's own coverImage (see getBlogSEO below). Kept as plain
// URL strings rather than importing blogData.ts's bundled asset imports directly,
// because this file is also read by scripts/inject-seo-html.ts under plain tsx
// (no Vite asset-loader), which can't resolve `@/assets/*.jpg` imports.
export const BLOG_IMAGE_MAP: Record<string, string> = {
  "a-filter-nobody-opens": "https://barskydesign.pro/images/og/blog-a-filter-nobody-opens.png",
  "the-work-is-deleting-not-generating": "https://barskydesign.pro/images/og/blog-the-work-is-deleting-not-generating.png",
  "when-trust-is-the-product": "https://barskydesign.pro/images/og/blog-when-trust-is-the-product.png",
  "if-you-make-people-do-math": "https://barskydesign.pro/images/og/blog-if-you-make-people-do-math.png",
  "finding-the-data-is-half-the-job": "https://barskydesign.pro/images/og/blog-finding-the-data-is-half-the-job.png",
  "verification-is-a-door-not-a-sticker": "https://barskydesign.pro/images/og/blog-verification-is-a-door-not-a-sticker.png",
  "you-dont-replace-excel-by-being-better": "https://barskydesign.pro/images/og/blog-you-dont-replace-excel-by-being-better.png",
  "beginner-or-pro-is-a-false-choice": "https://barskydesign.pro/images/og/blog-beginner-or-pro-is-a-false-choice.png",
  "a-to-do-app-doesnt-prove-anything": "https://barskydesign.pro/images/og/blog-a-to-do-app-doesnt-prove-anything.png",
  "design-for-the-approval-gates": "https://barskydesign.pro/images/og/blog-design-for-the-approval-gates.png",
  "i-just-wanted-to-send-someone-a-video": "https://barskydesign.pro/images/og/blog-i-just-wanted-to-send-someone-a-video.png",
  "demo-works-shipping-is-different": "https://barskydesign.pro/images/og/blog-demo-works-shipping-is-different.png",
  "designer-who-codes-argument-is-over": "https://barskydesign.pro/images/og/blog-designer-who-codes-argument-is-over.png",
  "designing-for-trust-when-the-product-is-the-risk": "https://barskydesign.pro/images/og/blog-designing-for-trust-when-the-product-is-the-risk.png",
  "everyones-portfolio-looks-good-now": "https://barskydesign.pro/images/og/blog-everyones-portfolio-looks-good-now.png",
  "how-to-interview-a-designer-now": "https://barskydesign.pro/images/og/blog-how-to-interview-a-designer-now.png",
  "scope-discipline-when-building-is-cheap": "https://barskydesign.pro/images/og/blog-scope-discipline-when-building-is-cheap.png",
  "shipping-got-cheap-hiring-got-harder": "https://barskydesign.pro/images/og/blog-shipping-got-cheap-hiring-got-harder.png",
  "taste-is-the-whole-job": "https://barskydesign.pro/images/og/blog-taste-is-the-whole-job.png",
  "two-bugs-ai-wrote-that-i-had-to-find": "https://barskydesign.pro/images/og/blog-two-bugs-ai-wrote-that-i-had-to-find.png",
  "what-ai-changed-and-what-it-didnt": "https://barskydesign.pro/images/og/blog-what-ai-changed-and-what-it-didnt.png",
  "what-one-person-can-ship-now": "https://barskydesign.pro/images/og/blog-what-one-person-can-ship-now.png",
  "why-enterprise-tools-lose-to-excel": "https://barskydesign.pro/images/og/blog-why-enterprise-tools-lose-to-excel.png",
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
  "a-filter-nobody-opens": {
    title: "A Filter Nobody Opens Isn't a Feature",
    description: "Some content is global, some regional. Put that in a filter menu and the person who most needs it never sees it, because they arrived from a link.",
    published: "2026-08-27"
  },
  "the-work-is-deleting-not-generating": {
    title: "The Work Is Deleting, Not Generating",
    description: "AI made producing screens almost free. That moved the bottleneck from making things to deciding which ones to throw away \u2014 and no model will do that part\u2026",
    published: "2026-08-25"
  },
  "when-trust-is-the-product": {
    title: "When Trust Is the Product, It Can't Be a Feature",
    description: "Getting two strangers to agree to meet at a park is easy. Getting them to feel fine about it's the entire product \u2014 and it's not something you bolt on\u2026",
    published: "2026-08-25"
  },
  "if-you-make-people-do-math": {
    title: "If You Make People Do Maths, They Guess or They Leave",
    description: "A price of 67\u00a2 tells you the odds are 67%. Almost nobody works that out in their head, and the ones who try get it wrong. Do the arithmetic for them.",
    published: "2026-08-25"
  },
  "finding-the-data-is-half-the-job": {
    title: "Finding the Data Is Half the Job",
    description: "An analyst searches for revenue and gets forty results. The search worked. The next twenty minutes \u2014 deciding which table to trust \u2014 is the part nobody\u2026",
    published: "2026-08-25"
  },
  "verification-is-a-door-not-a-sticker": {
    title: "Verification Is a Door, Not a Sticker",
    description: "Most directories let anyone list, then put a badge on whoever checked out. Flipping that \u2014 nobody is visible until they're verified \u2014 gives you a smaller\u2026",
    published: "2026-08-25"
  },
  "you-dont-replace-excel-by-being-better": {
    title: "You Don't Replace Excel by Being Better Than Excel",
    description: "A bank was running multi-million-dollar loan deals in spreadsheets. The software that replaces that has to lose to Excel on flexibility and win on the\u2026",
    published: "2026-08-25"
  },
  "beginner-or-pro-is-a-false-choice": {
    title: "Beginner or Pro Is a False Choice, and Both Sides Pay for It",
    description: "Easy apps hide complexity and charge for it. Pro apps expose everything and assume confidence you may not have. The split is a business decision dressed\u2026",
    published: "2026-08-25"
  },
  "a-to-do-app-doesnt-prove-anything": {
    title: "A To-Do App Doesn't Prove Anything",
    description: "Most “I built this with AI” portfolios pick something safe. Safe projects hide the only question worth answering: can you ship something that\u2026",
    published: "2026-08-25"
  },
  "design-for-the-approval-gates": {
    title: "In Regulated Work, Design for the Gates \u2014 Not the AI",
    description: "A pharma email takes two weeks and touches five teams in five tools. The AI's job is the work between the humans, not the work the humans are legally\u2026",
    published: "2026-08-25"
  },
  "i-just-wanted-to-send-someone-a-video": {
    title: "I Just Wanted to Send Someone a Video",
    description: "Recording your screen is free. Sending it is what everyone charges for — watermarks, five-minute caps, a sign-in wall for your viewer.",
    published: "2026-08-25"
  },
  "demo-works-shipping-is-different": {
    title: "The Demo Works. Shipping Is a Different Job.",
    description: "A demo is the happy path with data you chose. The hard parts live where nobody demos: dates, permissions, empty screens, and jobs that run while you sleep.",
    published: "2026-08-10T09:00:00Z",
    modified: "2026-08-10T09:00:00Z"
  },
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
    image: project.image,
    // `published` / `modified` are the names buildSEO maps to publishedTime /
    // modifiedTime. Returning the *Time names directly skips that mapping and
    // the dates never reach the schema.
    ...(project.published && { published: project.published }),
    ...(project.modified && { modified: project.modified })
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
