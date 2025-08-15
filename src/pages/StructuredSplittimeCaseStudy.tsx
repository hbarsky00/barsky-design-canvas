
import React from "react";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredSplittimeCaseStudy: React.FC = () => {
  const caseStudyData = getStructuredCaseStudy("splittime");
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
      seoTitle="40% Less Conflict: Splittime Co-Parenting App Design | Hiram Barsky"
      seoDescription="Reduced co-parenting conflict by 40% through neutral communication tools and clear scheduling features designed for family court compliance."
      seoImage="https://barskydesign.pro/images/desktop-signup-1.png"
      projectName="Splittime - Co-Parenting Communication Platform"
    />
  );
};

export default StructuredSplittimeCaseStudy;
