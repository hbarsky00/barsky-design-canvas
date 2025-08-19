import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseStudyContactSection from "../CaseStudyContactSection";
import CaseStudyShareToolbar from "../CaseStudyShareToolbar";
import CaseStudyNavigation from "../CaseStudyNavigation";
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
import SingleCaseStudyPreview from "../SingleCaseStudyPreview";
import { Badge } from "@/components/ui/badge";

interface StructuredCaseStudyLayoutProps {
  caseStudyData: StructuredCaseStudyData;
  heroAsImage?: boolean;
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  caseStudyData,
  heroAsImage = false
}) => {
  const isProjectPage = useProjectPageDetection();
  
  // Helper function to get images from a specific section
  const getSectionImages = (sectionId: string) => {
    const section = caseStudyData.sections.find(s => s.id === sectionId);
    return section?.images || [];
  };
  
  // Get current URL for sharing with safety check
  const currentUrl = typeof window !== 'undefined' && window.location 
    ? window.location.href 
    : `https://barskydesign.pro${caseStudyData.seoData?.path || ''}`;

  // Create navigation items from sections
  const navigationItems = [
    { label: "Overview", anchor: "#overview" },
    ...(caseStudyData.researchSection ? [{ label: "Research", anchor: "#research" }] : []),
    ...(caseStudyData.problemCallout ? [{ label: "Problem", anchor: "#problem" }] : []),
    ...(caseStudyData.keyInsights ? [{ label: "Key Insights", anchor: "#key-insights" }] : []),
    { label: "My Thought Process", anchor: "#my-thought-process" },
    ...(caseStudyData.ideationSection ? [{ label: "Ideation", anchor: "#ideation" }] : []),
    { label: "What Didn't Work", anchor: "#what-didnt-work" },
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
      { id: 'what-didnt-work', title: 'What Didn\'t Work' },
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
      
      <div className={`min-h-screen bg-muted/30 ${isProjectPage ? 'projects-page' : ''}`}>
        {/* 3D Transition Overlay */}
        <Section3DOverlay 
          isVisible={isTransitioning} 
          direction={transitionDirection}
          variation={transitionVariation}
        />

        <Header />
        
        {/* Mobile Sticky Navigation */}
        <CaseStudyNavigation 
          navigation={navigationItems}
          currentSectionIndex={keyboardNav.currentSectionIndex}
        />
        
        <div className="section-container pt-[calc(var(--header-height,64px)+12px)]">
          {/* Hero Section */}
          <div className="mb-12">
            <StructuredCaseStudyHero 
              caseStudyData={caseStudyData}
              heroAsImage={heroAsImage}
            />
          </div>

          {/* Overview Section */}
          <section id="overview" data-section="overview" aria-labelledby="overview-heading" className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+2rem)]">
            <h2 id="overview-heading" className="sr-only">Overview Section</h2>
            <StructuredCaseStudyOverview projectId={caseStudyData.id} />
          </section>

          {/* Research Section */}
          {caseStudyData.researchSection && (
            <section id="research" data-section="research" aria-labelledby="research-heading" className="section-snap mb-12 scroll-mt-[calc(var(--header-height,64px)+2rem)]">
              <h2 id="research-heading" className="sr-only">Research Section</h2>
              <ResearchSectionTwoCol researchSection={caseStudyData.researchSection} />
            </section>
          )}

          {/* Problem Callout Section - Full width band */}
          {caseStudyData.problemCallout && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-muted/50">
              <section id="problem" data-section="problem" aria-labelledby="problem-heading" className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+2rem)]">
                <h2 id="problem-heading" className="sr-only">Problem Section</h2>
                <ProblemCallout
                  eyebrow={caseStudyData.problemCallout.eyebrow}
                  statement={caseStudyData.problemCallout.statement}
                />
              </section>
            </div>
          )}

          {/* Key Insights Section */}
          {caseStudyData.keyInsights && (
            <section id="key-insights" data-section="key-insights" aria-labelledby="key-insights-heading" className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+2rem)]">
              <h2 id="key-insights-heading" className="sr-only">Key Insights Section</h2>
              <KeyInsightsRow insights={caseStudyData.keyInsights} />
            </section>
          )}


          {/* Ideation Section - Full width band */}
          {caseStudyData.ideationSection && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-muted/50">
              <section id="ideation" data-section="ideation" aria-labelledby="ideation-heading" className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+2rem)]">
                <h2 id="ideation-heading" className="sr-only">Ideation Section</h2>
                <IdeationSection ideationData={caseStudyData.ideationSection} />
              </section>
            </div>
          )}

          {/* Dynamic Sections from case study data */}
          {caseStudyData.sections.map((section) => {
            // Special handling for "my-thought-process" sections to use the clean design
            if (section.id === "my-thought-process") {
              return (
                <section 
                  key={section.id}
                  id={section.id} 
                  data-section={section.id} 
                  aria-labelledby={`${section.id}-heading`} 
                  className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+2rem)]"
                >
                  <h2 id={`${section.id}-heading`} className="sr-only">{section.title} Section</h2>
                  <MyThoughtProcessSection 
                    content={section.content}
                    images={section.media ? [{
                      src: section.media.src,
                      alt: section.media.alt,
                      caption: section.media.caption
                    }] : section.images || []}
                  />
                </section>
              );
            }
            
            // All other sections use the standard card-based layout
            return (
              <StructuredCaseStudySection
                key={section.id}
                id={section.id}
                title={section.title}
                icon={section.icon}
                variant={section.variant}
                content={section.content}
                media={section.media}
                images={section.images}
                metrics={section.metrics}
                tags={section.tags}
              />
            );
          })}

          
          {/* Related Case Study Section */}
          <SingleCaseStudyPreview currentProjectId={caseStudyData.id} />
          
          {/* Contact Section */}
          <section id="contact-section" data-section="contact-section" aria-labelledby="contact-heading" className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+2rem)]">
            <h2 id="contact-heading" className="sr-only">Contact Section</h2>
            <CaseStudyContactSection />
          </section>
          
          {/* Share Toolbar */}
          <div className="py-6 border-t border-border/20">
            <CaseStudyShareToolbar 
              url={currentUrl}
              title={caseStudyData.title}
              className="flex-wrap justify-center"
            />
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default StructuredCaseStudyLayout;
