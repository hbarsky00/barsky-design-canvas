
import React from "react";
import Header from "@/components/Header";
import SEO from "@/components/seo/SEO";
import AboutHero from "@/components/about/AboutHero";
import AboutContent from "@/components/about/AboutContent";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        type="website"
        title="About Hiram Barsky - Product Designer & Gen AI Developer"
        description="Learn about my journey in product design, UX strategy, and AI integration. Discover my approach to creating user-centered digital experiences."
        url="https://barskydesign.pro/about"
      />
      
      <Header />
      <main className="flex-grow pt-16">
        <AboutHero />
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
};

export default About;
