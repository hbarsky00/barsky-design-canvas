
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

const HomepageLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow space-y-4">
        <EnhancedHero />
        <VideoCaseStudiesSection />
        <ContactForm />
        <BlogPreview />
        <SeoFaqSection 
          title="Frequently Asked Questions About AI-Enhanced UX Design"
          faqs={homepageFaqs}
        />
      </main>
      <Footer />
      <FloatingConsultationBubble />
    </div>
  );
};

export default HomepageLayout;
