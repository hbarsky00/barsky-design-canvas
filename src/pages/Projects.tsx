
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import SEO from "@/components/seo/SEO";

const Projects = () => {
  return (
    <>
      <SEO
        title="Portfolio & Case Studies | Hiram Barsky"
        description="Explore detailed case studies of AI-enhanced product design projects, featuring UX research, design systems, and measurable business outcomes."
        url="https://barskydesign.pro/projects"
      />
      
      <div className="min-h-screen bg-white">
        <Navigation />
        <ProjectsHero />
        <ProjectsGrid />
        <Footer />
      </div>
    </>
  );
};

export default Projects;
