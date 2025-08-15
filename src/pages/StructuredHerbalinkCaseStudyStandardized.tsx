
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/StructuredCaseStudyLayout";
import { structuredCaseStudies } from "@/data/structuredCaseStudies";

const StructuredHerbalinkCaseStudyStandardized: React.FC = () => {
  const caseStudy = structuredCaseStudies['herbalink'];
  
  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

  return <StructuredCaseStudyLayout caseStudy={caseStudy} />;
};

export default StructuredHerbalinkCaseStudyStandardized;
