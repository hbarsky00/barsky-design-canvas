
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  const navigate = useNavigate();
  
  // Find current project index
  const currentIndex = projectsData.findIndex(p => p.id === currentProjectId);
  
  // Get previous and next project (with wrapping)
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];
  
  // Don't show navigation if there's only one project or current project not found
  if (projectsData.length <= 1 || currentIndex === -1) {
    return null;
  }

  const handlePrevProject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (prevProject) {
      // Use navigate with replace to avoid adding to history stack
      navigate(`/case-studies/${prevProject.id}`, { replace: false });
    }
  };

  const handleNextProject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (nextProject) {
      // Use navigate with replace to avoid adding to history stack
      navigate(`/case-studies/${nextProject.id}`, { replace: false });
    }
  };
  
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex-1">
        {prevProject && (
          <button
            onClick={handlePrevProject}
            className="group flex items-center space-x-4 p-2 -m-2 hover:text-barsky-blue transition-colors cursor-pointer bg-transparent border-none"
            type="button"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <div className="hidden sm:block relative w-16 h-16 rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 transition-all group-hover:border-barsky-blue">
              <AspectRatio ratio={1}>
                <img 
                  src={prevProject.image} 
                  alt={prevProject.title}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
            <div>
              <p className="text-sm text-barsky-text/70">Previous Project</p>
              <p className="font-medium">{prevProject.title}</p>
            </div>
          </button>
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
          <button
            onClick={handleNextProject}
            className="group flex items-center justify-end space-x-4 p-2 -m-2 hover:text-barsky-blue transition-colors cursor-pointer bg-transparent border-none w-full"
            type="button"
          >
            <div className="text-right">
              <p className="text-sm text-barsky-text/70">Next Project</p>
              <p className="font-medium">{nextProject.title}</p>
            </div>
            <div className="hidden sm:block relative w-16 h-16 rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 transition-all group-hover:border-barsky-blue">
              <AspectRatio ratio={1}>
                <img 
                  src={nextProject.image} 
                  alt={nextProject.title}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectNavigation;
