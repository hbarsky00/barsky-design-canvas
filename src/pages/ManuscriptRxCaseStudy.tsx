import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const ManuscriptRxCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="email-creation-ai"
    title="ManuscriptRx"
    description="A self-initiated concept for AI-assisted pharma HCP email production — designed around the approval gates, not around the AI."
    tags={["Enterprise", "Gen AI", "Pharma", "Workflow Design"]}
    meta={[{ label: "Role", value: "Lead UX Designer" }]}
    heroImage={{
      src: "/images/emailai-hero-pair.webp",
      alt: "The six-step workflow navigator beside the assemble step — Brief Creation locked, approved content pulled in on the right",
      hoverVideo: "/lovable-uploads/email-creation-ai-hero.mp4",
    }}
    relatedPost={{
      slug: "design-for-the-approval-gates",
      title: "In Regulated Work, Design for the Gates — Not the AI",
      blurb: "A pharma email takes two weeks and touches five teams in five tools. The AI's job is the work between the humans, not the work the humans are…",
    }}
    blocks={[
      {
        heading: "Two Weeks to Send One Email",
        paragraphs: [
          "A regulated pharma email touches a medical writer, content ops, brand, MLR and CRM. Five teams, five different tools, and two weeks end to end is considered a good run.",
          "This one is mine, not a client's. Nobody briefed it and nothing shipped. I built it because I kept seeing the same AI pitch aimed at this problem and I thought it was aimed at the wrong half of it.",
        ],
      },
      {
        heading: "The AI Works Between the Humans, Not Instead of Them",
        paragraphs: [
          "The obvious version is \"drop the manuscript in, get an email out.\" It demos well and it's wrong, because the two weeks aren't spent writing. They're spent waiting at review gates that exist for legal reasons and aren't going anywhere.",
          "So I inverted it. Every step a human is legally accountable for stays with the human. Everything between those steps — assembling approved content, pulling the market-specific compliance blocks, generating the HTML, running the metadata checks — is the AI's job.",
          "That one constraint decided everything else on the screen. It's also the part I'd argue hardest for, because it's the difference between a tool that survives compliance review and a demo that doesn't.",
        ],
        images: [
          { src: "/images/emailai-screen2-assemble.png", alt: "Step 2 — Assemble From Approved Content: AI-owned manuscript on the left, market-specific compliance content auto-pulled on the right" },
        ],
      },
      {
        heading: "Six Steps, Each With an Owner",
        paragraphs: [
          "The workflow is six steps and every one names who owns it. That sounds like project management rather than design, and in regulated work it's the whole design — an unowned step is where two weeks goes.",
          "QC sits inline with editing instead of after it. AI auto-pass, Content Ops and Med Writer all sign off while the writer is still in the content, so a rejection arrives while there's still context to act on it.",
          "\"Send Preview to Brand\" doesn't render until the AI checklist passes. I could have shown it disabled with a tooltip. Hiding it is blunter and it stops the conversation where someone asks to be let through just this once.",
        ],
        images: [
          { src: "/images/emailai-screen3-iterate-qc.webp", alt: "Step 3 — Iterate / Edit + Quality Checks: AI chat with live email preview on top, three role-owned QC cards on the bottom" },
        ],
      },
      {
        heading: "What I Left Locked, On Purpose",
        paragraphs: [
          "Brief Creation is visible in the navigator and locked, labelled \"outside pilot scope.\" The brief is written upstream by people I didn't design for, and drawing a screen for it would have been me inventing a process I hadn't researched.",
          "The PromoMats integration warning stays on screen rather than being tidied away before the screenshot. It's an unresolved dependency, and a reviewer who spots it in a real pilot has a much worse day than one who was told up front.",
          "Both of those are me choosing to show the edges of what I actually know. In regulated work that's not modesty, it's the thing that makes the rest of the proposal credible.",
        ],
        images: [
          { src: "/images/emailai-screen6-pre-mlr.webp", alt: "Step 5 — Test Email: HTML generation and metadata checklist on the left, mobile and desktop email previews on the right" },
        ],
      },
      {
        heading: "The Part I Didn't Solve",
        paragraphs: [
          "MLR review itself. I designed the artefacts MLR receives and the state the email is in when it arrives. I did not design the tool they review it in.",
          "How a reviewer annotates a claim, rejects it, and signs their name to that with legal accountability attached is the hardest problem in this whole workflow. It needs access to reviewers I didn't have, and a concept project that claimed to have solved it would be worth less than one that says plainly it didn't.",
        ],
      },
    ]}
  />
);

export default ManuscriptRxCaseStudy;
