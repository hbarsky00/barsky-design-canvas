
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/StructuredCaseStudyLayout";
import { structuredCaseStudies } from "@/data/structuredCaseStudies";

const StructuredWholesaleDistributionCaseStudy: React.FC = () => {
  const caseStudy = structuredCaseStudies['wholesale-distribution'];
  
  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

  return <StructuredCaseStudyLayout caseStudy={caseStudy} />;
};

export default StructuredWholesaleDistributionCaseStudy;
