
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
  
  const ogImageUrl = post.coverImage 
    ? getImageUrl(post.coverImage)
    : getImageUrl("/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png");
  
  const canonicalUrl = `https://barskydesign.pro/blog/${post.slug}`;
  
  return (
    <Helmet>
      <title>{post.title} | Barsky Design Blog</title>
      <meta name="description" content={post.excerpt} />
      <meta name="keywords" content={post.tags.join(', ') + ", Website Design Services, App Design Services, AI Driven Design Services, Product Design Services"} />
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={`${post.title} | Barsky Design Blog`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Barsky Design" />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.excerpt} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
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
              "url": getImageUrl("/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png")
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
