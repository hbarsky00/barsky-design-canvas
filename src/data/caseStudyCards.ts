// The five case studies the site shows, in display order.
//
// Single source of truth on purpose. This list used to exist twice — once in
// VideoCaseStudiesSection (the homepage grid) and once in SingleCaseStudyPreview
// (the "More Work" block at the foot of every case study) — and the two drifted:
// the footer copy was still selling "3x More Bookings" for HerbaLink long after
// the study itself was rewritten to say the opposite.

export interface CaseStudy {
  id: string;
  tags: string[];
  title: string;
  description: string;
  impact: string;
  url: string;
  // false when the detail route is retired (301s away). The card still shows the
  // work; it just does not link at a redirect.
  hasDetail?: boolean;
  liveUrl?: string;
  images: {
    primary: string;
    secondary?: string;
    alt: string;
  };
  layout: "side-by-side" | "single-centered" | "web-mobile";
  video?: string;
}

export const caseStudyCards: CaseStudy[] = [
  {
    id: "dae-search",
    tags: ["Enterprise", "Data Discovery", "Search UX"],
    title: "DAE Search",
    description:
      "Enterprise search redesigned around the inconvenient truth that finding the data is only half the job — knowing whether to trust it is the rest.",
    impact: "Lineage and permissions inline",
    url: "/project/dae-search",
    images: {
      primary: "/images/dae-search/outcome-dashboard.webp",
      alt: "DAE Search results on desktop and laptop — filters beside a table of data assets",
    },
    layout: "side-by-side",
  },
  {
    id: "herbalink",
    tags: ["AI-Assisted Product", "Healthcare", "Trust & Safety"],
    title: "HerbaLink",
    description:
      "Verified herbalists, designed around trust. No practitioner is visible until their credentials are checked against an external registry — verified as a gate, not a badge.",
    impact: "Credentials as a gate",
    url: "/project/herbalink",
    liveUrl: "https://herbalink.live",
    images: {
      primary: "/images/herbalink/mobile-grid-8up.webp",
      alt: "Eight HerbaLink mobile screens — home, herb library, practitioner sign-up and consultations",
    },
    layout: "side-by-side",
  },
  {
    id: "catchbuddy",
    tags: ["AI-Assisted Product", "Trust & Safety", "Solo Build"],
    title: "CatchBuddy",
    description:
      "Same-day pickup sports, designed for trust. Post a game, see open games, confirm in a few taps. The safety layer shipped in v1 instead of arriving later as a settings screen.",
    impact: "Safety layer shipped in v1",
    url: "/project/catchbuddy",
    liveUrl: "https://catchbuddy.fit",
    images: {
      primary: "/images/catchbuddy-walkthrough-poster.jpg",
      alt: "CatchBuddy — find local sports partners for basketball, football, baseball, volleyball and frisbee",
    },
    layout: "side-by-side",
  },
  {
    id: "ring-rival",
    tags: ["AI-Assisted Product", "Mobile Web", "Game Design"],
    title: "Ring-Rival",
    description:
      "Console boxing feel on the mobile web. Distinct AI opponents, generated trash talk and a career mode, in a browser with no install.",
    impact: "22s → 6s to first punch",
    url: "/project/ring-rival",
    liveUrl: "https://rival.li",
    images: {
      primary: "/images/ringrival-now/hero-triptych.webp",
      alt: "Ring-Rival fighters, knockdown and pause screens on mobile",
    },
    layout: "side-by-side",
  },
  {
    id: "fire-lion",
    tags: ["AI-Assisted Product", "Game Design", "Solo Build"],
    title: "Fire Lion",
    description:
      "A shipped game, built solo with AI. A one-tap arcade runner where you spell words mid-flight to cast spells. The deletion list ran longer than the feature list.",
    impact: "6 systems cut after playtests",
    url: "/project/fire-lion",
    liveUrl: "https://firelion.me",
    images: {
      primary: "/images/firelion-hero-triptych.webp",
      alt: "Fire Lion title, spell-casting and Cub Mode screens on mobile",
    },
    layout: "side-by-side",
  },
];
