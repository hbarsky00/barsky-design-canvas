/**
 * Reading order for the featured case studies.
 *
 * Case study pages used to dead-end — you finished one and the only way to
 * another was back to the homepage. This drives the prev/next pager at the
 * bottom of each study, so the order here should match the homepage's
 * featured list in VideoCaseStudiesSection.
 *
 * Order matches the homepage's VideoCaseStudiesSection: enterprise work first,
 * then the shipped consumer products, then the games. Crypto and ManuscriptRx
 * are deliberately absent from the pager — neither shipped, and the pager
 * walks the work being promoted rather than every page that exists.
 */
export interface CaseStudyIndexEntry {
  id: string;
  title: string;
  /** One line, used as the pager subtitle so the next study is a real choice. */
  blurb: string;
}

export const CASE_STUDY_ORDER: CaseStudyIndexEntry[] = [
  {
    id: "investor-loan-app",
    title: "Investor Loan Platform",
    blurb: "Loan origination that replaced a spreadsheet.",
  },
  {
    id: "dae-search",
    title: "DAE Search",
    blurb: "Search that answers the question behind the query.",
  },
  {
    id: "bz-essentials",
    title: "BZ Essentials",
    blurb: "An enterprise portal where region is a lens, not a filter.",
  },
  {
    id: "recast",
    title: "Recast",
    blurb: "Record it once, send a link. Native apps, one web library.",
  },
  {
    id: "herbalink",
    title: "HerbaLink",
    blurb: "A booking platform where the real product is trust.",
  },
  {
    id: "catchbuddy",
    title: "CatchBuddy",
    blurb: "Same-day pickup sports, designed for trust.",
  },
  {
    id: "stips",
    title: "Stips",
    blurb: "Prediction markets you can actually read.",
  },
  {
    id: "ring-rival",
    title: "Ring-Rival",
    blurb: "Console boxing feel on the mobile web.",
  },
];

/** Neighbours of a study in reading order. Wraps, so the tour never ends flat. */
export const getCaseStudyNeighbours = (projectId: string) => {
  const i = CASE_STUDY_ORDER.findIndex((c) => c.id === projectId);
  if (i === -1) return { prev: undefined, next: undefined };

  const { length } = CASE_STUDY_ORDER;
  return {
    prev: CASE_STUDY_ORDER[(i - 1 + length) % length],
    next: CASE_STUDY_ORDER[(i + 1) % length],
  };
};
