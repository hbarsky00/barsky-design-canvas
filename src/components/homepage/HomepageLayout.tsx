import React, { Suspense } from "react";
import Header from "@/components/Header";
import MinimalHero from "@/components/hero/MinimalHero";
import BioSection from "@/components/hero/BioSection";
import { homepageFaqs } from "@/data/seoFaqs";
import Footer from "@/components/Footer";
import FloatingConsultationBubble from "@/components/FloatingConsultationBubble";
import FloatingButtonGroup from "@/components/shared/FloatingButtonGroup";
import SectionTransition from "@/components/transitions/SectionTransition";

import BackgroundAudio from "@/components/audio/BackgroundAudio";
import { useHeaderNavigation } from "@/components/header/useHeaderNavigation";
import { useBounceReduction } from "@/hooks/useBounceReduction";
import LazySection from "@/components/lazy/LazySection";
import {
  LazyVideoCaseStudiesSection,
  LazyRecentAdventuresSection,
  LazyContactForm,
  LazySeoFaqSection,
  LazyBlogPreview,
  LazyInternalLinkingEnhancer,
  LazyExitIntentDetector,
  LazyScrollEngagement
} from "@/components/lazy/LazyComponents";
import CurrentProjectsSection from "@/components/home/CurrentProjectsSection";

const HomepageLayout: React.FC = () => {
  const { isScrolledPastHero } = useHeaderNavigation();
  const { metrics, isLikelyToBounce } = useBounceReduction();

  const handleExitIntent = () => {
    // Exit intent detected - production ready
  };


  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative">
      
      <BackgroundAudio 
        src="/audio/shove-it-deftones.mp3" 
        volume={0.15}
      />
      
      <Header />
      
      <main className="space-y-2 md:space-y-6 relative z-10">
        {/* Keep intro section outside 3D container to prevent displacement */}
        <SectionTransition variant="fade" intensity={0.3}>
          <section id="intro" tabIndex={-1} className="scroll-offset">
            <MinimalHero />
          </section>
        </SectionTransition>
        
        {/* Remove 3D effects that cause layout distortion */}
        <div className="space-y-2 md:space-y-6">
        
        <section id="case-studies" tabIndex={-1} className="scroll-offset">
          <LazySection threshold={0.05} fallback={<div className="min-h-[60vh] animate-pulse bg-muted/20 rounded-lg" />}>
            <SectionTransition variant="fade" delay={0.05} intensity={0.3} className="py-0 md:py-12">
              <LazyVideoCaseStudiesSection />
            </SectionTransition>
          </LazySection>
        </section>
        
        {/* Keep current projects section outside 3D container to prevent cutting off */}
        <SectionTransition variant="fade" delay={0.1} intensity={0.3}>
          <section id="current-projects" tabIndex={-1} className="scroll-offset">
            <CurrentProjectsSection />
          </section>
        </SectionTransition>
        
        <LazySection>
          <SectionTransition variant="fade" delay={0.15} intensity={0.3}>
            <section id="adventures" tabIndex={-1} className="scroll-offset">
              <LazyRecentAdventuresSection />
            </section>
          </SectionTransition>
        </LazySection>
        
        <SectionTransition variant="fade" delay={0.2} intensity={0.3}>
          <section id="bio" tabIndex={-1} className="scroll-offset">
            <BioSection />
          </section>
        </SectionTransition>
        
        <LazySection>
          <SectionTransition variant="fade" delay={0.25} intensity={0.3} className="bg-muted/30 py-8 md:py-12">
            <section id="contact" tabIndex={-1} className="scroll-offset">
              <LazyContactForm />
            </section>
          </SectionTransition>
        </LazySection>
        
        <LazySection>
          <SectionTransition variant="fade" delay={0.3} intensity={0.3} className="bg-background py-8 md:py-12">
            <section id="blog" tabIndex={-1} className="scroll-offset">
              <LazyBlogPreview />
            </section>
          </SectionTransition>
        </LazySection>
        
        <LazySection>
          <SectionTransition variant="fade" delay={0.35} intensity={0.3} className="hidden md:block bg-muted/30 py-8 md:py-12">
            <section id="faq" tabIndex={-1} className="scroll-offset">
              <LazySeoFaqSection 
                title="Frequently Asked Questions"
                faqs={homepageFaqs}
              />
            </section>
          </SectionTransition>
        </LazySection>

        <LazySection>
          <SectionTransition variant="fade" delay={0.4} intensity={0.3} className="bg-background py-8 md:py-12">
            <section id="internal-linking" tabIndex={-1} className="scroll-offset">
              <LazyInternalLinkingEnhancer 
                currentPage="home" 
                showRelatedLinks={true}
              />
            </section>
          </SectionTransition>
        </LazySection>
        </div>
      </main>
      
      <Footer />
      <FloatingConsultationBubble />
      <FloatingButtonGroup />
      
      {/* Bounce Reduction Components - Lazy loaded */}
      <Suspense fallback={null}>
        <LazyExitIntentDetector 
          onExitIntent={handleExitIntent}
          disabled={metrics.timeOnPage < 10000} // Only show after 10 seconds
        />
        <LazyScrollEngagement />
      </Suspense>
    </div>
  );
};

export default HomepageLayout;
