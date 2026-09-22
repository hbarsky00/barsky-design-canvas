
import React from "react";
import { Navigate } from "react-router-dom";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";

const StructuredBusinessManagementCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("business-management");
  
  if (!caseStudyData) {
    // /projects redirects to a "/#projects" anchor that doesn't exist on
    // the current homepage — was silently landing users on the homepage
    // with no indication anything went wrong. /case-studies is real.
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <StructuredCaseStudyLayout caseStudyData={caseStudyData} heroAsImage={true} />
  );
};

export default StructuredBusinessManagementCaseStudy;
