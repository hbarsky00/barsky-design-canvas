
import React from "react";
import DynamicSeo from "@/components/seo/DynamicSeo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllProjects from "./AllProjects";
import { Helmet } from "react-helmet-async";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Projects = () => {
  usePageIndexing();
  
  return (
    <>
      <DynamicSeo 
        type="page"
        title="Product Design & Gen AI Portfolio | AI-Powered Web Applications"
        description="Explore Product Design portfolio featuring Gen AI integration, intelligent web applications, and AI-powered user interfaces. Real case studies demonstrating AI-enhanced design solutions and user experience innovations."
        image="https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp"
        path="/projects"
      />
      
      <AllProjects />
    </>
  );
};

export default Projects;
