
import React from "react";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import ProblemSection from "@/components/case-study/sections/ProblemSection";
import ImpactSection from "@/components/case-study/sections/ImpactSection";
import FailuresSection from "@/components/case-study/sections/FailuresSection";
import ProcessSection from "@/components/case-study/sections/ProcessSection";
import HerbalinkHero from "@/components/herbalink/HerbalinkHero";

const HerbalinkCaseStudy: React.FC = () => {
  // Optimized hero image for social sharing
  const heroImage = "/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png";

  const problemData = {
    title: "Finding trustworthy herbalists online was nearly impossible",
    businessImpact: "Users couldn't find trustworthy herbalists online due to fragmented directories and no verification system. This led to hesitation in booking appointments and uncertainty about practitioner qualifications, creating barriers to accessing natural healthcare.",
    userPain: "People interested in herbal medicine struggled to find qualified practitioners they could trust. Existing directories were incomplete, lacked credential verification, and provided no way to assess practitioner quality or specialties.",
    gapAnalysis: "The market had wellness platforms and general practitioner directories, but no specialized platform connecting users to verified herbalists with transparent credentials and booking capabilities.",
    sectionImage: "/lovable-uploads/images/herbalink-problem.png",
    projectId: "herbalink",
    metrics: [
      { label: "User trust in online directories", value: "23%", trend: "up" as const },
      { label: "Average search time for herbalists", value: "3.2 hrs", trend: "down" as const },
      { label: "Booking conversion rate", value: "8%", trend: "up" as const }
    ]
  };

  const impactData = {
    overview: "Created a national platform with certified practitioners and seamless booking, which increased booking rates by 3x through verified credentials and streamlined user experience.",
    sectionImage: "/lovable-uploads/images/herbalink-impact.png",
    projectId: "herbalink",
    metrics: [
      {
        label: "Booking Rates",
        value: "3x",
        improvement: "Increase in successful bookings",
        category: "business" as const
      },
      {
        label: "User Trust",
        value: "80%",
        improvement: "User satisfaction with match quality",
        category: "user" as const
      },
      {
        label: "Search Time",
        value: "50%",
        improvement: "Faster herbalist discovery",
        category: "efficiency" as const
      },
      {
        label: "Platform Growth",
        value: "400%",
        improvement: "Increase in registered herbalists",
        category: "business" as const
      }
    ],
    timeframe: "6 months post-launch"
  };

  const failuresData = {
    introduction: "Early iterations focused on complex mapping interfaces and buried the most important trust signals users needed:",
    sectionImage: "/lovable-uploads/images/herbalink-fail.png",
    projectId: "herbalink",
    failures: [
      {
        assumption: "Users wanted a map-first interface to find local herbalists",
        attempt: "Built a complex map-based discovery system with location filters and geographical search",
        whyItFailed: "Users were overwhelmed by the map interface and couldn't quickly assess practitioner qualifications. The map buried essential trust signals like certifications and reviews.",
        lesson: "Trust signals must come before location. Users need to feel confident about a practitioner's qualifications before caring about their location."
      },
      {
        assumption: "Detailed practitioner profiles would build trust",
        attempt: "Created extensive bio pages with lengthy descriptions, education histories, and philosophical approaches",
        whyItFailed: "Users suffered from information overload and couldn't quickly identify key qualifications. Too much text reduced rather than increased trust.",
        lesson: "Clear, scannable credentials work better than lengthy descriptions. Users need quick trust verification, not lengthy bios."
      },
      {
        assumption: "Price transparency would improve booking rates",
        attempt: "Prominently displayed session prices upfront in search results and practitioner cards",
        whyItFailed: "Leading with price attracted price-focused users rather than quality-focused ones. It also commoditized the herbalists' expertise.",
        lesson: "For healthcare services, trust and expertise should be established before price. Quality-focused users will pay appropriate rates once trust is built."
      }
    ]
  };

  const processData = {
    overview: "The breakthrough came when I realized this wasn't about building a directory—it was about creating a trust platform that happened to connect users with herbalists.",
    sectionImage: "/lovable-uploads/images/herbalink-process.png",
    projectId: "herbalink",
    mentalModels: [
      "Trust-building as the primary user journey, not location-finding",
      "Credentials as the foundation for all other platform features",
      "Seamless booking as the reward for establishing trust"
    ],
    keyPrinciples: [
      "Credentials first: Lead with verifiable qualifications before anything else",
      "Scannable trust: Make trust signals immediately visible and understandable",
      "Guided discovery: Help users understand what to look for in an herbalist"
    ],
    decisions: [
      {
        situation: "How to display practitioner credentials without overwhelming users",
        options: [
          "Detailed credential pages with full education histories",
          "Simple badge system with hover details",
          "Tiered verification levels with clear explanations"
        ],
        chosenPath: "Implemented a clear badge system with instant credibility indicators",
        reasoning: "Users needed to quickly assess trust without reading lengthy credentials. Badges provided instant visual confirmation of qualifications while detailed info remained accessible on click.",
        tradeoffs: [
          "Simplified complex credentials into digestible formats",
          "Some nuance in qualifications was lost",
          "Required education of users about badge meanings"
        ]
      },
      {
        situation: "Whether to build custom booking or integrate existing systems",
        options: [
          "Build completely custom booking system",
          "Integrate with existing calendar platforms",
          "Hybrid system with custom front-end and flexible back-end"
        ],
        chosenPath: "Built seamless booking integrated with practitioners' existing systems",
        reasoning: "Herbalists already had appointment systems they trusted. Rather than forcing change, we made booking feel seamless for users while respecting practitioners' workflows.",
        tradeoffs: [
          "More complex integration requirements",
          "Dependency on multiple calendar systems",
          "Reduced control over booking experience details"
        ]
      }
    ],
    personalInsight: "Herbalink taught me that platforms don't just connect supply and demand—they create the conditions for trust. The real product wasn't the directory or the booking system, but the confidence users felt when choosing a practitioner."
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

  const heroSection = <HerbalinkHero />;

  return (
    <CaseStudyLayout
      title="3x More Bookings: How I Connected Users to Certified Herbalists | Hiram Barsky"
      description="Connected users to certified herbalists across the country and increased booking rates by 3x through verified credentials and streamlined user experience."
      image={heroImage}
      projectName="Herbalink"
      results={["3x increase in booking rates", "80% user satisfaction with matches", "50% faster herbalist discovery", "400% growth in registered practitioners"]}
      technologies={["Health", "Marketplace", "Gen AI", "Trust Platform", "Booking System", "Verification"]}
      path="/project/herbalink"
      heroSection={heroSection}
      sections={sections}
      gradientClasses="from-green-50 via-emerald-50 to-teal-50"
    />
  );
};

export default HerbalinkCaseStudy;
