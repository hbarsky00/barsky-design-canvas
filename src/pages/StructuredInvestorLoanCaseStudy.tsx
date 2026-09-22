import React from "react";
import { getSimpleCaseStudyPageProps, SimpleCaseStudyPage } from "@/utils/simpleCaseStudyAdapter";

const StructuredInvestorLoanCaseStudy: React.FC = () => {
  const props = getSimpleCaseStudyPageProps("investor-loan-app");
  if (!props) return null;
  return <SimpleCaseStudyPage {...props} />;
};

export default StructuredInvestorLoanCaseStudy;
