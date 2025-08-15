
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredSplittimeCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("splittime");
  if (!caseStudyData) return <div>Case study not found</div>;

  return (
    <StructuredCaseStudyLayout caseStudy={caseStudyData}>
      <div>
        <h1>{caseStudyData.title}</h1>
        <p>{caseStudyData.description}</p>
      </div>
    </StructuredCaseStudyLayout>
  );
};

export default StructuredSplittimeCaseStudy;
