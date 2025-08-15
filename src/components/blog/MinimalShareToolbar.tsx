
import React, { useState } from "react";
import { Share2, Link, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MinimalShareToolbarProps {
  url: string;
  title: string;
  className?: string;
}

const MinimalShareToolbar: React.FC<MinimalShareToolbarProps> = ({ 
  url, 
  title, 
  className = "" 
}) => {
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        // User cancelled share, no action needed
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
        description: "Blog post URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Post bookmarked!",
      description: isBookmarked ? "Removed from reading list" : "Added to reading list",
    });
  };

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 h-8 px-3"
        aria-label="Share article"
      >
        <Share2 className="h-4 w-4" />
        <span className="text-sm">Share</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopyLink}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 h-8 px-3"
        aria-label="Copy link"
      >
        <Link className="h-4 w-4" />
        <span className="text-sm">Copy</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleBookmark}
        className={`flex items-center gap-2 h-8 px-3 ${
          isBookmarked 
            ? 'text-blue-600 hover:text-blue-700' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
      >
        <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
        <span className="text-sm">Save</span>
      </Button>
    </div>
  );
};

export default MinimalShareToolbar;
