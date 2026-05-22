import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const RoiDesignBuilderCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="roi-design-builder"
    title="ROI Design Builder"
    description="A calculator and presentation tool that helps designers build the business case for design investment."
    tags={["Concept", "Enterprise", "Stakeholder Tools", "Coming Soon"]}
    heroImage={{
      src: "/images/default-og-image.jpg",
      alt: "ROI Design Builder concept",
    }}
    blocks={[
      {
        heading: "Coming Soon",
        paragraphs: [
          "A calculator and presentation tool that helps designers build the business case for design investment.",
          "This concept is in active design. Check back soon for the full case study.",
        ],
      },
    ]}
  />
);

export default RoiDesignBuilderCaseStudy;
