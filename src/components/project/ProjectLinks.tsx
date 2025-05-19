
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
      <a
        href={projectLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View the live project"
      >
        <Button className="bg-barsky-blue text-white hover:bg-barsky-blue/90 transition-colors">
          View Live Project <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </a>
    </div>
  );
};

export default ProjectLinks;
