
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { useProjectsData } from "./projects/hooks/useProjectsData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AllProjects = () => {
  const {
    currentPage,
    totalPages,
    currentProjects,
    paginate,
    resetFilters,
    filteredProjects
  } = useProjectsData();

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>All Projects - Barsky Design Portfolio</title>
        <meta name="description" content="Browse all design and development projects by Hiram Barsky, showcasing expertise in UX/UI design, mobile apps, and web development." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              All Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore my complete portfolio of design and development work, 
              from mobile applications to enterprise platforms.
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => paginate(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
            </div>
          )}

          {/* Featured Projects Section */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.slice(0, 3).map((project, index) => (
                <div key={project.id} className="relative">
                  <Badge 
                    className="absolute top-4 left-4 z-10 bg-blue-600 text-white"
                  >
                    Featured
                  </Badge>
                  <ProjectCard
                    project={project}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllProjects;
