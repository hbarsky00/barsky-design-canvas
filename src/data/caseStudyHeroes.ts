/**
 * Art direction for each case-study hero.
 *
 * The structure is identical for every project; only the personality changes —
 * theme, accent, which phrase of the headline is emphasised, and which shipped
 * screens appear.
 *
 * Three things deliberately do NOT live here:
 *
 * 1. The headline and the standfirst. Those stay in structuredCaseStudies.ts,
 *    which also feeds the SEO schema and the homepage cards. `accentPhrase` is
 *    a verbatim substring of that title, so the H1 renders the exact same
 *    characters whether or not the phrase is found.
 * 2. The metrics. Each `metrics` entry is copied from that study's own
 *    heroMetrics or outcome metrics. A project with no validated number simply
 *    has an empty array and the component drops the whole row — CatchBuddy
 *    ships that way, because its record contains no metric to show.
 * 3. The layout. CaseStudyHero derives it from the primary image's own aspect
 *    ratio, so a 3:1 board never gets squeezed into a half-rail column.
 */
export type HeroTheme = "light" | "dark";

export interface HeroMedia {
  src: string;
  /**
   * "primary" is the dominant screen. "inset" layers in front of it from md,
   * and stands in for the primary below md. "mobile" is for a project whose
   * phone art is not the same asset as its desktop inset.
   */
  role: "primary" | "inset" | "mobile";
  /**
   * The alt that ships. A <picture> carries one alt for every breakpoint, and
   * the mobile entry is the one that lands on the <img>, so where a project has
   * both, the mobile entry's alt has to describe the product truthfully at
   * every size — not just the phone.
   */
  alt: string;
  /**
   * Forces the phone swipe rail for an asset the aspect-ratio heuristic can't
   * see is dense. HerbaLink's boards are all 3:2 but carry a dozen annotated
   * screens each, so at 350px they are unreadable even though they are not
   * ultrawide.
   */
  scrollOnMobile?: boolean;
  /**
   * True for assets with a transparent background — devices and screen rows
   * that are already cut out. Those get a drop shadow instead of a card, since
   * a rounded bordered panel around a cut-out reads as a box floating in space.
   */
  bare?: boolean;
}

export interface CaseStudyHeroConfig {
  /** Replaces the tag pills. Short, three facets at most. */
  eyebrow: string;
  /** Verbatim substring of the record's own title, or "" for no accent. */
  accentPhrase: string;
  metrics: { value: string; label: string }[];
  media: HeroMedia[];
  theme: HeroTheme;
  /** Tailwind text utility for the accented phrase and the metric figures. */
  accentText: string;
  /** Tailwind background utilities for the section. */
  surface: string;
  /** A CSS gradient, applied inline as the atmospheric wash behind the product. */
  glow: string;
}

