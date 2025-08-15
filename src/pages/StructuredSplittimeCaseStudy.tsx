
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/StructuredCaseStudyLayout";
import { structuredCaseStudies } from "@/data/structuredCaseStudies";

const StructuredSplittimeCaseStudy: React.FC = () => {
  const caseStudy = structuredCaseStudies['splittime'];
  
  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

  return <StructuredCaseStudyLayout caseStudy={caseStudy} />;
};

export default StructuredSplittimeCaseStudy;
