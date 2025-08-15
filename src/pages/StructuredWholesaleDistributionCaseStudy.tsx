
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredWholesaleDistributionCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("wholesale-distribution");
  if (!caseStudyData) return <div>Case study not found</div>;

  return (
    <StructuredCaseStudyLayout
      title={caseStudyData.title}
      description={caseStudyData.description}
      tags={caseStudyData.tags}
      heroVideo={caseStudyData.heroVideo}
      sections={caseStudyData.sections}
      projectLink={caseStudyData.projectLink}
      gradientClasses={caseStudyData.gradientClasses}
      seoTitle="Wholesale Distribution AI Solution: Inventory & Order Management | Hiram Barsky"
      seoDescription="Transformed wholesale distribution operations with AI-powered inventory management, automated ordering, and real-time supply chain optimization."
      seoImage="https://barskydesign.pro/lovable-uploads/f48ad284-cc5f-4f72-a88b-f4c0142f6814.png"
      projectName="Wholesale Distribution AI Management Platform"
    />
  );
};

export default StructuredWholesaleDistributionCaseStudy;
