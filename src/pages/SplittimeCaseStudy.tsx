
import React from "react";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import ProblemSection from "@/components/case-study/sections/ProblemSection";
import ImpactSection from "@/components/case-study/sections/ImpactSection";
import FailuresSection from "@/components/case-study/sections/FailuresSection";
import ProcessSection from "@/components/case-study/sections/ProcessSection";
import SplittimeHero from "@/components/splittime/SplittimeHero";
import { useSplittimeImageViewer } from "@/hooks/useSplittimeImageViewer";
import splittimeOgImage from "@/assets/social/splittime-og.jpg";

const SplittimeCaseStudy: React.FC = () => {
  const {
    viewerOpen,
    currentImage,
    currentZoom,
    openImageViewer,
    closeImageViewer,
    zoomIn,
    zoomOut,
    resetZoom,
    handleImageKeypress
  } = useSplittimeImageViewer();

  const problemData = {
    title: "Separated parents struggle to coordinate childcare without conflict",
    businessImpact: "Separated parents struggle to coordinate childcare without conflict. Texts, emails, and ad-hoc tools often fuel miscommunication and emotional escalation — hurting both parents and children. Existing co-parenting tools focus on logistics but fail to actively reduce tension.",
    userPain: "Parents reported constant stress from fragmented communication across multiple platforms, leading to missed information, scheduling conflicts, and children being caught in the middle of disputes.",
    gapAnalysis: "Existing solutions treat co-parenting like business collaboration, ignoring the high-stress, emotionally charged nature of post-separation family coordination. Tools needed to actively de-escalate rather than just organize.",
    wireframingImage: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/iMh4BEwy33n8p2KC-PDr3.png",
    metrics: [
      { label: "Conflict incidents per week", value: "8.3", trend: "down" as const },
      { label: "Missed/double-booked events", value: "25%", trend: "down" as const },
      { label: "Time spent resolving disputes", value: "4.2 hrs", trend: "down" as const }
    ]
  };

  const impactData = {
    overview: "Post-launch data from Splittime showed measurable improvements in co-parenting coordination and conflict reduction, with parents reporting improved focus on children over disputes.",
    metrics: [
      {
        label: "Conflict Incidents",
        value: "40%",
        improvement: "Fewer conflict incidents in first 3 months",
        category: "user" as const
      },
      {
        label: "Scheduling Resolution",
        value: "30%",
        improvement: "Faster scheduling resolution",
        category: "efficiency" as const
      },
      {
        label: "Missed Events",
        value: "25%",
        improvement: "Reduction in missed/double-booked events",
        category: "user" as const
      },
      {
        label: "Child-Focused Communication",
        value: "78%",
        improvement: "Parents focused on children over disputes",
        category: "user" as const
      }
    ],
    timeframe: "3 months post-launch"
  };

  const failuresData = {
    introduction: "Early iterations focused on standard messaging and calendar features, but these approaches actually increased conflict rather than reducing it:",
    failures: [
      {
        assumption: "Free-text messaging would improve communication",
        attempt: "Built an unfiltered messaging system similar to standard chat apps",
        whyItFailed: "Unfiltered messaging led to emotional spikes and escalated conflicts. Parents used the platform to vent frustrations rather than coordinate child needs.",
        lesson: "High-conflict situations require structured, guided communication with built-in emotional safeguards."
      },
      {
        assumption: "More calendar features would solve scheduling issues",
        attempt: "Created dense, feature-rich calendar views with multiple overlays and detailed event information",
        whyItFailed: "Overloaded calendars confused and frustrated already-stressed users. Complex interfaces added cognitive load during emotionally charged situations.",
        lesson: "Simplicity and clarity are essential when users are operating under stress. Less is more in high-conflict scenarios."
      },
      {
        assumption: "Standard messaging patterns would work for co-parents",
        attempt: "Implemented typical messaging UI with read receipts, typing indicators, and immediate send functionality",
        whyItFailed: "Messages often escalated situations instead of defusing them. No tone guidance meant parents sent inflammatory messages they later regretted.",
        lesson: "Communication tools for high-conflict situations need built-in pause mechanisms and tone analysis to prevent escalation."
      }
    ]
  };

  const processData = {
    overview: "Designing for high-conflict situations demanded empathy, emotional safeguards, and willingness to strip out harmful 'cool' features. The focus shifted from feature richness to conflict reduction and child wellbeing.",
    mentalModels: [
      "High-stress communication requires structure and emotional safeguards",
      "Child wellbeing should be the shared focal point that aligns parents",
      "Neutral zones can defuse tension better than direct confrontation tools"
    ],
    keyPrinciples: [
      "De-escalation by design: Build in pause mechanisms and tone guidance",
      "Child-first focus: Center all interactions around child needs and wellbeing",
      "Stress-aware UI: Use calming design elements to reduce cognitive load"
    ],
    decisions: [
      {
        situation: "How to handle messaging between high-conflict co-parents",
        options: [
          "Standard real-time chat with full messaging features",
          "Email-style delayed messaging system",
          "Structured communication with tone analysis and pause prompts"
        ],
        chosenPath: "Added tone analysis prompts before sending sensitive messages with built-in cooling-off periods",
        reasoning: "Tone analysis reduced emotional language in 73% of flagged messages, while pause mechanisms gave parents time to reconsider inflammatory responses before sending.",
        tradeoffs: [
          "Slightly slower communication for urgent matters",
          "Some parents initially resisted the 'friction'",
          "Required sophisticated content analysis capabilities"
        ]
      },
      {
        situation: "How to design the shared calendar to prevent conflicts",
        options: [
          "Feature-rich calendar with multiple views and overlays",
          "Simple single-view calendar with basic events",
          "Color-coded calendar with conflict detection and suggestions"
        ],
        chosenPath: "Designed a color-coded calendar that detects conflicts and suggests fixes automatically",
        reasoning: "Conflict alerts resolved 60% of double bookings without requiring direct messaging between parents. The system became a neutral mediator.",
        tradeoffs: [
          "More complex backend logic required",
          "Limited customization options for power users",
          "Needed extensive testing for edge cases"
        ]
      }
    ],
    personalInsight: "Splittime proved that neutral, structured tools can change behavior — not just manage tasks. The breakthrough came when I realized this wasn't about building a better calendar app, but about creating a neutral zone where parents could focus on their children instead of their conflicts."
  };

  const sections = [
    {
      id: "problem",
      title: "The Problem",
      content: <ProblemSection {...problemData} />
    },
    {
      id: "impact",
      title: "Quantified Impact",
      content: <ImpactSection {...impactData} />
    },
    {
      id: "failed",
      title: "What Didn't Work",
      content: <FailuresSection {...failuresData} />
    },
    {
      id: "process",
      title: "My Thought Process",
      content: <ProcessSection {...processData} />
    }
  ];

  const heroSection = (
    <SplittimeHero 
      onImageClick={openImageViewer}
      onImageKeypress={handleImageKeypress}
    />
  );

  return (
    <CaseStudyLayout
      title="Splittime: 40% Less Conflict in Co-Parenting | Hiram Barsky"
      description="Reduced co-parenting conflict by 40% through neutral communication tools and stress-aware design that puts children first."
      image={`https://barskydesign.pro${splittimeOgImage}`}
      projectName="Splittime"
      results={["40% fewer conflict incidents", "30% faster scheduling resolution", "25% reduction in missed events", "78% improved child-focused communication"]}
      technologies={["FamilyTech", "iOS", "Android", "LegalUX", "ConflictReduction"]}
      path="/project/splittime"
      heroSection={heroSection}
      sections={sections}
      gradientClasses="from-blue-50 via-slate-50 to-indigo-50"
    />
  );
};

export default SplittimeCaseStudy;
