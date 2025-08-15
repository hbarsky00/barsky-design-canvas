
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesContent from "@/components/services/ServicesContent";
import SEO from "@/components/seo/SEO";

const Services = () => {
  return (
    <>
      <SEO
        type="service"
        title="Product Design & Gen AI Development Services | Hiram Barsky"
        description="Expert product design and Gen AI integration services. Specializing in user research, design systems, accessibility, and AI-powered web applications."
        url="https://barskydesign.pro/services"
      />
      
      <div className="min-h-screen bg-white">
        <Navigation />
        <ServicesHero />
        <ServicesContent />
        <Footer />
      </div>
    </>
  );
};

export default Services;
