import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredRingRivalCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("ring-rival");
  if (!caseStudyData) return <div>Case study not found</div>;
  return <StructuredCaseStudyLayout caseStudyData={caseStudyData} />;
};

export default StructuredRingRivalCaseStudy;
