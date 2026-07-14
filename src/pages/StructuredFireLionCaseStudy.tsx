import React from "react";
import { getSimpleCaseStudyPageProps, SimpleCaseStudyPage } from "@/utils/simpleCaseStudyAdapter";

const StructuredFireLionCaseStudy: React.FC = () => {
  const props = getSimpleCaseStudyPageProps("fire-lion");
  if (!props) return null;
  return <SimpleCaseStudyPage {...props} />;
};

export default StructuredFireLionCaseStudy;
