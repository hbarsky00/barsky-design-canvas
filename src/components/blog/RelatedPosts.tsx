
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blogPosts";

interface RelatedPostsProps {
  tags?: string[];
  currentPostId?: string;
  currentPost?: any;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ tags = [], currentPostId, currentPost }) => {
  const relatedPosts = blogPosts
    .filter(post => post.id !== currentPostId)
    .filter(post => post.tags.some(tag => tags.includes(tag)))
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="group">
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                  {post.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3">{post.description}</p>
                <div className="flex gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
