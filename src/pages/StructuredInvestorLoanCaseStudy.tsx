import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredInvestorLoanCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="investor-loan-app"
    title="Investor Loan Platform"
    description="Replacing Excel as the system of record for multi-million-dollar loan deals — without anyone losing their workflow."
    tags={["Enterprise", "FinTech", "Workflow Design"]}
    meta={[{ label: "Role", value: "Lead UX Designer" }]}
    heroImage={{
      // A frame from the hover video, so hovering continues the shot instead of
      // cutting from a 4:3 studio mockup to a 2.05 screen recording — which is
      // what the two-monitors hero.png did, and why the clip played back
      // cropped and magnified.
      src: "/images/investor-loan-app/hero-poster.jpg",
      alt: "Loan Deals grid — every deal's amount, borrower, participants and progress on one screen",
      hoverVideo: "/investor-loan-deals.mp4",
      width: 1474,
      height: 720,
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "A bank running loan ops in Excel. Multi-million-dollar deals, no audit trail, no validation.",
          "Three previous replacement attempts had failed because they tried to improve things officers didn't want changed.",
        ],
        // The standalone Excel screenshot lived here, and the same spreadsheet
        // is already the left half of the old-vs-new comparison further down.
        // One showing of it is the point; two is filler.
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Inline validation catches malformed entries the moment they happen — invisible when right, obvious when wrong, no modals.",
          "Predictive search instead of filters: loan officers think in name fragments and deal codes, not filter panels.",
          "The audit trail sits next to the record, not buried in an admin tool — this is what made compliance actually advocate for adoption.",
        ],
        videos: [
          {
            src: "/investor-loan-add-order.mp4",
            poster: "/images/investor-loan-app/add-order-poster.jpg",
            caption:
              "Add Order. The add, duplicate and remove controls stay disabled until a lender is chosen; remove the last line and it falls back to telling you why, rather than showing an empty form.",
          },
        ],
        images: [
          { src: "/images/investor-loan-app/loan-officer.jpg", alt: "Cashless Rolls Orderbook with the comments panel open — audit trail surfaced next to the record" },
        ],
      },
      {
        heading: "The Design Calls That Mattered",
        paragraphs: [
          "Guided order builder with disabled forward steps: pick the lender, then terms become editable. Feels restrictive in screenshots, less restrictive in practice.",
          "Bloomberg-style search was the right call for this audience — analysts who know what they want and need to find it in two keystrokes.",
        ],
        imageLayout: "pair",
        images: [
          { src: "/images/investor-loan-app/book-builder-lofi.png", alt: "Low-fidelity order builder wireframe for loan workflows", width: 1529, height: 1113 },
          { src: "/images/investor-loan-app/whiteboarding.png", alt: "Whiteboard mapping of loan lifecycle from application to audit", width: 512, height: 512 },
          { src: "/images/investor-loan-app/user-journey.png", alt: "The four-step workflow — select a deal, choose Cashless Roll or Book-builder, add an order or attest, update the grid — the flow loan officers actually adopted", width: 2250, height: 1360 },
        ],
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "First version replicated too much of Excel's structure to minimize cognitive change — worst of both worlds.",
          "Also over-invested in dashboards early. Officers don't start their day on a dashboard. They open a specific deal.",
        ],
        images: [
          { src: "/images/investor-loan-app/before-after.png", alt: "Old Excel system vs. the new Loan Central platform — the rewrite that finally looked and behaved differently from Excel" },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Adoption happened — which for an Excel-replacement project is the only outcome that matters.",
          "Three previous attempts hadn't gotten that far.",
        ],
        images: [
          { src: "/images/investor-loan-app/my-deals-list-view.jpg", alt: "My Deals — collaboration tools (chat, share, invite) with per-deal progress tracking", width: 1440, height: 716 },
          { src: "/images/investor-loan-app/manage-loan-limits.jpg", alt: "Manage Loan Limits — utilization bars, total limit, and available credit surfaced per borrower", width: 1080, height: 1097 },
        ],
      },
    ]}
  />
);

export default StructuredInvestorLoanCaseStudy;
