import React from "react";
import { getSimpleCaseStudyPageProps, SimpleCaseStudyPage } from "@/utils/simpleCaseStudyAdapter";

const StructuredHerbalinkCaseStudy: React.FC = () => {
  const props = getSimpleCaseStudyPageProps("herbalink");
  if (!props) return null;
  return <SimpleCaseStudyPage {...props} />;
};

export default StructuredHerbalinkCaseStudy;
