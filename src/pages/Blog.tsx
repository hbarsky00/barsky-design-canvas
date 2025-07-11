
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPreview from "@/components/blog/BlogPreview";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Blog = () => {
  usePageIndexing();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>UX Design Blog | Hiram Barsky - AI-Enhanced Design Insights</title>
        <meta name="description" content="Expert insights on AI-enhanced UX design, accessibility compliance, and conversion optimization. Learn about modern design processes, tools like Claude AI and Figma AI, and business-focused design strategies." />
        <link rel="canonical" href="https://barskydesign.pro/blog" />
        
        {/* Enhanced indexing signals */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="UX Design Blog | AI-Enhanced Design Insights" />
        <meta property="og:description" content="Expert insights on AI-enhanced UX design, accessibility compliance, and conversion optimization." />
        <meta property="og:url" content="https://barskydesign.pro/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UX Design Blog | AI-Enhanced Design Insights" />
        <meta name="twitter:description" content="Expert insights on AI-enhanced UX design, accessibility compliance, and conversion optimization." />
        <meta name="twitter:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
        
        {/* Blog structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "UX Design Blog by Hiram Barsky",
              "description": "Expert insights on AI-enhanced UX design, accessibility, and conversion optimization",
              "url": "https://barskydesign.pro/blog",
              "author": {
                "@type": "Person",
                "name": "Hiram Barsky",
                "jobTitle": "AI-Fluent UX Designer",
                "url": "https://barskydesign.pro"
              },
              "publisher": {
                "@type": "Person",
                "name": "Hiram Barsky"
              }
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <section className="py-12 sm:py-16 bg-gradient-to-br from-purple-50 to-blue-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              UX Design Blog
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert insights on AI-enhanced design, accessibility compliance, and conversion optimization
            </p>
          </div>
        </section>
        
        {/* Blog Posts Grid */}
        <BlogPreview maxPosts={9} showTitle={false} />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
