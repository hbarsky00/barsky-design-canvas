export interface CaseStudyNavItem {
  id: string;
  title: string;
  image: string;
}

import { structuredCaseStudies } from "@/data/structuredCaseStudies";
import { caseStudiesData, homepageCaseStudyPreviews } from "@/data/caseStudies";
import valoraImg from "@/assets/projects/valorabet.png";

const ALLOWED_CASE_STUDY_IDS = [
  "herbalink",
  "roi-design-builder",
  "nudgeme",
  "valora-bet",
  "fire-lion",
  "ring-rival",
  "catchbuddy",
  "dae-search",
];

// Explicit image overrides for IDs not in structuredCaseStudies/seoData.
const NAV_IMAGE_OVERRIDES: Record<string, string> = {
  "valora-bet": valoraImg,
};

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
