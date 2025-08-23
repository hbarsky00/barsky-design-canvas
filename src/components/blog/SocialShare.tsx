import React from "react";
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  url: string;
  title: string;
  excerpt: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, excerpt }) => {
  const { toast } = useToast();
  const [showMore, setShowMore] = React.useState(false);
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
  
  const copyToClipboard = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast({
        title: "Link copied!",
        description: "Blog post URL copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link to clipboard",
        variant: "destructive"
      });
    }
  };

  const shareOnTwitter = () => {
    if (typeof window === 'undefined') return;
    
    const text = `${title} - ${excerpt.substring(0, 100)}...`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(fullUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const shareOnLinkedIn = () => {
    if (typeof window === 'undefined') return;
    
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
    window.open(linkedinUrl, '_blank', 'width=550,height=420');
  };

  const shareOnFacebook = () => {
    if (typeof window === 'undefined') return;
    
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 my-8">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="h-5 w-5 text-gray-700" />
        <h3 className="heading-medium text-gray-900">Share this article</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {/* Main buttons - always visible */}
        <Button
          variant="outline"
          size="sm"
          onClick={shareOnLinkedIn}
          className="flex items-center gap-2"
        >
          <Linkedin className="h-4 w-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-2"
        >
          <Link2 className="h-4 w-4" />
          <span className="hidden sm:inline">Copy Link</span>
        </Button>

        {/* Mobile: Show additional options inline on larger screens */}
        <Button
          variant="outline"
          size="sm"
          onClick={shareOnTwitter}
          className="hidden sm:flex items-center gap-2"
        >
          <Twitter className="h-4 w-4" />
          Twitter
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={shareOnFacebook}
          className="hidden sm:flex items-center gap-2"
        >
          <Facebook className="h-4 w-4" />
          Facebook
        </Button>

        {/* Mobile: More button for additional options */}
        <div className="sm:hidden relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            More
          </Button>
          
          {showMore && (
            <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-2 space-y-2 z-10 min-w-[120px]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { shareOnTwitter(); setShowMore(false); }}
                className="w-full justify-start gap-2"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { shareOnFacebook(); setShowMore(false); }}
                className="w-full justify-start gap-2"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialShare;