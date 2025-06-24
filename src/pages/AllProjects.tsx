
import React from "react";
import Header from "@/components/Header";
import EnhancedProjectGrid from "./projects/components/EnhancedProjectGrid";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import Footer from "@/components/Footer";
import ServicesCallToAction from "@/components/services/ServicesCallToAction";
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
        title="AI-Enhanced UX Portfolio | Hiram Barsky - Business-Focused Design Case Studies"
        description="AI-augmented UX/UI design portfolio showcasing conversion-optimized interfaces, accessibility compliance, and cross-functional collaboration. Real case studies with measurable ROI, featuring AI-enhanced design processes using Claude, Figma AI, and strategic business outcomes."
        canonicalUrl="https://barskydesign.pro/projects"
        breadcrumbs={breadcrumbs}
        pageType="portfolio"
        keywords={[
          "AI-enhanced UX portfolio", "conversion-focused design cases", "accessibility compliance portfolio",
          "business-outcome design examples", "AI-augmented design process", "cross-functional design collaboration",
          "ROI-driven interface design", "Claude AI design cases", "WCAG compliance examples"
        ]}
      />
      
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 py-16 sm:py-20 pt-24 sm:pt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              AI-Enhanced Design Portfolio
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Business-focused design case studies showcasing AI-augmented processes, accessibility compliance, 
              and measurable conversion improvements. Each project demonstrates strategic design thinking that bridges 
              user needs with business objectives.
            </p>
          </div>
        </section>

        <EnhancedProjectGrid 
          projects={currentProjects}
          resetFilters={resetFilters}
        />
        <SeoFaqSection 
          title="AI-Enhanced Portfolio & Business Design Questions"
          faqs={projectFaqs}
          className="mt-16"
        />
        <ServicesCallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default AllProjects;
