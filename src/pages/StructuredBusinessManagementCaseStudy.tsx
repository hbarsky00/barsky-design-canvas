
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
      seoTitle="68% Fewer Errors: Enterprise Operations Management Platform | Hiram Barsky"
      seoDescription="Streamlined enterprise operations and reduced manual entry errors by 68% with unified business management dashboard and automated workflows."
      seoImage="https://barskydesign.pro/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png"
      projectName="Enterprise Business Management Platform"
    />
  );
};

export default StructuredBusinessManagementCaseStudy;
