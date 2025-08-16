
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredCaseStudySEO from "@/components/seo/StructuredCaseStudySEO";
import CaseStudyNavigation from "../CaseStudyNavigation";
import CaseStudyContactSection from "../CaseStudyContactSection";
import CaseStudyShareToolbar from "../CaseStudyShareToolbar";
import Section3DOverlay from "@/components/transitions/Section3DOverlay";
import { useCaseStudyKeyboardNavigation } from "@/hooks/useCaseStudyKeyboardNavigation";
import { StructuredCaseStudyData } from "@/data/structuredCaseStudies";
import StructuredCaseStudyHero from "./StructuredCaseStudyHero";

interface StructuredCaseStudyLayoutProps {
  caseStudyData: StructuredCaseStudyData;
  heroAsImage?: boolean;
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  caseStudyData,
  heroAsImage = false
}) => {
  // Get current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://barskydesign.pro${caseStudyData.seoData?.path}`;

  // Create navigation items from sections
  const navigationItems = [
    { label: "Overview", anchor: "#overview" },
    ...caseStudyData.sections.map(section => ({
      label: section.title,
      anchor: `#${section.id}`
    }))
  ];

  // Build sections for keyboard navigation
  const keyboardSections = React.useMemo(() => {
    const navSections = [
      { id: 'overview', title: 'Overview' },
      ...caseStudyData.sections.map(section => ({
        id: section.id,
        title: section.title
      })),
      { id: 'contact-section', title: 'Contact' }
    ];
    return navSections;
  }, [caseStudyData.sections]);

  // Add keyboard navigation
  const {
    isTransitioning,
    transitionDirection,
    transitionVariation,
  } = useCaseStudyKeyboardNavigation(keyboardSections);

  return (
    <>
      <StructuredCaseStudySEO caseStudy={caseStudyData} />
      
      <div className={`min-h-screen bg-gradient-to-br ${caseStudyData.gradientClasses || "from-blue-50 via-slate-50 to-indigo-50"}`}>
        {/* 3D Transition Overlay */}
        <Section3DOverlay 
          isVisible={isTransitioning} 
          direction={transitionDirection}
          variation={transitionVariation}
        />

        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-[calc(var(--header-height,64px)+12px)]">
          <div className="lg:flex lg:gap-8">
            {/* Navigation */}
            <CaseStudyNavigation navigation={navigationItems} />
            
            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Hero Section */}
              <section id="overview" className="mb-8">
                <StructuredCaseStudyHero 
                  caseStudyData={caseStudyData}
                  heroAsImage={heroAsImage}
                />
                
                {/* Share Toolbar - Under Title */}
                <div className="mt-6 flex justify-center lg:justify-start">
                  <CaseStudyShareToolbar 
                    url={currentUrl}
                    title={caseStudyData.title}
                    className="flex-wrap justify-center lg:justify-start"
                  />
                </div>
              </section>

              {/* Case Study Sections */}
              <div className="space-y-20 pb-20">
                {caseStudyData.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-12 shadow-sm border border-white/20">
                      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-left lg:text-center">
                        {section.title}
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        {section.content.map((paragraph, index) => (
                          <p key={index} className="text-lg text-muted-foreground leading-relaxed mb-6">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </section>
                ))}
                
                <div id="contact-section">
                  <CaseStudyContactSection />
                </div>
                
                {/* Share Toolbar - At Bottom */}
                <div className="mt-12 pt-8 border-t border-white/20 flex justify-center">
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
