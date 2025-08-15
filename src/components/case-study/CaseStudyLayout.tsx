import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import CaseStudyNavigation from "./CaseStudyNavigation";
import CaseStudyContactSection from "./CaseStudyContactSection";
import CaseStudyShareToolbar from "./CaseStudyShareToolbar";
import Section3DOverlay from "@/components/transitions/Section3DOverlay";
import { useCaseStudyKeyboardNavigation } from "@/hooks/useCaseStudyKeyboardNavigation";

interface CaseStudySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface CaseStudyLayoutProps {
  title: string;
  description: string;
  image: string;
  projectName: string;
  results: string[];
  technologies: string[];
  path: string;
  heroSection: React.ReactNode;
  sections: CaseStudySection[];
  gradientClasses?: string;
}

const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({
  title,
  description,
  image,
  projectName,
  results,
  technologies,
  path,
  heroSection,
  sections,
  gradientClasses = "from-blue-50 via-slate-50 to-indigo-50"
}) => {
  // Get current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://barskydesign.pro${path}`;

  // Create navigation items from sections
  const navigationItems = [
    { label: "Overview", anchor: "#overview" },
    ...sections.map(section => ({
      label: section.title,
      anchor: `#${section.id}`
    }))
  ];

  // Build sections for keyboard navigation
  const keyboardSections = React.useMemo(() => {
    const navSections = [
      { id: 'overview', title: 'Overview' },
      ...sections.map(section => ({
        id: section.id,
        title: section.title
      })),
      { id: 'contact-section', title: 'Contact' }
    ];
    return navSections;
  }, [sections]);

  // Add keyboard navigation
  const {
    isTransitioning,
    transitionDirection,
    transitionVariation,
  } = useCaseStudyKeyboardNavigation(keyboardSections);

  return (
    <>
      <SEO
        title={title}
        description={description}
        image={image}
        type="article"
        url={`https://barskydesign.pro${path}`}
      />
      
      <div className={`min-h-screen bg-gradient-to-br ${gradientClasses}`}>
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
                {heroSection}
                
                {/* Share Toolbar - Under Title */}
                <div className="mt-6 flex justify-center lg:justify-start">
                  <CaseStudyShareToolbar 
                    url={currentUrl}
                    title={title}
                    className="flex-wrap justify-center lg:justify-start"
                  />
                </div>
              </section>

              {/* Case Study Sections */}
              <div className="space-y-20 pb-20">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-12 shadow-sm border border-white/20">
                      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-left lg:text-center">{section.title}</h2>
                      {section.content}
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
                    title={title}
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

export default CaseStudyLayout;
