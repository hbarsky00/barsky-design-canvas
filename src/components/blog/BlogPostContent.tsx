
import React from "react";

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  return (
    <div 
      className="prose dark:prose-invert prose-headings:text-barsky-dark dark:prose-headings:text-white prose-p:text-barsky-text dark:prose-p:text-slate-300 prose-a:text-barsky-blue max-w-none mb-16 prose-img:rounded-lg prose-img:w-full prose-img:h-auto"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BlogPostContent;
