import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredCryptoCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="crypto"
    title="Trading Without Friction"
    description="A crypto trading interface designed for two groups the industry insists you have to choose between. It was fully designed and never released."
    tags={["Fintech", "Crypto", "Product Design", "Dual-Mode UX"]}
    meta={[{ label: "Role", value: "Lead UX Designer" }]}
    heroImage={{
      src: "/images/crypto/hero.webp",
      alt: "Crypto trading dashboard on mobile and desktop",
      caption: "The same account is used on both the phone and the desktop, with the mode set as a setting.",
      width: 2096,
      height: 1259,
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
          "The so-called easy crypto apps conceal the complexity and charge a higher spread for the convenience. The \"pro\" apps show all the details and assume that you have brought your own confidence.",
          "The industry regards it as merely a matter of segmentation. New users pay concealed fees and never pick up enough knowledge to move off them, which is in fact the object of the arrangement, while professionals pay for a confirmation flow that was designed with someone else in mind. Both groups are being charged by the app for the same choice, and the app has been constructed to ensure that neither of them notices.",
        ],
        images: [
          { src: "/images/crypto/competitive.webp", alt: "Competitor teardown: \"easy\" apps hide the spread, \"pro\" apps assume you brought your own confidence", caption: "The teardown that started it all. Simple apps conceal the spread, the pro ones assume you have your own confidence, and both of them charge you for making the same choice.",
 width: 752,
 height: 664,
    },
        ],
      },
      {
        heading: "One Product With a Switch",
        paragraphs: [
          "All the rest depends on a single call. There is one platform and one common core, and the mode is something you switch rather than something you select from among various products.",
          "The simpler build is two products, and it is simpler because it allows each of them to have its own roadmap. It does, however, trap users. A newcomer using the beginner product has to leave and start over with another company if they are to make any progress, and that is the moment each of these apps loses the customer it spent the most money to acquire.",
          "When it is a setting, beginners are able to see Pro before they are ready for it, and a professional can switch to Beginner to walk a friend through a trade without having to log out of their own account.",
        ],
        images: [
          { src: "/images/crypto/site-map.webp", alt: "The two-mode architecture: one platform, shared core, mode as a setting rather than a separate product", caption: "There is a single platform, one common core, and the mode is set as an option. A beginner can see Pro is there even though they aren't ready for it.",
 width: 2100,
 height: 1500,
    },
        ],
      },
      {
        heading: "Total Cost Next to the Button, Every Time",
        paragraphs: [
          "This decision was the one that attracted the most argument. Next to the action button on each order you see the full cost of the trade, including the spread. Most applications put it in a drawer, behind an info icon, or on the confirmation screen after you have already committed.",
          "It's unpopular within a company for an obvious reason: the spread is the revenue, and the simplest way to get people to think twice about pressing a button is to put a number next to it. The hidden version only functions as long as people are unaware, and once they discover it, you have shown them who the product was designed for.",
          "From the beginning, I treated plain language as a constraint rather than something added at the end. If I couldn't explain a control in a single sentence, I either explained it right there or it left beginner mode. Some features were dropped as a result, which was a sign the constraint was doing its job.",
        ],
        images: [
          { src: "/images/crypto/initial-flow.webp", alt: "Initial concepts challenging crypto app conventions", caption: "The flows come first, drawn to break with established conventions rather than continue them. The total cost sits beside the action button on each order.",
 width: 3803,
 height: 3846,
    },
          { src: "/images/crypto/design-thinking.webp", alt: "The design-thinking pass that produced the two-mode constraint", caption: "The pass that produced the constraint everything else hangs off: if I wasn't able to explain it in one sentence, it left beginner mode.",
 width: 1338,
 height: 490,
    },
        ],
      },
      {
        heading: "I Protected Beginners Until They Felt Patronised",
        paragraphs: [
          "The initial beginner mode was a failure. Confirmation on everything, a tooltip beside every term, and an onboarding tour that never finished. It performed poorly for a reason I had not anticipated: people didn't feel safe, they felt as though they were being talked down to, and it was some time before I realised that when safety cannot be switched off, it comes across as an accusation.",
          "The solution was to explain on hover, to confirm only above a certain threshold, and otherwise to get out of the way.",
          "Pro mode failed in the opposite direction, and it took me longer than it should have to realise it was the same error done in reverse. I had simplified it to make it cleaner and had removed the features professionals actually use, since density is a feature for that group and I had treated my own taste as a rule of usability.",
        ],
        images: [
          { src: "/images/crypto/learning.webp", alt: "Failed prototype iterations: the over-protected beginner mode that tested as patronising", caption: "The one that didn't work. Endless confirmations, a tour that went on forever, and the testers didn't feel safe. They felt talked down to.",
 width: 1890,
 height: 2283,
    },
        ],
      },
      {
        heading: "Where It Actually Is",
        paragraphs: [
          "Nothing here shipped. There is no live product to go and press, and I prefer to state that at the top of this section rather than let the screens suggest otherwise.",
          "What exists is the reasoning: the analysis of who each model is actually charging, the decision to treat mode as a setting rather than a second product, the cost-next-to-the-button rule and the argument for keeping it, and two prototypes that failed in opposite ways and taught me more than the ones that worked.",
          "The gap I never managed to close is the intermediate trader. They make mistakes in both modes, past the hand-holding and still getting used to reading an order book. A real v2 would need a third mode or per-control customisation, and that problem is harder than the one I actually solved.",
        ],
      },
    ]}
  />
);

export default StructuredCryptoCaseStudy;
