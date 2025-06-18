
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { trackPageView } from "@/lib/analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesCallToAction from "@/components/services/ServicesCallToAction";
import ProductGrid from "@/components/store/ProductGrid";
import StoreHeader from "@/components/store/StoreHeader";
import { MobileCategoryFilters, DesktopCategoryFilters } from "@/components/store/CategoryFilters";
import { products, categories } from "@/data/productsData";

const Store: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    trackPageView('/store', 'Store - Hiram Barsky');
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Store | Hiram Barsky | Design Resources</title>
        <meta name="description" content="Shop for design resources, templates, UI kits, and guides to enhance your design workflow." />
        <link rel="canonical" href="https://barskydesign.pro/store" />
      </Helmet>
      
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
      </main>
      <Footer />
    </div>
  );
};

export default Store;
