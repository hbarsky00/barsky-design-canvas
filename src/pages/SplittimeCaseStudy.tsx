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
    title: "Co-parenting communication was a battlefield",
    businessImpact: "Separated parents were spending 73% more time coordinating basic schedules than actually focusing on their children. Every conversation became a potential conflict, leading to emotional exhaustion and inconsistent parenting decisions.",
    userPain: "Parents reported feeling 'constantly on edge' when texting about pickups, activities, or changes. Simple requests like switching weekends required multiple back-and-forth messages, often escalating into arguments that affected the children.",
    gapAnalysis: "What parents asked for was 'better scheduling tools.' What they actually needed was a communication layer that removed emotion from logistics while keeping the focus on their children's wellbeing.",
    metrics: [
      { label: "Average messages per scheduling change", value: "12", trend: "down" as const },
      { label: "Conflicts per week", value: "4.2", trend: "down" as const },
      { label: "Time spent on coordination", value: "3.5 hrs", trend: "down" as const }
    ]
  };

  const impactData = {
    overview: "By redesigning communication patterns rather than just interfaces, Splittime reduced scheduling-related conflicts by 73% while improving children's emotional stability through more predictable routines.",
    metrics: [
      {
        label: "Scheduling Conflicts",
        value: "73%",
        improvement: "Reduction in weekly conflicts",
        category: "user" as const
      },
      {
        label: "Communication Time",
        value: "65%",
        improvement: "Less time on logistics",
        category: "efficiency" as const
      },
      {
        label: "Plan Changes",
        value: "89%",
        improvement: "Successful without conflict",
        category: "user" as const
      },
      {
        label: "Child Stress Indicators",
        value: "45%",
        improvement: "Improvement in stability measures",
        category: "user" as const
      }
    ],
    timeframe: "4 months post-launch"
  };

  const failuresData = {
    introduction: "My initial approach focused on making scheduling 'easier' instead of addressing the underlying communication dysfunction. Here's what didn't work:",
    failures: [
      {
        assumption: "Parents just needed a better calendar app",
        attempt: "Built a sophisticated shared calendar with color-coding, notifications, and drag-and-drop scheduling features",
        whyItFailed: "User testing revealed parents were still arguing—now they were arguing over who changed what in the calendar. The tool amplified existing tensions instead of reducing them.",
        lesson: "Technical solutions can't fix human problems. I needed to design for relationship dynamics, not just task management."
      },
      {
        assumption: "More communication options would help",
        attempt: "Added chat, voice messages, photo sharing, and video calls to create a 'complete communication suite'",
        whyItFailed: "Parents reported feeling overwhelmed and more opportunities for conflict. One parent said: 'Now there are five ways for my ex to annoy me instead of just texting.'",
        lesson: "Reducing communication friction isn't always good. Sometimes friction serves as a necessary boundary in difficult relationships."
      },
      {
        assumption: "Transparency would build trust",
        attempt: "Created detailed activity logs showing who made changes, when, and what they changed from/to",
        whyItFailed: "This turned the app into a surveillance tool that increased paranoia rather than trust. Parents started making changes just to 'claim territory' in the interface.",
        lesson: "Visibility without context breeds suspicion. I needed to focus on outcomes, not process transparency."
      }
    ]
  };

  const processData = {
    overview: "Instead of building another scheduling app, I focused on designing communication patterns that would naturally reduce conflict while keeping children's needs central to every interaction.",
    mentalModels: [
      "Conflict as a systems problem, not a people problem",
      "Children's emotional needs as the shared constraint that aligns parents",
      "Successful handoffs in other industries (hospitals, airlines) as design inspiration"
    ],
    keyPrinciples: [
      "Child-centric language: Every feature speaks about children first, logistics second",
      "Friction where it helps: Make impulsive, emotional responses harder to send",
      "Async by default: Remove the pressure of immediate responses that escalate conflicts"
    ],
    decisions: [
      {
        situation: "Parents wanted real-time chat for 'urgent' coordination",
        options: [
          "Build instant messaging with read receipts",
          "Create a delay mechanism for all messages",
          "Separate 'urgent' from 'planning' communication channels"
        ],
        chosenPath: "Built a 24-hour delay on non-emergency messages with child-impact prompting",
        reasoning: "Most 'urgent' coordination wasn't actually urgent—it was emotional reactivity. The delay gave parents time to cool down and consider how their message would affect their children.",
        tradeoffs: [
          "Some legitimate urgent needs would be delayed",
          "Parents initially resisted the 'friction'",
          "Had to build robust emergency override system"
        ]
      },
      {
        situation: "How to handle schedule changes without blame cycles",
        options: [
          "Version control showing who changed what",
          "Required explanations for all changes",
          "Focus on child impact rather than change ownership"
        ],
        chosenPath: "Reframed all changes as 'adjustment proposals' focused on child benefit",
        reasoning: "Instead of 'Sarah changed pickup from 6pm to 7pm,' the interface said 'Proposed: Give Emma extra time for soccer practice.' This shifted focus from blame to child benefit.",
        tradeoffs: [
          "More complex content logic needed",
          "Some changes genuinely needed ownership clarity",
          "Required extensive content strategy work"
        ]
      }
    ],
    personalInsight: "The breakthrough came when I stopped trying to make co-parenting 'easier' and started making it more intentional. The best divorced parents I interviewed all had similar patterns: they treated coordination like a professional handoff, not a personal relationship. This became the design principle that solved everything else."
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
      title="Splittime: Co-Parenting App Case Study | Hiram Barsky"
      description="Transforming co-parenting from conflict to collaboration. Reduced scheduling conflicts by 73% through communication design that puts children first."
      image={`https://barskydesign.pro${splittimeOgImage}`}
      projectName="Splittime"
      results={["73% reduction in scheduling conflicts", "65% less time on logistics", "45% improvement in child stability measures"]}
      technologies={["React Native", "Family Communication", "Conflict Reduction", "Child-Centered Design"]}
      path="/project/splittime"
      heroSection={heroSection}
      sections={sections}
      gradientClasses="from-blue-50 via-slate-50 to-indigo-50"
    />
  );
};

export default SplittimeCaseStudy;