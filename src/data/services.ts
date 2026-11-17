/**
 * The services copy, shared by the /services page and the LLM content export.
 *
 * Rewritten 2026-11-17, and the reason matters more than the wording.
 *
 * `SERVICES_DATA` is not rendered on the site — `ContentExport.tsx` is its only
 * consumer, which means its whole job is to tell answer engines what Hiram
 * sells. It listed two buckets, "Product Design" and "Gen AI Development", and
 * under the second one it advertised "Machine Learning Models" and "Intelligent
 * Automation". He does not train models or sell ML work. That is the same class
 * of problem as the invented numbers removed from seoFaqs.ts the day before:
 * an unearned capability claim, in machine-readable form, where nobody reading
 * the site would ever see it to object.
 *
 * It now mirrors the four engagements that actually exist as pages in
 * servicesDetail.ts. Their slugs are indexed URLs and are not touched.
 *
 * `SERVICES_HERO.title` was "Product Design & Gen AI Development" — the H1 on
 * the single most buyer-intent page on the site. "Gen AI Development" is the
 * retired AI-first positioning that the 2026-11-14 pass stripped from
 * og:site_name across all 66 pages and the 2026-11-16 pass took out of the
 * Person schema, the header badge and the hero. It survived here. A founder
 * whose internal tool is losing to a spreadsheet does not read "Gen AI
 * Development" and see their problem; they read it and assume they are on the
 * wrong page.
 *
 * The replacement names the things someone would actually be shopping for.
 */

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceData {
  title: string;
  description: string;
  features: string[];
}

export const SERVICES_DATA: ServiceData[] = [
  {
    title: "Prototype to Ship",
    description:
      "Design and build by the same hands — through to a production React front end, database and deploy, not a handoff file",
    features: [
      "React & TypeScript front end",
      "Rapid, clickable prototypes",
      "Database and deploy",
      "Handover you can maintain"
    ]
  },
  {
    title: "UX Strategy & Research",
    description:
      "Turn an ambiguous brief into a plan — research tied to a decision, mapped flows, and a prioritised roadmap",
    features: [
      "Research that answers a decision",
      "Journey and flow mapping",
      "Prioritised roadmap",
      "The business case"
    ]
  },
  {
    title: "AI Product Design",
    description:
      "End-to-end design for products whose core value comes from a model — including how it behaves when it is unsure or wrong",
    features: [
      "Interaction model",
      "Behavior when confident, uncertain and wrong",
      "Trust surface",
      "The interface itself"
    ]
  },
  {
    title: "Design Systems",
    description:
      "Token architecture and a component library that keeps a growing product consistent, with the governance to keep it that way",
    features: [
      "Token architecture",
      "Components in React and TypeScript",
      "Accessibility built in",
      "Governance and docs"
    ]
  }
];

export const SERVICES_CTA = {
  title: "Start with a call",
  description:
    "Tell me what you are building and what is in the way. If it is not a fit I will say so.",
  buttonText: "Get in touch"
};

export const SERVICES_HERO = {
  title: "SaaS, web apps and internal tools — designed and built by one person",
  description:
    "One person taking a product from research through interface design to a shipped React front end, database and deploy.",
  buttonText: "Start with a call"
};
