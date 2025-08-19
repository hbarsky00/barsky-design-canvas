
import React from "react";
import { Linkedin, Link as LinkIcon, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectActionsCompactProps {
  liveUrl: string;
  projectTitle?: string;
  projectDescription?: string;
  projectPageUrl?: string;
  onShare?: () => void;
  onCopy?: () => void;
}

const ProjectActionsCompact: React.FC<ProjectActionsCompactProps> = ({
  liveUrl,
  projectTitle,
  projectDescription,
  projectPageUrl,
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

  const handleLinkedInShare = () => {
    const shareUrl = projectPageUrl || liveUrl;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    
    // Open LinkedIn sharing dialog in popup
    window.open(
      linkedinUrl,
      '_blank',
      'width=550,height=420,menubar=no,toolbar=no,status=no,scrollbars=yes,resizable=yes'
    );
    
    onShare?.();
  };

  if (!liveUrl) return null;

  return (
    <div className="w-full flex items-center justify-between gap-4 sm:gap-6 lg:gap-8">
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-cta-button flex-1 inline-flex items-center justify-center rounded-full px-4 py-3 bg-primary text-primary-foreground font-medium shadow-md hover:bg-primary/90 transition-colors active:scale-[.99]"
        aria-label="Visit live project site"
      >
        <span className="hidden sm:inline">Visit Live Site</span>
        <span className="sm:hidden">Visit Site</span>
        <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      </a>

      <div className="hero-social flex items-center gap-3 sm:gap-4">
        <button
          onClick={handleLinkedInShare}
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-background text-foreground shadow-md border border-border hover:bg-muted transition-colors active:scale-[.95]"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-background text-foreground shadow-md border border-border hover:bg-muted transition-colors active:scale-[.95]"
          aria-label="Copy live site URL"
          title="Copy Live Site URL"
        >
          <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
};

export default ProjectActionsCompact;
