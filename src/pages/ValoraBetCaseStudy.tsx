import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";
import heroImg from "@/assets/projects/valorabet.png";

const ValoraBetCaseStudy: React.FC = () => {
  return (
    <SimpleCaseStudyPage
      projectId="valora-bet"
      title="Valora Bet — Social Prediction Markets"
      description="A betting interface a casual user can play in 10 seconds, sitting on top of honest CPMM pricing that doesn't lie about the odds."
      tags={["Product Design", "Prediction Markets", "CPMM", "Beta"]}
      liveUrl="http://valora.bet"
      overviewUrl="/project/valora-bet"
      heroImage={{ src: heroImg, alt: "Valora Bet prediction markets dashboard" }}
      blocks={[
        {
          heading: "The Problem",
          paragraphs: [
            "Prediction markets are accurate. Nobody uses them. The forecasting math has been solved for decades — the reason normal people don't touch these platforms is the UI: order books, liquidity pools, share counts. Familiar to a trader, opaque to everyone else.",
            "The design job wasn't another exchange. It was a betting interface a casual user can play in 10 seconds, on top of honest CPMM pricing that doesn't lie about the odds.",
          ],
        },
        {
          heading: "Key Decisions",
          paragraphs: [
            "Play money, not real money. Chose social play over a regulated exchange because shipping real-money markets means KYC, state-by-state licensing, and a legal surface I'm not staffing solo. Tradeoff: no skin-in-the-game accuracy, but I can iterate on the mechanic without a lawyer in every release.",
            "Show the pricing math, don't hide it. Chose visible CPMM curves over a Polymarket-style clean \"Yes 67¢\" chip because hiding the math is how casual users get fleeced. Tradeoff: a denser bet screen, but the user can see exactly how their bet moves the price.",
            "Let anyone create a market. Chose open authoring over a curated question set because the product dies if it's just my opinions. Tradeoff: moderation overhead and bad-question risk, mitigated by clubs and a flag-and-review loop instead of pre-approval.",
          ],
        },
        {
          heading: "What AI Couldn't Decide",
          paragraphs: [
            "The CPMM math, Supabase schemas, RLS policies, and the clubs/leaderboards plumbing were all scaffolding. The call that stayed human: how the bet screen frames a position. Get that wrong and \"social prediction\" turns into a casino UI, and the whole premise breaks.",
          ],
        },
        {
          heading: "What Didn't Work",
          paragraphs: [
            "First bet screen showed the order book like a real exchange. Testers froze. Replaced it with a slider that updates the price preview live — same math, one less concept to learn.",
            "Also tried curated markets only for the first month; engagement cratered. Open authoring was the unlock, not the risk.",
          ],
        },
        {
          heading: "Where It Stands",
          paragraphs: [
            "Live in beta with play money. The mechanic works end-to-end. Looking for testers to break it and tell me what's confusing before the next round of cuts.",
          ],
        },
      ]}
    />
  );
};

export default ValoraBetCaseStudy;
