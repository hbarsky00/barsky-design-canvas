import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";
import CaseStudyNavigation from "./CaseStudyNavigation";
import CaseStudyContactSection from "./CaseStudyContactSection";

interface CaseStudySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface CaseStudyLayoutProps {
  title: string;
  description: string;
  image: string;
  projectName: string;
  results: string[];
  technologies: string[];
  path: string;
  heroSection: React.ReactNode;
  sections: CaseStudySection[];
  gradientClasses?: string;
}

const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({
  title,
  description,
  image,
  projectName,
  results,
  technologies,
  path,
  heroSection,
  sections,
  gradientClasses = "from-blue-50 via-slate-50 to-indigo-50"
}) => {
  // Create navigation items from sections
  const navigationItems = [
    { label: "Overview", anchor: "#overview" },
    ...sections.map(section => ({
      label: section.title,
      anchor: `#${section.id}`
    }))
  ];

  return (
    <>
      <DynamicSeo 
        type="project"
        title={title}
        description={description}
        image={image}
        projectName={projectName}
        results={results}
        technologies={technologies}
        path={path}
      />
      
      <div className={`min-h-screen bg-gradient-to-br ${gradientClasses}`}>
        <Header />
        
        {/* Back Navigation */}
        <div className="pt-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link to="/projects" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Navigation */}
          <CaseStudyNavigation navigation={navigationItems} />
          
          {/* Main Content */}
          <main className="lg:pl-12">
            {/* Hero Section */}
            <section id="overview" className="mb-16">
              {heroSection}
            </section>

            {/* Case Study Sections */}
            <div className="space-y-16 pb-16">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-white/20">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">{section.title}</h2>
                    {section.content}
                  </div>
                </section>
              ))}
              
              <CaseStudyContactSection />
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default CaseStudyLayout;