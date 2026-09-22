import React from "react";
import { getSimpleCaseStudyPageProps, SimpleCaseStudyPage } from "@/utils/simpleCaseStudyAdapter";

const RoiDesignBuilderCaseStudy: React.FC = () => {
  const props = getSimpleCaseStudyPageProps("roi-design-builder");
  if (!props) return null;
  return <SimpleCaseStudyPage {...props} />;
};

export default RoiDesignBuilderCaseStudy;
