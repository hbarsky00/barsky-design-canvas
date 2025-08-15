
import React from "react";
import StructuredCaseStudySection from "./StructuredCaseStudySection";
import { CaseStudySection as CaseStudySectionType } from "@/data/types/structuredCaseStudy";
import { FileText } from "lucide-react";

interface CaseStudySectionProps {
  section: CaseStudySectionType;
  index: number;
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ section, index }) => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <StructuredCaseStudySection
          id={section.id}
          title={section.title}
          icon={section.icon || FileText}
          variant={section.type}
          content={section.content.text || ""}
          media={section.content.image || section.content.video ? {
            type: section.content.video ? "video" : "image",
            src: section.content.image || section.content.video || "",
            alt: section.title,
            caption: section.content.caption
          } : undefined}
          metrics={section.metrics}
          tags={section.tags}
        />
      </div>
    </div>
  );
};

export default CaseStudySection;
