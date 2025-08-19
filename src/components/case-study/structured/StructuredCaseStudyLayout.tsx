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
    ...(caseStudyData.ideationSection ? [{ label: "Ideation", anchor: "#ideation" }] : []),
    ...caseStudyData.sections
      .filter(section => section.id !== "final-product" && section.id !== "outcome")
      .map(section => ({
        label: section.title,
        anchor: `#${section.id}`
      })),
    ...(caseStudyData.finalProductSection ? [{ label: caseStudyData.finalProductSection.title, anchor: "#the-final-product" }] : []),
    ...(caseStudyData.outcomeSection ? [{ label: caseStudyData.outcomeSection.title, anchor: "#outcome-results" }] : [])
  ];

  // Build sections for keyboard navigation
  const keyboardSections = React.useMemo(() => {
    const navSections = [
      { id: 'overview', title: 'Overview' },
      ...(caseStudyData.researchSection ? [{ id: 'research', title: 'Research' }] : []),
      ...(caseStudyData.problemCallout ? [{ id: 'problem', title: 'Problem' }] : []),
      ...(caseStudyData.keyInsights ? [{ id: 'key-insights', title: 'Key Insights' }] : []),
      ...(caseStudyData.ideationSection ? [{ id: 'ideation', title: 'Ideation' }] : []),
      ...caseStudyData.sections
        .filter(section => section.id !== "final-product" && section.id !== "outcome")
        .map(section => ({
          id: section.id,
          title: section.title
        })),
      ...(caseStudyData.finalProductSection ? [{ id: 'the-final-product', title: caseStudyData.finalProductSection.title }] : []),
      ...(caseStudyData.outcomeSection ? [{ id: 'outcome-results', title: caseStudyData.outcomeSection.title }] : []),
      { id: 'contact-section', title: 'Contact' }
    ];
    return navSections;
  }, [caseStudyData.sections, caseStudyData.problemCallout, caseStudyData.researchSection, caseStudyData.finalProductSection, caseStudyData.outcomeSection]);

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
          {caseStudyData.sections
            .filter(section => section.id !== "final-product" && section.id !== "outcome")
            .map((section) => {
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
            
            // Check if section has eyebrow and should use centered header style
            if (section.eyebrow) {
              return (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="mb-12 text-center scroll-mt-[calc(var(--header-height,64px)+1rem)]"
                >
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-eyebrow text-primary header-spacing">
                    {section.eyebrow}
                  </div>
                  <h2 className="text-section-title text-foreground content-rail-center">
                    {section.title}
                  </h2>
                  <div className="content-rail">
                    <StructuredCaseStudySection
                      key={`${section.id}-content`}
                      id={`${section.id}-content`}
                      title="" // Remove title since we render it above
                      icon={section.icon}
                      variant={section.variant}
                      content={section.content}
                      media={section.media}
                      images={section.images}
                      metrics={section.metrics}
                      tags={section.tags}
                    />
                  </div>
                </motion.section>
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

          {/* Dynamic Final Product Section */}
          {caseStudyData.finalProductSection && (
            <section 
              id="the-final-product" 
              data-section="the-final-product" 
              aria-labelledby="final-product-heading" 
              className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+2rem)]"
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
              className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+2rem)]"
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
