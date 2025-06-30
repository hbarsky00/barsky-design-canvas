
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesCallToAction from '@/components/services/ServicesCallToAction';

const UxUiDesign = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>UX/UI Design Services | Barsky Design Agency</title>
        <meta name="description" content="Professional UX/UI design services specializing in user research, interaction design, and prototyping for better digital experiences." />
        <meta name="keywords" content="Barsky Design, UX design services, UI design services, user experience design, user interface design, user research, interaction design, prototyping, design consultation" />
        <meta name="author" content="Barsky Design - UX Research & Design Agency" />
        <link rel="canonical" href="https://barskydesign.pro/design-services/ux-ui-design" />
        
        {/* Open Graph */}
        <meta property="og:title" content="UX/UI Design Services | Barsky Design" />
        <meta property="og:description" content="Professional UX/UI design services specializing in user-centered design for web and mobile applications." />
        <meta property="og:url" content="https://barskydesign.pro/design-services/ux-ui-design" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
        <meta property="og:site_name" content="Barsky Design - UX Research & Design Agency" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "UX/UI Design Services",
              "description": "Professional UX/UI design services including user research, interaction design, and prototyping",
              "provider": {
                "@type": "Organization",
                "name": "Barsky Design",
                "description": "UX Research & Design Agency"
              },
              "serviceType": "UX/UI Design",
              "areaServed": "Worldwide",
              "url": "https://barskydesign.pro/design-services/ux-ui-design"
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">UX/UI Design Services</h1>
          <p className="text-center text-gray-600 mb-12">Professional user-centered design services for web and mobile applications by Barsky Design.</p>
          
          <div className="max-w-4xl mx-auto">
            <section className="mb-12" id="user-research">
              <h2 className="text-3xl font-bold mb-4">User Research</h2>
              <p className="text-gray-600 mb-6">In-depth research to understand your users and their needs, ensuring design decisions are data-driven and user-focused.</p>
            </section>
            
            <section className="mb-12" id="interaction-design">
              <h2 className="text-3xl font-bold mb-4">Interaction Design</h2>
              <p className="text-gray-600 mb-6">Creating intuitive interfaces with meaningful interactions that guide users through your product seamlessly.</p>
            </section>
            
            <section className="mb-12" id="prototyping">
              <h2 className="text-3xl font-bold mb-4">Prototyping</h2>
              <p className="text-gray-600 mb-6">Interactive prototypes to test and validate design concepts before development, saving time and resources.</p>
            </section>
          </div>
        </div>
        
        <ServicesCallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default UxUiDesign;
