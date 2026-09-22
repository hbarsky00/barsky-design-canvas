
import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { BlogPost } from "@/data/blogData";

interface RelatedPostsProps {
  posts: BlogPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null;
  
  return (
    <div className="mb-16">
      <Separator className="mb-8" />
      <h2 className="heading-subsection mb-6 text-barsky-dark dark:text-white">Related Posts</h2>
      <div className="grid grid-cols-1 gap-8">
        {posts.map(relatedPost => (
          <Link to={`/blog/${relatedPost.slug}`} key={relatedPost.id} className="group">
            <h3 className="heading-medium mb-2 group-hover:text-barsky-blue transition-colors">
              {relatedPost.title}
            </h3>
            <p className="text-barsky-text dark:text-slate-300">{relatedPost.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
