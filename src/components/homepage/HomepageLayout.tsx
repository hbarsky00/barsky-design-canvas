
import React from "react";
import Header from "@/components/Header";
import MinimalHero from "@/components/hero/MinimalHero";
import BioSection from "@/components/hero/BioSection";
import VideoCaseStudiesSection from "@/components/home/VideoCaseStudiesSection";
import HomepageContactForm from "@/components/home/ContactForm";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import BlogPreview from "@/components/blog/BlogPreview";
import { homepageFaqs } from "@/data/seoFaqs";
import Footer from "@/components/Footer";
import FloatingConsultationBubble from "@/components/FloatingConsultationBubble";
import SectionTransition from "@/components/transitions/SectionTransition";
import InternalLinkingEnhancer from "@/components/seo/InternalLinkingEnhancer";
import BackgroundAudio from "@/components/audio/BackgroundAudio";
import { useHeaderNavigation } from "@/components/header/useHeaderNavigation";
import { useHomepageKeyboardNavigation } from "@/hooks/useHomepageKeyboardNavigation";

const HomepageLayout: React.FC = () => {
  const { isScrolledPastHero } = useHeaderNavigation();
  
  // Initialize keyboard navigation
  useHomepageKeyboardNavigation();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <BackgroundAudio 
        src="/audio/shove-it-deftones.mp3" 
        volume={0.15}
      />
      {isScrolledPastHero && <Header />}
      <main className="flex-grow space-y-4 md:space-y-12">
        
        <SectionTransition variant="fade">
          <MinimalHero />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.05}>
          <BioSection />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.1} className="bg-background py-0 md:py-12">
          <VideoCaseStudiesSection />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.15} className="bg-muted/30 py-8 md:py-12">
          <HomepageContactForm />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.2} className="hidden md:block bg-background py-8 md:py-12" id="blog-preview">
          <BlogPreview />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.25} className="hidden md:block bg-muted/30 py-8 md:py-12" id="faq-section">
          <SeoFaqSection 
            title="Frequently Asked Questions About AI-Enhanced UX Design"
            faqs={homepageFaqs}
            showNavigation={true}
          />
        </SectionTransition>

        <SectionTransition variant="fade" delay={0.3} className="bg-background py-8 md:py-12" id="internal-linking">
          <InternalLinkingEnhancer currentPage="home" showRelatedLinks={true} />
        </SectionTransition>
      </main>
      <Footer />
      <FloatingConsultationBubble />
    </div>
  );
};

export default HomepageLayout;
