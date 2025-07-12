
import React from "react";
import DynamicSeo from "@/components/seo/DynamicSeo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPreview from "@/components/blog/BlogPreview";
import BlogBreadcrumbs from "@/components/seo/BlogBreadcrumbs";
import CanonicalTag from "@/components/CanonicalTag";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Blog = () => {
  usePageIndexing();
  
  return (
    <div className="min-h-screen flex flex-col">
      <CanonicalTag />
      <DynamicSeo 
        type="page"
        title="UX Design Blog | AI-Enhanced Design Insights"
        description="Expert insights on AI-enhanced UX design, accessibility compliance, and conversion optimization. Learn about modern design processes, tools like Claude AI and Figma AI, and business-focused design strategies."
        image="https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png"
        path="/blog"
      />
      
      <Header />
      <main className="flex-grow">
        <section className="pt-28 pb-8 bg-gradient-to-br from-purple-50 to-blue-100">
          <div className="max-w-4xl mx-auto px-6">
            {/* SEO Breadcrumbs */}
            <BlogBreadcrumbs />
            
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                UX Design Blog
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Expert insights on AI-enhanced design, accessibility compliance, and conversion optimization
              </p>
            </div>
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
