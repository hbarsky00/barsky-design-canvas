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
      src: "/images/stips/landing.jpg",
      alt: "Stips landing — Trade on what happens next, with live Yes/No prices on real-world events",
      hoverVideo: "/stips-promo.mp4",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "A prediction market answers one question: how likely is this? The price tells you, because people are putting something behind the answer.",
          "Every one I opened looked like a trading terminal. Order books, spreads, share counts, position sizing. The question is simple. The interface isn't, so most people leave before they place anything.",
        ],
      },
      {
        heading: "How the Price Works",
        paragraphs: [
          "The price is the probability. A share pays $1 if you're right, so 67¢ means the crowd thinks it's about 67% likely. Most platforms make you work that out yourself. I show both — 67¢ and 67% chance, in the same control, everywhere a price appears.",
          "The ticket does the math before you commit. Put $75 on Yes at 67¢ and it tells you you'd get back $111.94, up $36.94. No share counts, no implied odds in your head.",
          "The resolution rules sit on the market page, not in a help doc. If it isn't clear what settles the market, the price doesn't mean anything.",
        ],
        images: [
          { src: "/images/stips/order-ticket.jpg", alt: "The order ticket — 67¢ and 67% chance together, with the payout and profit worked out before you buy" },
        ],
      },
      {
        heading: "Play Money, Said Up Front",
        paragraphs: [
          "Everyone starts with $500 and no card. The amount field says PLAY MONEY right where you're typing the number, not in a footer nobody reads.",
          "If something looks like real-money betting and you're vague about it, people assume the worst. So I say it up front and the rest of the interface gets believed.",
        ],
      },
      {
        heading: "Built for the Thumb",
        paragraphs: [
          "Most people get here from a link on their phone. So placing a bet is a sheet that slides up under your thumb — outcome, amount, quick-add chips and payout all in reach without scrolling.",
          "The signup wall comes last. You can browse the board, open a market, pick a side, set an amount and see exactly what you'd win before it asks who you are. Asking first loses people who haven't figured out what they're signing up for.",
        ],
        images: [
          { src: "/images/stips/mobile-bet-sheet.jpg", alt: "The mobile bet sheet — stake and payout settled before the signup prompt appears" },
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
        images: [
          { src: "/images/stips/markets-board.jpg", alt: "The live board — every market carries its Yes/No price, close date and volume" },
        ],
      },
    ]}
  />
);

export default StructuredStipsCaseStudy;
