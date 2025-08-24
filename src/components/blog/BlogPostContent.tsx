
import React from "react";
import { InternalLinkEnhancer, RelatedPosts } from "./InternalLinkEnhancer";
import { standardizeBlogContent } from "@/utils/blogStyleStandardizer";

interface BlogPostContentProps {
  content: string;
  slug: string;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content, slug }) => {
  const standardizedContent = standardizeBlogContent(content);
  
  return (
    <article className="max-w-none mb-16">
      {/* Enhanced content with internal SEO links using standardized typography */}
      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-on-surface prose-p:text-on-surface-variant prose-a:text-primary prose-img:w-full prose-img:h-auto">
        <InternalLinkEnhancer content={standardizedContent} currentSlug={slug} />
      </div>
      
      {/* Related posts for additional internal linking */}
      <RelatedPosts currentSlug={slug} maxPosts={3} />
    </article>
  );
};

export default BlogPostContent;
