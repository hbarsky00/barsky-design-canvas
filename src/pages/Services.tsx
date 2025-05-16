
import React from "react";
import { trackPageView } from "@/lib/analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesStructuredData from "@/components/services/ServicesStructuredData";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesNavMenu from "@/components/services/ServicesNavMenu";
import ServicesTabs from "@/components/services/ServicesTabs";
import ServicesFaq from "@/components/services/ServicesFaq";
import ServicesCallToAction from "@/components/services/ServicesCallToAction";

const Services = () => {
  React.useEffect(() => {
    trackPageView('/services', 'Design Services - Hiram Barsky');
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <ServicesStructuredData />
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <ServicesHero />
        
        {/* Service Navigation Menu */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 mx-auto max-w-6xl">
            <ServicesNavMenu />

            {/* Service Categories Tabs */}
            <ServicesTabs />
          </div>
        </section>
        
        {/* FAQ Section */}
        <ServicesFaq />
        
        {/* CTA Section */}
        <ServicesCallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
