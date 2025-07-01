
import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectLinksProps {
  projectLink?: string;
}

const ProjectLinks: React.FC<ProjectLinksProps> = ({ projectLink }) => {
  if (!projectLink) return null;
  
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Button asChild>
        <a
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View the live project"
        >
          View Live Project <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
};

export default ProjectLinks;
