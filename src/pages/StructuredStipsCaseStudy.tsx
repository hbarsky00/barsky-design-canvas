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
      // Was card-poster.jpg, which is 99.9% identical to the order-ticket
      // screenshot further down — the hero and a body image were the same
      // screen. The board is what the product actually is, and it looks like
      // nothing else on the page.
      src: "/images/stips/landing.jpg",
      alt: "Stips landing — buy Yes or No on real-world events, $500 in play money to start",
      hoverVideo: "/stips-promo.mp4",
      caption: "$500 of play money and a plain question. It says play money on the way in, before anyone has to ask.",
    }}
    relatedPost={{
      slug: "if-you-make-people-do-math",
      title: "If You Make People Do Maths, They Guess or They Leave",
      blurb: "A price of 67\u00a2 tells you the odds are 67%. Almost nobody works that out in their head, and the ones who try get it wrong. Do the arithmetic for them.",
    }}
    blocks={[
      {
        heading: "Why I Built It",
        paragraphs: [
          "A prediction market answers one question: how likely is this? The price tells you, because people are putting something behind the answer.",
          "Every prediction market I opened looked like a Bloomberg terminal. Order books, spreads, share counts, position sizing. The question underneath is simple and the screen in front of you is not, so people leave before placing anything.",
          "So the pitch is the product in one line: buy Yes or No on real events, every share pays $1 if you're right. $500 to start, no card, and it says play money on the way in.",
        ],
      },
      {
        heading: "The Board",
        paragraphs: [
          "Every market carries its price, close date and volume on the card, so you can scan the board without opening anything. Markets with no bets yet say \"Be the first to trade\" rather than showing an empty chart.",
        ],
        images: [
          { src: "/images/stips/markets-board.webp", alt: "The board — price, close date and volume on every card", caption: "Price, close date and volume on every card, so the board reads without opening anything. Markets with no bets say \"Be the first to trade\" rather than showing an empty chart." },
        ],
      },
      {
        heading: "The Market, Before and After You Pick",
        paragraphs: [
          "Same screen, two states. On the left nothing is chosen yet, so the panel just shows you both prices and what they mean in plain percentages. On the right I have picked Yes and put $75 on it, and the panel has done the arithmetic: $111.94 back if I am right, $36.94 of that is profit.",
          "That is the whole reason the ticket exists. Nobody should have to work out what 67¢ a share means for their stake in their head, and if you make them, they will either guess or leave.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/stips/market-detail.jpg",
            alt: "Stips market page before choosing an outcome — Yes 67¢, No 33¢, with the resolution rules underneath",
            caption: "Before: both prices, the rules that settle it, and no maths asked of you yet.",
          },
          {
            src: "/images/stips/order-ticket.jpg",
            alt: "The same market with Yes selected and $75 staked — to win $111.94, profit if correct $36.94",
            caption: "After: stake picked, payout and profit worked out before you commit a cent.",
          },
        ],
      },
      {
        heading: "Two Things I Got Wrong",
        paragraphs: [
          "Markets get generated from the news on a schedule, which means an AI is writing the close dates. Models have no clock. My first batches came out already expired, which is a very silly way to launch a prediction market. The fix was boring. Put today's date in the prompt, then validate every date before it reaches the board.",
          "The second one cost me more. I was testing signed out because it is faster. Signed out, row-level security quietly returns nothing rather than an error, so every bug that only happens when you are logged in just looked like an empty state behaving correctly. I did not find any of them until I started testing as a real account.",
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "A board of prices only has four things to say — yes, no, neutral, closing. Every one of those colours is measured against the surface it is actually painted on, because the previous set was tuned by eye and all four failed.",
        ],
        images: [
          { src: "/images/stips/design-system.webp", alt: "Stips design tokens — Manrope and Inter, the canvas/card/line surfaces, and the four semantic colours with the contrast failures they replaced", caption: "Four tokens were failing AA and producing over four hundred contrast failures across the app. Fixing them at the token was the whole repair." },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "It's live at stips.bet and the money is fake. Everyone starts with $500 of play money, and that's on purpose — I wanted people to learn how a prediction market reads without putting anything real on the table.",
          "What isn't fake is what you're betting on. The markets get pulled from actual news on a schedule, so the board fills with the same things people already argue about — a fight card, a rate decision, an election, whether a company ships something by a date. Real questions, real close dates, real resolution criteria written on the page. Play money sitting on top of a board that behaves like the real thing.",
          "Right now the job is getting people to try it. That's the honest state of it — the product works end to end, design through front end through database, auth and the scheduled jobs that keep the board from going stale while nobody's looking. Getting it in front of people is what I'm working on.",
        ],
      },
    ]}
  />
);

export default StructuredStipsCaseStudy;
