
import React from "react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllProjects from "./AllProjects";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Projects = () => {
  usePageIndexing();
  
  return (
    <>
      <SEO
        title="Product Design & Gen AI Portfolio | AI-Powered Web Applications"
        description="Explore Product Design portfolio featuring Gen AI integration, intelligent web applications, and AI-powered user interfaces. Real case studies demonstrating AI-enhanced design solutions."
        image="/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
        type="website"
      />
      
      <AllProjects />
    </>
  );
};

export default Projects;
