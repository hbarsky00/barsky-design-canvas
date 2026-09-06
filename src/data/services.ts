// Services data for export and DRY usage

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
  // Rewritten 2026-09-06 against the case studies rather than against an idea
  // of what sells. The previous three cards led with "AI-First Product Design"
  // and "Prompt UX & Conversational Interfaces", and demoted product design to
  // "the craft that makes AI products actually usable" — a supporting act.
  //
  // Twelve case studies say the opposite. Seven are tagged Solo Build, five
  // products are live and reachable, and four are enterprise tools that replace
  // a spreadsheet or a catalogue. Not one shows a conversational interface or
  // prompt UX. The strongest, most-evidenced thing on the site was the card
  // ranked third; the least-evidenced was the headline.
  {
    title: "Design and build, same person",
    description:
      "Why there is no handoff: I take a product from the first sketch to the thing running in production.",
    features: [
      "Product design through to the shipped front end",
      "Database, auth and API work, not only the screens",
      "Five products live and reachable right now",
      "Decisions tested in working software, not in mockups"
    ]
  },
  {
    title: "Internal tools people use all day",
    description:
      "Enterprise software where nobody chose to be there, and the spreadsheet is the incumbent you have to beat.",
    features: [
      "Workflow design that starts from the work already being done",
      "Replacing spreadsheets as the system of record",
      "Search, catalogues and information architecture",
      "Permissions, roles and approval gates"
    ]
  },
  {
    title: "AI where it earns its place",
    description:
      "Used where it changes what the product can do, and left out where it would only be a wrapper.",
    features: [
      "Semantic search over metadata instead of keyword match",
      "Scheduled generation pipelines, with the output validated",
      "AI-assisted delivery — how one person ships this much",
      "A clear line on where a model does not belong"
    ]
  }
];

export interface ServicePackage {
  title: string;
  price: string;
  description: string;
  timeline: string;
  features: string[];
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    title: "MVP Validation",
    price: "$8,500",
    description: "For funded startups that need to move fast and validate smart.",
    timeline: "3 weeks to launch-ready design",
    features: [
      "A read on the incumbent you actually have to beat, spreadsheet included",
      "Time with the people who will use it, not personas invented for a deck",
      "Wireframes for the flows that carry the risk",
      "High-fidelity UI on a design system, not a folder of screens",
      "A prototype you can put in front of someone",
      "30 days of support after launch"
    ]
  },
  {
    title: "AI-First Redesign",
    price: "$18,500",
    description: "For companies ready to rebuild their product around AI — not just bolt it on.",
    timeline: "12 weeks",
    features: [
      "Research that changes the build, not a report that gets filed",
      "An AI interaction model, and a clear line on where a model does not belong",
      "Model API work designed against the failure states, not the happy path",
      "A responsive design system that survives contact with code",
      "The front end built by me \u2014 there is no handoff",
      "90 days of tuning after it ships"
    ]
  }
];

export const SERVICES_CTA = {
  title: "Want it designed and shipped?",
  description: "Tell me what you're building and we'll scope it properly on a call.",
  buttonText: "Schedule a Call"
};

// Kept in step with the live hero on /services, which already said the honest
// thing while this block still said "AI-First Designer". It feeds the content
// export, so a stale positioning line here gets pasted somewhere else later.
export const SERVICES_HERO = {
  title: "I design and develop the whole product",
  description: "Design, front end, database and auth, shipped by one person. Hiram Barsky · product designer and developer.",
  buttonText: "Work With Me"
};
