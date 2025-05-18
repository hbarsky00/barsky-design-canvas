
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts, type BlogPost } from "@/data/blogData";
import { trackPageView, trackContentEngagement } from "@/lib/analytics";
import { useToast } from "@/components/ui/use-toast";

// Import refactored components
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogAuthorBio from "@/components/blog/BlogAuthorBio";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogPostMeta from "@/components/blog/BlogPostMeta";
import LoadingState from "@/components/blog/LoadingState";
import { useRelatedPosts } from "@/hooks/useRelatedPosts";

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get related posts using our custom hook
  const relatedPosts = useRelatedPosts(
    post?.id || "",
    post?.tags || [],
    3
  );
  
  useEffect(() => {
    setIsLoading(true);
    
    // Find the post based on slug
    const foundPost = blogPosts.find(p => p.slug === postId);
    
    if (foundPost) {
      setPost(foundPost);
      // Track page view and content engagement
      trackPageView(`/blog/${postId}`, `${foundPost.title} | Hiram Barsky Blog`);
      trackContentEngagement('blog', foundPost.id, foundPost.title);
    } else {
      // If post not found, redirect to blog list
      navigate("/blog");
    }
    
    setIsLoading(false);
  }, [postId, navigate]);
  
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || "",
        text: post?.excerpt || "",
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback to copying the URL
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "The blog post URL has been copied to your clipboard.",
        duration: 3000,
      });
    }
  };
  
  if (isLoading || !post) {
    return <LoadingState />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <BlogPostMeta post={post} />
      
      <Header />
      
      <main className="flex-grow">
        <article className="py-20">
          <div className="section-container max-w-3xl mx-auto px-4 sm:px-6">
            <BlogPostHeader post={post} handleShareClick={handleShareClick} />
            <BlogPostContent content={post.content} />
            <BlogAuthorBio author={post.author} />
            <RelatedPosts posts={relatedPosts} />
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
