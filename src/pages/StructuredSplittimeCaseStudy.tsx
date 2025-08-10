import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredSplittimeCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("splittime");
  if (!caseStudyData) return <div>Case study not found</div>;

  return (
    <StructuredCaseStudyLayout
      title={caseStudyData.title}
      description={caseStudyData.description}
      tags={caseStudyData.tags}
      heroVideo={caseStudyData.heroVideo}
      sections={caseStudyData.sections}
      gradientClasses={caseStudyData.gradientClasses}
      seoData={caseStudyData.seoData}
    />
  );
};

export default StructuredSplittimeCaseStudy;
