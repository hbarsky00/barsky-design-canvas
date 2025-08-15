
export interface CaseStudyNavItem {
  id: string;
  title: string;
  image: string;
}

import { structuredCaseStudies } from "@/data/structuredCaseStudies";
import { caseStudiesData, homepageCaseStudyPreviews } from "@/data/caseStudies";

// Build a unified, ordered list of case studies for prev/next navigation
export const getCaseStudyNavItems = (): CaseStudyNavItem[] => {
  const items = new Map<string, CaseStudyNavItem>();

  // 1) Start with homepage previews to establish order
  homepageCaseStudyPreviews.forEach((p) => {
    const id = (p.url?.split("/").pop() || "").trim();
    if (!id) return;
    const structured = (structuredCaseStudies as any)[id];
    const legacy = (caseStudiesData as any)[id];

    const title: string = structured?.title || legacy?.title || p.title || id;

    // Prefer a thumbnail derived from heroVideo when available
    const structuredThumb =
      typeof structured?.heroVideo === "string"
        ? structured.heroVideo.replace(".mp4", "-thumbnail.jpg")
        : "";

    const image: string =
      structuredThumb ||
      legacy?.videoThumbnail ||
      p.videoThumbnail ||
      "/placeholder.svg";

    items.set(id, { id, title, image });
  });

  // 2) Add any structured case studies not in homepage list
  Object.values(structuredCaseStudies).forEach((cs: any) => {
    if (items.has(cs.id)) return;

    const structuredThumb =
      typeof cs?.heroVideo === "string"
        ? cs.heroVideo.replace(".mp4", "-thumbnail.jpg")
        : "";

    const image = structuredThumb || "/placeholder.svg";
    items.set(cs.id, { id: cs.id, title: cs.title, image });
  });

  // 3) Add any legacy case studies not in homepage list
  Object.entries(caseStudiesData).forEach(([id, cs]: any) => {
    if (items.has(id)) return;
    const image = cs.videoThumbnail || "/placeholder.svg";
    items.set(id, { id, title: cs.title, image });
  });

  return Array.from(items.values());
};
