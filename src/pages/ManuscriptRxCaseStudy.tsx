import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const ManuscriptRxCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="email-creation-ai"
    title="ManuscriptRx"
    description="A self-initiated concept for producing pharmaceutical HCP emails with the aid of AI, structured around the approval gates the AI has to go through."
    tags={["Enterprise", "Gen AI", "Pharma", "Workflow Design"]}
    meta={[{ label: "Role", value: "Lead UX Designer" }]}
    heroImage={{
      src: "/images/emailai-hero-pair.webp",
      alt: "The six-step workflow navigator beside the assemble step: Brief Creation locked, approved content pulled in on the right",
      hoverVideo: "/lovable-uploads/email-creation-ai-hero.mp4",
      caption: "There are six steps, each one identifying the person who owns it. Brief Creation is greyed out since I didn't look into it. It is outside the pilot, and the label states this.",
      width: 1720,
      height: 648,
    }}
    relatedPost={{
      slug: "design-for-the-approval-gates",
      title: "In Regulated Work, Design for the Gates",
      blurb: "A pharma email takes two weeks and touches five teams in five tools. The AI's job is the work between the humans, not the work the humans are…",
    }}
    blocks={[
      {
        heading: "Two Weeks to Send One Email",
        paragraphs: [
          "A regulated email from the pharmaceutical sector reaches a medical writer, the content operations team, the brand team, MLR, and CRM. With five different teams using five distinct tools, a two-week end-to-end process is seen as good performance.",
          "This one is mine. There was no client, it was never briefed and nothing shipped. I developed it because I continually saw the same AI pitch directed at this problem and I believed it was focusing on the wrong part of it.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/email-creation-ai/flow-how-i-worked.svg",
            alt: "How I worked on ManuscriptRx: invert the pitch, six owned steps, QC inline, gate the preview, leave the brief locked, keep the warning visible, Figma screens, Claude writes a spec per screen, spec to dev, MLR not designed",
            caption: "A step-by-step account of how I carried out the work, from the study's own account. The decision in terracotta was the one the others relied upon. The more subdued steps were mine to build and then eliminate.",
            width: 528,
            height: 858,
          },
          {
            src: "/images/email-creation-ai/flow-between-the-humans.svg",
            alt: "Human and AI alternation: writer edits, AI assembles, reviewers sign off inline, AI generates HTML and runs the checklist, pass shows Send Preview to Brand, fail returns to the writer, MLR review outside scope",
            caption: "A person, a model, a person, a model, a person. The white steps are the AI's. The final one is the part this concept was unable to solve.",
            width: 580,
            height: 682,
          },
        ],
      },
      {
        heading: "The AI Works Between the Humans, Not Instead of Them",
        paragraphs: [
          "The simple way to put it is \"drop the manuscript in and receive an email.\" This works well as a demonstration, and it's incorrect, because the two weeks aren't spent writing. They're spent waiting at review checkpoints which exist for legal reasons and are not going to be removed.",
          "So I reversed the process. The parts of each step a human is legally responsible for remain the human's, while everything else, meaning assembling the approved content, retrieving the market-specific compliance blocks, generating the HTML, and carrying out the metadata checks, belongs to the AI.",
          "That single restriction decided every other element on the screen, and it is the factor that distinguishes a tool which passes compliance review from one that doesn't.",
        ],
        images: [
          { src: "/images/emailai-screen2-assemble.webp", alt: "Step 2: Assemble From Approved Content: AI-owned manuscript on the left, market-specific compliance content auto-pulled on the right", caption: "The AI puts the email together and the writer gives approval. The market-specific compliance blocks appear on the right rather than having to be searched for.",
 width: 1440,
 height: 1040,
    },
        ],
      },
      {
        heading: "Six Steps, Each With an Owner",
        paragraphs: [
          "The process consists of six steps, each one specifying who is responsible for it. That sounds like project management, and in regulated work it is a design decision, since a step with no owner is precisely where the two weeks are lost.",
          "QC is carried out during the editing process rather than after it. While the writer is still working on the content, all three, AI auto-pass, Content Ops, and the Med Writer, give their approval, so that a rejection arrives while there is still relevant context to act on it.",
          "The \"Send Preview to Brand\" option appears only after the AI checklist has passed. I could have shown it disabled with a tooltip instead. Hiding it is more direct, and it halts the conversation when someone asks to be let through just this once.",
        ],
        images: [
          { src: "/images/emailai-screen3-iterate-qc.webp", alt: "Step 3: Iterate / Edit + Quality Checks: AI chat with live email preview on top, three role-owned QC cards on the bottom", caption: "Instead of coming after the editing stage, the quality check takes place beside it, which means a manuscript can be rejected while the writer still has the context to make the corrections.",
 width: 1440,
 height: 1547,
    },
        ],
      },
      {
        heading: "What I Left Locked",
        paragraphs: [
          "Brief Creation appears in the navigator and is locked, marked \"outside pilot scope.\" The brief is prepared by people whose process I didn't research, and drawing a screen for it would have meant inventing a process I hadn't seen.",
          "The warning about the PromoMats integration remains on the screen instead of being dismissed before the screenshot is taken. It indicates an unresolved dependency, and a reviewer who notices it during an actual pilot has a worse day than one who was made aware of it in advance.",
        ],
        images: [
          { src: "/images/emailai-screen6-pre-mlr.webp", alt: "Step 5: Test Email: HTML generation and metadata checklist on the left, mobile and desktop email previews on the right", caption: "The HTML and metadata were generated and the preview checked at both sizes before the reviewer looks at it. The unresolved PromoMats warning is deliberately left on the screen.",
 width: 1440,
 height: 1192,
    },
        ],
      },
      {
        heading: "The Part I Didn't Solve",
        paragraphs: [
          "MLR review itself. I created the artifacts MLR receives and the state the email is in when it arrives, but I didn't design the tool they use to review it.",
          "The hardest problem in this whole workflow is how a reviewer annotates a claim, rejects it, and signs their name to it with legal accountability attached. It needs access to reviewers I didn't have, and a concept project that claimed to solve it would be worth less than one that plainly says it didn't.",
        ],
      },
    ]}
  />
);

export default ManuscriptRxCaseStudy;
