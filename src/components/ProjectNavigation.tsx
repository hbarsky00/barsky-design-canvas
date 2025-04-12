
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProjectNavigationProps {
  currentProjectId: string;
  projectsData: Array<{
    id: string;
    title: string;
    image: string;
  }>;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  currentProjectId,
  projectsData,
}) => {
  // Find current project index
  const currentIndex = projectsData.findIndex(p => p.id === currentProjectId);
  
  // Get previous and next project
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;
  
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex-1">
        {prevProject && (
          <Link
            to={`/project/${prevProject.id}`}
            className="group flex items-center space-x-2 p-2 -m-2 hover:text-barsky-blue transition-colors"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <div>
              <p className="text-sm text-barsky-text/70">Previous Project</p>
              <p className="font-medium">{prevProject.title}</p>
            </div>
          </Link>
        )}
      </div>
      
      <div className="hidden md:block">
        <Link
          to="/projects"
          className={cn(
            "inline-flex items-center justify-center h-10 px-4 py-2 text-sm",
            "rounded-md border border-gray-200 dark:border-gray-800",
            "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          )}
        >
          All Projects
        </Link>
      </div>
      
      <div className="flex-1 text-right">
        {nextProject && (
          <Link
            to={`/project/${nextProject.id}`}
            className="group flex items-center justify-end space-x-2 p-2 -m-2 hover:text-barsky-blue transition-colors"
          >
            <div>
              <p className="text-sm text-barsky-text/70">Next Project</p>
              <p className="font-medium">{nextProject.title}</p>
            </div>
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectNavigation;
