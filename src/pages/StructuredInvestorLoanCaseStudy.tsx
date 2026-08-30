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
      src: "/images/investor-loan-app/loan-officer.webp",
      alt: "Loan Deals grid and Orderbook with live comments, shown across two screens",
      hoverVideo: "/investor-loan-deals.mp4",
      width: 1500,
      height: 1125,
      caption: "The deals grid and the orderbook, with the audit trail sitting next to the record instead of in an admin tool nobody opens.",
    }}
    relatedPost={{
      slug: "you-dont-replace-excel-by-being-better",
      title: "You Don't Replace Excel by Being Better Than Excel",
      blurb: "A bank was running multi-million-dollar loan deals in spreadsheets. The software that replaces that has to lose to Excel on flexibility and win on\u2026",
    }}
    blocks={[
      {
        heading: "Millions of Dollars, Run Out of a Spreadsheet",
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
          {
            src: "/images/investor-loan-app/before-after.webp",
            alt: "The old Excel system beside the new Loan Central platform",
            caption: "The same four moves, before and after. Excel on the left could already do all of it \u2014 just with nothing stopping you getting it wrong.",
            width: 768,
            height: 512,
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
        images: [
          {
            src: "/images/investor-loan-app/hero.webp",
            alt: "Loan Deals grid and Orderbook with live comments, shown across two screens",
            caption: "Predictive search in place of filter panels. Loan officers think in name fragments and deal codes, and want the deal on screen in two keystrokes.",
          },
        ],
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "My first version copied too much of Excel's structure. I was trying to keep the change small, and I ended up with something that was worse than the spreadsheet at being a spreadsheet and worse than the platform at being a platform.",
          "I also built dashboards too early. Nobody starts their day on a dashboard. They open a specific deal, because a specific deal is what someone is asking them about.",
          "The landing page below is the version that made that obvious. Every deal in the book as a card, twenty-two thousand of them, sorted by borrower. It is a perfectly reasonable screen and it answers a question nobody was asking. What replaced it is the list further down this page, with predictive search on top, because the real first move of the day is finding one deal by name.",
        ],
        images: [
          {
            src: "/images/investor-loan-app/deal-central-wireframe.webp",
            alt: "Loan Central landing page in wireframe \u2014 My Deals, Live Deals and All Deals tabs above a grid of deal cards showing borrower, industry, region, status and deal size, with 22,934 deals in the header",
            caption: "22,934 deals as cards. The count in the corner is the tell: a screen that opens on everything is a screen that has not decided what you came for.",
            width: 1440,
            height: 1058,
          },
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "One institutional blue that only ever means \"you can act here\", and three status colours that only ever mean deal state. Everything sits on a 4px grid, in Inter, chosen because it holds up at the small sizes a dense loan table forces on you.",
          "Nothing else gets colour. In a product where the numbers are eight figures, decoration reads as a bug.",
        ],
        images: [
          {
            src: "/images/investor-loan-app/design-system.webp",
            alt: "Investor Loan Platform design tokens \u2014 Inter and its type scale, the 4px spacing grid and radii, Primary Blue with its hover state, two greys, and the three status colours, plus buttons, form elements, status badges and the card",
            caption: "The token set the platform actually runs on. Primary Blue is the only colour an action ever uses; the three status colours are reserved for deal state and nothing else.",
            width: 1500,
            height: 1391,
          },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "They adopted it. Three teams tried before me and none of them got there.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/investor-loan-app/my-deals-list-view.jpg",
            alt: "My Deals with chat, share and invite, and per-deal progress tracking",
            width: 1440,
            height: 716,
            caption: "My Deals. The screen loan officers recognised as their own job, which is why this attempt got adopted and three before it didn't.",
          },
          {
            src: "/images/investor-loan-app/manage-loan-limits.jpg",
            alt: "Manage Loan Limits with utilization bars, total limit and available credit per borrower",
            width: 1080,
            height: 1097,
            caption: "Utilisation, total limit and available credit per borrower. These are the numbers the spreadsheet was holding with no validation behind them.",
          },
        ],
      },
    ]}
  />
);

export default StructuredInvestorLoanCaseStudy;
