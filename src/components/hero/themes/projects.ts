export type HeroProject = {
  id: string;
  label: string;
  desc: string;
  to: string;
};

export const HERO_PROJECTS: HeroProject[] = [
  { id: "fire-lion", label: "Fire Lion", desc: "word-casting arcade game", to: "/project/fire-lion" },
  { id: "ring-rival", label: "Ring-Rival", desc: "mobile web boxing", to: "/project/ring-rival" },
  { id: "catchbuddy", label: "CatchBuddy", desc: "same-day pickup sports", to: "/project/catchbuddy" },
  { id: "herbalink", label: "HerbaLink", desc: "verified herbalist platform", to: "/project/herbalink" },
  { id: "valora-bet", label: "Valora Bet", desc: "social prediction markets", to: "/project/valora-bet" },
  { id: "nudgeme", label: "NudgeMe", desc: "natural-language reminder app", to: "/project/nudgeme" },
];
