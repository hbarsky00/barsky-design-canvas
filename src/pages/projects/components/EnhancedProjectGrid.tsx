
import React from "react";
import { ProjectProps } from "@/components/ProjectCard";
import ProjectGridResults from "./ProjectGridResults";
import ProjectGridItem from "./ProjectGridItem";
import NoProjectsFound from "./NoProjectsFound";

interface EnhancedProjectGridProps {
  projects: ProjectProps[];
  resetFilters: () => void;
}

const EnhancedProjectGrid: React.FC<EnhancedProjectGridProps> = ({ 
  projects,
  resetFilters
}) => {
  return (
    <div className="space-y-6">
      {/* Results Count */}
      <ProjectGridResults count={projects.length} />

      {/* Projects Grid - 2x2 layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectGridItem 
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* No Results Message */}
      {projects.length === 0 && (
        <NoProjectsFound onRefresh={resetFilters} />
      )}
    </div>
  );
};

export default EnhancedProjectGrid;
