export interface CaseStudyNavItem {
  id: string;
  title: string;
  image: string;
}

import { structuredCaseStudies } from "@/data/structuredCaseStudies";
import { caseStudiesData, homepageCaseStudyPreviews } from "@/data/caseStudies";

// Allow-list of case studies shown in prev/next navigation.
// Must match the approved /case-studies/* routes.
const ALLOWED_CASE_STUDY_IDS = [
  "herbalink",
  "roi-design-builder",
  "nudgeme",
  "fire-lion",
  "dae-search",
];

// Build a unified, ordered list of case studies for prev/next navigation
export const getCaseStudyNavItems = (): CaseStudyNavItem[] => {
  return ALLOWED_CASE_STUDY_IDS.map((id) => {
    const structured = (structuredCaseStudies as any)[id];
    const legacy = (caseStudiesData as any)[id];
    const preview = homepageCaseStudyPreviews.find(
      (p) => (p.url?.split("/").pop() || "").trim() === id
    );

    const title: string =
      structured?.title || legacy?.title || preview?.title || id;
    const image: string =
      structured?.seoData?.image ||
      structured?.heroVideo?.poster ||
      legacy?.videoThumbnail ||
      preview?.videoThumbnail ||
      "/placeholder.svg";

    return { id, title, image };
  });
};
