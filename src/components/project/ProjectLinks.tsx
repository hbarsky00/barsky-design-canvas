
import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Infer Button variant type from the Button component
type ButtonVariant = React.ComponentProps<typeof Button>["variant"];

interface ProjectLinksProps {
  projectLink?: string;
  label?: string;
  variant?: ButtonVariant;
}

const ProjectLinks: React.FC<ProjectLinksProps> = ({ projectLink, label = "Visit Live Site", variant = "default" }) => {
  if (!projectLink) return null;
  
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Button 
        asChild
        variant={variant}
        className="[&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
      >
        <a
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          {label} <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
};

export default ProjectLinks;
