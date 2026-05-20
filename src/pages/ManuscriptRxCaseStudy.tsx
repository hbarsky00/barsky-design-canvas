import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const ManuscriptRxCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="email-creation-ai"
    title="ManuscriptRx"
    description="A self-initiated concept for AI-assisted pharma HCP email production — designed around the approval gates, not around the AI."
    tags={["Enterprise", "Gen AI", "Pharma", "Workflow Design"]}
    heroImage={{
      src: "/images/emailai-screen1-content-planning.png",
      alt: "Step 1 — 6-step workflow navigator, Brief Creation locked, Initiate Email Creation active",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "A regulated pharma email touches a medical writer, content ops, brand, MLR, and CRM — each in a different tool. Two weeks to send one email is considered fast.",
          "The obvious AI fix is \"dump the manuscript in and ship it.\" That's wrong.",
        ],
      },
      {
        heading: "The Thesis",
        paragraphs: [
          "Regulated email requires human review at specific gates. The AI's job is the work between humans — not the work humans do.",
          "That one constraint shaped every decision.",
        ],
        images: [
          { src: "/images/emailai-screen2-assemble.png", alt: "Step 2 — Assemble From Approved Content: AI-owned manuscript on the left, market-specific compliance content auto-pulled on the right" },
        ],
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Six steps, each with a clear owner and a clear gate. QC sits inline with editing — AI auto-pass, Content Ops, and Med Writer sign off while the writer is still in the content.",
          "\"Send Preview to Brand\" doesn't appear until the AI checklist passes.",
        ],
        images: [
          { src: "/images/emailai-screen3-iterate-qc.png", alt: "Step 3 — Iterate / Edit + Quality Checks: AI chat with live email preview on top, three role-owned QC cards on the bottom" },
        ],
      },
      {
        heading: "The Honest Parts",
        paragraphs: [
          "Brief Creation is locked as \"Outside pilot scope\" — the brief lives upstream and saying that out loud is more useful than pretending I designed it.",
          "PromoMats integration warning stays visible on screen. Unresolved decisions in the open, not hidden.",
        ],
        images: [
          { src: "/images/emailai-screen6-pre-mlr.png", alt: "Step 5 — Test Email: HTML generation and metadata checklist on the left, mobile and desktop email previews on the right" },
        ],
      },
      {
        heading: "What I Haven't Solved",
        paragraphs: [
          "The MLR review experience. I designed the artifacts MLR receives — not the review tool itself.",
          "How reviewers annotate, reject, and approve claims with legal accountability is the hardest part of pharma email. I'm not going to pretend I solved it in a concept project.",
        ],
      },
    ]}
  />
);

export default ManuscriptRxCaseStudy;
