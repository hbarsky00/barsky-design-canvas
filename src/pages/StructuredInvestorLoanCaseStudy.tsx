
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredInvestorLoanCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("investor-loan-app");
  if (!caseStudyData) return <div>Case study not found</div>;

  return (
    <StructuredCaseStudyLayout
      title={caseStudyData.title}
      description={caseStudyData.description}
      tags={caseStudyData.tags}
      heroVideo={caseStudyData.heroVideo}
      sections={caseStudyData.sections}
      projectLink={caseStudyData.projectLink}
      gradientClasses={caseStudyData.gradientClasses}
      seoTitle="Investor Loan Portfolio Management Platform UX Design | Hiram Barsky"
      seoDescription="Modernized Excel-based loan management with intuitive portfolio dashboard, real-time analytics, and streamlined investor workflows."
      seoImage="https://barskydesign.pro/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png"
      projectName="Investor Loan Portfolio Management Platform"
    />
  );
};

export default StructuredInvestorLoanCaseStudy;
