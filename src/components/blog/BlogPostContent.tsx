
import React from "react";

export interface BlogPostContentProps {
  content: string;
  slug?: string;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content, slug }) => {
  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BlogPostContent;
