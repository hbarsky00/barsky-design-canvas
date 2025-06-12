
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/store/ProductDetails";
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
    
    trackPageView(`/store/product/${productId}`, `${product?.name} | Hiram Barsky`);
  }, [productId, product, navigate]);
  
  if (!product) return null;
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>{product.name} | Hiram Barsky | Design Resources</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`https://barskydesign.pro/store/product/${product.id}`} />
      </Helmet>
      
      <Header />
      <main className="flex-grow pt-24">
        <section className="py-12">
          <div className="section-container">
            <ProductDetails product={product} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
