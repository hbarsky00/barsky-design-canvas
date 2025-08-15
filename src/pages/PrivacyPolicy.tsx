
import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const PrivacyPolicy = () => {
  usePageIndexing();

  return (
    <>
      <DynamicSeo 
        type="page"
        title="Privacy Policy"
        description="Our privacy policy outlines how we collect, use, and protect your personal information."
        path="/privacy-policy"
      />
      
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        
        <main className="flex-grow pt-20">
          <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
                  Privacy Policy
                </h1>
                <div className="prose prose-lg max-w-none">
                  <p className="text-neutral-600 leading-relaxed">
                    This privacy policy describes how we collect, use, and protect your personal information when you use our services.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
