
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesCallToAction from '@/components/services/ServicesCallToAction';

const MobileAppDesign = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Professional Mobile App Design Services | Barsky Design - UX Research & Design Agency</title>
        <meta name="description" content="Professional mobile app design services by Barsky Design. Specializing in iOS and Android app design, cross-platform design solutions, and user-centered mobile experiences that users love. UX research-driven mobile design approach." />
        <meta name="keywords" content="Barsky Design, mobile app design, iOS app design, Android app design, cross-platform design, mobile UX, mobile UI, app design services, UX research agency" />
        <meta name="author" content="Barsky Design - UX Research & Design Agency" />
        <link rel="canonical" href="https://barskydesign.pro/design-services/mobile-app-design" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Professional Mobile App Design Services | Barsky Design" />
        <meta property="og:description" content="Creating engaging mobile experiences for iOS and Android platforms that users love and businesses rely on. UX research-driven mobile design by Barsky Design." />
        <meta property="og:url" content="https://barskydesign.pro/design-services/mobile-app-design" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
        <meta property="og:site_name" content="Barsky Design - UX Research & Design Agency" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Mobile App Design Services",
              "description": "Professional mobile app design services for iOS and Android platforms with UX research-driven approach",
              "provider": {
                "@type": "Organization",
                "name": "Barsky Design",
                "description": "UX Research & Design Agency"
              },
              "serviceType": "Mobile App Design",
              "areaServed": "Worldwide",
              "url": "https://barskydesign.pro/design-services/mobile-app-design"
            }
          `}
        </script>
      </Helmet>
      
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
