
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/data/blogData";
import { Calendar, Clock } from "lucide-react";
import ShareButtons from "./ShareButtons";

interface BlogPostHeaderProps {
  post: BlogPost;
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ post }) => {
  return (
    <header className="mb-12">
      <Link 
        to="/blog" 
        className="inline-flex items-center text-barsky-blue hover:underline mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Link>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(tag => (
          <Badge key={tag} variant="outline" className="bg-slate-100 dark:bg-slate-800 text-barsky-text dark:text-slate-300">
            {tag}
          </Badge>
        ))}
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-barsky-dark dark:text-white">
        {post.title}
      </h1>
      
      {/* Cover Image */}
      {post.coverImage && (
        <div className="mb-6 rounded-lg overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-4 mb-4">
        <div className="flex items-center text-barsky-text-light">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-4">{post.date}</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{post.readTime}</span>
        </div>
      </div>
      
      {/* Share buttons */}
      <ShareButtons 
        title={post.title} 
        summary={post.excerpt} 
        url={window.location.href} 
        hashtags={post.tags} 
      />
    </header>
  );
};

export default BlogPostHeader;
