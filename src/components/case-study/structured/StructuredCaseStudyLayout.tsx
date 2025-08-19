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
      { id: 'the-final-product', title: 'The Final Product' },
      { id: 'outcome-results', title: 'Outcome / Results' },
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

          {/* What Didn't Work Section */}
          <section id="what-didnt-work" data-section="what-didnt-work" aria-labelledby="what-didnt-work-heading" className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+2rem)]">
            <h2 id="what-didnt-work-heading" className="sr-only">What Didn't Work Section</h2>
            <div className="space-y-8">
              <div className="space-y-4 content-rail-center">
                <Badge variant="outline" className="uppercase text-xs font-semibold tracking-wide">
                  What Didn't Work
                </Badge>
                <h2 className="text-section-title">
                  Learning from Failures
                </h2>
              </div>
              
              <div className="content-rail-left">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Initial approaches that didn't meet user needs and how we pivoted to better solutions.
                </p>
                
                <ul className="space-y-4 list-none pl-0">
                  <li className="flex flex-col space-y-2">
                    <span className="text-base">• Complex navigation structure confused users</span>
                    <span className="text-sm text-primary font-medium pl-4">
                      Fix: Simplified to 3 main sections with clear visual hierarchy
                    </span>
                  </li>
                  <li className="flex flex-col space-y-2">
                    <span className="text-base">• Too many form fields in initial onboarding</span>
                    <span className="text-sm text-primary font-medium pl-4">
                      Fix: Progressive disclosure with optional advanced settings
                    </span>
                  </li>
                  <li className="flex flex-col space-y-2">
                    <span className="text-base">• Real-time updates caused performance issues</span>
                    <span className="text-sm text-primary font-medium pl-4">
                      Fix: Intelligent batching and optimistic updates
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* The Final Product Section - Full width band */}
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-muted/50">
            <section id="the-final-product" data-section="the-final-product" aria-labelledby="final-product-heading" className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+2rem)]">
              <h2 id="final-product-heading" className="sr-only">The Final Product Section</h2>
              <div className="section-container">
                <div className="space-y-8">
                  <div className="space-y-4 content-rail-center">
                    <Badge variant="outline" className="uppercase text-xs font-semibold tracking-wide">
                      The Final Product
                    </Badge>
                    <h2 className="text-section-title">
                      Refined Solution
                    </h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div className="space-y-4">
                      <img 
                        src="https://barskyux.com/wp-content/uploads/2025/08/finalproduct1.jpg" 
                        alt="Final product desktop view"
                        className="w-full rounded-lg shadow-sm"
                      />
                    </div>
                    <div className="space-y-4">
                      <img 
                        src="https://barskyux.com/wp-content/uploads/2025/08/finalproduct2.jpg" 
                        alt="Final product mobile view"
                        className="w-full rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed content-rail-left">
                    The final solution successfully balanced user needs with technical constraints, 
                    delivering a streamlined experience that improved key metrics while maintaining scalability.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Outcome / Results Section */}
          <section id="outcome-results" data-section="outcome-results" aria-labelledby="outcome-results-heading" className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+2rem)]">
            <h2 id="outcome-results-heading" className="sr-only">Outcome / Results Section</h2>
            <div className="space-y-8">
              <div className="space-y-4 content-rail-center">
                <Badge variant="outline" className="uppercase text-xs font-semibold tracking-wide">
                  Outcome / Results
                </Badge>
                <h2 className="text-section-title">
                  Measurable Impact
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 content-rail">
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary">40%</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">fewer conflicts</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary">30%</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">faster scheduling resolution</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary">25%</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">fewer missed/double-booked events</div>
                </div>
              </div>
            </div>
          </section>
          
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
