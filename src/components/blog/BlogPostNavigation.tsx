
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

interface BlogPostNavigationProps {
  currentPostId?: string;
}

const BlogPostNavigation: React.FC<BlogPostNavigationProps> = ({ currentPostId }) => {
  if (!currentPostId) return null;

  const currentIndex = blogPosts.findIndex(post => post.id === currentPostId);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="flex justify-between items-center pt-8 border-t border-gray-200">
      {prevPost ? (
        <Button asChild variant="ghost">
          <Link to={`/blog/${prevPost.id}`} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <div className="text-left">
              <div className="text-sm text-gray-500">Previous</div>
              <div className="font-medium">{prevPost.title}</div>
            </div>
          </Link>
        </Button>
      ) : <div />}

      {nextPost ? (
        <Button asChild variant="ghost">
          <Link to={`/blog/${nextPost.id}`} className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-sm text-gray-500">Next</div>
              <div className="font-medium">{nextPost.title}</div>
            </div>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : <div />}
    </div>
  );
};

export default BlogPostNavigation;
