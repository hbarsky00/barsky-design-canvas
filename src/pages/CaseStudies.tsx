import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedCaseStudiesSection from "@/components/home/FeaturedCaseStudiesSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import DynamicSeo from "@/components/seo/DynamicSeo";

const CaseStudies = () => {
  return (
    <ErrorBoundary>
      <DynamicSeo 
        type="page" 
        path="/case-studies"
        title="Case Studies - Hiram Barsky Portfolio"
        description="Explore detailed case studies showcasing AI-enhanced UX design projects, process insights, and impactful results."
      />
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Case Studies
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore detailed case studies showcasing my AI-enhanced UX design process, 
                innovative solutions, and measurable results across diverse industries.
              </p>
            </div>
            <FeaturedCaseStudiesSection />
          </div>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default CaseStudies;