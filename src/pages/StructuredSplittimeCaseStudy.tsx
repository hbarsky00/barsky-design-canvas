import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredSplittimeCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="splittime"
    title="SplitTime"
    description="A co-parenting app designed around the fact that every interaction is potential evidence."
    tags={["Family Tech", "Legal UX", "Mobile"]}
    meta={[{ label: "Role", value: "Lead UX Designer" }]}
    liveUrl="https://splittime.pro"
    heroImage={{
      src: "/images/splittime/hero.webp",
      alt: "SplitTime co-parenting platform overview",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "Most co-parenting apps are calendars with chat bolted on. \"Are you picking her up at 5 or 5:30?\" reads as accusatory when you're already angry, and by message four nobody's talking about pickup anymore.",
          "The hard part isn't logistics — it's tone.",
        ],
        images: [
        ],
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Structured requests, not open chat. The pattern is clear ask → approve / decline / counter-propose → stamped timestamp. No room for tone, clean record if it ever needs to be one.",
          "Templates for the 80% of co-parenting communication that's the same conversation every week strip the emotional charge out of routine messages.",
        ],
        images: [
          { src: "/images/splittime/app-screens.webp", alt: "The shipped app — structured requests, shared schedule, and child profile in one place" },
          { src: "/images/splittime/features.webp", alt: "Feature and workflow breakdown of what actually shipped" },
        ],
      },
      {
        heading: "The Feature That Changed Behavior",
        paragraphs: [
          "Every approval, modification, and expense is timestamped and immutable.",
          "Knowing the record exists changes how people communicate — it's not surveillance, it's the guardrail that makes both parties calmer.",
        ],
        images: [
          { src: "/images/splittime/messaging.png", alt: "Structured requests instead of open chat — ask, approve or counter, timestamped" },
        ],
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "First cut had free-form messaging because it felt cruel not to. Wrong — open messaging is where the conflict lives.",
          "Removing it felt counterintuitive until I watched someone visibly relax when I told them there wasn't one.",
        ],
        images: [
          { src: "/images/splittime/early-dashboard.webp", alt: "The first dashboard — it replicated too much of what co-parents already had" },
          { src: "/images/splittime/dashboard-concept.png", alt: "Concept exploration from the version that tried to be a full messaging app" },
          { src: "/images/splittime/wireframing.webp", alt: "User flow explorations from the same pass" },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Parents testing it described it as \"the first one that didn't make me feel like I was being managed.\"",
          "That's the response I was designing for.",
        ],
        images: [
          { src: "/images/splittime/child-profile.png", alt: "Child profile — both parents see the same record, so nothing depends on who remembered to pass it along" },
          { src: "/images/splittime/documents.webp", alt: "Document storage — the shared, timestamped record parents can point at instead of arguing from memory" },
        ],
      },
    ]}
  />
);

export default StructuredSplittimeCaseStudy;
