import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      
      <div className={`min-h-screen bg-muted/30 ${isProjectPage ? 'projects-page' : ''}`}>
        {/* 3D Transition Overlay */}
        <Section3DOverlay 
          isVisible={isTransitioning} 
          direction={transitionDirection}
          variation={transitionVariation}
        />

        <Header />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-height,64px)+12px)]">
          {/* Hero Section */}
          <div className="center-content mb-12">
            <StructuredCaseStudyHero 
              caseStudyData={caseStudyData}
              heroAsImage={heroAsImage}
            />
          </div>

          {/* Overview Section */}
          <section id="overview" className="section-snap center-content mb-12 py-8">
            <StructuredCaseStudyOverview projectId={caseStudyData.id} />
          </section>

          {/* Research Section */}
          {caseStudyData.researchSection && (
            <section id="research" className="section-snap left-content mb-12">
              <ResearchSectionTwoCol researchSection={caseStudyData.researchSection} />
            </section>
          )}

          {/* Problem Callout Section - Full width band */}
          {caseStudyData.problemCallout && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-muted/50">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <section id="problem" className="section-snap py-12 md:py-16">
                  <ProblemCallout
                    eyebrow={caseStudyData.problemCallout.eyebrow}
                    statement={caseStudyData.problemCallout.statement}
                  />
                </section>
              </div>
            </div>
          )}

          {/* Key Insights Section */}
          {caseStudyData.keyInsights && (
            <section id="key-insights" className="section-snap left-content mb-12 py-8">
              <KeyInsightsRow insights={caseStudyData.keyInsights} />
            </section>
          )}

          {/* My Thought Process Section */}
          <MyThoughtProcessSection 
            content="I focused on creating a streamlined approach that balanced user needs with technical constraints. My decision criteria centered on usability, scalability, and measurable impact. Through iterative validation loops, I refined the solution based on real user feedback and performance metrics."
            images={[
              {
                src: "https://barskyux.com/wp-content/uploads/2025/08/thoughtprocess.jpg",
                alt: "Design thinking process diagram",
                caption: "Decision framework and validation approach"
              }
            ]}
          />

          {/* Ideation Section - Full width band */}
          {caseStudyData.ideationSection && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-muted/50">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <section id="ideation" className="section-snap py-12 md:py-16">
                  <IdeationSection ideationData={caseStudyData.ideationSection} />
                </section>
              </div>
            </div>
          )}

          {/* What Didn't Work Section */}
          <section id="what-didnt-work" className="section-snap left-content py-12 md:py-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="uppercase text-xs font-semibold tracking-wide">
                  What Didn't Work
                </Badge>
                <h2 className="text-3xl md:text-4xl font-semibold">
                  Learning from Failures
                </h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
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
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <section id="the-final-product" className="section-snap py-12 md:py-16">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Badge variant="outline" className="uppercase text-xs font-semibold tracking-wide">
                      The Final Product
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-semibold text-left">
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
                  
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                    The final solution successfully balanced user needs with technical constraints, 
                    delivering a streamlined experience that improved key metrics while maintaining scalability.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Outcome / Results Section */}
          <section id="outcome-results" className="section-snap left-content py-12 md:py-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="uppercase text-xs font-semibold tracking-wide">
                  Outcome / Results
                </Badge>
                <h2 className="text-3xl md:text-4xl font-semibold">
                  Measurable Impact
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
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
          
          {/* Contact Section */}
          <section id="contact-section" className="section-snap center-content py-12 md:py-16">
            <CaseStudyContactSection />
          </section>
          
          {/* Share Toolbar */}
          <div className="py-6 border-t border-border/20 center-content">
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
