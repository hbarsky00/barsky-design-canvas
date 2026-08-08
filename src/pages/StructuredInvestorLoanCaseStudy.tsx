import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredInvestorLoanCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="investor-loan-app"
    title="Investor Loan Platform"
    description="Replacing Excel as the system of record for multi-million-dollar loan deals — without anyone losing their workflow."
    tags={["Enterprise", "FinTech", "Workflow Design"]}
    heroImage={{
      src: "/images/investor-loan-app/hero.png",
      alt: "Investor loan analysis dashboard overview",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "A bank running loan ops in Excel. Multi-million-dollar deals, no audit trail, no validation.",
          "Three previous replacement attempts had failed because they tried to improve things officers didn't want changed.",
        ],
        images: [
          { src: "/images/investor-loan-app/loan-officer.jpg", alt: "User testing session showing loan officer workflow validation" },
        ],
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Inline validation catches malformed entries the moment they happen — invisible when right, obvious when wrong, no modals.",
          "Predictive search instead of filters: loan officers think in name fragments and deal codes, not filter panels.",
          "The audit trail sits next to the record, not buried in an admin tool — this is what made compliance actually advocate for adoption.",
        ],
        images: [
          { src: "/images/investor-loan-app/excel-error.jpg", alt: "Excel-based loan tracking spreadsheet with inconsistent fields and manual totals" },
          { src: "/images/investor-loan-app/before-after.png", alt: "Collage highlighting legacy manual steps and fragmentation" },
        ],
      },
      {
        heading: "The Design Calls That Mattered",
        paragraphs: [
          "Guided order builder with disabled forward steps: pick the lender, then terms become editable. Feels restrictive in screenshots, less restrictive in practice.",
          "Bloomberg-style search was the right call for this audience — analysts who know what they want and need to find it in two keystrokes.",
        ],
        images: [
          { src: "/images/investor-loan-app/book-builder-lofi.png", alt: "Low-fidelity order builder wireframe for loan workflows" },
          { src: "/images/investor-loan-app/whiteboarding.png", alt: "Whiteboard mapping of loan lifecycle from application to audit" },
        ],
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "First version replicated too much of Excel's structure to minimize cognitive change — worst of both worlds.",
          "Also over-invested in dashboards early. Officers don't start their day on a dashboard. They open a specific deal.",
        ],
        images: [
          { src: "/images/investor-loan-app/user-journey.png", alt: "Investor loan platform user workflow and process improvements" },
        ],
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
