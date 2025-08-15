
export interface CaseStudyNavItem {
  id: string;
  title: string;
  image: string;
}

import { caseStudiesData, homepageCaseStudyPreviews } from "@/data/caseStudies";

// Build a unified, ordered list of case studies for prev/next navigation
export const getCaseStudyNavItems = (): CaseStudyNavItem[] => {
  const items = new Map<string, CaseStudyNavItem>();

  // 1) Start with homepage previews to establish order
  homepageCaseStudyPreviews.forEach((p) => {
    const id = (p.url?.split("/").pop() || "").trim();
    if (!id) return;
    const legacy = (caseStudiesData as any)[id];

    const title: string = legacy?.title || p.title || id;
    const image: string = legacy?.videoThumbnail || p.videoThumbnail || "/placeholder.svg";

    items.set(id, { id, title, image });
  });

  // 2) Add any legacy case studies not in homepage list
  Object.entries(caseStudiesData).forEach(([id, cs]: any) => {
    if (items.has(id)) return;
    const image = cs.videoThumbnail || "/placeholder.svg";
    items.set(id, { id, title: cs.title, image });
  });

  return Array.from(items.values());
};
