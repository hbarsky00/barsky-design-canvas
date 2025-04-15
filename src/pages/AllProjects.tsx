
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CategoryFilter from "./projects/components/CategoryFilter";
import ProjectGrid from "./projects/components/ProjectGrid";
import ProjectsPagination from "./projects/components/ProjectsPagination";
import { useProjectsData } from "./projects/hooks/useProjectsData";
import { categories } from "./projects/ProjectsCategories";

const AllProjects: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    isFilterOpen,
    setIsFilterOpen,
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
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
              <h1 className="text-4xl font-bold text-barsky-dark">All Projects</h1>
              
              <div className="flex items-center mt-6 md:mt-0">
                <CategoryFilter 
                  categories={categories}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  isFilterOpen={isFilterOpen}
                  setIsFilterOpen={setIsFilterOpen}
                />
              </div>
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
