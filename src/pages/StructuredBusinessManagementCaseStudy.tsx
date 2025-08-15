
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredBusinessManagementCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("business-management");
  
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

export default StructuredBusinessManagementCaseStudy;
