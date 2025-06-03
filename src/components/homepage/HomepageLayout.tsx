
import React from "react";
import Header from "@/components/Header";
import EnhancedHero from "@/components/hero/EnhancedHero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import SkillsShowcase from "@/components/home/SkillsShowcase";
import AboutPreview from "@/components/home/AboutPreview";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const HomepageLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <EnhancedHero />
        <FeaturedProjects />
        <SkillsShowcase />
        <AboutPreview />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomepageLayout;
