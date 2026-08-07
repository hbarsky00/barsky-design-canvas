
import React from "react";
import { Navigate } from "react-router-dom";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";

const StructuredBusinessManagementCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("business-management");
  
  if (!caseStudyData) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <StructuredCaseStudyLayout caseStudyData={caseStudyData} heroAsImage={true} />
  );
};

export default StructuredBusinessManagementCaseStudy;
