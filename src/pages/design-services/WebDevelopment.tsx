
import React from 'react';
import DynamicSeo from '@/components/seo/DynamicSeo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesCallToAction from '@/components/services/ServicesCallToAction';

const WebDevelopment = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DynamicSeo 
        type="service"
        title="AI Integration for Web Applications"
        description="Transform your digital product with intelligent features. From chatbots to predictive UX - see how AI can boost user engagement."
        image="https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
        serviceName="Web Development"
        benefits={["AI-powered features", "Modern tech stack", "Performance optimization"]}
        targetAudience="Businesses and Organizations"
        path="/design-services/web-development"
      />
      
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
