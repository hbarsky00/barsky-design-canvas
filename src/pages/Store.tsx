
import React, { useState, useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesCallToAction from "@/components/services/ServicesCallToAction";
import ProductGrid from "@/components/store/ProductGrid";
import StoreHeader from "@/components/store/StoreHeader";
import { MobileCategoryFilters, DesktopCategoryFilters } from "@/components/store/CategoryFilters";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import BlogPreview from "@/components/blog/BlogPreview";
import { homepageFaqs } from "@/data/seoFaqs";
import { products, categories } from "@/data/productsData";
import DynamicSeo from "@/components/seo/DynamicSeo";

const Store: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    trackPageView('/store', 'AI-Enhanced Design Resources - Hiram Barsky');
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <DynamicSeo 
        type="page"
        title="AI-Enhanced Design Resources | Hiram Barsky | Templates & Accessibility Tools"
        description="Shop AI-enhanced design resources, accessibility-compliant templates, conversion-optimized UI kits, and business-focused design guides. Tools created by an AI-fluent UX designer specializing in WCAG compliance and cross-functional collaboration."
        keywords={[
          "AI-enhanced design resources", "accessibility-compliant templates", "conversion-optimized UI kits",
          "WCAG design templates", "business-focused design guides", "AI-augmented design tools",
          "cross-functional design resources", "Claude AI design templates"
        ]}
      />
      
      <Header />
      <main className="flex-grow pt-24">
        <section className="py-12">
          <div className="section-container">
            <StoreHeader />
            
            <MobileCategoryFilters 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
            
            <div className="flex flex-col md:flex-row gap-8">
              <DesktopCategoryFilters 
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              
              <div className="flex-grow">
                <ProductGrid products={filteredProducts} />
              </div>
            </div>
          </div>
        </section>
        
        <ServicesCallToAction />
        <BlogPreview />
        <SeoFaqSection 
          title="AI-Enhanced Design Resources & Accessibility Questions"
          faqs={homepageFaqs}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Store;
