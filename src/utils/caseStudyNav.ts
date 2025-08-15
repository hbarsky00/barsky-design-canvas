
export interface CaseStudyNavItem {
  id: string;
  title: string;
  image: string;
}

import { getAllStructuredCaseStudies, getStructuredCaseStudiesMap } from "@/data/structuredCaseStudies";
import { caseStudiesData, homepageCaseStudyPreviews } from "@/data/caseStudies";

// Build a unified, ordered list of case studies for prev/next navigation
export const getCaseStudyNavItems = (): CaseStudyNavItem[] => {
  const items = new Map<string, CaseStudyNavItem>();

  // 1) Start with homepage previews to establish order
  homepageCaseStudyPreviews.forEach((p) => {
    const id = (p.url?.split("/").pop() || "").trim();
    if (!id) return;
    
    const structuredCaseStudiesMap = getStructuredCaseStudiesMap();
    const structured = structuredCaseStudiesMap[id];
    const legacy = (caseStudiesData as any)[id];

    const title: string = structured?.title || legacy?.title || p.title || id;
    const image: string =
      structured?.seoData?.image ||
      structured?.heroVideo?.poster ||
      legacy?.videoThumbnail ||
      p.videoThumbnail ||
      "/placeholder.svg";

    items.set(id, { id, title, image });
  });

  // 2) Add any structured case studies not in homepage list
  const allStructuredCaseStudies = getAllStructuredCaseStudies();
  allStructuredCaseStudies.forEach((cs) => {
    if (items.has(cs.id)) return;
    const image = cs.seoData?.image || cs.heroVideo?.poster || "/placeholder.svg";
    items.set(cs.id, { id: cs.id, title: cs.title, image });
  });

  // 3) Add any legacy case studies not in homepage list
  Object.entries(caseStudiesData).forEach(([id, cs]) => {
    if (items.has(id)) return;
    const image = cs.videoThumbnail || "/placeholder.svg";
    items.set(id, { id, title: cs.title, image });
  });

  return Array.from(items.values());
};
