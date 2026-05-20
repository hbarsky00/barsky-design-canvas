import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredBarskyJointCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="barskyjoint"
    title="BarskyJoint"
    description="One ordering system that works on a kiosk and a phone — without making either feel like a compromise."
    tags={["Restaurant Tech", "Food Service", "Kiosk Design"]}
    liveUrl="https://barskyjoint.com"
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "A burger with 14 customizations, shown all at once, freezes people. On a kiosk a line forms behind them. On web they close the tab.",
          "The job wasn't adding more options — it was removing the decision tax.",
        ],
        image: {
          src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/barskyjoint/Barskyjoint800.jpg",
          alt: "Early restaurant ordering interface design / failed prototype",
        },
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Every item ships with a sensible default — two taps and you're done, customize inline if you want. Same components on kiosk and web, with tap targets sized for thumbs vs. cursors: one design system, calibrated per device.",
          "The order summary stays visible at all times instead of living on a separate cart page.",
        ],
        image: {
          src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/barskyjoint/mainpagedesktop.jpg",
          alt: "Main page desktop view",
        },
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "First version showed all customization upfront — I thought I was being thorough. Three test sessions in, people were stalling on the toppings screen for a burger they'd already decided on.",
          "Also tried to make the kiosk feel \"modern\" with animation. On a kiosk, animation is latency. Cut almost all of it.",
        ],
        image: {
          src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/barskyjoint/journeymap0.jpg",
          alt: "Customer journey map / Decision point analysis",
        },
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Faster orders and fewer mid-order abandonments in early testing.",
          "No post-launch numbers I'd stand behind — but the design principle holds: defaults do more work than options.",
        ],
      },
    ]}
  />
);

export default StructuredBarskyJointCaseStudy;
