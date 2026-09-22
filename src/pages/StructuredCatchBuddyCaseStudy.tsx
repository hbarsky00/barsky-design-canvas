import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";
import { getSimpleCaseStudyPageProps } from "@/utils/simpleCaseStudyAdapter";

const StructuredCatchBuddyCaseStudy: React.FC = () => {
  const props = getSimpleCaseStudyPageProps("catchbuddy");
  if (!props) return null;
  return (
    <SimpleCaseStudyPage
      {...props}
      overviewUrl="/project/catchbuddy"
    />
  );
};

export default StructuredCatchBuddyCaseStudy;
