
import React from "react";
import Header from "@/components/Header";
import MinimalHero from "@/components/hero/MinimalHero";
import BioSection from "@/components/hero/BioSection";
import VideoCaseStudiesSection from "@/components/home/VideoCaseStudiesSection";
import ContactForm from "@/components/home/ContactForm";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import BlogPreview from "@/components/blog/BlogPreview";
import { homepageFaqs } from "@/data/seoFaqs";
import Footer from "@/components/Footer";
import FloatingConsultationBubble from "@/components/FloatingConsultationBubble";
import SectionTransition from "@/components/transitions/SectionTransition";
import Section3DOverlay from "@/components/transitions/Section3DOverlay";
import InternalLinkingEnhancer from "@/components/seo/InternalLinkingEnhancer";
import BackgroundAudio from "@/components/audio/BackgroundAudio";
import { useHeaderNavigation } from "@/components/header/useHeaderNavigation";
import { useHomepageKeyboardNavigation } from "@/hooks/useHomepageKeyboardNavigation";

const HomepageLayout: React.FC = () => {
  const { isScrolledPastHero } = useHeaderNavigation();
  
  // Enhanced keyboard navigation with case study support
  const { 
    isTransitioning, 
    transitionDirection, 
    transitionVariation,
    navigateUp,
    navigateDown,
    canNavigateUp,
    canNavigateDown,
    isMobile,
    isInCaseStudyMode
  } = useHomepageKeyboardNavigation();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <BackgroundAudio 
        src="/audio/shove-it-deftones.mp3" 
        volume={0.15}
      />
      
      {/* Refined, subtle overlay for section transitions */}
      <Section3DOverlay 
        isVisible={isTransitioning} 
        direction={transitionDirection}
        variation={transitionVariation}
      />
      
      {isScrolledPastHero && <Header />}
      <main className="flex-grow space-y-4 md:space-y-12">
        
        <SectionTransition variant="fade">
          <section id="intro" tabIndex={-1}>
            <MinimalHero 
              navigateDown={navigateDown}
              canNavigateDown={canNavigateDown}
              isMobile={isMobile}
            />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.05}>
          <section id="bio" tabIndex={-1}>
            <BioSection 
              navigateDown={navigateDown}
              canNavigateDown={canNavigateDown}
              isMobile={isMobile}
            />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.1} className="bg-background py-0 md:py-12">
          <section id="case-studies" tabIndex={-1}>
            <VideoCaseStudiesSection 
              navigateDown={navigateDown}
              canNavigateDown={canNavigateDown}
              isMobile={isMobile}
            />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.15} className="bg-muted/30 py-8 md:py-12">
          <section id="contact" tabIndex={-1}>
            <ContactForm />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.2} className="bg-background py-8 md:py-12">
          <section id="blog" tabIndex={-1}>
            <BlogPreview />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.25} className="hidden md:block bg-muted/30 py-8 md:py-12">
          <section id="faq" tabIndex={-1}>
            <SeoFaqSection 
              title="Frequently Asked Questions About AI-Enhanced UX Design"
              faqs={homepageFaqs}
            />
          </section>
        </SectionTransition>

        <SectionTransition variant="fade" delay={0.3} className="bg-background py-8 md:py-12">
          <section id="internal-linking" tabIndex={-1}>
            <InternalLinkingEnhancer 
              currentPage="home" 
              showRelatedLinks={true}
            />
          </section>
        </SectionTransition>
      </main>
      <Footer />
      <FloatingConsultationBubble />
    </div>
  );
};

export default HomepageLayout;