export const CASE_STUDY_HEROES: Record<string, CaseStudyHeroConfig> = {
  "dae-search": {
    eyebrow: "Enterprise · Search · Data discovery",
    accentPhrase: "Actually Findable",
    // heroMetrics: "–65% Information Retrieval Time", "20% ROI from Better Discovery"
    metrics: [
      { value: "−65%", label: "Information retrieval time" },
      { value: "20%", label: "ROI from better discovery" },
    ],
    media: [
      {
        src: "/images/dae-search/hero-explorer.webp",
        alt: "DAE Digital Asset Explorer: the landing screen beside the dashboard mid-search, showing recommended results",
        role: "primary",
      },
    ],
    theme: "light",
    accentText: "text-blue-600",
    surface: "bg-gradient-to-b from-sky-50 via-white to-white",
    glow:
      "radial-gradient(60% 55% at 72% 24%, rgba(37, 99, 235, 0.16), transparent 70%)",
  },

  herbalink: {
    eyebrow: "Healthcare · Marketplace · Trust",
    accentPhrase: "Credential Trust",
    // outcomeSection.metrics: "3× booking increase", "85% match accuracy"
    metrics: [
      { value: "3×", label: "Booking increase" },
      { value: "85%", label: "Match accuracy" },
    ],
    media: [
      {
        src: "/images/herbalink/high-fidelity-prototype.webp",
        alt: "HerbaLink high-fidelity prototype: the mobile flow for finding, booking and getting support, beside the desktop discovery, booking, messaging and symptom-tracking screens",
        role: "primary",
        scrollOnMobile: true,
      },
    ],
    theme: "light",
    accentText: "text-emerald-700",
    surface: "bg-gradient-to-b from-emerald-50/80 via-white to-white",
    glow:
      "radial-gradient(60% 55% at 72% 24%, rgba(5, 150, 105, 0.15), transparent 70%)",
  },

  catchbuddy: {
    eyebrow: "Sports · Community · Mobile",
    accentPhrase: "Not a Settings Page",
    // The record carries no validated metric, so the hero shows none.
    metrics: [],
    media: [
      {
        src: "/images/catchbuddy/phones-three-up.webp",
        alt: "Three CatchBuddy phone screens: nearby games, the map view, and a game detail showing who is going",
        role: "primary",
        bare: true,
      },
      {
        src: "/images/catchbuddy/hero-phone.webp",
        alt: "CatchBuddy on a phone: nearby pickup games with who is going and how far away each one is",
        role: "mobile",
        bare: true,
      },
    ],
    theme: "dark",
    accentText: "text-sky-400",
    surface: "bg-slate-950",
    glow:
      "radial-gradient(65% 60% at 70% 30%, rgba(56, 189, 248, 0.22), transparent 72%)",
  },

  "email-creation-ai": {
    eyebrow: "Pharma · Gen AI · Workflow design",
    accentPhrase: "AI-Assisted Email Creation Workflow",
    // heroMetrics, verbatim: "6 Workflow steps", "4 Roles designed for"
    metrics: [
      { value: "6", label: "Workflow steps" },
      { value: "4", label: "Roles designed for" },
    ],
    media: [
      {
        src: "/images/email-creation-ai/hifi-screens-row.webp",
        alt: "Five high-fidelity ManuscriptRx screens in sequence: write the brief, pick a template, compose, refine, then connect a mail client",
        role: "primary",
        bare: true,
      },
    ],
    theme: "dark",
    accentText: "text-violet-400",
    surface: "bg-[#0b0618]",
    glow:
      "radial-gradient(65% 60% at 68% 30%, rgba(139, 92, 246, 0.28), transparent 72%)",
  },

  "business-management": {
    eyebrow: "B2B · Operations · Automation",
    accentPhrase: "Cutting Operation Errors by 68%",
    // userTestingSection.metrics "68% fewer errors"; seoData.results "35% Faster Processing"
    metrics: [
      { value: "68%", label: "Fewer operation errors" },
      { value: "35%", label: "Faster processing" },
    ],
    media: [
      // The end-to-end flow board is the better artefact but the wrong hero: at
      // half the rail its nine panes are illegible. The operations dashboard
      // carries the "one system" claim in one readable screen instead.
      {
        src: "/images/business-management/v2/overview.webp",
        alt: "The operations dashboard: today\u2019s jobs, invoice status and the task list on one screen",
        role: "primary",
      },
      {
        src: "/images/business-management/v2/mobile-overview.webp",
        alt: "The QuickFlow operations overview: the day\u2019s sales, revenue and orders delivered on one screen",
        role: "inset",
      },
    ],
    theme: "light",
    accentText: "text-blue-600",
    surface: "bg-gradient-to-b from-slate-100 via-white to-white",
    glow:
      "radial-gradient(60% 55% at 72% 24%, rgba(37, 99, 235, 0.14), transparent 70%)",
  },

  crypto: {
    eyebrow: "Fintech · Crypto · Onboarding",
    accentPhrase: "Trust Themselves Enough to Trade",
    // heroMetrics, first two verbatim
    metrics: [
      { value: "+35%", label: "Beginners confident enough to start" },
      { value: "\u201340%", label: "Fear-driven hesitation" },
    ],
    // No curated board yet; the component falls back to the record's own art.
    media: [],
    theme: "light",
    accentText: "text-indigo-600",
    surface: "bg-gradient-to-b from-indigo-50/70 via-white to-white",
    glow:
      "radial-gradient(60% 55% at 72% 24%, rgba(79, 70, 229, 0.13), transparent 70%)",
  },

  splittime: {
    eyebrow: "Family · Scheduling · iOS → Android",
    accentPhrase: "Better Planning",
    // The record carries no heroMetrics, so there is no row.
    metrics: [],
    media: [],
    theme: "light",
    accentText: "text-violet-600",
    surface: "bg-gradient-to-b from-violet-50/70 via-white to-white",
    glow:
      "radial-gradient(60% 55% at 72% 24%, rgba(124, 58, 237, 0.13), transparent 70%)",
  },
};

export const getCaseStudyHero = (id: string): CaseStudyHeroConfig | undefined =>
  CASE_STUDY_HEROES[id];
