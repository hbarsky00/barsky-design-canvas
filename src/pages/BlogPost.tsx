
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogContent from "@/components/blog/BlogContent";
import SEO from "@/components/seo/SEO";
import { blogPosts } from "@/data/blogData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <SEO
        type="article"
        title={post.title}
        description={post.excerpt}
        url={`https://barskydesign.pro/blog/${post.slug}`}
        image={post.coverImage}
        publishedDate={post.date}
        tags={post.tags}
        author={post.author}
      />
      
      <div className="min-h-screen bg-white">
        <Navigation />
        <BlogContent post={post} />
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
