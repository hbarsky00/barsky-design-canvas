import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredStipsCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="stips"
    title="Stips"
    description="Prediction markets you can actually read. Play money, real events, and a price that tells you the odds without making you do math."
    tags={["AI-Assisted Product", "Fintech UX", "Prediction Markets", "Solo Build"]}
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
          "Every one I opened looked like a trading terminal. Order books, spreads, share counts, position sizing. The question is simple. The interface isn't, so most people leave before they place anything.",
          "So the pitch is the whole product in one line — buy Yes or No on real events, every share pays $1 if you're right. $500 to start, no card, and it says play money on the way in.",
        ],
        images: [
          { src: "/images/stips/landing.jpg", alt: "The landing page — the whole idea in one line, with $500 play money and no card to start" },
        ],
      },
      {
        heading: "The Board",
        paragraphs: [
          "Every market carries its own price, close date and volume on the card, so you can scan the board and know what's worth opening without opening anything.",
          "Markets with no bets yet say \"Be the first to trade\" instead of showing an empty chart. A market nobody has touched is still worth reading — it just needs to say so.",
        ],
        images: [
          { src: "/images/stips/markets-board.jpg", alt: "The board — price, close date and volume on every card" },
        ],
      },
      {
        heading: "The Market",
        paragraphs: [
          "The price is the probability. A share pays $1 if you're right, so 67¢ means the crowd thinks it's about 67% likely. Most platforms make you work that out. I show both — 67¢ and 67% chance, in the same control, everywhere a price appears.",
          "The resolution rules sit on the market page, not in a help doc. What counts as settled, what happens if the event is postponed, which sources decide it. If it isn't clear what settles the market, the price doesn't mean anything.",
        ],
        images: [
          { src: "/images/stips/market-detail.jpg", alt: "The market page — the price as both cents and percent, with the resolution rules on the page" },
        ],
      },
      {
        heading: "The Ticket",
        paragraphs: [
          "The ticket does the math before you commit. Put $75 on Yes at 67¢ and it tells you you'd get back $111.94, up $36.94. No share counts, no implied odds in your head.",
          "The amount field says PLAY MONEY right where you're typing the number. If something looks like real-money betting and you're vague about it, people assume the worst.",
          "The signup wall comes last. You can pick a side, set an amount and see exactly what you'd win before it asks who you are. Asking first loses people who haven't figured out what they're signing up for.",
        ],
        images: [
          { src: "/images/stips/order-ticket.jpg", alt: "The order ticket — stake, payout and profit-if-correct all settled before you buy" },
        ],
      },
      {
        heading: "What I Got Wrong",
        paragraphs: [
          "Markets are generated from news on a schedule, which meant an AI writing close dates. Models don't have a clock. The first batches came out already expired. The fix was boring: put today's date in the prompt and validate every date before it reaches the board.",
          "The second one cost me more time. I did most of my testing signed out, because it's faster to just look at a page. Signed out, row-level security returns nothing instead of an error — so every bug that only existed for logged-in users looked like an empty state working correctly. I didn't find them until I started testing as a real account.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Stips is live at stips.bet. Markets pulled from the news on a schedule, prices that read as probabilities, and a full bet you can build before anyone asks who you are.",
          "It's early and the board is small. The part worth showing is that it runs end to end — design, front end, database, auth, and the scheduled jobs that keep it from going stale.",
        ],
      },
    ]}
  />
);

export default StructuredStipsCaseStudy;
