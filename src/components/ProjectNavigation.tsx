
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OptimizedImage } from "@/components/OptimizedImage";

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
      navigate(`/project/${prevProject.id}`, { replace: false });
    }
  };

  const handleNextProject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (nextProject) {
      navigate(`/project/${nextProject.id}`, { replace: false });
    }
  };
  
  return (
    <section 
      id="project-navigation"
      data-section="project-navigation"
      className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 scroll-mt-[calc(var(--header-height,64px)+2rem)]"
      aria-labelledby="navigation-heading"
    >
      <h2 id="navigation-heading" className="sr-only">Project Navigation</h2>
      <div>
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col gap-4 sm:hidden">
        {prevProject && (
          <button
            onClick={handlePrevProject}
            className="group flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-barsky-blue transition-colors cursor-pointer shadow-sm w-full"
            type="button"
            aria-label={`Previous project: ${prevProject.title}`}
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1 flex-shrink-0" />
            <div className="relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 transition-all group-hover:border-barsky-blue shadow-sm group-hover:shadow-md w-16 h-16 flex-shrink-0">
              <OptimizedImage
                src={prevProject.image}
                alt={prevProject.title}
                loading="lazy"
                fallback="/placeholder.svg"
                className="object-cover w-16 h-16 transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs text-barsky-text/70 mb-1">Previous Project</p>
              <p className="font-medium text-sm leading-tight">{prevProject.title}</p>
            </div>
          </button>
        )}
        
        {nextProject && (
          <button
            onClick={handleNextProject}
            className="group flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-barsky-blue transition-colors cursor-pointer shadow-sm w-full"
            type="button"
            aria-label={`Next project: ${nextProject.title}`}
          >
            <div className="relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 transition-all group-hover:border-barsky-blue shadow-sm group-hover:shadow-md w-16 h-16 flex-shrink-0">
              <OptimizedImage 
                src={nextProject.image} 
                alt={nextProject.title}
                loading="lazy"
                fallback="/placeholder.svg"
                className="object-cover w-16 h-16 transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs text-barsky-text/70 mb-1">Next Project</p>
              <p className="font-medium text-sm leading-tight">{nextProject.title}</p>
            </div>
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1 flex-shrink-0" />
          </button>
        )}
      </div>

      {/* Desktop Layout - Side by Side */}
      <div className="hidden sm:flex justify-between items-center gap-8">
        <div className="flex-1">
          {prevProject && (
            <button
              onClick={handlePrevProject}
              className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-barsky-blue transition-colors cursor-pointer shadow-sm"
              type="button"
              aria-label={`Previous project: ${prevProject.title}`}
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <div className="relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 transition-all group-hover:border-barsky-blue shadow-sm group-hover:shadow-md w-[250px] h-[250px]">
                <OptimizedImage
                  src={prevProject.image}
                  alt={prevProject.title}
                  loading="lazy"
                  fallback="/placeholder.svg"
                  className="object-cover w-[250px] h-[250px] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <p className="text-sm text-barsky-text/70">Previous Project</p>
                <p className="font-medium">{prevProject.title}</p>
              </div>
            </button>
          )}
        </div>
        
        <div className="flex-1 text-right">
          {nextProject && (
            <button
              onClick={handleNextProject}
              className="group flex items-center justify-end gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-barsky-blue transition-colors cursor-pointer shadow-sm w-full"
              type="button"
              aria-label={`Next project: ${nextProject.title}`}
            >
              <div className="text-right">
                <p className="text-sm text-barsky-text/70">Next Project</p>
                <p className="font-medium">{nextProject.title}</p>
              </div>
              <div className="relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 transition-all group-hover:border-barsky-blue shadow-sm group-hover:shadow-md w-[250px] h-[250px]">
                <OptimizedImage 
                  src={nextProject.image} 
                  alt={nextProject.title}
                  loading="lazy"
                  fallback="/placeholder.svg"
                  className="object-cover w-[250px] h-[250px] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
      </div>
    </section>
  );
};

export default ProjectNavigation;
