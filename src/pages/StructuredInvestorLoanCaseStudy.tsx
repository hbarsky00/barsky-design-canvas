import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredInvestorLoanCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="investor-loan-app"
    title="Investor Loan Platform"
    description="Giving up the use of Excel as the system for recording multi-million-dollar loan deals, without causing anyone to lose the workflow they already had."
    tags={["Enterprise", "Fintech", "Workflow Design"]}
    meta={[{ label: "Role", value: "Lead UX Designer" }]}
    heroImage={{
      src: "/images/investor-loan-app/loan-officer.webp",
      alt: "Loan Deals grid and Orderbook with live comments, shown across two screens",
      hoverVideo: "/investor-loan-deals.mp4",
      width: 1500,
      height: 1125,
      caption: "The deals grid and the order book have the audit trail alongside the record rather than in an admin tool which no one opens.",
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
          "The bank was carrying out its loan operations using Excel, with no audit trail, no validation, and no means of knowing who had made any changes to deals amounting to millions of dollars.",
          "Three teams had already attempted to replace it and failed. I took some time to work out the reason before I designed anything, and in each case the answer was that they had all tried to improve aspects of the job which the loan officers had never asked to be improved.",
        ],
        stats: [
          { value: "3", label: "Teams tried to replace the spreadsheet before this one" },
          { value: "8 figures", label: "The deal values it was tracking, with no validation behind them" },
          { value: "Adopted", label: "Where this attempt landed, and the three before it didn't" },
        ],
        images: [
        ],
      },
      {
        heading: "Research and Ideation",
        paragraphs: [
          "To begin with, I drew out the entire loan lifecycle on a whiteboard, taking it through from application to audit, in order that I might discover where the spreadsheet was actually holding everything together and where it was failing silently.",
          "I quickly drew up the order builder in a rough way since all I wanted to check was the sequence, not the styling. After I had confirmed that the steps were sound, I recorded the process as four actions: select a deal, choose either Cashless Roll or Book-builder, add an order or certify an existing one, and then update the grid. This version was the one that loan officers came to see as belonging to their own role and it was the one that was eventually adopted.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/investor-loan-app/whiteboarding.webp",
            alt: "Whiteboard mapping of the loan lifecycle from application through to audit",
            caption: "By first mapping out the lifecycle, I was able to see exactly what Excel was actually doing for them.",
            width: 512,
            height: 512,
          },
          {
            src: "/images/investor-loan-app/book-builder-lofi.webp",
            alt: "Low-fidelity order builder wireframe for loan workflows",
            caption: "Intentionally low-fi. I carried out the test of the sequence of steps; the look came afterwards.",
            width: 1529,
            height: 1113,
          },
          {
            src: "/images/investor-loan-app/user-journey.webp",
            alt: "The four-step workflow: select a deal, choose Cashless Roll or Book-builder, add an order or attest, update the grid",
            caption: "The four steps, as written down. The officers read it and agreed, yes, that's exactly what I do.",
            width: 2250,
            height: 1360,
          },
          {
            src: "/images/investor-loan-app/before-after.webp",
            alt: "The old Excel system beside the new Loan Central platform",
            caption: "The four moves, as they were at first and then afterwards. Excel on the left was already capable of carrying out all of them, although there was no prevention against making them wrong.",
            width: 768,
            height: 512,
          },
        ],
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Validation is carried out as you type, which means that if you enter incorrect information it will be detected at the point where you enter it rather than waiting until you submit it, and if the information is correct you will never see it.",
          "I substituted the filter panels with predictive search since loan officers don't think in terms of filters but rather in name fragments and deal codes and want the deal to appear on the screen after two keystrokes. That approach is in keeping with Bloomberg's way of doing things and was the appropriate one to adopt here.",
          "The order builder guides you forward, which means you have to choose the lender first before the terms become available. Although it appears restrictive in a screenshot, in reality it prevents people from creating an order with no lender.",
          "The record has the audit trail beside it and not in an admin tool which can be accessed by going through three menus. It was because of that single decision that compliance ended up supporting the platform rather than opposing it.",
        ],
        images: [
          {
            src: "/images/investor-loan-app/hero.webp",
            alt: "Loan Deals grid and Orderbook with live comments, shown across two screens",
            caption: "Instead of using filter panels, predictive search is used; loan officers work with fragments of names and deal codes and want the deal to appear on the screen after two key strokes.",
            width: 1500,
            height: 1125,
          },
        ],
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "In the first version I copied over too much of Excel's structure; although I had intended to make only minor changes, the result was worse than the original spreadsheet in terms of being a spreadsheet and worse than the original platform in terms of being a platform.",
          "I likewise constructed dashboards too early; no one begins their day by looking at a dashboard since they open a particular deal because that is the deal someone is asking them about.",
          "The version of the landing page described is the one which made this clear. Each deal in the book is presented as a card, there being twenty-two thousand of them, with the cards sorted by borrower. It is a completely sensible screen even though it responds to a question that no one had actually asked. The thing that has taken its place is the list lower down the page, with predictive search featured on top, since the actual first action of the day is to find a deal by name.",
        ],
        images: [
          {
            src: "/images/investor-loan-app/deal-central-wireframe.webp",
            alt: "Loan Central landing page in wireframe: My Deals, Live Deals and All Deals tabs above a grid of deal cards showing borrower, industry, region, status and deal size, with 22,934 deals in the header",
            caption: "There are 22,934 deals in the form of cards; the clue is in the corner: if a screen opens up to show everything then it's a screen that hasn't decided what you originally wanted.",
            width: 1440,
            height: 1058,
          },
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "The only institutional blue indicates \"you can act here\", and there are three status colours each of which always means deal state. All the elements are placed on a 4px grid, with Inter having been selected since it retains its clarity at the small sizes caused by the dense loan table.",
          "No other element is given any colour; in a product with eight-figure figures, decoration appears to be a bug.",
        ],
        images: [
          {
            src: "/images/investor-loan-app/design-system.webp",
            alt: "Investor Loan Platform design tokens: Inter and its type scale, the 4px spacing grid and radii, Primary Blue with its hover state, two greys, and the three status colours, plus buttons, form elements, status badges and the card",
            caption: "The token is the colour that the platform actually uses. Primary Blue is the only colour that an action ever makes use of. The three status colours are reserved for the deal state and for nothing else.",
            width: 1500,
            height: 1391,
          },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "They accepted it. Before I arrived, three teams had made the attempt but none of them had succeeded.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/investor-loan-app/my-deals-list-view.webp",
            alt: "My Deals with chat, share and invite, and per-deal progress tracking",
            width: 1440,
            height: 716,
            caption: "My Deals. The screen was recognised by the loan officers as being their own job, which is the reason why this attempt was adopted whereas the three previous ones weren't.",
          },
          {
            src: "/images/investor-loan-app/manage-loan-limits.webp",
            alt: "Manage Loan Limits with utilization bars, total limit and available credit per borrower",
            width: 1080,
            height: 1097,
            caption: "The total limit, available credit and usage per borrower. These were the figures held by the spreadsheet with no validation applied to them.",
          },
        ],
      },
    ]}
  />
);

export default StructuredInvestorLoanCaseStudy;
