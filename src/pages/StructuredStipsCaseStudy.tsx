import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredStipsCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="stips"
    title="Stips"
    description="You can read prediction markets. They use play money, are based on real events, and give you the odds through a price so you don't have to do any math."
    tags={["AI-Assisted Product", "Fintech", "Prediction Markets", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://stips.bet"
    heroImage={{
      // Was card-poster.jpg, which is 99.9% identical to the order-ticket
      // screenshot further down — the hero and a body image were the same
      // screen. The board is what the product actually is, and it looks like
      // nothing else on the page.
      src: "/images/stips/landing.webp",
      alt: "Stips landing: buy Yes or No on real-world events, $500 in play money to start",
      hoverVideo: "/stips-promo.mp4",
      caption: "$500 in play money and a simple question; it's stated upfront as the play money when you enter, before any question is asked.",
      width: 1600,
      height: 900,
    }}
    relatedPost={{
      slug: "if-you-make-people-do-math",
      title: "If You Make People Do Maths, They Guess or They Leave",
      blurb: "A price of 67\u00a2 tells you the odds are 67%. Almost nobody works that out in their head, and the ones who try get it wrong. Do the arithmetic for them.",
    }}
    blocks={[
      {
        heading: "Every One of These Looks Like a Bloomberg Terminal",
        paragraphs: [
          "A prediction market deals with one question, namely how likely something is, and the price shows this since people are betting on the answer.",
          "All the prediction markets that I set up resembled a Bloomberg terminal, with their order books, spreads, number of shares, and the way positions were sized. Although the questions were simple, the screens were complex, and as a result people would leave without placing any bets.",
          "The entire offer had to be contained within a single line. If you buy Yes or No based on actual events, each share will pay you $1 if you are correct. You begin with $500, there is no card, and it states that it's play money when you join.",
        ],
        images: [
          {
            src: "/images/stips/fig-news-to-board.svg",
            alt: "A pipeline: news on a schedule, AI drafts markets, today's date in the prompt, on the board, buy Yes or No with play money, resolves at one dollar a share; markets with a close date already past drop out at the date step",
            caption: "The pipeline following the repair. The date injection and the validation stage are the two boxes which, when the first batch was launched, had already expired.",
            width: 1150,
            height: 400,
          },
        ],
      },
      {
        heading: "The Board",
        paragraphs: [
          "The price, the close date and the volume are all printed on the card for each market, which means you can look at the board without having to open anything. Those markets in which no bets have been placed show 'Be the first to trade'. If the chart had been empty it would have said the opposite.",
        ],
        images: [
          { src: "/images/stips/markets-board.webp", alt: "The board: price, close date and volume on every card", caption: "The caption states that the price, the deadline and the volume should be displayed on each card so that the board can be read without having to open anything, and in markets where there are no bets it says \"Be the first to trade\" instead of showing a blank chart.",
 width: 1600,
 height: 900,
    },
        ],
      },
      {
        heading: "The Market, Before and After You Pick",
        paragraphs: [
          "The screen displays two different situations. When nothing has been selected on the left side, the panel simply shows both the prices and their meaning in plain percentages. On the right hand side, however, I've chosen Yes and entered $75 beside it, and the panel has then carried out the calculation: $111.94 would be returned if I am correct, of which $36.94 represents the profit.",
          "People shouldn't have to work out in their heads what 67 cents per share means in relation to their own investment, and if you do make them do so, they'll have to make a guess, and a guess is something nobody feels pleased about.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/stips/market-detail.webp",
            alt: "Stips market page before choosing an outcome: Yes 67¢, No 33¢, with the resolution rules underneath",
            caption: "Initially, both prices, the rules which determine them, and no mathematics being required of you at this stage.",
            width: 1600,
            height: 900,
          },
          {
            src: "/images/stips/order-ticket.webp",
            alt: "The same market with Yes selected and $75 staked: to win $111.94, profit if correct $36.94",
            caption: "Once the stake has been chosen, the payout and profit will have been calculated before you commit a single cent.",
            width: 1600,
            height: 900,
          },
        ],
      },
      {
        heading: "Two Things I Got Wrong",
        paragraphs: [
          "Market creation takes place on a set schedule, so the AI has to be given the closing dates. Since the models don't have a clock, my initial batches turned out to be already expired, which is a rather foolish method of launching a prediction market. The solution was simple: include today's date in the prompt and then check all the dates before they appear on the board.",
          "The second one ended up costing me more since I was testing while signed out as that method is quicker, and when you're signed out row-level security simply returns nothing rather than generating an error, so each bug that only occurs when you're logged in appeared as if the empty state was working correctly. It wasn't until I began testing with an actual account that I discovered any of them.",
        ],
        images: [
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "A price board can only give four responses: yes, no, neutral, or closing. Each of these colours is assessed in relation to the surface onto which it is actually applied, since the earlier set was adjusted by eye and all four options failed the contrast test.",
        ],
        images: [
          { src: "/images/stips/design-system.webp", alt: "Stips design tokens: Manrope and Inter, the canvas/card/line surfaces, and the four semantic colours with the contrast failures they replaced", caption: "Four of the tokens were failing the AA tests and were causing more than four hundred contrast failures in the app; the remedy was to fix them at the token level.",
 width: 1500,
 height: 913,
    },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "The event is taking place on stips.bet and the money used is not real; everyone is given $500 in play money so that you can find out how a prediction market works without having to risk any actual money.",
          "The only things that are genuine are the ones you're placing your bet on. Since the markets are updated according to a set timetable based on actual news, the board ends up containing the same items that people have already discussed: a fight card, a rate decision, an election, and whether a company ships a product by a certain date. There are genuine questions, definite deadlines, and real resolution criteria stated on the page. Play money is placed on a board that acts just like the real one.",
          "At the moment, my focus is on getting people to try it. The product functions fully throughout the entire process, covering the design phase all the way through to the front end, including the database, authentication, and the scheduled jobs which prevent the board from becoming outdated when no one is looking, and it's getting it in front of people that I'm concentrating on.",
        ],
      },
    ]}
  />
);

export default StructuredStipsCaseStudy;
