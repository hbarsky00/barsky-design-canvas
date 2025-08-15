
import React from 'react';
import SEO from '@/components/seo/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesCallToAction from '@/components/services/ServicesCallToAction';

const MobileAppDesign = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        type="service"
        title="Mobile App Design Services"
        description="Design mobile apps that users love and businesses succeed with. iOS and Android platforms with AI-enhanced UX research."
        url="https://barskydesign.pro/design-services/mobile-app-design"
        image="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
      />
      
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Mobile App Design Services</h1>
          <p className="text-center text-gray-600 mb-12">Creating engaging mobile experiences that users love and businesses rely on with UX research-driven design approach.</p>
          
          <div className="max-w-4xl mx-auto">
            <section className="mb-12" id="ios">
              <h2 className="text-3xl font-bold mb-4">iOS App Design</h2>
              <p className="text-gray-600 mb-6">Beautiful and intuitive designs following Apple's Human Interface Guidelines for seamless iOS experiences.</p>
            </section>
            
            <section className="mb-12" id="android">
              <h2 className="text-3xl font-bold mb-4">Android App Design</h2>
              <p className="text-gray-600 mb-6">Material Design implementation for Android platforms, ensuring consistency with Android design principles.</p>
            </section>
            
            <section className="mb-12" id="cross-platform">
              <h2 className="text-3xl font-bold mb-4">Cross-Platform Design</h2>
              <p className="text-gray-600 mb-6">Consistent experiences across multiple platforms and devices while respecting platform-specific conventions.</p>
            </section>
          </div>
        </div>
        
        <ServicesCallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default MobileAppDesign;
