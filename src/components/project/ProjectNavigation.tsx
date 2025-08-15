
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectNavigationProps {
  currentProjectId: string;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ currentProjectId }) => {
  const navigate = useNavigate();
  
  // Mock project data - you can replace this with actual data
  const projects = [
    { id: "splittime", title: "SplitTime", image: "/placeholder.svg" },
    { id: "herbalink", title: "HerbaLink", image: "/placeholder.svg" },
    { id: "investor-loan-app", title: "Investor Loan App", image: "/placeholder.svg" },
    { id: "wholesale-distribution", title: "Wholesale Distribution", image: "/placeholder.svg" },
    { id: "business-management", title: "Business Management", image: "/placeholder.svg" }
  ];
  
  const currentIndex = projects.findIndex(p => p.id === currentProjectId);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];
  
  if (projects.length <= 1 || currentIndex === -1) {
    return null;
  }

  const handlePrevProject = () => {
    if (prevProject) {
      navigate(`/project/${prevProject.id}`);
    }
  };

  const handleNextProject = () => {
    if (nextProject) {
      navigate(`/project/${nextProject.id}`);
    }
  };
  
  return (
    <div className="flex justify-between items-center gap-8">
      {prevProject && (
        <button
          onClick={handlePrevProject}
          className="group flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <div>
            <p className="text-sm text-muted-foreground">Previous Project</p>
            <p className="font-medium">{prevProject.title}</p>
          </div>
        </button>
      )}
      
      {nextProject && (
        <button
          onClick={handleNextProject}
          className="group flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors ml-auto"
        >
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Next Project</p>
            <p className="font-medium">{nextProject.title}</p>
          </div>
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default ProjectNavigation;
