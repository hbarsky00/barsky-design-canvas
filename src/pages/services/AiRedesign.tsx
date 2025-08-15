import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/seo/SEO";

const AiRedesign = () => {
  return (
    <>
      <SEO
        type="service"
        title="AI-Powered Website Redesign Services"
        description="Transform your website with AI-enhanced design solutions that improve user experience and conversion rates."
        url="https://barskydesign.pro/services/ai-redesign"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                AI-Powered Website Redesign
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your website with AI-enhanced design solutions that improve user experience and conversion rates.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-8"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  AI-Driven Analysis
                </h3>
                <p className="text-gray-600 mb-6">
                  Leverage artificial intelligence to analyze user behavior patterns and identify optimization opportunities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    User Journey Analysis
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Conversion Funnel Optimization
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Performance Metrics
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-8"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Smart Design Systems
                </h3>
                <p className="text-gray-600 mb-6">
                  Create intelligent design systems that adapt to user preferences and business goals.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Adaptive UI Components
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Personalized Experiences
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Accessibility Compliance
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-8"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Continuous Optimization
                </h3>
                <p className="text-gray-600 mb-6">
                  Implement AI-powered testing and optimization for ongoing performance improvements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    A/B Testing Automation
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Real-time Analytics
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Performance Monitoring
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AiRedesign;
