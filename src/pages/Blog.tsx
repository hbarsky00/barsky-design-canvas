import React from "react";
import SEO from "@/components/seo/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPreview from "@/components/blog/BlogPreview";
import BlogBreadcrumbs from "@/components/seo/BlogBreadcrumbs";
import BlogCategories from "@/components/blog/BlogCategories";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import { Helmet } from "react-helmet-async";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Blog = () => {
  usePageIndexing();
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        type="website"
        title="UX Design Blog | AI-Enhanced Design Insights"
        description="Expert insights on AI-enhanced UX design, accessibility compliance, and conversion optimization. Learn about modern design processes, tools like Claude AI and Figma AI, and business-focused design strategies."
        url="https://barskydesign.pro/blog"
        image="https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png"
        tags={["UX Design", "AI Design", "Blog", "Design Insights"]}
      />
      
      <Header />
      <main className="flex-grow">
        <section className="pt-20 pb-6 md:pt-28 md:pb-8 bg-gradient-to-br from-purple-50 to-blue-100">
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
        
        {/* Blog Categories */}
        <BlogCategories />
        
        {/* Blog Posts Grid */}
        <BlogPreview maxPosts={9} showTitle={false} />
        
        {/* Newsletter Signup */}
        <div className="max-w-4xl mx-auto px-6">
          <NewsletterSignup />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
