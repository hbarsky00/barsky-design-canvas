
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

interface ProjectCardProps {
  project: ProjectProps;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link to={`/project/${project.id}`} className="block h-full">
      <div 
        className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[300px] sm:h-[350px] overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500", 
              isHovered && "scale-105"
            )}
          />
          
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-barsky-dark/90 to-transparent p-6 flex flex-col justify-end transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-90"
          )}>
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/90 text-sm line-clamp-2 mb-3">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className={cn(
              "inline-flex items-center gap-2 text-sm font-medium text-white hover:text-barsky-blue transition-all duration-300 w-fit",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
