
import React from "react";
import Header from "@/components/Header";
import EnhancedHero from "@/components/hero/EnhancedHero";
import ServicesPreviewSection from "@/components/home/ServicesPreviewSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import About from "@/components/About";
import ContactForm from "@/components/home/ContactForm";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import ServicesCallToAction from "@/components/services/ServicesCallToAction";
import BlogPreview from "@/components/blog/BlogPreview";
import { homepageFaqs } from "@/data/seoFaqs";
import Footer from "@/components/Footer";
import FloatingConsultationBubble from "@/components/FloatingConsultationBubble";

const HomepageLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow space-y-4">
        <FeaturedProjects />
        <EnhancedHero />
        <ServicesCallToAction />
        <ServicesPreviewSection />
        <About />
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
