import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseStudyNavigation from "../CaseStudyNavigation";
import CaseStudyContactSection from "../CaseStudyContactSection";
import CaseStudyShareToolbar from "../CaseStudyShareToolbar";
import Section3DOverlay from "@/components/transitions/Section3DOverlay";
import { useCaseStudyKeyboardNavigation } from "@/hooks/useCaseStudyKeyboardNavigation";
import { useProjectPageDetection } from "@/hooks/useProjectPageDetection";
import { StructuredCaseStudyData } from "@/data/structuredCaseStudies";
import StructuredCaseStudyHero from "./StructuredCaseStudyHero";
import StructuredCaseStudySection from "./StructuredCaseStudySection";
import StructuredCaseStudyOverview from "./StructuredCaseStudyOverview";
import ProblemCallout from "../ProblemCallout";
import KeyInsightsRow from "../KeyInsightsRow";
import ResearchSectionTwoCol from "../ResearchSectionTwoCol";
import IdeationSection from "../IdeationSection";
import MyThoughtProcessSection from "../MyThoughtProcessSection";
import CaseStudyTeaserSection from "../CaseStudyTeaserSection";

interface StructuredCaseStudyLayoutProps {
  caseStudyData: StructuredCaseStudyData;
  heroAsImage?: boolean;
}

