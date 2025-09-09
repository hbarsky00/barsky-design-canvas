import React, { Suspense } from "react";
import Header from "@/components/Header";
import MinimalHero from "@/components/hero/MinimalHero";
import BioSection from "@/components/hero/BioSection";
import { homepageFaqs } from "@/data/seoFaqs";
import Footer from "@/components/Footer";
import FloatingConsultationBubble from "@/components/FloatingConsultationBubble";
import FloatingScrollToTopButton from "@/components/FloatingScrollToTopButton";
import SectionTransition from "@/components/transitions/SectionTransition";
import ScrollMorphingBackground from "@/components/transitions/ScrollMorphingBackground";
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

  // Define background sections for morphing
  const backgroundSections = [
    {
      id: "intro",
      colors: {
        primary: "hsl(var(--primary) / 0.03)",
        secondary: "hsl(var(--background))",
        accent: "hsl(var(--accent) / 0.02)"
      },
      particles: true
    },
    {
      id: "current-projects",
      colors: {
        primary: "hsl(var(--secondary) / 0.05)",
        secondary: "hsl(var(--muted) / 0.3)",
        accent: "hsl(var(--primary) / 0.02)"
      }
    },
    {
      id: "case-studies",
      colors: {
        primary: "hsl(var(--primary) / 0.02)",
        secondary: "hsl(var(--background))",
        accent: "hsl(var(--muted) / 0.1)"
      },
      particles: true
    },
    {
      id: "bio",
      colors: {
        primary: "hsl(var(--accent) / 0.03)",
        secondary: "hsl(var(--muted) / 0.2)",
        accent: "hsl(var(--primary) / 0.01)"
      }
    }
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative">
      {/* Enhanced morphing background */}
      <ScrollMorphingBackground 
        sections={backgroundSections}
        className="opacity-60"
      />
      
      <BackgroundAudio 
        src="/audio/shove-it-deftones.mp3" 
        volume={0.15}
      />
      
      {isScrolledPastHero && <Header />}
      
      <main className="space-y-2 md:space-y-6 relative z-10">
        {/* Keep intro section outside 3D container to prevent displacement */}
        <SectionTransition variant="fade" intensity={0.3}>
          <section id="intro" tabIndex={-1}>
            <MinimalHero />
          </section>
        </SectionTransition>
        
        {/* Keep current projects section outside 3D container to prevent cutting off */}
        <SectionTransition variant="fade" delay={0.05} intensity={0.3}>
          <section id="current-projects" tabIndex={-1}>
            <CurrentProjectsSection />
          </section>
        </SectionTransition>
        
        {/* Remove 3D effects that cause layout distortion */}
        <div className="space-y-2 md:space-y-6">
        
        <LazySection threshold={0.05}>
          <SectionTransition variant="fade" delay={0.1} intensity={0.3} className="py-0 md:py-12">
            <section id="case-studies" tabIndex={-1}>
              <LazyVideoCaseStudiesSection />
            </section>
          </SectionTransition>
        </LazySection>
        
        <LazySection>
          <SectionTransition variant="fade" delay={0.15} intensity={0.3}>
            <section id="adventures" tabIndex={-1}>
              <LazyRecentAdventuresSection />
            </section>
          </SectionTransition>
        </LazySection>
        
        <SectionTransition variant="fade" delay={0.2} intensity={0.3}>
          <section id="bio" tabIndex={-1}>
            <BioSection />
          </section>
        </SectionTransition>
        
        <LazySection>
          <SectionTransition variant="fade" delay={0.25} intensity={0.3} className="bg-muted/30 py-8 md:py-12">
            <section id="contact" tabIndex={-1}>
              <LazyContactForm />
            </section>
          </SectionTransition>
        </LazySection>
        
        <LazySection>
          <SectionTransition variant="fade" delay={0.3} intensity={0.3} className="bg-background py-8 md:py-12">
            <section id="blog" tabIndex={-1}>
              <LazyBlogPreview />
            </section>
          </SectionTransition>
        </LazySection>
        
        <LazySection>
          <SectionTransition variant="fade" delay={0.35} intensity={0.3} className="hidden md:block bg-muted/30 py-8 md:py-12">
            <section id="faq" tabIndex={-1}>
              <LazySeoFaqSection 
                title="Frequently Asked Questions"
                faqs={homepageFaqs}
              />
            </section>
          </SectionTransition>
        </LazySection>

        <LazySection>
          <SectionTransition variant="fade" delay={0.4} intensity={0.3} className="bg-background py-8 md:py-12">
            <section id="internal-linking" tabIndex={-1}>
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
      <FloatingScrollToTopButton />
      
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
