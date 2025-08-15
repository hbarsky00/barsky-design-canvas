
import React from "react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPreview from "@/components/blog/BlogPreview";
import BlogBreadcrumbs from "@/components/seo/BlogBreadcrumbs";
import BlogCategories from "@/components/blog/BlogCategories";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Blog = () => {
  usePageIndexing();
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="UX Design Blog | AI-Enhanced Design Insights"
        description="Expert insights on AI-enhanced UX design, accessibility compliance, and conversion optimization. Learn about modern design processes and business-focused design strategies."
        image="/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
        type="website"
      />
      
      <Header />
      <main className="flex-grow">
        <section className="pt-20 pb-6 md:pt-28 md:pb-8 bg-gradient-to-br from-purple-50 to-blue-100">
          <div className="max-w-4xl mx-auto px-6">
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
        
        <BlogCategories />
        <BlogPreview maxPosts={9} showTitle={false} />
        
        <div className="max-w-4xl mx-auto px-6">
          <NewsletterSignup />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
