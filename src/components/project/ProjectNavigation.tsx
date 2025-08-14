
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projectsData";

interface ProjectNavigationProps {
  currentProjectId: string;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ currentProjectId }) => {
  const currentIndex = projectsData.findIndex(p => p.id === currentProjectId);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  return (
    <div className="flex justify-between items-center max-w-4xl mx-auto">
      <div className="flex-1">
        {prevProject && (
          <Link to={`/project/${prevProject.id}`}>
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="font-medium">{prevProject.title}</div>
              </div>
            </Button>
          </Link>
        )}
      </div>

      <div className="flex-1 text-center">
        <Link to="/projects">
          <Button variant="outline">
            All Projects
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex justify-end">
        {nextProject && (
          <Link to={`/project/${nextProject.id}`}>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Next</div>
                <div className="font-medium">{nextProject.title}</div>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectNavigation;
