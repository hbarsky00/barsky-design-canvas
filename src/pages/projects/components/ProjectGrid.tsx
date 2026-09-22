
import React from "react";
import { ArrowLeft } from "lucide-react";
import { ProjectProps } from "@/components/ProjectCard";
import ProjectCard from "@/components/ProjectCard";

interface ProjectGridProps {
  currentProjects: ProjectProps[];
  resetFilters: () => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ currentProjects, resetFilters }) => {
  return (
    <>
      {currentProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          {currentProjects.map((project, index) => (
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
          <p className="text-barsky-text text-lg mb-4">No projects found matching your criteria.</p>
          <button 
            onClick={resetFilters}
            className="text-barsky-blue hover:underline inline-flex items-center"
          >
            View all projects <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectGrid;
