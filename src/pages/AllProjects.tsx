
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProjectGrid from "./projects/components/ProjectGrid";
import ProjectsPagination from "./projects/components/ProjectsPagination";
import { useProjectsData } from "./projects/hooks/useProjectsData";

const AllProjects: React.FC = () => {
  const {
    currentPage,
    totalPages,
    currentProjects,
    paginate,
    resetFilters
  } = useProjectsData();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="flex items-center mb-8">
              <Link to="/" className="flex items-center text-barsky-text hover:text-barsky-blue transition-colors mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
            
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-barsky-dark">All Projects</h1>
            </div>
            
            <ProjectGrid 
              currentProjects={currentProjects}
              resetFilters={resetFilters}
            />
            
            <ProjectsPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllProjects;
