import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const QrCodeBuilderCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="qr-code-builder"
    title="QR Code Builder"
    description="A tool for generating branded QR codes with built-in analytics and style customization."
    tags={["Concept", "Gen AI", "Tool Design", "Coming Soon"]}
    heroImage={{
      src: "/images/default-og-image.jpg",
      alt: "QR Code Builder concept",
    }}
    blocks={[
      {
        heading: "Coming Soon",
        paragraphs: [
          "A tool for generating branded QR codes with built-in analytics and style customization.",
          "This concept is in active design. Check back soon for the full case study.",
        ],
      },
    ]}
  />
);

export default QrCodeBuilderCaseStudy;
