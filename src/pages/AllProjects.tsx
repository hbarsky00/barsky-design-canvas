
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DevModeToggle from "@/components/dev/DevModeToggle";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import EnhancedProjectGrid from "./projects/components/EnhancedProjectGrid";
import { useProjectsData } from "./projects/hooks/useProjectsData";

const AllProjects: React.FC = () => {
  const { currentProjects, resetFilters } = useProjectsData();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>All Projects | Hiram Barsky - Product Designer & Developer</title>
        <meta name="description" content="Browse all projects by Hiram Barsky including UX/UI design, full-stack development, mobile apps, and design systems. Filter by technology and project type." />
        <meta name="keywords" content="Hiram Barsky projects, UX UI design portfolio, full stack development, mobile app design, web development, design systems" />
      </Helmet>
      
      <DevModeToggle />
      <Header />
      <main className="flex-grow bg-gray-50">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12">
              <Link 
                to="/" 
                className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-6 font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                  All Projects
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl">
                  A comprehensive collection of my work spanning product design, 
                  full-stack development, and user experience design. Each project 
                  represents a unique challenge and innovative solution.
                </p>
              </div>
            </div>
            
            <EnhancedProjectGrid 
              projects={currentProjects}
              resetFilters={resetFilters}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllProjects;
