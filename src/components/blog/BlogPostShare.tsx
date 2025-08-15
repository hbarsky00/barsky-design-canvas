
import React from "react";
import { Share2, Twitter, Linkedin, Facebook, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/data/blogPosts";

interface BlogPostShareProps {
  blogPost: BlogPost;
}

const BlogPostShare: React.FC<BlogPostShareProps> = ({ blogPost }) => {
  const currentUrl = window.location.href;
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blogPost.title)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
  };

  return (
    <div className="flex items-center gap-2">
      <Share2 className="h-4 w-4 text-gray-500" />
      <Button asChild variant="ghost" size="sm">
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-4 w-4" />
        </a>
      </Button>
      <Button asChild variant="ghost" size="sm">
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button asChild variant="ghost" size="sm">
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="ghost" size="sm" onClick={copyToClipboard}>
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default BlogPostShare;
