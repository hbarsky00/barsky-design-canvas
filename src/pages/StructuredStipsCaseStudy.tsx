import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredStipsCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="stips"
    title="Stips"
    description="Prediction markets you can actually read. Play-money trading on real-world events, where the price is the probability — designed and built solo."
    tags={["AI-Assisted Product", "Fintech UX", "Prediction Markets", "Solo Build"]}
    liveUrl="https://stips.bet"
    heroImage={{
      src: "/images/stips/landing.jpg",
      alt: "Stips landing — Trade on what happens next, with live Yes/No prices on real-world events",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "A prediction market answers one simple question: how likely is this, according to people willing to put something behind the answer? It's one of the clearest signals you can get.",
          "Then you open one, and it's a trading terminal. Order books, bid/ask spreads, share counts, position sizing. The question is simple and the interface is not, so the people who'd get the most out of it bounce before they ever place anything.",
        ],
      },
      {
        heading: "Making the Price Say What It Means",
        paragraphs: [
          "The whole design rests on one idea: in a market like this the price already is the probability. A share that pays out $1 if you're right, trading at 67¢, means the crowd thinks it's about 67% likely. Every other interface makes you know that. This one just says it — 67¢ and \"67% chance\" sit together, in the same control, every time a price appears.",
          "The order ticket does the arithmetic before you commit, not after. Pick an outcome, set a stake, and it tells you what you'd get back and what the profit is if you're right — $75 at 67¢ a share returns $111.94, so you're up $36.94. No share-count math, no working out implied odds in your head.",
          "The rules live on the market page, not in a help doc. What counts as resolved, what happens if the event is postponed, which sources decide it. If the resolution is ambiguous the whole price is meaningless, so it gets the same weight as the price itself.",
        ],
        images: [
          { src: "/images/stips/market-detail.jpg", alt: "Market detail — the price shown as both cents and percent chance, with resolution criteria on the page" },
          { src: "/images/stips/order-ticket.jpg", alt: "Order ticket — stake, payout, and profit-if-correct all calculated before you commit" },
        ],
      },
      {
        heading: "Play Money, Said Out Loud",
        paragraphs: [
          "Stips runs on play money. Everyone starts with $500 and no card, and the product never pretends otherwise — the amount field is labelled AMOUNT · PLAY MONEY at the moment you're typing a number into it, not in a disclaimer nobody reads.",
          "That's a trust decision, not a legal one. Anything that looks like a real-money betting product while being coy about it earns exactly the suspicion it deserves. Saying it plainly at the point of entry is what makes the rest of the interface believable.",
        ],
        images: [
          { src: "/images/stips/markets-board.jpg", alt: "The markets board — every card carries its Yes/No price, close date, and volume" },
        ],
      },
      {
        heading: "Designing for the Thumb",
        paragraphs: [
          "Most people meet this on a phone, from a link someone sent them. So the mobile path isn't a narrowed desktop layout — placing a bet is a bottom sheet that comes up under your thumb with the outcome, the stake, the quick-add chips and the payout all in reach without scrolling.",
          "The account wall sits at the last possible moment. A guest can browse the board, open a market, pick a side, set an amount and see exactly what they'd win — and only then does it say \"Sign up free to place this bet.\" Asking someone to register before they understand what they're registering for is how you lose them.",
        ],
        images: [
          { src: "/images/stips/mobile-board.jpg", alt: "Mobile markets board — full price and close date per card, sized for scanning with a thumb" },
          { src: "/images/stips/mobile-bet-sheet.jpg", alt: "Mobile bet sheet — stake and payout resolved before the signup prompt appears" },
        ],
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "The markets are generated from real news on a schedule, which meant handing a language model the job of writing a question with a close date. Models don't have a clock. Ask one for an event \"next week\" and it will happily answer relative to whenever its training data ends, so the first batches produced markets that were already expired the moment they were published. The fix was unglamorous: inject today's date into the prompt and validate every generated date before anything reaches the board.",
          "The second one cost more time. I did most of my testing signed out, because that's the fastest way to look at a page — and signed out, the database's row-level security returns an empty result rather than an error. So a whole class of bugs that only existed for signed-in users looked, to me, like empty states working correctly. Nothing surfaced until I started testing as a real logged-in account. Guest testing hides exactly the problems your actual users have.",
        ],
        images: [
          { src: "/images/stips/mobile-market-detail.jpg", alt: "The signed-out market view — the state I was testing in, which quietly hid every authenticated bug" },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Stips is live at stips.bet: markets generated from the news on a schedule, prices that read as probabilities, and a full bet you can build before anyone asks who you are.",
          "It's early and the board is small — the interesting part isn't the numbers yet, it's that the thing runs end to end. Design, front end, database, auth, and the scheduled jobs that keep the board from going stale.",
        ],
        videos: [
          {
            src: "/stips-promo.mp4",
            poster: "/images/stips/markets-board.jpg",
            caption:
              "A run through the live product — browsing the board, opening a market, and building a bet from the mobile sheet.",
          },
        ],
      },
    ]}
  />
);

export default StructuredStipsCaseStudy;
