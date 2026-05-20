import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredInvestorLoanCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="investor-loan-app"
    title="Investor Loan Platform"
    description="Replacing Excel as the system of record for multi-million-dollar loan deals — without anyone losing their workflow."
    tags={["Enterprise", "FinTech", "Workflow Design"]}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "A bank running loan ops in Excel. Multi-million-dollar deals, no audit trail, no validation.",
          "Three previous replacement attempts had failed because they tried to improve things officers didn't want changed.",
        ],
        image: {
          src: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
          alt: "User testing session showing loan officer workflow validation",
        },
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Inline validation catches malformed entries the moment they happen — invisible when right, obvious when wrong, no modals. Predictive search instead of filters: loan officers think in name fragments and deal codes, not filter panels.",
          "The audit trail sits next to the record, not buried in an admin tool — this is the feature that made compliance actually advocate for adoption.",
        ],
        image: {
          src: "https://barskyux.com/wp-content/uploads/2025/08/excelterror.jpg",
          alt: "Excel-based loan tracking spreadsheet",
        },
      },
      {
        heading: "The Design Calls That Mattered",
        paragraphs: [
          "Guided order builder with disabled forward steps: pick the lender, then terms become editable. Feels restrictive in screenshots, less restrictive in practice.",
          "Bloomberg-style search was the right call for this audience — analysts who know what they want and need to find it in two keystrokes.",
        ],
        image: {
          src: "https://barskyux.com/wp-content/uploads/2023/12/BookBuilder-Low-Fidelity.png",
          alt: "Low-fidelity order builder wireframe",
        },
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "First version replicated too much of Excel's structure to minimize cognitive change. Worst of both worlds — looked like Excel, didn't behave like it. Rewrite went the other direction entirely.",
          "Also over-invested in dashboards early. Officers don't start their day on a dashboard. They open a specific deal.",
        ],
        image: {
          src: "/lovable-uploads/6e0291a5-2519-4b89-8402-44a9b8a27cf0.png",
          alt: "Investor loan platform user workflow improvements",
        },
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Adoption happened — which for an Excel-replacement project is the only outcome that matters.",
          "Three previous attempts hadn't gotten that far.",
        ],
      },
    ]}
  />
);

export default StructuredInvestorLoanCaseStudy;
