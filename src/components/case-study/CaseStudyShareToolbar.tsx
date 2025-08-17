
import React from "react";
import { Share2, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CaseStudyShareToolbarProps {
  url: string;
  title: string;
  className?: string;
}

const CaseStudyShareToolbar: React.FC<CaseStudyShareToolbarProps> = ({ 
  url, 
  title, 
  className = "" 
}) => {
  const { toast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        // User cancelled share, fallback to copy
        handleCopyLink();
      }
    } else {
      // Fallback to copy link
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Case study URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link to clipboard",
        variant: "destructive"
      });
    }
  };


  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Button
        variant="default"
        size="sm"
        onClick={handleShare}
        className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
        aria-label="Share case study"
      >
        <Share2 className="h-4 w-4" />
        <span className="text-sm font-medium">Share Case Study</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="flex items-center gap-2 h-9 px-4"
        aria-label="Copy case study link"
      >
        <Link className="h-4 w-4" />
        <span className="text-sm">Copy Case Study Link</span>
      </Button>
    </div>
  );
};

export default CaseStudyShareToolbar;
