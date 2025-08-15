
import React from "react";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPostEngagement: React.FC = () => {
  return (
    <div className="flex items-center justify-between py-6 border-y border-gray-200">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span>Like</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          <span>Comment</span>
        </Button>
      </div>
      <Button variant="ghost" size="sm">
        <Bookmark className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default BlogPostEngagement;
