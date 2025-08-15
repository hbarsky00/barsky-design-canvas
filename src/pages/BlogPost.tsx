
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesCallToAction from "@/components/services/ServicesCallToAction";
import { blogPosts, type BlogPost } from "@/data/blogData";
import { trackPageView, trackContentEngagement } from "@/lib/analytics";
import { useToast } from "@/components/ui/use-toast";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import { homepageFaqs } from "@/data/seoFaqs";
import Section3DOverlay from "@/components/transitions/Section3DOverlay";

// Import refactored components
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogAuthorBio from "@/components/blog/BlogAuthorBio";
import RelatedPosts from "@/components/blog/RelatedPosts";
import DynamicSeo from "@/components/seo/DynamicSeo";
import LoadingState from "@/components/blog/LoadingState";
import MinimalShareToolbar from "@/components/blog/MinimalShareToolbar";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import { useRelatedPosts } from "@/hooks/useRelatedPosts";
import { useBlogKeyboardNavigation } from "@/hooks/useBlogKeyboardNavigation";

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
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

  // Add keyboard navigation
  const { 
    isTransitioning, 
    transitionDirection, 
    transitionVariation
  } = useBlogKeyboardNavigation();
  
  useEffect(() => {
    setIsLoading(true);
    
    // Find the post based on slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
      // Track page view and content engagement
      trackPageView(`/blog/${slug}`, `${foundPost.title} | Hiram Barsky Blog`);
      trackContentEngagement('blog', foundPost.id, foundPost.title);
    } else {
      // If post not found, redirect to blog list
      navigate("/blog");
    }
    
    setIsLoading(false);
  }, [slug, navigate]);
  
  if (isLoading || !post) {
    return <LoadingState />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* 3D Transition Overlay */}
      <Section3DOverlay 
        isVisible={isTransitioning} 
        direction={transitionDirection}
        variation={transitionVariation}
      />

      <DynamicSeo 
        type="blog-post"
        title={post.title}
        description={post.excerpt}
        excerpt={post.excerpt}
        featuredImage={post.coverImage ? `https://barskydesign.pro${post.coverImage}` : undefined}
        author={post.author}
        publishedDate={post.date}
        tags={post.tags}
        slug={post.slug}
        path={`/blog/${post.slug}`}
      />
      
      <Header />
      
      <main className="flex-grow">
        <article className="pt-32 pb-20">
          <div className="section-container max-w-3xl mx-auto px-4 sm:px-6">
            <div id="blog-header" className="relative z-10">
              <BlogPostHeader post={post} />
            </div>
            
            <div id="blog-content" className="relative z-0">
              <BlogPostContent content={post.content} slug={post.slug} />
            </div>
            
            {/* Minimal Share Toolbar at Bottom of Article */}
            <div id="blog-bottom-share" className="relative z-0 py-8 border-t border-gray-200">
              <MinimalShareToolbar 
                url={window.location.href}
                title={post.title}
              />
            </div>
            
            <div id="blog-newsletter" className="relative z-0">
              <NewsletterSignup />
            </div>
            
            <div id="blog-author" className="relative z-0">
              <BlogAuthorBio author={post.author} />
            </div>
            
            <div id="blog-related" className="relative z-0">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </div>
        </article>
        
        {/* FAQ Section */}
        <div id="blog-faq" className="relative z-0">
          <SeoFaqSection 
            title="Design Blog & Content Questions"
            faqs={homepageFaqs}
          />
        </div>
        
        <div id="blog-services-cta" className="relative z-0">
          <ServicesCallToAction />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
