import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredSplittimeCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="splittime"
    title="SplitTime"
    description="A co-parenting app designed around the fact that every interaction is potential evidence."
    tags={["Family Tech", "Legal UX", "Mobile"]}
    liveUrl="https://splittime.pro"
    heroImage={{
      src: "/images/splittime/hero.jpg",
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
          { src: "/images/splittime/early-dashboard.png", alt: "Early SplitTime dashboard concept" },
        ],
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Structured requests, not open chat. The pattern is clear ask → approve / decline / counter-propose → stamped timestamp. No room for tone, clean record if it ever needs to be one.",
          "Templates for the 80% of co-parenting communication that's the same conversation every week strip the emotional charge out of routine messages.",
        ],
        images: [
          { src: "/images/splittime/dashboard-concept.png", alt: "Dashboard concept exploration" },
          { src: "/images/splittime/wireframing.webp", alt: "User Flow Explorations" },
        ],
      },
      {
        heading: "The Feature That Changed Behavior",
        paragraphs: [
          "Every approval, modification, and expense is timestamped and immutable.",
          "Knowing the record exists changes how people communicate — it's not surveillance, it's the guardrail that makes both parties calmer.",
        ],
        images: [
          { src: "/images/splittime/messaging.png", alt: "Messaging System" },
          { src: "/images/splittime/app-screens.png", alt: "App screens overview, including scheduling" },
        ],
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "First cut had free-form messaging because it felt cruel not to. Wrong — open messaging is where the conflict lives.",
          "Removing it felt counterintuitive until I watched someone visibly relax when I told them there wasn't one.",
        ],
        images: [
          { src: "/images/splittime/features.png", alt: "Feature and workflow breakdown" },
          { src: "/images/splittime/documents.jpg", alt: "Documents Storage" },
          { src: "/images/splittime/child-profile.png", alt: "Child Profile" },
        ],
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