// Helper function to get cross-referenced project
const getCrossReferencedProject = (currentProjectId: string) => {
  const crossReference: Record<string, any> = {
    "splittime": {
      title: "3x More Bookings: How I Connected Users to Certified Herbalists", 
      description: "Connected users to certified herbalists across the country and increased booking rates by 3x through AI-powered matching and streamlined UX.",
      path: "/project/herbalink",
      image: "https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png",
      tags: ["GenAI", "HealthTech", "iOS", "Android", "WebApp"]
    },
    "herbalink": {
      title: "Redesigning Loans: 85% Fewer Errors, 40% Faster",
      description: "How I led a banking platform redesign that replaced Excel and scaled operations with speed, accuracy, and trust.",
      path: "/project/investment-app", 
      image: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
      tags: ["FinTech", "Analytics", "WebApp"]
    },
    "investor-loan-app": {
      title: "Streamlined Operations: Business Management Platform",
      description: "Comprehensive business management solution with integrated scheduling, invoicing, and analytics dashboard.",
      path: "/project/business-management-app",
      image: "/placeholder-business.jpg",
      tags: ["Business", "Analytics", "Dashboard"]
    },
    "business-management": {
      title: "40% Less Conflict: Designing Neutral Co-Parenting Tools",
      description: "Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools designed for high-stress family situations.",
      path: "/project/splittime",
      image: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1",
      tags: ["FamilyTech", "iOS", "Android", "LegalUX", "ConflictReduction"]
    }
  };

  return crossReference[currentProjectId] || crossReference["splittime"];
};

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  caseStudyData,
  heroAsImage = false
}) => {
  const isProjectPage = useProjectPageDetection();
  
  // Get current URL for sharing with safety check
  const currentUrl = typeof window !== 'undefined' && window.location 
    ? window.location.href 
    : `https://barskydesign.pro${caseStudyData.seoData?.path || ''}`;

  // Create navigation items from sections in proper order
  const navigationItems = [
    { label: "Overview", anchor: "#overview" },
    ...(caseStudyData.researchSection ? [{ label: "Research", anchor: "#research" }] : []),
    ...(caseStudyData.problemCallout ? [{ label: "Problem", anchor: "#problem" }] : []),
    ...(caseStudyData.keyInsights ? [{ label: "Key Insights", anchor: "#key-insights" }] : []),
    { label: "My Thought Process", anchor: "#my-thought-process" },
    ...(caseStudyData.ideationSection ? [{ label: "Ideation", anchor: "#ideation" }] : []),
    ...caseStudyData.sections.map(section => ({
      label: section.title,
      anchor: `#${section.id}`
    }))
  ];

  // Build sections for keyboard navigation
  const keyboardSections = React.useMemo(() => {
    const navSections = [
      { id: 'overview', title: 'Overview' },
      ...(caseStudyData.researchSection ? [{ id: 'research', title: 'Research' }] : []),
      ...(caseStudyData.problemCallout ? [{ id: 'problem', title: 'Problem' }] : []),
      ...(caseStudyData.keyInsights ? [{ id: 'key-insights', title: 'Key Insights' }] : []),
      { id: 'my-thought-process', title: 'My Thought Process' },
      ...(caseStudyData.ideationSection ? [{ id: 'ideation', title: 'Ideation' }] : []),
      ...caseStudyData.sections.map(section => ({
        id: section.id,
        title: section.title
      })),
      { id: 'contact-section', title: 'Contact' }
    ];
    return navSections;
  }, [caseStudyData.sections, caseStudyData.problemCallout, caseStudyData.researchSection]);

  // Add keyboard navigation
  const keyboardNav = useCaseStudyKeyboardNavigation(keyboardSections);
  const {
    isTransitioning,
    transitionDirection,
    transitionVariation,
  } = keyboardNav;

  return (
    <>
      {/* SEO is now handled globally by UnifiedSEO in App.tsx */}
      
      <div className={`min-h-screen bg-background ${isProjectPage ? 'projects-page' : ''}`}>
        {/* 3D Transition Overlay */}
        <Section3DOverlay 
          isVisible={isTransitioning} 
          direction={transitionDirection}
          variation={transitionVariation}
        />

        <Header />
        
        {/* Single-column layout with mobile navigation only */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-[calc(var(--header-height,64px)+12px)]">
          {/* Mobile Navigation - Show on small screens only */}
          <div className="lg:hidden">
            <CaseStudyNavigation 
              navigation={navigationItems} 
              currentSectionIndex={keyboardNav.currentSectionIndex}
            />
          </div>
          
          {/* Main Content */}
          <main className="w-full">
            {/* Hero Section - No navigation anchor */}
            <div className="mb-8">
              <StructuredCaseStudyHero 
                caseStudyData={caseStudyData}
                heroAsImage={heroAsImage}
              />
            </div>

            {/* Overview Section */}
            <section id="overview" className="mb-8">
              <StructuredCaseStudyOverview projectId={caseStudyData.id} />
            </section>

            {/* Research Section */}
            {caseStudyData.researchSection && (
              <div className="mb-8 -mx-4 sm:-mx-6">
                <ResearchSectionTwoCol researchSection={caseStudyData.researchSection} />
              </div>
            )}

            {/* Problem Callout Section - Full Width */}
            {caseStudyData.problemCallout && (
              <div className="mb-8 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12">
                <ProblemCallout
                  eyebrow={caseStudyData.problemCallout.eyebrow}
                  statement={caseStudyData.problemCallout.statement}
                />
              </div>
            )}

            {/* Key Insights Section */}
            {caseStudyData.keyInsights && (
              <div className="mb-8 -mx-4 sm:-mx-6">
                <KeyInsightsRow insights={caseStudyData.keyInsights} />
              </div>
            )}

            {/* My Thought Process Section */}
            <MyThoughtProcessSection projectId={caseStudyData.id} />

            {/* Ideation Section - Full Width */}
            {caseStudyData.ideationSection && (
              <div className="mb-8 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12">
                <IdeationSection ideationData={caseStudyData.ideationSection} />
              </div>
            )}

            {/* Case Study Sections - Apply cs-card class */}
            <div className="space-y-12 pb-12">
              {caseStudyData.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <div className={`bg-white/80 backdrop-blur-sm rounded-lg p-12 shadow-sm border border-white/20 ${isProjectPage ? 'cs-card' : ''} ${section.id === 'final-product' ? '-mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12' : ''}`}>
                    <StructuredCaseStudySection {...section} />
                  </div>
                </section>
              ))}
              
              <div id="contact-section" className={isProjectPage ? 'cs-card' : ''}>
                <CaseStudyContactSection />
              </div>
              
              {/* Share Toolbar - At Bottom */}
              <div className="pt-6 border-t border-border/20 flex justify-center">
                <CaseStudyShareToolbar 
                  url={currentUrl}
                  title={caseStudyData.title}
                  className="flex-wrap justify-center"
                />
              </div>
              
              {/* Cross-referenced Case Study Teaser */}
              <CaseStudyTeaserSection targetProject={getCrossReferencedProject(caseStudyData.id)} />
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default StructuredCaseStudyLayout;