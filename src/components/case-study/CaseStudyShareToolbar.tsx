
import React from "react";
import { Linkedin, Link } from "lucide-react";
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

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    
    // Open LinkedIn sharing dialog in popup
    if (typeof window !== 'undefined') {
      window.open(
        linkedinUrl,
        '_blank',
        'width=550,height=420,menubar=no,toolbar=no,status=no,scrollbars=yes,resizable=yes'
      );
    }
  };

  const handleCopyLink = async () => {
    if (typeof navigator === 'undefined') return;
    
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
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
        onClick={handleLinkedInShare}
        className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
        <span className="text-sm font-medium">Share on LinkedIn</span>
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
