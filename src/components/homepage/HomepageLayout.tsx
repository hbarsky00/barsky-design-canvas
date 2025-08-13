
import React from "react";
import Header from "@/components/Header";
import EnhancedHero from "@/components/hero/EnhancedHero";
import VideoCaseStudiesSection from "@/components/home/VideoCaseStudiesSection";
import ContactForm from "@/components/home/ContactForm";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import BlogPreview from "@/components/blog/BlogPreview";
import { homepageFaqs } from "@/data/seoFaqs";
import Footer from "@/components/Footer";
import FloatingConsultationBubble from "@/components/FloatingConsultationBubble";
import SectionTransition from "@/components/transitions/SectionTransition";
import InternalLinkingEnhancer from "@/components/seo/InternalLinkingEnhancer";

const HomepageLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow space-y-2 pt-[var(--header-height,64px)]">
        <SectionTransition variant="fade">
          <EnhancedHero />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.05} className="bg-muted/30 py-12 md:py-16">
          <VideoCaseStudiesSection />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.1} className="bg-background py-12 md:py-16">
          <ContactForm />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.15} className="hidden md:block bg-muted/30 py-12 md:py-16">
          <BlogPreview />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.2} className="hidden md:block bg-background py-12 md:py-16">
          <SeoFaqSection 
            title="Frequently Asked Questions About AI-Enhanced UX Design"
            faqs={homepageFaqs}
          />
        </SectionTransition>

        <SectionTransition variant="fade" delay={0.22} className="bg-muted/30 py-12 md:py-16">
          <InternalLinkingEnhancer currentPage="home" showRelatedLinks={true} />
        </SectionTransition>
      </main>
      <Footer />
      <FloatingConsultationBubble />
    </div>
  );
};

export default HomepageLayout;
