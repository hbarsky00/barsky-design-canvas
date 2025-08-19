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
import UnifiedCaseStudyHero from "./UnifiedCaseStudyHero";
import StructuredCaseStudySection from "./StructuredCaseStudySection";
import StructuredCaseStudyOverview from "./StructuredCaseStudyOverview";
import ProblemCallout from "../ProblemCallout";
import KeyInsightsRow from "../KeyInsightsRow";
import ResearchSectionTwoCol from "../ResearchSectionTwoCol";
import IdeationSection from "../IdeationSection";
import MyThoughtProcessSection from "../MyThoughtProcessSection";
import WhatDidntWorkSection from "../WhatDidntWorkSection";
import SingleCaseStudyPreview from "../SingleCaseStudyPreview";
import MaximizableImage from "@/components/project/MaximizableImage";
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

  // Create navigation items from sections in correct order
  const navigationItems = [
    { label: "Overview", anchor: "#overview" },
    ...(caseStudyData.researchSection ? [{ label: "Research", anchor: "#research" }] : []),
    ...(caseStudyData.problemCallout ? [{ label: "Problem", anchor: "#problem" }] : []),
    ...(caseStudyData.keyInsights ? [{ label: "Key Insights", anchor: "#key-insights" }] : []),
    ...(caseStudyData.myThoughtProcessSection ? [{ label: "My Thought Process", anchor: "#my-thought-process" }] : []),
    ...(caseStudyData.ideationSection ? [
      { label: "Ideation", anchor: "#ideation" },
      { label: "Iterations", anchor: "#iterations" }
    ] : []),
    ...(caseStudyData.whatDidntWorkSection ? [{ label: "What Didn't Work", anchor: "#what-didnt-work" }] : []),
    ...(caseStudyData.userTestingSection ? [{ label: "Validation & Testing", anchor: "#user-testing" }] : []),
    ...(caseStudyData.finalProductSection ? [{ label: "The Result", anchor: "#the-final-product" }] : []),
    ...(caseStudyData.outcomeSection ? [{ label: "Outcome & Impact", anchor: "#outcome-results" }] : [])
  ];

  // Build sections for keyboard navigation in correct order
  const keyboardSections = React.useMemo(() => {
    const navSections = [
      { id: 'overview', title: 'Overview' },
      ...(caseStudyData.researchSection ? [{ id: 'research', title: 'Research' }] : []),
      ...(caseStudyData.problemCallout ? [{ id: 'problem', title: 'Problem' }] : []),
      ...(caseStudyData.keyInsights ? [{ id: 'key-insights', title: 'Key Insights' }] : []),
      ...(caseStudyData.myThoughtProcessSection ? [{ id: 'my-thought-process', title: 'My Thought Process' }] : []),
      ...(caseStudyData.ideationSection ? [
        { id: 'ideation', title: 'Ideation' },
        { id: 'iterations', title: 'Iterations' }
      ] : []),
      ...(caseStudyData.whatDidntWorkSection ? [{ id: 'what-didnt-work', title: 'What Didn\'t Work' }] : []),
      ...(caseStudyData.userTestingSection ? [{ id: 'user-testing', title: 'Validation & Testing' }] : []),
      ...(caseStudyData.finalProductSection ? [{ id: 'the-final-product', title: 'The Result' }] : []),
      ...(caseStudyData.outcomeSection ? [{ id: 'outcome-results', title: 'Outcome & Impact' }] : []),
      { id: 'contact-section', title: 'Contact' }
    ];
    return navSections;
  }, [caseStudyData.researchSection, caseStudyData.problemCallout, caseStudyData.keyInsights, caseStudyData.myThoughtProcessSection, caseStudyData.ideationSection, caseStudyData.whatDidntWorkSection, caseStudyData.userTestingSection, caseStudyData.finalProductSection, caseStudyData.outcomeSection]);

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
        
        <div className="pt-[calc(var(--header-height,64px)+12px)]">
          {/* Unified Hero Section */}
          <UnifiedCaseStudyHero 
            caseStudyData={caseStudyData}
            heroAsImage={heroAsImage}
          />

          <div className="section-container">
          {/* Overview Section */}
          <section id="overview" data-section="overview" aria-labelledby="overview-heading" className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
            <h2 id="overview-heading" className="sr-only">Overview Section</h2>
            <StructuredCaseStudyOverview projectId={caseStudyData.id} />
          </section>

          {/* Research Section */}
          {caseStudyData.researchSection && (
            <section id="research" data-section="research" aria-labelledby="research-heading" className="section-snap mb-12 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
              <h2 id="research-heading" className="sr-only">Research Section</h2>
              <ResearchSectionTwoCol researchSection={caseStudyData.researchSection} />
            </section>
          )}

          {/* Problem Callout Section - Full width band */}
          {caseStudyData.problemCallout && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-muted/50">
              <section id="problem" data-section="problem" aria-labelledby="problem-heading" className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
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
            <section id="key-insights" data-section="key-insights" aria-labelledby="key-insights-heading" className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
              <h2 id="key-insights-heading" className="sr-only">Key Insights Section</h2>
              <KeyInsightsRow insights={caseStudyData.keyInsights} />
            </section>
          )}

          {/* My Thought Process Section */}
          {caseStudyData.myThoughtProcessSection && (
            <section 
              id="my-thought-process" 
              data-section="my-thought-process" 
              aria-labelledby="my-thought-process-heading" 
              className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)]"
            >
              <h2 id="my-thought-process-heading" className="sr-only">My Thought Process Section</h2>
              <MyThoughtProcessSection 
                content={caseStudyData.myThoughtProcessSection.content}
                images={caseStudyData.myThoughtProcessSection.images || []}
              />
            </section>
          )}

          {/* Ideation Section - Full width band - Now appears after My Thought Process */}
          {caseStudyData.ideationSection && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-muted/50">
              <section id="ideation" data-section="ideation" aria-labelledby="ideation-heading" className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
                <h2 id="ideation-heading" className="sr-only">Ideation Section</h2>
                <IdeationSection ideationData={caseStudyData.ideationSection} />
              </section>
            </div>
          )}

          {/* What Didn't Work Section */}
          {caseStudyData.whatDidntWorkSection && (
            <section 
              id="what-didnt-work" 
              data-section="what-didnt-work" 
              aria-labelledby="what-didnt-work-heading" 
              className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)]"
            >
              <h2 id="what-didnt-work-heading" className="sr-only">What Didn't Work Section</h2>
              <WhatDidntWorkSection whatDidntWorkData={caseStudyData.whatDidntWorkSection} />
            </section>
          )}

          {/* User Testing Section - Same styling as Outcome section */}
          {caseStudyData.userTestingSection && (
            <section 
              id="user-testing" 
              data-section="user-testing" 
              aria-labelledby="user-testing-heading" 
              className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)]"
            >
              <h2 id="user-testing-heading" className="sr-only">{caseStudyData.userTestingSection.title} Section</h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-12 text-center"
              >
                <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-eyebrow text-purple-700 header-spacing">
                  {caseStudyData.userTestingSection.eyebrow || "VALIDATION & TESTING"}
                </div>
                <h2 className="text-section-title text-foreground content-rail-center">
                  {caseStudyData.userTestingSection.title}
                </h2>
              </motion.div>

              <div className="content-rail-left mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {caseStudyData.userTestingSection.description}
                </p>
              </div>

              {/* Display dynamic metrics */}
              {caseStudyData.userTestingSection.metrics && caseStudyData.userTestingSection.metrics.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {caseStudyData.userTestingSection.metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center p-6 bg-white rounded-lg shadow-sm border border-border/20"
                    >
                      <div className="text-3xl font-bold text-primary mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Display user testing images */}
              {caseStudyData.userTestingSection.images && (
                <div className="grid gap-6 md:gap-8">
                  {caseStudyData.userTestingSection.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-sm border border-border/20"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto object-contain image-high-quality"
                      />
                      {image.caption && (
                        <div className="p-4 text-sm text-muted-foreground text-center border-t border-border/10">
                          {image.caption}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Dynamic Final Product Section */}
          {caseStudyData.finalProductSection && (
            <section 
              id="the-final-product" 
              data-section="the-final-product" 
              aria-labelledby="final-product-heading" 
              className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)]"
            >
              <h2 id="final-product-heading" className="sr-only">{caseStudyData.finalProductSection.title} Section</h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-12 text-center"
              >
                <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-eyebrow text-green-700 header-spacing">
                  {caseStudyData.finalProductSection.eyebrow || "THE RESULT"}
                </div>
                <h2 className="text-section-title text-foreground content-rail-center">
                  {caseStudyData.finalProductSection.title}
                </h2>
              </motion.div>

              <div className="content-rail-left mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {caseStudyData.finalProductSection.description}
                </p>
              </div>

              {caseStudyData.finalProductSection.images && (
                <div className="grid gap-6 md:gap-8">
                  {caseStudyData.finalProductSection.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-sm border border-border/20"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto object-contain image-high-quality"
                      />
                      {image.caption && (
                        <div className="p-4 text-sm text-muted-foreground text-center border-t border-border/10">
                          {image.caption}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Dynamic Outcome Section */}
          {caseStudyData.outcomeSection && (
            <section 
              id="outcome-results" 
              data-section="outcome-results" 
              aria-labelledby="outcome-heading" 
              className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)]"
            >
              <h2 id="outcome-heading" className="sr-only">{caseStudyData.outcomeSection.title} Section</h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-12 text-center"
              >
                <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-eyebrow text-blue-700 header-spacing">
                  {caseStudyData.outcomeSection.eyebrow || "OUTCOMES & IMPACT"}
                </div>
                <h2 className="text-section-title text-foreground content-rail-center">
                  {caseStudyData.outcomeSection.title}
                </h2>
              </motion.div>

              <div className="content-rail-left mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {caseStudyData.outcomeSection.description}
                </p>
              </div>

              {/* Display dynamic metrics */}
              {caseStudyData.outcomeSection.metrics && caseStudyData.outcomeSection.metrics.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {caseStudyData.outcomeSection.metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center p-6 bg-white rounded-lg shadow-sm border border-border/20"
                    >
                      <div className="text-3xl font-bold text-primary mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Display outcome images */}
              {caseStudyData.outcomeSection.images && (
                <div className="grid gap-6 md:gap-8">
                  {caseStudyData.outcomeSection.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-sm border border-border/20"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto object-contain image-high-quality"
                      />
                      {image.caption && (
                        <div className="p-4 text-sm text-muted-foreground text-center border-t border-border/10">
                          {image.caption}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          )}

          
          {/* Related Case Study Section */}
          <SingleCaseStudyPreview currentProjectId={caseStudyData.id} />
          
          {/* Contact Section */}
          <section id="contact-section" data-section="contact-section" aria-labelledby="contact-heading" className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
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
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default StructuredCaseStudyLayout;
