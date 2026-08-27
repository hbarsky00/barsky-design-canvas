import { ProjectVariable } from "./types";

/**
 * Empty on purpose.
 *
 * This held one entry, "business-management", and every fact in it was
 * invented: a named client ("Frank Morrison, 67, owner"), a colleague
 * ("Jake"), a bankruptcy, an acquisition eighteen months later, and figures
 * like "$89,000 revenue recovered" and "68% reduction in order errors" —
 * none of which Hiram could stand behind on a call.
 *
 * It rendered nowhere: /project/business-management has been a 301 to
 * /#case-studies since 2026-08-09, so the fabricated copy was never served.
 * It stayed in a public repo, though, one wiring change away from the site.
 *
 * The shape stays exported because project-details/index.ts maps over it and
 * every consumer already guards with `|| null`. Real projects belong in
 * src/data/structuredCaseStudies.ts or their own page component; nothing
 * should go in here that isn't sourced.
 */
export const projectVariables: Record<string, ProjectVariable> = {};

export * from "./types";
