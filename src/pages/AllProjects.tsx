import React from "react";
import Header from "@/components/Header";
import EnhancedProjectGrid from "./projects/components/EnhancedProjectGrid";
import SEO from "@/components/seo/SEO";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import Footer from "@/components/Footer";
import ServicesCallToAction from "@/components/services/ServicesCallToAction";
import BlogPreview from "@/components/blog/BlogPreview";

import { useProjectsData } from "./projects/hooks/useProjectsData";
import { projectFaqs } from "@/data/seoFaqs";

const AllProjects = () => {
  const { currentProjects, resetFilters } = useProjectsData();
  
  const breadcrumbs = [
    { name: "Home", url: "https://barskydesign.pro" },
    { name: "Projects", url: "https://barskydesign.pro/projects" }
  ];

  return (
    <div className="flex flex-col min-h-screen px-5">
      <SEO 
        type="website"
        title="AI-Enhanced Design Portfolio - Project Case Studies"
        description="Explore AI-powered product design projects with real case studies and measurable results. See how AI integration transforms user experiences."
        url="https://barskydesign.pro/projects"
        image="https://barskydesign.pro/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png"
        tags={["AI Design", "Product Design", "Case Studies", "Portfolio"]}
      />
      
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 py-8 sm:py-12 pt-24 sm:pt-28">
          <div className="max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              AI-Enhanced Design Portfolio
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Explore my portfolio of Product Design projects featuring Gen AI integration and intelligent web applications. 
              Each case study demonstrates the fusion of thoughtful design with cutting-edge AI technology, 
              creating user-centered experiences that leverage the power of artificial intelligence.
            </p>
          </div>
        </section>

        <div className="max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EnhancedProjectGrid 
            projects={currentProjects}
            resetFilters={resetFilters}
          />
        </div>
        
        <ServicesCallToAction />
        <BlogPreview />
        <SeoFaqSection 
          title="AI-Enhanced Product Design Project Questions"
          faqs={projectFaqs}
          className="mt-16"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default AllProjects;
