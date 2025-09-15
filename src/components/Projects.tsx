
import React from "react";
import ProjectCard from "./ProjectCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProjectsData } from "@/pages/projects/hooks/useProjectsData";

const Projects: React.FC = () => {
  const { filteredProjects } = useProjectsData();
  
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="text-section-title font-display">Featured Projects</h2>
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
          <Link to="/projects">
            <Button 
              size="lg"
              variant="outline"
              className="text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 text-base font-medium backdrop-blur-md transition-all duration-300 hover:shadow-xl border border-blue-600 hover:border-blue-600"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
