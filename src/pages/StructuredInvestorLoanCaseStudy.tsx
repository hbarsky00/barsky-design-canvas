import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredInvestorLoanCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="investor-loan-app"
    title="Investor Loan Platform"
    description="Replacing Excel as the system of record for multi-million-dollar loan deals, without anyone losing the workflow they already had."
    tags={["Enterprise", "FinTech", "Workflow Design"]}
    meta={[{ label: "Role", value: "Lead UX Designer" }]}
    heroImage={{
      src: "/images/investor-loan-app/hero.webp",
      alt: "Loan Deals grid and Orderbook with live comments, shown across two screens",
      hoverVideo: "/investor-loan-deals.mp4",
      width: 1500,
      height: 1125,
    }}
    blocks={[
      {
        heading: "Why I Built It",
        paragraphs: [
          "A bank was running its loan operations in Excel. Deals worth millions of dollars, no audit trail, no validation, and no way to tell who changed what.",
          "Three teams had already tried to replace it and failed. I spent a while figuring out why before I designed anything, and the answer was the same every time: they all tried to improve parts of the job the loan officers never asked to have improved.",
        ],
      },
      {
        heading: "Research and Ideation",
        paragraphs: [
          "I started by mapping the whole loan lifecycle on a whiteboard, from application through to audit, so I could see where the spreadsheet was actually holding things together and where it was quietly failing.",
          "Then I sketched the order builder rough and fast, because the thing I needed to test was the sequence, not the styling. Once the steps held up, I wrote the flow down as four moves: pick a deal, choose Cashless Roll or Book-builder, add an order or attest to one, update the grid. That is the version loan officers recognized as their own job, and it is the one that got adopted.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/investor-loan-app/whiteboarding.webp",
            alt: "Whiteboard mapping of the loan lifecycle from application through to audit",
            caption: "Mapping the lifecycle first, so I knew what Excel was really doing for them.",
            width: 512,
            height: 512,
          },
          {
            src: "/images/investor-loan-app/book-builder-lofi.png",
            alt: "Low-fidelity order builder wireframe for loan workflows",
            caption: "Low-fi on purpose. I was testing the sequence of steps, not the look.",
            width: 1529,
            height: 1113,
          },
          {
            src: "/images/investor-loan-app/user-journey.webp",
            alt: "The four-step workflow: select a deal, choose Cashless Roll or Book-builder, add an order or attest, update the grid",
            caption: "The four steps, written down. Officers read this and said yes, that is what I do.",
            width: 2250,
            height: 1360,
          },
        ],
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Validation runs inline as you type, so a malformed entry gets caught where it happens instead of at submit. You never see it when the entry is fine.",
          "I replaced filter panels with predictive search. Loan officers do not think in filters, they think in name fragments and deal codes, and they want the deal on screen in two keystrokes. That is a Bloomberg habit and it was the right one to design for here.",
          "The order builder walks you forward: pick the lender first, then the terms open up. It looks restrictive in a screenshot. In practice it stops people building an order against nothing.",
          "The audit trail sits right next to the record instead of in some admin tool nobody opens. That single decision is why compliance ended up arguing for the platform rather than against it.",
        ],
        videos: [
          {
            src: "/investor-loan-add-order.mp4",
            poster: "/images/investor-loan-app/add-order-poster.jpg",
            caption:
              "Add Order. The add, duplicate and remove controls stay disabled until a lender is chosen, and removing the last line tells you why instead of leaving you with an empty form.",
          },
        ],
        images: [
          {
            src: "/images/investor-loan-app/loan-officer.webp",
            alt: "Cashless Rolls Orderbook with the comments panel open, audit trail surfaced next to the record",
          },
        ],
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "My first version copied too much of Excel's structure. I was trying to keep the change small, and I ended up with something that was worse than the spreadsheet at being a spreadsheet and worse than the platform at being a platform.",
          "I also built dashboards too early. Nobody starts their day on a dashboard. They open a specific deal, because a specific deal is what someone is asking them about.",
        ],
        images: [
          {
            src: "/images/investor-loan-app/before-after.webp",
            alt: "Old Excel system next to the new Loan Central platform",
            caption: "The rewrite that finally stopped pretending to be Excel.",
          },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "They adopted it. On a project to replace a spreadsheet that is the only outcome that counts, and three attempts before mine never got there.",
        ],
        images: [
          {
            src: "/images/investor-loan-app/my-deals-list-view.jpg",
            alt: "My Deals with chat, share and invite, and per-deal progress tracking",
            width: 1440,
            height: 716,
          },
          {
            src: "/images/investor-loan-app/manage-loan-limits.jpg",
            alt: "Manage Loan Limits with utilization bars, total limit and available credit per borrower",
            width: 1080,
            height: 1097,
          },
        ],
      },
    ]}
  />
);

export default StructuredInvestorLoanCaseStudy;
