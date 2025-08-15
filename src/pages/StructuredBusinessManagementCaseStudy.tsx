
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredBusinessManagementCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("business-management");
  
  if (!caseStudyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
          <p className="text-gray-600">The Business Management case study could not be loaded.</p>
        </div>
      </div>
    );
  }

  return <StructuredCaseStudyLayout caseStudy={caseStudyData} />;
};

export default StructuredBusinessManagementCaseStudy;
