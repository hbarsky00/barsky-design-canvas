
import React from 'react';
import SEO from '@/components/seo/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesCallToAction from '@/components/services/ServicesCallToAction';

const UxUiDesign = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        type="service"
        title="UX Research & User Testing Services"
        description="AI-enhanced user research that uncovers insights traditional methods miss. Get actionable data that drives 40%+ conversion improvements."
        url="https://barskydesign.pro/design-services/ux-ui-design"
      />
      
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Product Design Services</h1>
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
