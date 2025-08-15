
import React from "react";
import { ExternalLink, Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Infer Button variant type from the Button component
type ButtonVariant = React.ComponentProps<typeof Button>["variant"];

interface ProjectLinksProps {
  projectLink?: string;
  label?: string;
  variant?: ButtonVariant;
  showShare?: boolean;
  showCopy?: boolean;
}

const ProjectLinks: React.FC<ProjectLinksProps> = ({ 
  projectLink, 
  label = "Visit Live Site", 
  variant = "outline",
  showShare = true,
  showCopy = true
}) => {
  const handleShare = async () => {
    if (navigator.share && projectLink) {
      try {
        await navigator.share({
          title: label,
          url: projectLink,
        });
      } catch (error) {
        // Fallback to copy
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    if (projectLink) {
      navigator.clipboard.writeText(projectLink);
      toast.success("Link copied to clipboard");
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Page link copied to clipboard");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      {projectLink && (
        <Button 
          asChild
          variant={variant}
          className="h-9 px-4 flex-1 sm:flex-initial"
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
      )}
      
      {showShare && (
        <Button 
          variant={variant}
          onClick={handleShare}
          className="h-9 px-4 flex-1 sm:flex-initial"
        >
          Share <Share2 className="ml-2 h-4 w-4" />
        </Button>
      )}
      
      {showCopy && (
        <Button 
          variant={variant}
          onClick={handleCopy}
          className="h-9 px-4 flex-1 sm:flex-initial"
        >
          Copy Link <Copy className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ProjectLinks;
