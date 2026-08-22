// Homepage / services FAQ copy.
//
// These render visibly (LazySeoFaqSection on the homepage) AND are the format
// an answer engine is most likely to quote back verbatim, so every claim here
// has to be one Hiram could defend on a call.
//
// The previous version promised "conversion rates by 40%+", "47+ successful
// projects", "60% faster design cycles" and "24-hour response times" — numbers
// that trace to nothing in this codebase. The 2026-07-15 honesty pass cleaned
// the FAQ *schema* in structuredDataUtils.ts but never reached this file, which
// is what actually feeds the visible section. Rewritten to match.

export const seoFaqs = [
  {
    question: "What do you actually do?",
    answer: "I design and develop software: SaaS products, web apps, mobile apps, and the internal tools most teams put off. Design and front-end build are the same job here, done by the same person.\n\nThat means product design, React and TypeScript on the front end, and the database and auth underneath it. What you get at the end is a working product, not a spec someone else has to interpret.",
    keywords: ["Product Design", "Software Development", "SaaS", "Internal Tools", "React Development"]
  },
  {
    question: "Can one person really design and build a whole product?",
    answer: "Yes, and there are five live right now you can open and use — Ring-Rival, Stips, HerbaLink, CatchBuddy and Fire Lion. Each one is mine end to end: design, front end, database, auth, deploy.\n\nThe honest limit is scale. I'm a good fit for a first version, a rebuild, or a team that needs design and front end moving together. I'm not a substitute for an engineering department.",
    keywords: ["Solo Development", "MVP", "End-to-End Product", "Live Products"]
  },
  {
    question: "What does AI-assisted design actually mean day to day?",
    answer: "AI makes the raw material cheap — screens, variations, working code. That moves the bottleneck from making things to judging them, and the judgement is the job.\n\nA concrete example: on Ring-Rival it meant cutting time-to-first-punch from 22 seconds to 6, by deleting the splash screen, mode select, fighter select and tutorial. No model tells you which four things to delete.",
    keywords: ["AI-Assisted Design", "Design Judgement", "Scope Discipline", "Rapid Iteration"]
  },
  {
    question: "Do you work with startups or established companies?",
    answer: "Both, but the work looks different. With startups it's usually a first version: decide what the product is, design it, build it, get it in front of people.\n\nWith established companies it's more often an internal tool, a rebuild of something that outgrew its original design, or a design system that needs to hold up across teams. Most of my 15+ years has been the second kind, in regulated software.",
    keywords: ["Startup Design", "Enterprise UX", "MVP Development", "Design Systems"]
  },
  {
    question: "How do you work, and how long does it take?",
    answer: "Timeline depends entirely on scope, so I'd rather scope it with you than quote a number here. What's consistent is the shape: understand the problem, design it, build it in the open, and put something usable in front of you early rather than at the end.\n\nBecause I build what I design, there's no handoff round-trip. Decisions get tested in a real browser on a real phone instead of surviving a translation layer.",
    keywords: ["Design Process", "Project Scope", "Iterative Delivery"]
  },
  {
    question: "How do you handle accessibility?",
    answer: "I build to WCAG 2.1 AA and treat it as a constraint from the start, not a pass at the end. That means keyboard paths, focus states, contrast and screen-reader semantics designed in rather than retrofitted.\n\nMost of my career has been in banking, healthcare and pharma, where accessibility conformance and audit review are requirements, not aspirations. That's where the habit comes from.",
    keywords: ["WCAG 2.1 AA", "Accessibility", "Inclusive Design", "Regulated Software"]
  },
  {
    question: "What technologies do you work with?",
    answer: "Front end: React, TypeScript, Vite and Next.js, with Tailwind for styling.\n\nBackend and infrastructure: Supabase and Postgres, Cloudflare Workers and D1, with deploys on Netlify or Vercel. Mobile work is React Native via Expo.\n\nDesign happens in Figma, and I use Claude and other models throughout for generation and review. The point of the stack is that one person can carry a product from design to production with it.",
    keywords: ["React", "TypeScript", "Supabase", "React Native", "Full-Stack Development"]
  },
  {
    question: "What does it cost?",
    answer: "It depends on scope, so I quote per project rather than publishing a rate card. I'll take a call, understand what you're building, and send a proposal with the scope and price written down.\n\nThe call is free and there's no pitch deck. If I'm not the right fit for what you need, I'll say so on that call rather than after you've paid for it.",
    keywords: ["Pricing", "Project Quotes", "Consultation"]
  }
];

// Export the main FAQ array as homepageFaqs for backward compatibility
export const homepageFaqs = seoFaqs;

// Export project-specific FAQs
export const projectFaqs = [
  {
    question: "What kinds of projects are in this portfolio?",
    answer: "A mix: consumer apps, prediction markets, a healthcare booking platform, enterprise search, fintech loan origination, and a couple of games. Some are client and employer work from 15+ years in regulated industries; five are products I designed, built and shipped myself.\n\nThey're here for the thinking, not as trophies. Each one covers the problem, the decisions, the trade-offs, and what got cut.",
    keywords: ["Portfolio", "Case Studies", "Cross-Industry Experience"]
  },
  {
    question: "How are these case studies written?",
    answer: "Problem first, then the decisions and what they cost. Where a project has real numbers I use them; where it doesn't, I say so plainly rather than inventing a percentage.\n\nHerbaLink is the clearest example: the product is built and works, and the directory is empty because no herbalists have signed up. That's in the case study, because it's true and because how someone handles that question tells you more than a chart would.",
    keywords: ["Case Studies", "Design Process", "Honest Documentation"]
  },
  {
    question: "Can you do something similar for us?",
    answer: "Probably — the methods carry across contexts even when the domain is new. The pattern in most of this work is the same: a product that needs designing and building at the same time, by someone who can do both.\n\nTell me what you're working on and I'll tell you honestly whether I'm the right person for it.",
    keywords: ["Custom Projects", "Design and Development", "Availability"]
  }
];

// Export services-specific FAQs
export const servicesFaqs = [
  {
    question: "What is included in the design work?",
    answer: "User research where there are users to talk to, information architecture, user flows, wireframes, interactive prototypes, and the visual design and design system that keeps it consistent as it grows.\n\nBecause I build the front end too, the deliverable isn't a spec — it's the designed thing, running.",
    keywords: ["UX Design", "User Research", "Prototyping", "Design Systems"]
  },
  {
    question: "Do you do development as well, or just design?",
    answer: "Both, and that's the point. I write the front end in React and TypeScript, wire up the database and auth, and deploy it.\n\nThat closes the gap where design intent usually gets lost — the handoff. It also means I can test an idea in a real browser on a real phone instead of arguing about it in a review.",
    keywords: ["Front-End Development", "React", "TypeScript", "Full-Stack"]
  }
];
