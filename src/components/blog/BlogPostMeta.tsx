
import React from "react";
import { Helmet } from "react-helmet-async";
import { BlogPost } from "@/data/blogData";

interface BlogPostMetaProps {
  post: BlogPost;
}

const BlogPostMeta: React.FC<BlogPostMetaProps> = ({ post }) => {
  // Get the current domain for proper image URLs
  const currentDomain = window.location.origin;
  const isProduction = currentDomain.includes('barskydesign.pro');
  const baseUrl = isProduction ? 'https://barskydesign.pro' : currentDomain;
  
  // Construct proper image URL
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath; // Already a full URL
    }
    return `${baseUrl}${imagePath}`;
  };
  
  // Use your profile image instead of the illustration
  const ogImageUrl = post.coverImage 
    ? getImageUrl(post.coverImage)
    : getImageUrl("/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png");
  
  // Canonical URL is now handled by DynamicSeo component
  const canonicalUrl = `https://barskydesign.pro/blog/${post.slug}`;
  
  return (
    <Helmet>
      <title>{post.title} | Barsky Design Blog</title>
      <meta name="description" content={post.excerpt} />
      <meta name="keywords" content={post.tags.join(', ') + ", Website Design Services, App Design Services, AI Driven Design Services, Product Design Services"} />
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={`${post.title} | Hiram Barsky`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Hiram Barsky - AI-Enhanced UX Design" />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.excerpt} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Structured data for blog post */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "image": ogImageUrl,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Barsky Design Services",
            "logo": {
              "@type": "ImageObject",
              "url": getImageUrl("/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png")
            }
          },
          "datePublished": post.date,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          },
          "keywords": `${post.tags.join(', ')}, Website Design Services, App Design Services, AI Driven Design Services, Product Design Services`,
          "articleBody": post.content.replace(/<[^>]*>/g, ' ').substring(0, 500) + "..."
        })}
      </script>
    </Helmet>
  );
};

export default BlogPostMeta;
