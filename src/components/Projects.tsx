
import React from "react";
import ProjectCard from "./ProjectCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjectsData } from "@/pages/projects/hooks/useProjectsData";

const Projects: React.FC = () => {
  const { filteredProjects } = useProjectsData();
  
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="section-title">Featured Projects</h2>
        </div>
        
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-barsky-text text-lg mb-4">No projects found.</p>
            <button 
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
          >
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
