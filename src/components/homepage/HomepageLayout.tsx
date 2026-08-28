import React, { Suspense } from "react";
import Header from "@/components/Header";
import CleanHero from "@/components/hero/CleanHero";
import BioSection from "@/components/hero/BioSection";
import { homepageFaqs } from "@/data/seoFaqs";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import InternalLinkingEnhancer from "@/components/seo/InternalLinkingEnhancer";
import Footer from "@/components/Footer";
import FloatingConsultationBubble from "@/components/FloatingConsultationBubble";
import FloatingButtonGroup from "@/components/shared/FloatingButtonGroup";
import SectionTransition from "@/components/transitions/SectionTransition";

import { useBounceReduction } from "@/hooks/useBounceReduction";
import {
  LazyVideoCaseStudiesSection,
  LazyRecentAdventuresSection,
  LazyContactForm,
  LazyBlogPreview,
  LazyExitIntentDetector,
  LazyScrollEngagement
} from "@/components/lazy/LazyComponents";
import CurrentProjectsSection from "@/components/home/CurrentProjectsSection";
import WordOfMouthSection from "@/components/home/WordOfMouthSection";

const HomepageLayout: React.FC = () => {
  
  const { metrics, isLikelyToBounce } = useBounceReduction();

  const handleExitIntent = () => {
    // Exit intent detected - production ready
  };


  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative">
      <Header />
      
      {/* space-y-2 put an 8px band of bare page background between the hero and
          the work section. Invisible while everything was the same flat colour;
          the moment the two got gradients that are built to meet, it showed up
          as a hairline seam across the join. */}
      <main className="space-y-0 relative z-10">
        {/* Keep intro section outside 3D container to prevent displacement */}
        <SectionTransition variant="fade" intensity={0.3}>
          <section id="intro" tabIndex={-1} className="scroll-offset">
            <CleanHero />
          </section>
        </SectionTransition>
        
        {/* Remove 3D effects that cause layout distortion */}
        <div className="space-y-2 md:space-y-6">
        
        <section id="case-studies" tabIndex={-1} className="scroll-offset">
          {/* Not LazySection. This is the first thing under the hero, so every
              visitor scrolls into it — gating it on an IntersectionObserver
              only guaranteed a placeholder-then-content swap, which is the
              odd empty band that used to sit between the hero and the work.
              Suspense still code-splits it; it just starts fetching on mount
              instead of waiting to be scrolled at. */}
          <Suspense fallback={<div className="min-h-[40vh]" aria-hidden="true" />}>
            <SectionTransition variant="fade" delay={0.05} intensity={0.3}>
              <LazyVideoCaseStudiesSection />
            </SectionTransition>
          </Suspense>
        </section>
        
        {/* Keep current projects section outside 3D container to prevent cutting off */}
        <SectionTransition variant="fade" delay={0.1} intensity={0.3} className="bg-background py-8 md:py-12">
          <section id="current-projects" tabIndex={-1} className="scroll-offset">
            <CurrentProjectsSection />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.15} intensity={0.3} className="bg-muted/30 py-8 md:py-12">
          <section id="adventures" tabIndex={-1} className="scroll-offset">
            <Suspense fallback={<div className="h-32" />}>
              <LazyRecentAdventuresSection />
            </Suspense>
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.2} intensity={0.3} className="bg-background py-8 md:py-12">
          <section id="bio" tabIndex={-1} className="scroll-offset">
            <BioSection />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.22} intensity={0.3} className="bg-muted/30 py-8 md:py-12">
          <section id="word-of-mouth" tabIndex={-1} className="scroll-offset">
            <WordOfMouthSection />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.25} intensity={0.3} className="bg-background py-8 md:py-12">
          <section id="contact" tabIndex={-1} className="scroll-offset">
            <Suspense fallback={<div className="h-32" />}>
              <LazyContactForm />
            </Suspense>
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.3} intensity={0.3} className="bg-muted/30 py-8 md:py-12">
          <section id="blog" tabIndex={-1} className="scroll-offset">
            <Suspense fallback={<div className="h-32" />}>
              <LazyBlogPreview />
            </Suspense>
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.35} intensity={0.3} className="bg-background py-8 md:py-12">
          <section id="faq" tabIndex={-1} className="scroll-offset">
            <SeoFaqSection
              title="Frequently Asked Questions"
              faqs={homepageFaqs}
            />
          </section>
        </SectionTransition>

        <SectionTransition variant="fade" delay={0.4} intensity={0.3} className="bg-muted/30 py-8 md:py-12">
          <section id="internal-linking" tabIndex={-1} className="scroll-offset">
            <InternalLinkingEnhancer
              currentPage="home"
              showRelatedLinks={true}
            />
          </section>
        </SectionTransition>
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
        
      </Suspense>
    </div>
  );
};

export default HomepageLayout;
