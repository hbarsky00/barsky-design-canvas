import React from "react";
import { getSimpleCaseStudyPageProps, SimpleCaseStudyPage } from "@/utils/simpleCaseStudyAdapter";

const StructuredCryptoCaseStudy: React.FC = () => {
  const props = getSimpleCaseStudyPageProps("crypto");
  if (!props) return null;
  return <SimpleCaseStudyPage {...props} />;
};

export default StructuredCryptoCaseStudy;
