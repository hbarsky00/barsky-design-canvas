
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
  
  // Centralized keyboard navigation - single source of truth
  const { 
    isTransitioning, 
    transitionDirection, 
    transitionVariation,
    navigateUp,
    navigateDown,
    canNavigateUp,
    canNavigateDown,
    isMobile
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
          <MinimalHero 
            navigateDown={navigateDown}
            canNavigateDown={canNavigateDown}
            isMobile={isMobile}
          />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.05}>
          <BioSection 
            navigateUp={navigateUp}
            navigateDown={navigateDown}
            canNavigateUp={canNavigateUp}
            canNavigateDown={canNavigateDown}
            isMobile={isMobile}
          />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.1} className="bg-background py-0 md:py-12">
          <VideoCaseStudiesSection />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.15} className="bg-muted/30 py-8 md:py-12" id="contact">
          <ContactForm />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.2} className="bg-background py-8 md:py-12" id="blog-preview">
          <BlogPreview />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.25} className="hidden md:block bg-muted/30 py-8 md:py-12" id="faq-section">
          <SeoFaqSection 
            title="Frequently Asked Questions About AI-Enhanced UX Design"
            faqs={homepageFaqs}
          />
        </SectionTransition>

        <SectionTransition variant="fade" delay={0.3} className="bg-background py-8 md:py-12" id="internal-linking">
          <InternalLinkingEnhancer 
            currentPage="home" 
            showRelatedLinks={true}
          />
        </SectionTransition>
      </main>
      <Footer />
      <FloatingConsultationBubble />
    </div>
  );
};

export default HomepageLayout;
