export type HeroProject = {
  id: string;
  label: string;
  desc: string;
  to: string;
};

// Canonical order — first 2 are SHIPPED PRODUCTS, last 2 are CONCEPT GAMES.
// All theme heroes (Terminal, LLMChat, Win95, EightBit, MD, etc.) consume this list.
// "catchbuddy" pulled 2026-08-07 — case study being refined, see
// scripts/seo-routes.ts's note on FEATURED_PROJECTS.
export const HERO_PROJECTS: HeroProject[] = [
  { id: "herbalink", label: "HerbaLink", desc: "verified herbalist platform", to: "/project/herbalink" },
  { id: "valora-bet", label: "Valora Bet", desc: "social prediction markets platform", to: "/project/valora-bet" },
  { id: "ring-rival", label: "Ring-Rival", desc: "mobile web boxing", to: "/project/ring-rival" },
  { id: "fire-lion", label: "Fire Lion", desc: "word-casting arcade game", to: "/project/fire-lion" },
];
