
import React from "react";
import { Share2, Link as LinkIcon, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectActionsCompactProps {
  liveUrl: string;
  onShare?: () => void;
  onCopy?: () => void;
}

const ProjectActionsCompact: React.FC<ProjectActionsCompactProps> = ({
  liveUrl,
  onShare,
  onCopy
}) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(liveUrl);
      toast({
        title: "Link copied!",
        description: "Project URL copied to clipboard",
      });
      onCopy?.();
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: "Check out this project",
          url: liveUrl 
        });
        onShare?.();
        return;
      } catch (error) {
        // User cancelled or share failed, fallback to copy
      }
    }
    // Fallback to copy if Web Share API not supported
    handleCopy();
  };

  if (!liveUrl) return null;

  return (
    <div className="w-full flex items-center justify-between gap-4 sm:gap-6 lg:gap-8">
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center rounded-full px-4 py-3 bg-primary text-primary-foreground font-medium shadow-md hover:bg-primary/90 transition-colors active:scale-[.99] min-h-[44px]"
        aria-label="Visit live project site"
      >
        Visit Live Site 
        <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      </a>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={handleShare}
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-background text-foreground shadow-md border border-border hover:bg-muted transition-colors active:scale-[.95]"
          aria-label="Share project"
          title="Share Project"
        >
          <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-background text-foreground shadow-md border border-border hover:bg-muted transition-colors active:scale-[.95]"
          aria-label="Copy project link"
          title="Copy Project Link"
        >
          <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
};

export default ProjectActionsCompact;
