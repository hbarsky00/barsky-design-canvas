import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredStipsCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="stips"
    title="Stips"
    description="Prediction markets you can actually read. Play money, real events, and a price that tells you the odds without making you do math."
    tags={["AI-Assisted Product", "Fintech UX", "Prediction Markets", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://stips.bet"
    heroImage={{
      // Poster is a frame from the walkthrough, so hover starts seamlessly.
      src: "/images/stips/card-poster.jpg",
      alt: "Stips market detail — Yes at 67¢ with the payout worked out before you buy",
      hoverVideo: "/stips-promo.mp4",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "A prediction market answers one question: how likely is this? The price tells you, because people are putting something behind the answer.",
          "Every one I opened looked like a trading terminal — order books, spreads, share counts, position sizing. The question is simple; the interface isn't, so people leave before placing anything.",
          "So the pitch is the product in one line: buy Yes or No on real events, every share pays $1 if you're right. $500 to start, no card, and it says play money on the way in.",
        ],
        images: [
          { src: "/images/stips/landing.jpg", alt: "The landing page — the whole idea in one line, with $500 play money and no card to start" },
        ],
      },
      {
        heading: "The Board",
        paragraphs: [
          "Every market carries its price, close date and volume on the card, so you can scan the board without opening anything. Markets with no bets yet say \"Be the first to trade\" rather than showing an empty chart.",
        ],
        images: [
          { src: "/images/stips/markets-board.jpg", alt: "The board — price, close date and volume on every card" },
        ],
      },
      {
        heading: "The Market",
        paragraphs: [
          "The price is the probability: a share pays $1, so 67¢ means the crowd thinks it's about 67% likely. Most platforms make you work that out. I show both, in the same control, everywhere a price appears.",
          "Resolution rules sit on the market page, not in a help doc — what settles it, what happens if the event is postponed, which sources decide. If that isn't clear, the price doesn't mean anything.",
        ],
        images: [
          { src: "/images/stips/market-detail.jpg", alt: "The market page — the price as both cents and percent, with the resolution rules on the page" },
        ],
      },
      {
        heading: "The Ticket",
        paragraphs: [
          "The ticket does the math before you commit: $75 on Yes at 67¢ returns $111.94, up $36.94. No share counts, no implied odds in your head. The amount field says PLAY MONEY right where you type the number.",
          "The signup wall comes last — pick a side, set an amount, see exactly what you'd win, all before it asks who you are.",
        ],
        images: [
          { src: "/images/stips/order-ticket.jpg", alt: "The order ticket — stake, payout and profit-if-correct all settled before you buy" },
        ],
      },
      {
        heading: "What I Got Wrong",
        paragraphs: [
          "Markets are generated from news on a schedule, which meant an AI writing close dates. Models don't have a clock. The first batches came out already expired. The fix was boring: put today's date in the prompt and validate every date before it reaches the board.",
          "The second cost more. I tested signed out because it's faster — and signed out, row-level security returns nothing instead of an error, so every logged-in bug looked like an empty state working correctly. I didn't find them until I tested as a real account.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Stips is live at stips.bet — markets pulled from the news on a schedule, prices that read as probabilities, and a full bet you can build before anyone asks who you are.",
          "It's early and the board is small. What's worth showing is that it runs end to end: design, front end, database, auth, and the scheduled jobs that keep it from going stale.",
        ],
      },
    ]}
  />
);

export default StructuredStipsCaseStudy;
