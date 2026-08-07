export type HeroProject = {
  id: string;
  label: string;
  desc: string;
  to: string;
};

// Canonical order — first 4 are SHIPPED PRODUCTS, last 2 are CONCEPT GAMES.
// All theme heroes (Terminal, LLMChat, Win95, EightBit, MD, etc.) consume this list.
export const HERO_PROJECTS: HeroProject[] = [
  { id: "catchbuddy", label: "CatchBuddy", desc: "same-day pickup sports", to: "/project/catchbuddy" },
  { id: "herbalink", label: "HerbaLink", desc: "verified herbalist platform", to: "/project/herbalink" },
  { id: "valora-bet", label: "Valora Bet", desc: "social prediction markets platform", to: "/project/valora-bet" },
  { id: "ring-rival", label: "Ring-Rival", desc: "mobile web boxing", to: "/project/ring-rival" },
  { id: "fire-lion", label: "Fire Lion", desc: "word-casting arcade game", to: "/project/fire-lion" },
];
