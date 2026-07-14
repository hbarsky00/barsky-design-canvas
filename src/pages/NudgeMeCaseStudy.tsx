import React from "react";
import { getSimpleCaseStudyPageProps, SimpleCaseStudyPage } from "@/utils/simpleCaseStudyAdapter";

const NudgeMeCaseStudy: React.FC = () => {
  const props = getSimpleCaseStudyPageProps("nudgeme");
  if (!props) return null;
  return <SimpleCaseStudyPage {...props} />;
};

export default NudgeMeCaseStudy;
