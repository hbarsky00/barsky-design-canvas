
import React, { useState, useEffect } from "react";
import { ProjectProps } from "./ProjectCard";
import ProjectCard from "./ProjectCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";

const Projects: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState<ProjectProps[]>([]);
  
  useEffect(() => {
    setVisibleProjects(projectsData);
  }, []);
  
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="section-title">Featured Projects</h2>
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
            <p className="text-barsky-text text-lg mb-4">No projects found.</p>
            <button 
              onClick={() => setVisibleProjects(projectsData)}
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
