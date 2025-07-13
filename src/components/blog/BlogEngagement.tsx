import React, { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface BlogEngagementProps {
  postId: string;
  initialLikes?: number;
  initialBookmarks?: number;
}

const BlogEngagement: React.FC<BlogEngagementProps> = ({ 
  postId, 
  initialLikes = 0, 
  initialBookmarks = 0 
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
      toast({
        title: "Like removed",
        description: "Thanks for your feedback!",
      });
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      toast({
        title: "Post liked!",
        description: "Thanks for the positive feedback!",
      });
    }
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      setBookmarks(prev => prev - 1);
      setIsBookmarked(false);
      toast({
        title: "Bookmark removed",
        description: "Post removed from your reading list",
      });
    } else {
      setBookmarks(prev => prev + 1);
      setIsBookmarked(true);
      toast({
        title: "Post bookmarked!",
        description: "Added to your reading list",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Post URL copied to clipboard",
        });
      } catch (error) {
        toast({
          title: "Share failed",
          description: "Unable to share this post",
          variant: "destructive"
        });
      }
    }
  };

  const handleComment = () => {
    // Scroll to newsletter or contact section as a placeholder for comments
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
      toast({
        title: "Let's connect!",
        description: "Share your thoughts via our contact form below",
      });
    }
  };

  return (
    <div className="flex items-center justify-between py-6 border-t border-b border-gray-200 my-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex items-center gap-2 ${
            isLiked ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-red-600'
          }`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likes}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleComment}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
        >
          <MessageCircle className="h-5 w-5" />
          <span>Discuss</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleBookmark}
          className={`flex items-center gap-2 ${
            isBookmarked ? 'text-blue-600 hover:text-blue-700' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
          <span>{bookmarks}</span>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <Share2 className="h-5 w-5" />
        <span>Share</span>
      </Button>
    </div>
  );
};

export default BlogEngagement;