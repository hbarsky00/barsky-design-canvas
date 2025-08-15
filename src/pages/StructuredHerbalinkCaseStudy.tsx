
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
    />
  );
};

export default StructuredHerbalinkCaseStudy;
