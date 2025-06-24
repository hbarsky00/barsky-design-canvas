
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
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import { homepageFaqs } from "@/data/seoFaqs";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";

const Services = () => {
  React.useEffect(() => {
    trackPageView('/services', 'AI-Enhanced Design Services - Hiram Barsky');
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <EnhancedGlobalSeo 
        title="AI-Enhanced Design Services | Hiram Barsky | WCAG Compliance & Conversion Optimization"
        description="AI-enhanced UX/UI design services bridging beautiful interfaces and measurable business outcomes. Specializing in accessibility compliance, AI-augmented processes, and cross-functional collaboration. Addressing the 77% company need for accessibility expertise."
        canonicalUrl="https://barskydesign.pro/services"
        pageType="service"
        keywords={[
          "AI-enhanced design services", "WCAG accessibility compliance", "conversion-focused design",
          "cross-functional design collaboration", "AI-augmented UX process", "business-outcome design",
          "accessibility audit services", "Claude AI design process", "Figma AI prototyping"
        ]}
      />
      <ServicesStructuredData />
      <Header />
      <main className="flex-grow pt-24">
        <ServicesHero />
        
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 mx-auto max-w-6xl">
            <ServicesNavMenu />
            <ServicesTabs />
          </div>
        </section>
        
        <ServicesFaq />
        
        <SeoFaqSection 
          title="AI-Enhanced Design & Accessibility Questions"
          faqs={homepageFaqs}
        />
        
        <ServicesCallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
