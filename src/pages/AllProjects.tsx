
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
        title="UX Research & Design Case Studies | Barsky Design Agency Portfolio"
        description="Explore our comprehensive UX research and design case studies showcasing user research methodologies, design strategy, and measurable business outcomes. Real projects demonstrating research-driven design solutions and conversion improvements."
        canonicalUrl="https://barskydesign.pro/projects"
        breadcrumbs={breadcrumbs}
        pageType="portfolio"
        keywords={[
          "UX research case studies", "design agency portfolio", "user research projects",
          "design strategy examples", "UX design case studies", "digital product design",
          "user experience research", "conversion optimization cases", "design thinking examples"
        ]}
      />
      
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 py-16 sm:py-20 pt-24 sm:pt-28">
          <div className="max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Research & Design Case Studies
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Explore our portfolio of research-driven design projects showcasing comprehensive user research, 
              strategic design thinking, and measurable business outcomes. Each case study demonstrates our 
              process from user insights to implementation.
            </p>
          </div>
        </section>

        <div className="max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <EnhancedProjectGrid 
            projects={currentProjects}
            resetFilters={resetFilters}
          />
        </div>
        
        <ServicesCallToAction />
        <BlogPreview />
        <SeoFaqSection 
          title="UX Research & Design Project Questions"
          faqs={projectFaqs}
          className="mt-16"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default AllProjects;
