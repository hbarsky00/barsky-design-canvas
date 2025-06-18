
import React from "react";
import EnhancedProjectGrid from "./projects/components/EnhancedProjectGrid";
import GlobalSeo from "@/components/seo/GlobalSeo";

const AllProjects = () => {
  const breadcrumbs = [
    { name: "Home", url: "https://barskydesign.pro" },
    { name: "Projects", url: "https://barskydesign.pro/projects" }
  ];

  return (
    <>
      <GlobalSeo 
        title="Portfolio Projects | Hiram Barsky - Product Designer & Developer"
        description="Explore Hiram Barsky's portfolio of mobile apps, web applications, and design systems. Professional UX/UI design and development projects including medication apps, loan management systems, and more."
        canonicalUrl="https://barskydesign.pro/projects"
        breadcrumbs={breadcrumbs}
      />
      <EnhancedProjectGrid />
    </>
  );
};

export default AllProjects;
