import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredSplittimeCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="splittime"
    title="SplitTime"
    description="A co-parenting app designed around the fact that every interaction is potential evidence."
    tags={["Family Tech", "Legal UX", "Mobile"]}
    liveUrl="https://splittime.pro"
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "Most co-parenting apps are calendars with chat bolted on. They treat the job as logistics.",
          "The hard part isn't logistics — \"are you picking her up at 5 or 5:30?\" reads as accusatory when you're already angry, and by message four nobody's talking about pickup anymore.",
        ],
        image: {
          src: "https://barskyux.com/wp-content/uploads/2024/01/Screenshot-2025-05-03-at-10.10.22%E2%80%AFPM-e1748480830908.png",
          alt: "Early Splittime interface with feature overload",
        },
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Structured requests, not open chat. The pattern is: clear ask → approve / decline / counter-propose → stamped timestamp. No room for tone, clean record if it ever needs to be one.",
          "Templates for the 80% of co-parenting communication that's the same conversation every week strip the emotional charge out of routine messages.",
        ],
        image: {
          src: "https://barskyux.com/wp-content/uploads/2025/08/wireframing-1.webp",
          alt: "Initial concepts and sketches / User flow explorations",
        },
      },
      {
        heading: "The Feature That Changed Behavior",
        paragraphs: [
          "Change history as a first-class feature: every approval, modification, and expense is timestamped and immutable. Knowing the record exists changes how people communicate.",
          "It's not surveillance — it's the guardrail that makes both parties calmer.",
        ],
        image: {
          src: "https://barskyux.com/wp-content/uploads/2025/08/6.Messages.png",
          alt: "Messaging system / Calendar view",
        },
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "First cut had free-form messaging because it felt cruel not to. Wrong — open messaging is where the conflict lives. Removing it felt counterintuitive until I watched someone visibly relax when I told them there wasn't one.",
          "Neutral-language nudges (\"did you mean to say...\") felt patronizing in testing. Templates are the version of that idea that actually works.",
        ],
        image: {
          src: "https://barskyux.com/wp-content/uploads/2025/08/4.Expenses.png",
          alt: "Expenses tracking / Documents storage / Child profile",
        },
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Parents testing it described it as \"the first one that didn't make me feel like I was being managed.\"",
          "That's the response I was designing for.",
        ],
      },
    ]}
  />
);

export default StructuredSplittimeCaseStudy;
