
import React from "react";
import { Helmet } from "react-helmet-async";
import { BlogPost } from "@/data/blogData";

interface BlogPostMetaProps {
  post: BlogPost;
}

const BlogPostMeta: React.FC<BlogPostMetaProps> = ({ post }) => {
  return (
    <Helmet>
      <title>{post.title} | Hiram Barsky Blog</title>
      <meta name="description" content={post.excerpt} />
      <meta name="keywords" content={post.tags.join(', ') + ", product design, UX design, UI design"} />
      <meta property="og:title" content={`${post.title} | Hiram Barsky Blog`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={post.coverImage ? `https://hirambarsky.com${post.coverImage}` : "https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9"} />
      <meta property="og:url" content={`https://hirambarsky.com/blog/${post.slug}`} />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.excerpt} />
      <link rel="canonical" href={`https://hirambarsky.com/blog/${post.slug}`} />
      
      {/* Structured data for blog post */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "${post.title}",
            "description": "${post.excerpt}",
            "image": "${post.coverImage ? `https://hirambarsky.com${post.coverImage}` : "https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9"}",
            "author": {
              "@type": "Person",
              "name": "${post.author}"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Hiram Barsky Product Design",
              "logo": {
                "@type": "ImageObject",
                "url": "https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9"
              }
            },
            "datePublished": "${post.date}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://hirambarsky.com/blog/${post.slug}"
            },
            "keywords": "${post.tags.join(', ')}",
            "articleBody": "${post.content.replace(/<[^>]*>/g, ' ').substring(0, 500)}..."
          }
        `}
      </script>
    </Helmet>
  );
};

export default BlogPostMeta;
