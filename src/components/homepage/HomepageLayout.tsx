
import React from "react";
import Header from "@/components/Header";
import EnhancedHero from "@/components/hero/EnhancedHero";
import FeaturedCaseStudiesSection from "@/components/home/FeaturedCaseStudiesSection";
import About from "@/components/About";
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
        {/* Temporarily disable framer-motion components to fix React context issues */}
        {/* <FeaturedCaseStudiesSection /> */}
        {/* <EnhancedHero /> */}
        
        <About />
        {/* <ContactForm /> */}
        <BlogPreview />
        {/* Temporarily disable SeoFaqSection as it uses framer-motion */}
        {/* <SeoFaqSection 
          title="Frequently Asked Questions About AI-Enhanced UX Design"
          faqs={homepageFaqs}
        /> */}
      </main>
      <Footer />
      {/* <FloatingConsultationBubble /> */}
    </div>
  );
};

export default HomepageLayout;
