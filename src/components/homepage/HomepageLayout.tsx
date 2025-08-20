
import React from "react";
import Header from "@/components/Header";
import MinimalHero from "@/components/hero/MinimalHero";
import BioSection from "@/components/hero/BioSection";
import VideoCaseStudiesSection from "@/components/home/VideoCaseStudiesSection";
import RecentAdventuresSection from "@/components/home/RecentAdventuresSection";
import ContactForm from "@/components/home/ContactForm";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import BlogPreview from "@/components/blog/BlogPreview";
import { homepageFaqs } from "@/data/seoFaqs";
import Footer from "@/components/Footer";
import FloatingConsultationBubble from "@/components/FloatingConsultationBubble";
import SectionTransition from "@/components/transitions/SectionTransition";
import InternalLinkingEnhancer from "@/components/seo/InternalLinkingEnhancer";
import BackgroundAudio from "@/components/audio/BackgroundAudio";
import { useHeaderNavigation } from "@/components/header/useHeaderNavigation";

const HomepageLayout: React.FC = () => {
  const { isScrolledPastHero } = useHeaderNavigation();
  

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <BackgroundAudio 
        src="/audio/shove-it-deftones.mp3" 
        volume={0.15}
      />
      
      
      {isScrolledPastHero && <Header />}
      <main className="flex-grow space-y-4 md:space-y-12">
        
        <SectionTransition variant="fade">
          <section id="intro" tabIndex={-1}>
            <MinimalHero />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.05} className="bg-background py-0 md:py-12">
          <section id="case-studies" tabIndex={-1}>
            <VideoCaseStudiesSection />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.1}>
          <section id="adventures" tabIndex={-1}>
            <RecentAdventuresSection />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.15}>
          <section id="bio" tabIndex={-1}>
            <BioSection />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.2} className="bg-muted/30 py-8 md:py-12">
          <section id="contact" tabIndex={-1}>
            <ContactForm />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.25} className="bg-background py-8 md:py-12">
          <section id="blog" tabIndex={-1}>
            <BlogPreview />
          </section>
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.3} className="hidden md:block bg-muted/30 py-8 md:py-12">
          <section id="faq" tabIndex={-1}>
            <SeoFaqSection 
              title="Frequently Asked Questions About AI-Enhanced UX Design"
              faqs={homepageFaqs}
            />
          </section>
        </SectionTransition>

        <SectionTransition variant="fade" delay={0.35} className="bg-background py-8 md:py-12">
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
