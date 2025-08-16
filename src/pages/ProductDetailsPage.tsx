
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesCallToAction from "@/components/services/ServicesCallToAction";
import ProductDetails from "@/components/store/ProductDetails";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import BlogPreview from "@/components/blog/BlogPreview";
import { homepageFaqs } from "@/data/seoFaqs";
import { products } from "@/data/productsData";

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  // Find the product by ID
  const product = products.find(p => p.id === productId);
  
  useEffect(() => {
    // If product doesn't exist, redirect to store
    if (!product) {
      navigate("/store");
      return;
    }
    
    trackPageView(`/store/product/${productId}`, `${product?.name} | Barsky Design`);
  }, [productId, product, navigate]);
  
  if (!product) return null;
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* SEO is now handled globally by UnifiedSEO in App.tsx */}
      
      <Header />
      <main className="flex-grow pt-24">
        <section className="py-12">
          <div className="section-container">
            <ProductDetails product={product} />
          </div>
        </section>
        
        <ServicesCallToAction />
        <BlogPreview />
        
        {/* FAQ Section */}
        <SeoFaqSection 
          title="Product & Design Resource Questions"
          faqs={homepageFaqs}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
