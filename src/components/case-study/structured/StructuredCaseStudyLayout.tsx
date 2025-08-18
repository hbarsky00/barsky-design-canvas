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

interface StructuredCaseStudyLayoutProps {
  caseStudyData: StructuredCaseStudyData;
  heroAsImage?: boolean;
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  caseStudyData,
  heroAsImage = false
}) => {
  const isProjectPage = useProjectPageDetection();
  
  // Get current URL for sharing with safety check
  const currentUrl = typeof window !== 'undefined' && window.location 
    ? window.location.href 
    : `https://barskydesign.pro${caseStudyData.seoData?.path || ''}`;

  // Create navigation items from sections
  const navigationItems = [
    { label: "Overview", anchor: "#overview" },
    ...(caseStudyData.problemCallout ? [{ label: "Problem", anchor: "#problem" }] : []),
    ...(caseStudyData.keyInsights ? [{ label: "Key Insights", anchor: "#key-insights" }] : []),
    ...caseStudyData.sections.map(section => ({
      label: section.title,
      anchor: `#${section.id}`
    }))
  ];

  // Build sections for keyboard navigation
  const keyboardSections = React.useMemo(() => {
    const navSections = [
      { id: 'overview', title: 'Overview' },
      ...(caseStudyData.problemCallout ? [{ id: 'problem', title: 'Problem' }] : []),
      ...(caseStudyData.keyInsights ? [{ id: 'key-insights', title: 'Key Insights' }] : []),
      ...caseStudyData.sections.map(section => ({
        id: section.id,
        title: section.title
      })),
      { id: 'contact-section', title: 'Contact' }
    ];
    return navSections;
  }, [caseStudyData.sections, caseStudyData.problemCallout]);

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
      
      <div className={`min-h-screen bg-gradient-to-br ${caseStudyData.gradientClasses || "from-blue-50 via-slate-50 to-indigo-50"} ${isProjectPage ? 'projects-page' : ''}`}>
        {/* 3D Transition Overlay */}
        <Section3DOverlay 
          isVisible={isTransitioning} 
          direction={transitionDirection}
          variation={transitionVariation}
        />

        <Header />
        
        <div className={isProjectPage ? "projects-wrap" : "max-w-7xl mx-auto px-4 sm:px-6 pt-[calc(var(--header-height,64px)+12px)]"}>
          <div className="lg:flex lg:gap-8">
            {/* Navigation */}
            <CaseStudyNavigation 
              navigation={navigationItems} 
              currentSectionIndex={keyboardNav.currentSectionIndex}
            />
            
            {/* Main Content */}
            <main className="flex-1 min-w-0">
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

              {/* Problem Callout Section */}
              {caseStudyData.problemCallout && (
                <div className="mb-8 -mx-4 sm:-mx-6">
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

              {/* Case Study Sections - Apply cs-card class */}
              <div className="space-y-12 pb-12">
                {caseStudyData.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <div className={`bg-white/80 backdrop-blur-sm rounded-lg p-12 shadow-sm border border-white/20 ${isProjectPage ? 'cs-card' : ''}`}>
                      <StructuredCaseStudySection {...section} />
                    </div>
                  </section>
                ))}
                
                <div id="contact-section" className={isProjectPage ? 'cs-card' : ''}>
                  <CaseStudyContactSection />
                </div>
                
                {/* Share Toolbar - At Bottom */}
                <div className="pt-6 border-t border-white/20 flex justify-center">
                  <CaseStudyShareToolbar 
                    url={currentUrl}
                    title={caseStudyData.title}
                    className="flex-wrap justify-center"
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default StructuredCaseStudyLayout;
