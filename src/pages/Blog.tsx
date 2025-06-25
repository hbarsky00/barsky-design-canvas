
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IndexingOptimizer from "@/components/seo/IndexingOptimizer";
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
        <meta name="priority" content="medium" />
        <meta name="revisit-after" content="7 days" />
        
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
      
      <IndexingOptimizer priority="low" changeFreq="weekly" />
      
      <Header />
      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              UX Design Blog
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert insights on AI-enhanced design, accessibility compliance, and conversion optimization
            </p>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-left">
              <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
              <p className="text-gray-600 mb-4">
                I'm working on bringing you valuable content about:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>AI-enhanced UX design processes using Claude and Figma AI</li>
                <li>Accessibility compliance and WCAG implementation strategies</li>
                <li>Conversion optimization through strategic design</li>
                <li>Cross-functional collaboration techniques</li>
                <li>Business-focused design methodologies</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
