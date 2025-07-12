
import React from "react";
import { InternalLinkEnhancer, RelatedPosts } from "./InternalLinkEnhancer";

interface BlogPostContentProps {
  content: string;
  slug: string;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content, slug }) => {
  return (
    <article className="max-w-none mb-16">
      {/* Enhanced content with internal SEO links */}
      <div className="prose dark:prose-invert prose-headings:text-barsky-dark dark:prose-headings:text-white prose-p:text-barsky-text dark:prose-p:text-slate-300 prose-a:text-barsky-blue prose-img:w-full prose-img:h-auto">
        <InternalLinkEnhancer content={content} currentSlug={slug} />
      </div>
      
      {/* Related posts for additional internal linking */}
      <RelatedPosts currentSlug={slug} maxPosts={3} />
    </article>
  );
};

export default BlogPostContent;
