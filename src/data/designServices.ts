/**
 * Content for the three /design-services/* pages.
 *
 * These were 110-word stubs with no proof, no imagery and a CTA pointing at a
 * route that doesn't exist. Every claim below is tied to work that actually
 * shipped and is linked from the page, so the proof section is checkable
 * rather than decorative — same honesty bar as the case studies themselves.
 */

export interface DesignServiceCapability {
  title: string;
  description: string;
}

export interface DesignServiceProof {
  /** Case-study route on this site. */
  href: string;
  title: string;
  image: string;
  alt: string;
  /** One concrete, defensible outcome — no invented metrics. */
  result: string;
}

export interface DesignServiceContent {
  slug: string;
  eyebrow: string;
  title: string;
  lede: string;
  /** Short, plain-language framing of the problem this service solves. */
  problem: string;
  capabilities: DesignServiceCapability[];
  proof: DesignServiceProof[];
  faq: { question: string; answer: string }[];
}

export const DESIGN_SERVICES: Record<string, DesignServiceContent> = {
  "ux-ui-design": {
    slug: "ux-ui-design",
    eyebrow: "UX / UI Design",
    title: "Design for products people have to use all day",
    lede:
      "Most enterprise tools are not competing with other software — they are competing with the spreadsheet someone already trusts. I design the version people actually switch to.",
    problem:
      "Complex products fail on the boring parts: where the data lives, what happens when it's wrong, and whether the person using it can defend the decision they just made. That's the work.",
    capabilities: [
      {
        title: "Research that changes the build",
        description:
          "Interviews and workflow shadowing aimed at one question: what would make someone abandon the tool they have now? Findings come back as design decisions, not a slide deck.",
      },
      {
        title: "Information architecture",
        description:
          "Structure first — what belongs on a screen, what belongs a click away, and what should never have been a feature. Most of the win is in what gets cut.",
      },
      {
        title: "Interaction and interface design",
        description:
          "Real states, not happy paths: loading, empty, error, permission-denied, and the half-filled record someone left open on Friday.",
      },
      {
        title: "Design systems that survive handoff",
        description:
          "Components and tokens built to be implemented, with the edge cases already specified so engineering isn't guessing.",
      },
    ],
    proof: [
      {
        href: "/project/investor-loan-app",
        title: "Investor Loan Platform",
        image: "/images/investor-loan-app/hero.png",
        alt: "Investor loan analysis dashboard",
        result:
          "Replaced Excel as the system of record for multi-million-dollar loan deals — without anyone losing the workflow they relied on.",
      },
      {
        href: "/project/dae-search",
        title: "DAE Search",
        image: "/images/dae-search/hero.jpg",
        alt: "DAE Search enterprise data discovery interface",
        result:
          "Enterprise search rebuilt around the harder half of the job: knowing whether the data you found is trustworthy.",
      },
      {
        href: "/project/herbalink",
        title: "HerbaLink",
        image: "/images/herbalink/home-hero.png",
        alt: "HerbaLink practitioner booking interface",
        result:
          "Inverted 'verified' from a badge into a gate, so the safer path is also the easier one.",
      },
    ],
    faq: [
      {
        question: "Do you do research, or just the interface?",
        answer:
          "Both, and the research is the part that changes what gets built. If a project has no budget for it, I'll say what I'd do instead rather than skip it and guess.",
      },
      {
        question: "Can you work from an existing design system?",
        answer:
          "Yes. Most enterprise work starts inside constraints someone else set. I'd rather extend a system consistently than introduce a second one.",
      },
    ],
  },

  "mobile-app-design": {
    slug: "mobile-app-design",
    eyebrow: "Mobile App Design",
    title: "Mobile products that feel right in the hand",
    lede:
      "On mobile the difference between good and unusable is measured in milliseconds and thumb reach. That part can't be specified in a document — it has to be tuned on a real device.",
    problem:
      "Mobile design fails when it's a desktop layout squeezed narrower. Touch targets, one-handed reach, what happens on a bad connection, and how fast someone gets to the thing they opened the app for.",
    capabilities: [
      {
        title: "Thumb-first layout",
        description:
          "Primary actions where the thumb already is. Target sizes and spacing settled by watching a real hand on a real phone, not by grid math.",
      },
      {
        title: "Time-to-value tuning",
        description:
          "Cutting the distance between opening the app and doing the thing. Usually that means deleting screens rather than optimizing them.",
      },
      {
        title: "Feel and motion",
        description:
          "Timing, haptics, and transitions tuned by hand. Motion that tells you what happened, not motion that decorates.",
      },
      {
        title: "Real-device testing",
        description:
          "Tested on actual iOS and Android hardware, including the older phone your users still have.",
      },
    ],
    proof: [
      {
        href: "/project/ring-rival",
        title: "Ring-Rival",
        image: "/images/ringrival-hero-title.png",
        alt: "Ring-Rival mobile boxing game",
        result:
          "Cut time-to-first-punch from 22 seconds to 6 by removing menus, and dropped the audio failure rate from ~40% to under 2%.",
      },
      {
        href: "/project/catchbuddy",
        title: "CatchBuddy",
        image: "/images/catchbuddy-hero-landing.png",
        alt: "CatchBuddy pickup sports app",
        result:
          "Same-day pickup sports designed around trust and safety first — post a game, see open games, confirm in a few taps.",
      },
    ],
    faq: [
      {
        question: "Native or web?",
        answer:
          "Whichever the product actually needs. Ring-Rival is console-feel boxing running on the mobile web with no install — the constraint was the point.",
      },
      {
        question: "Do you hand off, or build it?",
        answer:
          "Either. I ship working products myself, so handoff files are written by someone who knows what engineering will hit.",
      },
    ],
  },

  "web-development": {
    slug: "web-development",
    eyebrow: "Design + Build",
    title: "Designed and shipped by the same person",
    lede:
      "I design it and I build it. That removes the handoff round-trip entirely — decisions get validated in working software the same week instead of surviving a translation layer.",
    problem:
      "The expensive gap in most projects isn't design or engineering. It's the space between them, where intent gets lost and 'that's not what I meant' arrives three sprints late.",
    capabilities: [
      {
        title: "Working software, not mockups",
        description:
          "React and TypeScript, deployed and clickable. You review the real thing on your own phone, not a prototype that only works if you tap in the right order.",
      },
      {
        title: "AI as a build partner",
        description:
          "AI generates the raw material fast. Judgment on what ships stays human — that filter is the actual job, and it's where the quality comes from.",
      },
      {
        title: "Full stack when it's needed",
        description:
          "Auth, database schema, row-level security, and edge functions — enough backend to make the front end real.",
      },
      {
        title: "Fast, honest iteration",
        description:
          "Multiple builds a day when a project is hot. You see progress continuously instead of at milestone reviews.",
      },
    ],
    proof: [
      {
        href: "/project/business-management",
        title: "Blue Sky",
        image: "/images/business-management/hero-three-laptops.jpg",
        alt: "Blue Sky unified business operations platform",
        result:
          "Consolidated scheduling, invoicing, and task tracking into one operations platform for small businesses drowning in disconnected tools.",
      },
      {
        href: "/project/email-creation-ai",
        title: "Email Creation AI",
        image: "/images/email-ai-promo.png",
        alt: "Email Creation AI workflow",
        result:
          "AI-assisted pharma email production designed around the approval gates — the regulated workflow, not the model.",
      },
    ],
    faq: [
      {
        question: "Is one person actually faster than a team?",
        answer:
          "For 0-to-1 work, usually yes — there's no handoff, no spec translation, and no waiting for someone else's sprint. For large ongoing platforms, a team is the right answer and I'll tell you so.",
      },
      {
        question: "What do I own at the end?",
        answer:
          "All of it — the repo, the design files, and the deployment. No lock-in to me.",
      },
    ],
  },
};
