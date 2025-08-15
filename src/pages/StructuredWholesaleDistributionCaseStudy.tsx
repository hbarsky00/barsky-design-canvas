
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredWholesaleDistributionCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("wholesale-distribution");
  
  if (!caseStudyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
          <p className="text-gray-600">The Wholesale Distribution case study could not be loaded.</p>
        </div>
      </div>
    );
  }

  return <StructuredCaseStudyLayout caseStudy={caseStudyData} />;
};

export default StructuredWholesaleDistributionCaseStudy;
