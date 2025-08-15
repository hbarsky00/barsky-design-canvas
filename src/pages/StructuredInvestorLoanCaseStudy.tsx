
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/StructuredCaseStudyLayout";
import { structuredCaseStudies } from "@/data/structuredCaseStudies";

const StructuredInvestorLoanCaseStudy: React.FC = () => {
  const caseStudy = structuredCaseStudies['investor-loan-app'];
  
  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

  return <StructuredCaseStudyLayout caseStudy={caseStudy} />;
};

export default StructuredInvestorLoanCaseStudy;
