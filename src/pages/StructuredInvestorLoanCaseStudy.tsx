
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredInvestorLoanCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("investor-loan-app");
  if (!caseStudyData) return <div>Case study not found</div>;

  return (
    <StructuredCaseStudyLayout
      caseStudyData={caseStudyData}
    />
  );
};

export default StructuredInvestorLoanCaseStudy;
