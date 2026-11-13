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
    image: 'https://barskydesign.pro/images/og/page-projects.png'
  },
  // The four long-form service pages carried over from barsky.design. Titles
  // and descriptions are each service's own metaTitle/metaDescription.
  '/services/ai-product-design': {
    kind: 'page',
    title: 'AI Product Design | Barsky Design',
    description: 'End-to-end design for AI-first products: the interaction model, the interface, and how the AI behaves when it’s confident, uncertain, or wrong.'
  },
  '/services/design-systems': {
    kind: 'page',
    title: 'Design Systems | Barsky Design',
    description: 'Design systems that survive contact with a real codebase: token architecture, component libraries built in React and TypeScript, and governance that holds.'
  },
  '/services/ux-strategy-research': {
    kind: 'page',
    title: 'UX Strategy & Research | Barsky Design',
    description: 'Research and strategy that ends in a decision, not a deck: user research, journey mapping, and a roadmap tied to numbers a finance team will accept.'
  },
  '/services/prototype-to-ship': {
    kind: 'page',
    title: 'Prototype to Ship | Barsky Design',
    description: 'Design that ends in deployed software. We build the real product in React and TypeScript, so an engagement finishes with working code instead of a handoff file.'
  },
  '/services': {
    kind: 'page',
    title: 'UX/UI Design Services | Barsky Design',
    description: 'From user research to high-impact product design, I help teams turn complex ideas into simple, intuitive experiences that drive business results.',
    image: 'https://barskydesign.pro/images/og/page-services.png'
  },
  '/contact': {
    kind: 'page',
    title: 'Contact Barsky Design — Product Design & UX Consulting',
    description: 'Ready to transform your product? Book a call to discuss your vision, UX challenges, or collaboration opportunities in Clifton, NJ and beyond.',
    image: 'https://barskydesign.pro/images/og/page-contact.png'
  },
  '/blog': {
    kind: 'page',
    title: 'UX Design Blog — Product Design Insights | Barsky Design',
    description: 'Expert insights on UX design, AI integration, design systems, and product strategy — practical lessons from 15+ years in the field.',
    image: 'https://barskydesign.pro/images/og/page-blog.png'
  },
  '/about': {
    kind: 'page',
    title: 'About Hiram Barsky — 15+ Years Product Design',
    description: 'Senior UX/Product Designer with 15+ years creating data-driven, AI-powered platforms. Based in Clifton, NJ, serving clients nationwide.',
    image: 'https://barskydesign.pro/images/og/page-about.png'
  },
  '/store': {
    kind: 'page',
    title: 'Design Resources & Templates — Barsky Design',
    description: 'Professional design resources, wireframe kits, and UX templates to accelerate your product development. Digital downloads available instantly.',
    image: 'https://barskydesign.pro/images/og/page-store.png'
  },
  '/design-services/ux-ui-design': {
    kind: 'page',
    title: 'UX/UI Design Services — User-Centered Product Design',
    description: 'Transform your product with expert UX/UI design. From user research to high-fidelity prototypes, I create intuitive experiences that drive results.',
    image: 'https://barskydesign.pro/images/og/service-ux-ui-design.png'
  },
  '/design-services/mobile-app-design': {
    kind: 'page',
    title: 'Mobile App Design — iOS & Android UX/UI | Barsky Design',
    description: 'Native and cross-platform mobile app design for iOS and Android. User-centered design that increases engagement and app store ratings.',
    image: 'https://barskydesign.pro/images/og/service-mobile-app-design.png'
  },
  '/design-services/web-development': {
    kind: 'page',
    title: 'Web Development — React & Frontend | Barsky Design',
    description: 'Custom web development with React, TypeScript, and modern frameworks. Fast, responsive, and accessible web applications that scale.',
    image: 'https://barskydesign.pro/images/og/service-web-development.png'
  }
};

