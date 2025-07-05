
import React from "react";
import Header from "@/components/Header";
import EnhancedProjectGrid from "./projects/components/EnhancedProjectGrid";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";
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
      <EnhancedGlobalSeo 
        title="AI-Enhanced UX/UI Design Portfolio | Hiram Barsky - Gen AI Web Applications"
        description="Explore UX/UI design portfolio featuring AI-powered web applications and Gen AI integration. Real case studies with measurable results and user improvements."
        canonicalUrl="https://barskydesign.pro/projects"
        breadcrumbs={breadcrumbs}
        pageType="portfolio"
        keywords={[
          "AI-enhanced UX portfolio", "Gen AI web applications", "AI UX design case studies",
          "intelligent user interface design", "AI-powered design portfolio", "generative AI projects",
          "UX UI designer portfolio", "AI web app development", "Gen AI integration examples"
        ]}
      />
      
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 py-8 sm:py-12 pt-24 sm:pt-28">
          <div className="max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              AI-Enhanced Design Portfolio
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Explore my portfolio of UX/UI design projects featuring Gen AI integration and intelligent web applications. 
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
          title="AI-Enhanced UX/UI Design Project Questions"
          faqs={projectFaqs}
          className="mt-16"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default AllProjects;
