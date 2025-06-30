
import React from "react";
import Header from "@/components/Header";
import EnhancedHero from "@/components/hero/EnhancedHero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import ServicesCallToAction from "@/components/services/ServicesCallToAction";
import BlogPreview from "@/components/blog/BlogPreview";
import { homepageFaqs } from "@/data/seoFaqs";
import Footer from "@/components/Footer";

const HomepageLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow space-y-8">
        <EnhancedHero />
        <FeaturedProjects />
        <About />
        <Contact />
        <ServicesCallToAction />
        <BlogPreview />
        <SeoFaqSection 
          title="Frequently Asked Questions About Design Services"
          faqs={homepageFaqs}
        />
      </main>
      <Footer />
    </div>
  );
};

export default HomepageLayout;