// Project-specific SEO mappings
export const PROJECT_SEO_MAP: Record<string, { title: string; description: string; image: string; }> = {
  "crypto": {
    title: "Crypto Trading Platform | Fintech UX Case Study — Barsky Design",
    description: "How I eliminated the fear that makes 60% of beginners quit before their first trade through trust-building UX design.",
    image: "https://barskydesign.pro/images/og/crypto.png"
  },
  "herbalink": {
    title: "HerbaLink Healthcare Marketplace | UX Case Study — Barsky Design",
    description: "Herbalist marketplace built around credential verification, safety information and guided matching, so people can tell who is qualified before they book.",
    image: "https://barskydesign.pro/images/og/herbalink.png"
  },
  "splittime": {
    title: "SplitTime Co-Parenting App | Mobile UX Case Study — Barsky Design",
    description: "Designing a co-parenting platform that reduces family conflict through intuitive scheduling, transparent expense tracking, and secure messaging between divorced parents.",
    image: "https://barskydesign.pro/images/og/splittime.png"
  },
  "business-management": {
    title: "Enterprise Operations Platform | B2B UX Case Study — Barsky Design",
    description: "Modular business management platform that reduced manual work 60% by centralizing inventory, workflows, and analytics with actionable insights across teams.",
    image: "https://barskydesign.pro/images/og/business-management.png"
  },
  "investor-loan-app": {
    title: "Fintech Loan Platform | Investment App UX Case Study — Barsky Design",
    description: "Streamlined fintech underwriting that cut loan processing time 40% while improving compliance, decision clarity, and borrower experience through better UX.",
    image: "https://barskydesign.pro/images/og/investor-loan-app.png"
  },
  catchbuddy: {
    title: "CatchBuddy: Trust in a Pickup Sports App | Case Study",
    description:
      "The easy part is getting two strangers to meet in a park; the hard part is getting them to feel safe. How that shaped every screen of a pickup-sports app.",
    image: "https://barskydesign.pro/images/og/catchbuddy.png"
  },
  "dae-search": {
    title: "Enterprise Data Discovery | Search UX Case Study — Barsky Design",
    description: "Advanced search platform with faceted filters and relevance tuning that helps data analysts find trustworthy assets 3x faster across enterprise sources.",
    image: "https://barskydesign.pro/images/og/dae-search.png"
  },
  "email-creation-ai": {
    title: "AI Email Workflow for Pharma | MLR Review UX Case Study",
    description:
      "A six-step AI-assisted workflow for pharma HCP email, designed around Medical Writer, Content Ops, Brand and MLR approval gates rather than the writing itself.",
    image: "https://barskydesign.pro/images/og/email-creation-ai.png"
  },
};

// Blog post image mappings with enhanced SEO-optimized data
export const BLOG_IMAGE_MAP: Record<string, string> = {
// Every entry here used to point at /images/blog-*.jpg. None of those files
// exist, so ten posts shipped an og:image that 404s. These are the generated
// 1200x630 cards from scripts/generate-og-images.py, which is also what the
// hardcoded og:image:width/height in inject-seo-html.ts actually describes.
  "finding-first-ux-job-guide": "https://barskydesign.pro/images/og/blog-finding-first-ux-job-guide.png",
  "design-systems-that-get-used": "https://barskydesign.pro/images/og/blog-design-systems-that-get-used.png",
  "ai-enhanced-ux-designer-future": "https://barskydesign.pro/images/og/blog-ai-enhanced-ux-designer-future.png",
  "user-research-shoestring-budget": "https://barskydesign.pro/images/og/blog-user-research-shoestring-budget.png",
  "built-product-without-real-data": "https://barskydesign.pro/images/og/blog-built-product-without-real-data.png",
  "building-products-nobody-asked-for": "https://barskydesign.pro/images/og/blog-building-products-nobody-asked-for.png",
  "wireframes-to-wow-visual-hierarchy": "https://barskydesign.pro/images/og/blog-wireframes-to-wow-visual-hierarchy.png",
  "case-study-writing": "https://barskydesign.pro/images/og/blog-case-study-writing.png",
  "beautiful-interface-doesnt-convert": "https://barskydesign.pro/images/og/blog-beautiful-interface-doesnt-convert.png",
  "research-without-users": "https://barskydesign.pro/images/og/blog-research-without-users.png",

  // Added 2026-11-12. These posts already had a correct 1200x630 card sitting
  // unused in public/images/og/ — nothing pointed at it, so og:image fell back
  // to the raw cover art. Those covers are 3:2 or 16:9 (one is 1400x1008), and
  // social platforms crop to roughly 1.91:1, so a LinkedIn share centre-cropped
  // the artwork into whatever happened to be in the middle. No new art needed;
  // this is only the mapping that was missing.
  "demo-works-shipping-is-different": "https://barskydesign.pro/images/og/blog-demo-works-shipping-is-different.png",
  "designer-who-codes-argument-is-over": "https://barskydesign.pro/images/og/blog-designer-who-codes-argument-is-over.png",
  "designing-for-trust-when-the-product-is-the-risk": "https://barskydesign.pro/images/og/blog-designing-for-trust-when-the-product-is-the-risk.png",
  "everyones-portfolio-looks-good-now": "https://barskydesign.pro/images/og/blog-everyones-portfolio-looks-good-now.png",
  "how-to-interview-a-designer-now": "https://barskydesign.pro/images/og/blog-how-to-interview-a-designer-now.png",
  "i-just-wanted-to-send-someone-a-video": "https://barskydesign.pro/images/og/blog-i-just-wanted-to-send-someone-a-video.png",
  "scope-discipline-when-building-is-cheap": "https://barskydesign.pro/images/og/blog-scope-discipline-when-building-is-cheap.png",
  "shipping-got-cheap-hiring-got-harder": "https://barskydesign.pro/images/og/blog-shipping-got-cheap-hiring-got-harder.png",
  "taste-is-the-whole-job": "https://barskydesign.pro/images/og/blog-taste-is-the-whole-job.png",
  "two-bugs-ai-wrote-that-i-had-to-find": "https://barskydesign.pro/images/og/blog-two-bugs-ai-wrote-that-i-had-to-find.png",
  "what-ai-changed-and-what-it-didnt": "https://barskydesign.pro/images/og/blog-what-ai-changed-and-what-it-didnt.png",
  "what-one-person-can-ship-now": "https://barskydesign.pro/images/og/blog-what-one-person-can-ship-now.png",
  "why-enterprise-tools-lose-to-excel": "https://barskydesign.pro/images/og/blog-why-enterprise-tools-lose-to-excel.png",

  // These eight had no card at all, so og:image fell back to a 3:2 hero.
  // Generated 2026-11-12 by scripts/generate-og-images.py.
  "ai-ate-the-junior-job": "https://barskydesign.pro/images/og/blog-ai-ate-the-junior-job.png",
  "designers-shipping-ai-code": "https://barskydesign.pro/images/og/blog-designers-shipping-ai-code.png",
  "designing-ai-first-products-that-ship": "https://barskydesign.pro/images/og/blog-designing-ai-first-products-that-ship.png",
  "portfolio-proof-not-pictures": "https://barskydesign.pro/images/og/blog-portfolio-proof-not-pictures.png",
  "solo-building-with-ai": "https://barskydesign.pro/images/og/blog-solo-building-with-ai.png",
  "the-business-case-for-design": "https://barskydesign.pro/images/og/blog-the-business-case-for-design.png",
  "trust-is-a-design-material": "https://barskydesign.pro/images/og/blog-trust-is-a-design-material.png",
  "what-is-an-ai-first-product-designer": "https://barskydesign.pro/images/og/blog-what-is-an-ai-first-product-designer.png"
};

