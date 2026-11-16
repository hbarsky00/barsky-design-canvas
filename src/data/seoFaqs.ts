/**
 * Homepage and site FAQ — also the source of the FAQPage structured data, which
 * is what answer engines quote. Every claim here has to trace to something real.
 *
 * REWRITTEN 2026-11-16. The previous version was pre-honesty-pass content that
 * survived the 2026-07-15 cleanup (which fixed the case studies and the FAQ
 * *schema* but never touched this file) and was still live on
 * https://barskydesign.pro/ today. It published, in machine-readable form, all
 * three of the facts that are permanently FLAGGED and must never be filled in:
 *
 *   - "Hourly Rate: $150-250/hour"        → Hiram's rate is not public. Removed,
 *                                           and NOT replaced with another number.
 *   - "47+ successful projects"            → an invented count.
 *   - "improve conversion rates by 40%+"   → an invented metric, twice, once as
 *                                           "averaging 40%+ increase".
 *   - "I'm WCAG 2.1 AA certified"          → he holds no such certification. The
 *                                           approved wording is that he BUILDS
 *                                           to WCAG 2.1 AA — a practice.
 *
 * Also removed: "60% faster design cycles" and "accelerate the traditional
 * design process by 60%" (invented), "24-hour response times" (an unverifiable
 * service promise), and "Most clients find significant ROI" (unverifiable).
 *
 * Positioning was realigned at the same time. The old answers sold an
 * "AI-enhanced UX" practice; the settled positioning is that he designs and
 * develops SaaS, web apps, mobile apps and internal tools, one person, end to
 * end. Answers are now written for someone who owns a product and is deciding
 * whether to hire — not for another designer.
 *
 * What remains is checkable: 15+ years, the industries, the real stack, and the
 * five products that are actually live.
 *
 * Two further exports, `projectFaqs` and `servicesFaqs`, were deleted in the
 * same pass. Checked first: nothing in `src/` imported either of them, so they
 * rendered nowhere and emitted no schema. They carried the same invented
 * material ("measurable business impact", "improved conversion rates") and
 * would have been a live liability the moment somebody wired them up. They are
 * recoverable from git history if a real need appears.
 *
 * DO NOT add a number to this file unless it traces to something in this repo
 * or to a live product. An answer engine will quote it verbatim.
 */

export const seoFaqs = [
  {
    question: "What do you actually do?",
    answer:
      "I design and develop SaaS, web apps, mobile apps and internal tools — one person, from product design through the React front end, the database and launch. 15+ years across fintech, healthcare and pharma.\n\nIn practice that means you are not handing a Figma file to a separate engineering team and hoping it survives the trip. The person who decided how it should work is the person who builds it.",
    keywords: ["Product Design", "Front-End Development", "SaaS Design", "Internal Tools", "React Development"]
  },
  {
    question: "Can you show me something you've actually shipped?",
    answer:
      "Five products are live and you can use them right now: HerbaLink (herbalink.live), a booking marketplace for certified herbalists; CatchBuddy (catchbuddy.fit), pickup sports; Stips (stips.bet), play-money prediction markets; Ring Rival (ringrival.today); and Fire Lion (firelion.me).\n\nEach one is design, front end, database and deployment by one person. That is the whole claim, and it is checkable in a browser rather than in a slide.",
    keywords: ["Shipped Products", "Portfolio", "Live Products", "Case Studies"]
  },
  {
    question: "Do you work with startups or established companies?",
    answer:
      "Both, and the work is genuinely different.\n\nFor a founder, the useful thing is usually getting to a real, usable first version without assembling a team — design decisions and shipped code from the same person. For an established company, it is more often an existing product that has drifted: an internal tool people route around, a workflow that grew by accretion, a design system nobody uses. The fintech, healthcare and pharma work has mostly been the second kind.",
    keywords: ["Startup Design", "Enterprise UX", "MVP", "Internal Tools", "Design Systems"]
  },
  {
    question: "What is your process, and how long does it take?",
    answer:
      "It depends on what you are trying to find out, so the honest answer is that the first conversation sets the shape rather than a template doing it.\n\nWhat is consistent: I want to see the real thing early — a working screen you can click, not a static comp — because that is when you learn whether the idea survives contact with actual data and actual constraints. I would rather cut scope than extend a timeline, and I will tell you which parts of a plan I think are the risky ones before we start, not after.",
    keywords: ["Design Process", "Project Timeline", "Prototyping", "Scope"]
  },
  {
    question: "How do you handle accessibility?",
    answer:
      "I build to WCAG 2.1 AA — that is a practice I work to, not a certification I hold.\n\nIt means semantic markup and real focus states rather than a contrast check at the end, keyboard paths through every flow, measured colour contrast instead of eyeballed, and testing with a screen reader. Most of it is cheaper to do while building than to retrofit, which is the actual argument for doing it early.",
    keywords: ["Accessibility", "WCAG 2.1 AA", "Inclusive Design", "Screen Reader Testing"]
  },
  {
    question: "What do you build with?",
    answer:
      "Front end: React, TypeScript, Tailwind, Vite or Next.js. Data and backend: Postgres, usually via Netlify DB or Supabase, plus serverless functions. Design: Figma. Deployment: Netlify or Vercel.\n\nI also use AI tooling heavily in my own work and write about where it helps and where it quietly costs you — but it is a tool here, not the product, and I would not recommend putting a model in your product unless it is doing something a simpler thing cannot.",
    keywords: ["React", "TypeScript", "Postgres", "Full-Stack Development", "Netlify"]
  },
  {
    question: "How do you know whether it worked?",
    answer:
      "We agree up front on what would count, and it has to be something you can actually observe — a task that gets completed instead of abandoned, a support request that stops arriving, a report somebody stops rebuilding in Excel every Monday.\n\nI am not going to quote you an average improvement figure. Numbers like that are either from somebody else's project or invented, and in either case they tell you nothing about yours.",
    keywords: ["Success Metrics", "Product Analytics", "Outcomes"]
  },
  {
    question: "How does pricing work?",
    answer:
      "Per project, scoped after we have talked, and quoted in writing before anything starts. I do not publish a rate card, because a number without a scope attached is not information — it just makes one of us wrong later.\n\nThe first call costs nothing and is the fastest way to find out whether this is worth either of our time. If I am not the right person for what you need, I will say so on that call.",
    keywords: ["Pricing", "Project Quotes", "Consultation"]
  }
];

// Export the main FAQ array as homepageFaqs for backward compatibility
export const homepageFaqs = seoFaqs;
