
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredHerbalinkCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("herbalink");
  
  if (!caseStudyData) {
    return <div>Case study not found</div>;
  }

  return (
    <StructuredCaseStudyLayout
      title={caseStudyData.title}
      description={caseStudyData.description}
      tags={caseStudyData.tags}
      heroVideo={caseStudyData.heroVideo}
      sections={caseStudyData.sections}
      projectLink={caseStudyData.projectLink}
      gradientClasses={caseStudyData.gradientClasses}
      seoTitle="3x More Bookings: Herbalink Herbalist Marketplace UX Design | Hiram Barsky"
      seoDescription="Connected users to certified herbalists nationwide and increased booking rates by 3x through Gen AI-enhanced UX design and trusted marketplace features."
      seoImage="https://barskydesign.pro/images/herbalink-promo.png"
      projectName="Herbalink - Herbalist Marketplace Platform"
    />
  );
};

export default StructuredHerbalinkCaseStudy;