// Enhanced blog post SEO data
export const BLOG_SEO_MAP: Record<string, { title: string; description: string; published?: string; modified?: string; }> = {
  // Carried over from barsky.design. Each post shipped its own short SERP
  // title/description there because the excerpts run long (one is 294
  // characters); without these the excerpt gets cut mid-sentence.
  "ai-ate-the-junior-job": {
    title: "AI ate the entry-level job",
    description: "AI didn\u2019t kill junior designers and developers. It killed the boring tasks that used to teach them the job \u2014 and that gap shows up years later.",
    published: "2026-08-07"
  },
  "what-is-an-ai-first-product-designer": {
    title: "What is an AI-first product designer?",
    description: "An AI-first product designer owns the whole experience of a product whose core value comes from AI \u2014 including how the model behaves when it\u2019s wrong.",
    published: "2026-07-18"
  },
  "portfolio-proof-not-pictures": {
    title: "Build a portfolio for robots and humans",
    description: "By 2026 most portfolios are parsed by an AI screener before a person opens them, and the human bar moved from pretty mockups to proof you can ship.",
    published: "2026-07-11"
  },
  "designers-shipping-ai-code": {
    title: "Half of designers now ship AI code. Good.",
    description: "The State of AI in Design 2026 report says the designer-who-ships is now the norm. What separates shipped from slop is the taste layer.",
    published: "2026-07-08"
  },
  "designing-ai-first-products-that-ship": {
    title: "Designing AI-first products that ship",
    description: "Most AI features stall in the demo phase. Here\u2019s the design discipline that gets them into people\u2019s hands.",
    published: "2026-06-18"
  },
  "trust-is-a-design-material": {
    title: "Trust is a design material",
    description: "Products don\u2019t fail because they\u2019re wrong. They fail because nobody can defend acting on them. Trust is a material you design with, not a feeling.",
    published: "2026-05-02"
  },
  "solo-building-with-ai": {
    title: "Ship something small: the fastest way to grow",
    description: "The fastest way to grow as a designer or developer right now is to ship one small thing end to end \u2014 and AI just removed every excuse.",
    published: "2026-03-11"
  },
  "the-business-case-for-design": {
    title: "Making the business case for design",
    description: "Leaders approve what they can measure. How to put a defensible number on design work.",
    published: "2026-01-27"
  },

  // SERP title only — the post keeps its full headline on the page. With the
  // brand suffix dropped it still ran 64 chars; this is the same title minus
  // the trailing "and Uncertainty".
  "designing-trust-into-ai": {
    title: "Designing Trust into AI: Handling Hallucinations",
    description:
      "What to show a user when the model is not sure, and how to design the moment an AI gets something wrong.",
  },
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
    title: "The Take-Home Test Stopped Proving Anything | Design Hiring in 2026 — Barsky Design",
    description: "Every candidate now submits work a model helped produce, so the artefact tells you almost nothing. What a design hiring process has to measure instead, and what that means if you are applying.",
    published: "2026-11-10",
    modified: "2026-11-10"
  },
  "design-systems-that-get-used": {
    title: "Design Systems Now Have Two Readers, One Is a Model — Barsky Design",
    description: "Component libraries used to be written for the developer who opened the docs. Now a model reads them at volume and generates code against whatever it inferred. What that changes about good documentation.",
    published: "2026-11-03",
    modified: "2026-11-03"
  },
  "portfolio-red-flags-no-interviews": {
    title: "UX Portfolio Red Flags | Why You're Not Getting Interviews — Barsky Design",
    description: "Common UX portfolio mistakes that kill your chances. Learn what hiring managers look for and how to showcase your UX process effectively."
  },
  "ai-enhanced-ux-designer-future": {
    title: "What I Actually Use AI For, Hour by Hour | Designer's Inventory — Barsky Design",
    description: "An honest inventory rather than a prediction: where a model genuinely saves hours in design and front-end work, where it quietly costs more than it saves, and the line between the two.",
    published: "2026-10-20",
    modified: "2026-10-20"
  },
  "user-research-shoestring-budget": {
    title: "User Research With No Budget | And the Shortcut to Avoid — Barsky Design",
    description: "You can afford real research. What you cannot afford is the convincing substitute. How to run five useful conversations for nothing, and where a model legitimately helps.",
    published: "2026-10-13",
    modified: "2026-10-13"
  },
  "built-product-without-real-data": {
    title: "Shipping an AI Feature Before You Have the Data | Cold Start — Barsky Design",
    description: "Every model-backed feature has a cold start. Designing the first week — when the system knows nothing about anyone — decides whether there is a second week.",
    published: "2026-09-29",
    modified: "2026-09-29"
  },
  "building-products-nobody-asked-for": {
    title: "Five Products Nobody Asked For | What Side Projects Teach — Barsky Design",
    description: "Five live products no client commissioned, and the honest accounting: what building them taught about shipping and finishing, and what it taught about demand (nothing).",
    published: "2026-09-22",
    modified: "2026-09-22"
  },
  "wireframes-to-wow-visual-hierarchy": {
    title: "Generated Layouts All Have the Same Problem | Visual Hierarchy — Barsky Design",
    description: "Ask for a page and you get something clean, balanced and completely flat. Why hierarchy is the judgement that does not come in the box, and the edit that fixes most of it.",
    published: "2026-10-06",
    modified: "2026-10-06"
  },
  "case-study-writing": {
    title: "A Case Study Is a Record of Decisions | How to Write One — Barsky Design",
    description: "Most portfolio case studies describe a process and never say what was at stake. The structure that forces out the decisions, the constraint and the trade — the parts a reader is actually testing for.",
    published: "2026-10-27",
    modified: "2026-10-27"
  },
  "ai-in-design": {
    title: "Future of AI in Design | Designer's Perspective 2025 — Barsky Design",
    description: "How AI is transforming design work. Practical insights on tools, ethics, and career implications for UX and product designers."
  },
  "beautiful-interface-doesnt-convert": {
    title: "The Interface Is Rarely Why They Didn't Convert — Barsky Design",
    description: "When everything looks professional, a redesign stops being the lever. The reasons people leave have mostly moved to the copy, the pricing and the next step.",
    published: "2026-09-15",
    modified: "2026-09-15"
  },
  "research-without-users": {
    title: "Synthetic Users Will Agree With You | AI and Research — Barsky Design",
    description: "You can generate a persona and interview it. The one thing it will almost never do is tell you that you are wrong. Where synthetic research legitimately helps, and where it is a trap.",
    published: "2026-09-08",
    modified: "2026-09-08"
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