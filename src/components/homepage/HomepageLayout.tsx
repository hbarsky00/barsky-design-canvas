
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

const HomepageLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow space-y-2 pt-[var(--header-height,64px)]">
        <SectionTransition variant="fade">
          <EnhancedHero />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.05}>
          <VideoCaseStudiesSection />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.1}>
          <ContactForm />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.15} className="hidden md:block">
          <BlogPreview />
        </SectionTransition>
        
        <SectionTransition variant="fade" delay={0.2} className="hidden md:block">
          <SeoFaqSection 
            title="Frequently Asked Questions About AI-Enhanced UX Design"
            faqs={homepageFaqs}
          />
        </SectionTransition>
      </main>
      <Footer />
      <FloatingConsultationBubble />
    </div>
  );
};

export default HomepageLayout;
