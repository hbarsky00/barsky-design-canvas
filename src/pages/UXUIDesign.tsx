
import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const UXUIDesign = () => {
  usePageIndexing();

  return (
    <>
      <DynamicSeo 
        type="service"
        title="UX/UI Design Services"
        description="Professional UX/UI design services that create engaging user experiences and drive business results."
        serviceName="UX/UI Design"
        benefits={["User-Centered Design", "Conversion Optimization", "Brand Alignment"]}
        targetAudience="Businesses seeking better user experiences"
        path="/design-services/ux-ui-design"
      />
      
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        
        <main className="flex-grow pt-20">
          <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                  UX/UI Design Services
                </h1>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed mb-8">
                  Creating intuitive, conversion-focused designs that users love and businesses depend on.
                </p>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default UXUIDesign;
