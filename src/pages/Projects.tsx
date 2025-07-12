
import React from "react";
import DynamicSeo from "@/components/seo/DynamicSeo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllProjects from "./AllProjects";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Projects = () => {
  usePageIndexing();
  
  return (
    <>
      <DynamicSeo 
        type="page"
        title="Product Design & Gen AI Portfolio | AI-Powered Web Applications"
        description="Explore Product Design portfolio featuring Gen AI integration, intelligent web applications, and AI-powered user interfaces. Real case studies demonstrating AI-enhanced design solutions and user experience innovations."
        image="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
        path="/projects"
        canonicalUrl="https://barskydesign.pro/projects"
      />
      
      <AllProjects />
    </>
  );
};

export default Projects;
