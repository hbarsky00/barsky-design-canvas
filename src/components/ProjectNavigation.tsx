
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
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
  console.log('🔍 ProjectNavigation: Current project ID:', currentProjectId);
  console.log('🔍 ProjectNavigation: Available projects:', projectsData.map(p => `${p.id}: ${p.title}`));
  
  // Find current project index
  const currentIndex = projectsData.findIndex(p => p.id === currentProjectId);
  console.log('🔍 ProjectNavigation: Current index:', currentIndex);
  
  // Get previous and next project (with wrapping)
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];
  
  console.log('🔍 ProjectNavigation: Previous project:', prevProject?.id || 'none', '-', prevProject?.title || 'none');
  console.log('🔍 ProjectNavigation: Next project:', nextProject?.id || 'none', '-', nextProject?.title || 'none');
  
  // Don't show navigation if there's only one project or current project not found
  if (projectsData.length <= 1 || currentIndex === -1) {
    return null;
  }
  
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex-1">
        {prevProject && (
          <Link
            to={`/project/${prevProject.id}`}
            className="group flex items-center space-x-4 p-2 -m-2 hover:text-barsky-blue transition-colors"
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
            className="group flex items-center justify-end space-x-4 p-2 -m-2 hover:text-barsky-blue transition-colors"
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
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectNavigation;
