
import React from "react";
import Header from "@/components/Header";
import EnhancedHero from "@/components/hero/EnhancedHero";
import VideoCaseStudiesSection from "@/components/home/VideoCaseStudiesSection";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import BlogPreview from "@/components/blog/BlogPreview";
import { homepageFaqs } from "@/data/seoFaqs";
import Footer from "@/components/Footer";
import FloatingConsultationBubble from "@/components/FloatingConsultationBubble";
import SectionTransition from "@/components/transitions/SectionTransition";
import InternalLinkingEnhancer from "@/components/seo/InternalLinkingEnhancer";
import BackgroundAudio from "@/components/audio/BackgroundAudio";

const HomepageLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <BackgroundAudio 
        src="/audio/shove-it-deftones.mp3" 
        volume={0.15}
      />
      <Header />
      <main className="flex-grow space-y-8 md:space-y-12 pt-[var(--header-height,64px)]">
        
        <SectionTransition variant="fade">
          <EnhancedHero />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.05} className="bg-muted/30 py-8 md:py-12">
          <VideoCaseStudiesSection />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.1} className="hidden md:block bg-muted/30 py-8 md:py-12">
          <BlogPreview />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.15} className="hidden md:block bg-background py-8 md:py-12">
          <SeoFaqSection 
            title="Frequently Asked Questions About AI-Enhanced UX Design"
            faqs={homepageFaqs}
          />
        </SectionTransition>

        <SectionTransition variant="fade" delay={0.2} className="bg-muted/30 py-8 md:py-12">
          <InternalLinkingEnhancer currentPage="home" showRelatedLinks={true} />
        </SectionTransition>
      </main>
      <Footer />
      <FloatingConsultationBubble />
    </div>
  );
};

export default HomepageLayout;
