import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredCryptoCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="crypto"
    title="Trading Without Friction"
    description="A crypto trading interface designed for two audiences the industry insists you have to choose between. Designed in full, never shipped."
    tags={["Fintech", "Crypto", "Product Design", "Dual-Mode UX"]}
    meta={[{ label: "Role", value: "Lead UX Designer" }]}
    heroImage={{
      src: "/images/crypto/hero.webp",
      alt: "Crypto trading dashboard on mobile and desktop",
      caption: "The same account on a phone and a desktop. One product in two modes, not two products.",
    }}
    relatedPost={{
      slug: "beginner-or-pro-is-a-false-choice",
      title: "Beginner or Pro Is a False Choice, and Both Sides Pay for It",
      blurb: "Easy apps hide complexity and charge for it. Pro apps expose everything and assume confidence you may not have. The split is a business decision…",
    }}
    blocks={[
      {
        heading: "Both Sides Pay for the Same Split",
        paragraphs: [
          "\"Easy\" crypto apps hide the complexity and charge a premium spread for the privilege. \"Pro\" apps put everything on screen and assume you brought your own confidence.",
          "The industry treats that as a segmentation choice. It isn't. Beginners pay hidden fees and never learn enough to graduate off them, which is the point. Pros pay a confirmation tax built for somebody else. Both audiences are being charged for the same decision, and neither one asked for it.",
        ],
        images: [
          { src: "/images/crypto/competitive.webp", alt: "Competitor teardown — \"easy\" apps hide the spread, \"pro\" apps assume you brought your own confidence", caption: "The teardown that started it. Easy apps hide the spread, pro apps assume you brought your own confidence, and both charge for the same decision." },
        ],
      },
      {
        heading: "A Setting, Not Two Products",
        paragraphs: [
          "The call the whole thing rests on: one platform, one shared core, and the mode is a setting you flip.",
          "The easier build is two products, and it's easier because it lets each one have its own roadmap. It also traps people. A beginner on a beginner product has to leave and start again somewhere else to grow, and that's the moment every one of these apps loses the customer they spent the most to acquire.",
          "Making it a setting means a beginner can see Pro exists before they're ready for it, and a pro can flip to Beginner to walk a friend through a trade without logging out of their own account.",
        ],
        images: [
          { src: "/images/crypto/site-map.webp", alt: "The two-mode architecture — one platform, shared core, mode as a setting rather than a separate product", caption: "One platform, one shared core, and the mode as a setting. A beginner can see Pro exists before they're ready for it." },
        ],
      },
      {
        heading: "Total Cost Next to the Button, Every Time",
        paragraphs: [
          "The most-fought decision, and the one I'd defend hardest. The full cost of the trade, spread included, sits next to the action button on every order. Not in a drawer, not behind an info icon, not on the confirmation screen after you've already decided.",
          "It's unpopular internally for an obvious reason: the spread is the revenue, and putting a number next to a button is the fastest way to make someone reconsider pressing it. The argument I'd make is that the hidden version only works while people don't know, and the day they find out you've taught them the product was designed against them.",
          "The second rule was plain language as a constraint rather than a copy pass at the end. If I couldn't explain a thing in one sentence, it either got explained inline or it came out of beginner mode entirely. That killed features, which is what a real constraint does.",
        ],
        images: [
          { src: "/images/crypto/initial-flow.webp", alt: "Initial concepts challenging crypto app conventions", caption: "First flows, drawn to break the conventions rather than inherit them. Total cost sits next to the action button on every order." },
          { src: "/images/crypto/design-thinking.webp", alt: "The design-thinking pass that produced the two-mode constraint", caption: "The pass that produced the constraint everything else hangs off: if I couldn't explain it in one sentence, it left beginner mode." },
        ],
      },
      {
        heading: "I Protected Beginners Until They Felt Patronised",
        paragraphs: [
          "The first beginner mode was smothered. Confirmations on everything, a tooltip on every term, and an onboarding tour that would not end. It tested badly and the reason was not what I expected — people didn't feel safe, they felt talked down to. Safety you can't switch off reads as an accusation.",
          "The fix was to explain on hover, confirm only above a threshold, and otherwise get out of the way.",
          "Pro mode failed in the opposite direction and I'd made the same mistake in reverse. I stripped it down for cleanliness and took out things pros actually used. Density is a feature for that audience. I was treating my own taste as a usability principle.",
        ],
        images: [
          { src: "/images/crypto/learning.webp", alt: "Failed prototype iterations — the over-protected beginner mode that tested as patronising", caption: "The prototype that failed. Confirmations on everything and a tour that wouldn't end — testers didn't feel safe, they felt talked down to." },
        ],
      },
      {
        heading: "Where It Actually Is",
        paragraphs: [
          "Nothing here shipped. There's no live product to go and press, and I'd rather say that at the top of this section than let the screens imply otherwise.",
          "What exists is the reasoning: the teardown of who each model is really charging, the decision to make mode a setting instead of a second product, the cost-next-to-the-button rule and the argument for holding it, and two prototypes that failed in opposite directions and taught me more than the ones that worked.",
          "The gap I never closed is the intermediate trader. They're wrong in both modes — past hand-holding, not yet fluent in an order book — and a real v2 needs either a third mode or per-control customisation, which is a different and harder problem than the one I solved. That's the honest edge of it.",
          "This one is here for the thinking. If what you need is someone who'll take a business model apart, name the decision everyone's avoiding, and then argue for the version that's harder to sell internally, this is what that looks like.",
        ],
      },
    ]}
  />
);

export default StructuredCryptoCaseStudy;
