
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredInvestmentAppCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("investment-app");
  
  if (!caseStudyData) {
    return <div>Case study not found</div>;
  }

  return (
    <StructuredCaseStudyLayout
      caseStudyData={caseStudyData}
      heroAsImage={true}
    />
  );
};

export default StructuredInvestmentAppCaseStudy;
