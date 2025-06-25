
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IndexingOptimizer from "@/components/seo/IndexingOptimizer";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Services = () => {
  usePageIndexing();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AI-Enhanced UX Design Services | Hiram Barsky - Conversion-Focused Design</title>
        <meta name="description" content="Professional AI-augmented UX/UI design services specializing in accessibility compliance, conversion optimization, and business-focused design solutions. Expert in Claude AI, Figma AI, and cross-functional collaboration." />
        <link rel="canonical" href="https://barskydesign.pro/services" />
        
        {/* Enhanced indexing signals */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="priority" content="high" />
        <meta name="revisit-after" content="30 days" />
        
        {/* Service-specific structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "AI-Enhanced UX Design Services",
              "description": "Professional UX/UI design services with AI augmentation, accessibility compliance, and conversion optimization",
              "provider": {
                "@type": "Person",
                "name": "Hiram Barsky",
                "jobTitle": "AI-Fluent UX Designer & Accessibility Specialist"
              },
              "serviceType": "UX/UI Design",
              "areaServed": "Global",
              "url": "https://barskydesign.pro/services"
            }
          `}
        </script>
      </Helmet>
      
      <IndexingOptimizer priority="high" changeFreq="monthly" />
      
      <Header />
      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              AI-Enhanced UX Design Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Professional design services combining AI augmentation with accessibility compliance 
              and conversion optimization for measurable business results.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">UX/UI Design</h3>
                <p className="text-gray-600">AI-augmented interface design with accessibility compliance and conversion focus</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Web Development</h3>
                <p className="text-gray-600">Modern web applications built with performance and accessibility in mind</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Mobile App Design</h3>
                <p className="text-gray-600">Cross-platform mobile interfaces optimized for user engagement and business goals</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
