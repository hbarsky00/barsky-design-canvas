/**
 * The work history, in one place.
 *
 * Created 2026-11-16 because there were three copies of it and one of them was
 * fiction. `export/extractors/homepage.ts` — the content export that feeds LLM
 * consumers — had a hardcoded two-role timeline reading
 * "Lead Product Designer • Barsky Design • 2020-Present" and
 * "Senior UX Designer • Various Startups • 2018-2020". Neither role appears in
 * the real history, "Various Startups" is invented, and the dates overlap
 * employers that are named on the site. Meanwhile `RecentAdventuresSection`
 * and `ProfessionalJourney` each kept their own correct-but-separate copy, so
 * the Verisk role added on 2026-11-13 had to be written twice.
 *
 * Both renderers and the export now read this array. Add a role once.
 *
 * `blurb` is the one-line version the homepage timeline shows. `detail` is the
 * longer version the About page uses; where it is absent the About page falls
 * back to `blurb`, so a role needs only one description.
 *
 * Settled 2026-11-17, both items that were flagged here on 2026-11-16:
 *
 *   - The Verisk title stays "Lead Product Designer". It is not an invention:
 *     the role as described leads UX for a product line and governs a design
 *     system other product lines inherit, which is the title for that work.
 *     Change it if the official one differs.
 *   - The role carries no metric, and that is correct rather than missing. It
 *     started in January; the older roles quote outcomes because they finished
 *     and someone measured them. Inventing one here is exactly the thing the
 *     rest of this repo spent a day removing. Add it when there is one.
 */

export interface Role {
  role: string;
  company: string;
  duration: string;
  blurb: string;
  detail?: string;
}

export const workHistory: Role[] = [
  {
    role: "Lead Product Designer",
    company: "Verisk",
    duration: "Jan 2026 - Present",
    blurb:
      "Lead UX for enterprise commercial property underwriting, from definition through production-ready React and TypeScript prototypes, and govern the design system multiple product lines inherit",
    detail:
      "Lead end-to-end UX for enterprise commercial property underwriting — concept through production-ready React and TypeScript prototypes engineers build from — and govern the design system those product lines inherit. Introduced agentic AI workflows into the design practice, building Claude Code systems and custom skills that shorten design-to-development handoff."
  },
  {
    role: "Senior Lead Product Designer",
    company: "PNC",
    duration: "2024 - July 2025",
    blurb:
      "Redesigned mobile banking interface, boosting engagement by 40% and raising satisfaction scores by 25%"
  },
  {
    role: "Senior UX/UI Designer",
    company: "Bank of America",
    duration: "2023 - 2024",
    blurb:
      "Led UX for Loan Central and ServiceNow IRM, cutting errors by 15% and lifting engagement by 10%"
  },
  {
    role: "Senior User Experience Designer",
    company: "Deloitte",
    duration: "2021 - 2023",
    blurb:
      "Elevated platform engagement by 20% through user-centered prototypes and innovative design solutions"
  },
  {
    role: "UX Strategist & Design Lead",
    company: "Tata Consultancy Services",
    duration: "2019 - 2021",
    blurb:
      "Designed fintech apps that drove a 15% revenue lift; built a document manager app reducing support workload by 10%"
  },
  {
    role: "Senior UX Designer",
    company: "KPMG",
    duration: "2014 - 2019",
    blurb:
      "Created dashboards and data visualizations that reduced client costs by 10% and increased platform revenue by 14%"
  },
  {
    role: "Senior UX Designer",
    company: "Express Scripts",
    duration: "2013 - 2014",
    blurb:
      "Led design initiatives that improved satisfaction and engagement by 30%, while cutting project turnaround by 20%"
  }
];
