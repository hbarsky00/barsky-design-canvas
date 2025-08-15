
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredBusinessManagementCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("business-management");
  
  if (!caseStudyData) {
    return <div>Case study not found</div>;
  }

  return (
    <StructuredCaseStudyLayout caseStudy={caseStudyData}>
      <div>
        <h1>{caseStudyData.title}</h1>
        <p>{caseStudyData.description}</p>
      </div>
    </StructuredCaseStudyLayout>
  );
};

export default StructuredBusinessManagementCaseStudy;
