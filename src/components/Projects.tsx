import React, { useState, useEffect } from "react";
import { ProjectProps } from "./ProjectCard";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";
import { ArrowRight, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";

const categories = [
  "All",
  "UI/UX Design",
  "Web Development",
  "Branding",
  "Mobile Design",
  "Nature"
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleProjects, setVisibleProjects] = useState<ProjectProps[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    const filteredByCategory = activeCategory === "All" 
      ? projectsData 
      : projectsData.filter(project => 
          project.tags.some(tag => tag === activeCategory)
        );
    
    const filteredBySearch = searchTerm 
      ? filteredByCategory.filter(project => 
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : filteredByCategory;
    
    setVisibleProjects(filteredBySearch);
  }, [activeCategory, searchTerm]);
  
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <h2 className="section-title">Featured Projects</h2>
          
          <div className="flex items-center mt-6 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 pr-10 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-barsky-blue focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="ml-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle filters"
            >
              <Filter className="h-5 w-5 text-barsky-text" />
            </button>
          </div>
        </div>
        
        <div className={cn(
          "flex flex-wrap justify-center gap-3 transition-all duration-300 overflow-hidden",
          isFilterOpen ? "max-h-40 opacity-100 mb-8" : "max-h-0 opacity-0 mb-0"
        )}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                activeCategory === category
                  ? "bg-barsky-blue text-white"
                  : "bg-gray-100 text-barsky-text hover:bg-gray-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        
        {visibleProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.slice(0, 6).map((project, index) => (
              <div 
                key={project.id}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-barsky-text text-lg mb-4">No projects found matching your criteria.</p>
            <button 
              onClick={() => {
                setActiveCategory("All");
                setSearchTerm("");
              }}
              className="text-barsky-blue hover:underline inline-flex items-center"
            >
              View all projects <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            to="/projects" 
            className="btn-outline inline-flex items-center"
            onClick={handleScrollToTop}
          >
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
