
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesCallToAction from '@/components/services/ServicesCallToAction';

const WebDevelopment = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Web Development Services | Barsky Design Agency</title>
        <meta name="description" content="Professional web development services using React, TypeScript, and modern technologies for fast, responsive, and accessible websites." />
        <meta name="keywords" content="Barsky Design, web development services, frontend development, React development, TypeScript, responsive design, performance optimization, web applications" />
        <meta name="author" content="Barsky Design - UX Research & Design Agency" />
        <link rel="canonical" href="https://barskydesign.pro/design-services/web-development" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Web Development Services | Barsky Design" />
        <meta property="og:description" content="Modern web development services using React, TypeScript, and cutting-edge frontend technologies." />
        <meta property="og:url" content="https://barskydesign.pro/design-services/web-development" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
        <meta property="og:site_name" content="Barsky Design - UX Research & Design Agency" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Web Development Services",
              "description": "Professional web development services using modern technologies like React and TypeScript with UX-focused approach",
              "provider": {
                "@type": "Organization",
                "name": "Barsky Design",
                "description": "UX Research & Design Agency"
              },
              "serviceType": "Web Development",
              "areaServed": "Worldwide",
              "url": "https://barskydesign.pro/design-services/web-development"
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Web Development Services</h1>
          <p className="text-center text-gray-600 mb-12">Modern web development using the latest technologies for fast, responsive, and accessible websites from a UX research and design agency perspective.</p>
          
          <div className="max-w-4xl mx-auto">
            <section className="mb-12" id="frontend">
              <h2 className="text-3xl font-bold mb-4">Frontend Development</h2>
              <p className="text-gray-600 mb-6">Building interactive user interfaces with React, TypeScript, and modern frameworks for exceptional user experiences.</p>
            </section>
            
            <section className="mb-12" id="responsive">
              <h2 className="text-3xl font-bold mb-4">Responsive Design</h2>
              <p className="text-gray-600 mb-6">Websites that work beautifully on all devices and screen sizes, ensuring optimal user experience across platforms.</p>
            </section>
            
            <section className="mb-12" id="performance">
              <h2 className="text-3xl font-bold mb-4">Performance Optimization</h2>
              <p className="text-gray-600 mb-6">Fast loading times and smooth interactions for better user experience and improved search engine rankings.</p>
            </section>
          </div>
        </div>
        
        <ServicesCallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default WebDevelopment;
