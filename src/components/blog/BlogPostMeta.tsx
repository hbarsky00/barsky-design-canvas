
import React from "react";
import { Helmet } from "react-helmet-async";
import { BlogPost } from "@/data/blogData";

interface BlogPostMetaProps {
  post: BlogPost;
}

const BlogPostMeta: React.FC<BlogPostMetaProps> = ({ post }) => {
  return (
    <Helmet>
      <title>{post.title} | Barsky Design Blog</title>
      <meta name="description" content={post.excerpt} />
      <meta name="keywords" content={post.tags.join(', ') + ", Website Design Services, App Design Services, AI Driven Design Services, Product Design Services, UX/UI Design Services"} />
      <meta property="og:title" content={`${post.title} | Barsky Design Blog`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={post.coverImage ? `https://barskydesign.pro${post.coverImage}` : "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"} />
      <meta property="og:url" content={`https://barskydesign.pro/blog/${post.slug}`} />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.excerpt} />
      <link rel="canonical" href={`https://barskydesign.pro/blog/${post.slug}`} />
      
      {/* Structured data for blog post */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "${post.title}",
            "description": "${post.excerpt}",
            "image": "${post.coverImage ? `https://barskydesign.pro${post.coverImage}` : "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"}",
            "author": {
              "@type": "Person",
              "name": "${post.author}"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Barsky Design Services",
              "logo": {
                "@type": "ImageObject",
                "url": "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
              }
            },
            "datePublished": "${post.date}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://barskydesign.pro/blog/${post.slug}"
            },
            "keywords": "${post.tags.join(', ')}, Website Design Services, App Design Services, AI Driven Design Services, Product Design Services",
            "articleBody": "${post.content.replace(/<[^>]*>/g, ' ').substring(0, 500)}..."
          }
        `}
      </script>
    </Helmet>
  );
};

export default BlogPostMeta;
