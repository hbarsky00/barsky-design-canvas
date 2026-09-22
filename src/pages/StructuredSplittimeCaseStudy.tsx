import React from "react";
import { getSimpleCaseStudyPageProps, SimpleCaseStudyPage } from "@/utils/simpleCaseStudyAdapter";

const StructuredSplittimeCaseStudy: React.FC = () => {
  const props = getSimpleCaseStudyPageProps("splittime");
  if (!props) return null;
  return <SimpleCaseStudyPage {...props} />;
};

export default StructuredSplittimeCaseStudy;
