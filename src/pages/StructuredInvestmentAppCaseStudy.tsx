
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/StructuredCaseStudyLayout";
import { structuredCaseStudies } from "@/data/structuredCaseStudies";

const StructuredInvestmentAppCaseStudy: React.FC = () => {
  const caseStudy = structuredCaseStudies['investment-app'];
  
  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

  return <StructuredCaseStudyLayout caseStudy={caseStudy} />;
};

export default StructuredInvestmentAppCaseStudy;
