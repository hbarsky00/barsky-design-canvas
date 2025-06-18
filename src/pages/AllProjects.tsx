
import React from "react";
import EnhancedProjectGrid from "./projects/components/EnhancedProjectGrid";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import { useProjectsData } from "./projects/hooks/useProjectsData";
import { projectFaqs } from "@/data/seoFaqs";

const AllProjects = () => {
  const { currentProjects, resetFilters } = useProjectsData();
  
  const breadcrumbs = [
    { name: "Home", url: "https://barskydesign.pro" },
    { name: "Projects", url: "https://barskydesign.pro/projects" }
  ];

  return (
    <>
      <EnhancedGlobalSeo 
        title="UX/UI Design Portfolio | Hiram Barsky - Mobile App & Web Design Case Studies"
        description="Explore Hiram Barsky's professional UX/UI design portfolio featuring mobile app design, web application development, and startup MVP projects. See real case studies with measurable results and user-centered design solutions."
        canonicalUrl="https://barskydesign.pro/projects"
        breadcrumbs={breadcrumbs}
        pageType="portfolio"
        keywords={[
          "UX design portfolio", "UI design case studies", "mobile app portfolio",
          "web design examples", "startup design portfolio", "design case studies",
          "user experience portfolio", "product design examples"
        ]}
      />
      <EnhancedProjectGrid 
        projects={currentProjects}
        resetFilters={resetFilters}
      />
      <SeoFaqSection 
        title="Project Portfolio Questions"
        faqs={projectFaqs}
        className="mt-16"
      />
    </>
  );
};

export default AllProjects;
