
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <link rel="canonical" href={`https://barskydesign.pro/store/product/${productId}`} />
        <title>{product.name} | Barsky Design - UX Research & Design Agency | Professional Design Resources</title>
        <meta name="description" content={`${product.description} Professional design resource from Barsky Design - UX research and design agency specializing in user-centered design solutions and digital product experiences.`} />
        <meta name="keywords" content={`${product.name}, Barsky Design, UX design resources, design templates, UI kit, design system, user experience design, design agency resources`} />
        <meta name="author" content="Barsky Design - UX Research & Design Agency" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${product.name} | Barsky Design Design Resources`} />
        <meta property="og:description" content={`${product.description} Professional design resource from Barsky Design - UX research and design agency.`} />
        <meta property="og:url" content={`https://barskydesign.pro/store/product/${product.id}`} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={`https://barskydesign.pro${product.image}`} />
        <meta property="og:site_name" content="Barsky Design - UX Research & Design Agency" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | Barsky Design`} />
        <meta name="twitter:description" content={`${product.description} Professional design resource from Barsky Design.`} />
        <meta name="twitter:image" content={`https://barskydesign.pro${product.image}`} />
        <meta name="twitter:creator" content="@barskydesign" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "${product.name}",
              "description": "${product.description}",
              "image": "https://barskydesign.pro${product.image}",
              "url": "https://barskydesign.pro/store/product/${product.id}",
              "brand": {
                "@type": "Organization",
                "name": "Barsky Design",
                "description": "Professional UX research and design agency"
              },
              "offers": {
                "@type": "Offer",
                "price": "${product.price}",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Barsky Design"
                }
              },
              "category": "Design Resources",
              "provider": {
                "@type": "Organization",
                "name": "Barsky Design",
                "description": "UX research and design agency specializing in user-centered design solutions"
              }
            }
          `}
        </script>
        
      </Helmet>
      
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
