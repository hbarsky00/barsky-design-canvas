import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star, TrendingUp, BarChart3, Target, Eye, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ContactSection from "@/components/ContactSection";

const ConversionAudit: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

        <main className="pt-24 pb-16">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                Unlock Hidden Growth: Conversion Rate Optimization Audit
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Is your website underperforming? Discover untapped potential with our
                expert conversion audit. We analyze user behavior, identify bottlenecks,
                and provide actionable strategies to boost your conversion rates.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Your Free Audit
              </Button>
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 h-6 w-6" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Increased Revenue
                  </h3>
                  <p className="text-gray-600">
                    Optimize your sales funnel and turn more visitors into paying customers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <TrendingUp className="text-purple-500 h-6 w-6" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Improved User Experience
                  </h3>
                  <p className="text-gray-600">
                    Enhance website usability and create a seamless journey for your users.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <BarChart3 className="text-amber-500 h-6 w-6" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Data-Driven Insights
                  </h3>
                  <p className="text-gray-600">
                    Make informed decisions based on comprehensive analytics and user behavior
                    data.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                What Our Audit Includes
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Target className="text-blue-500 h-5 w-5" />
                  <span className="text-gray-700">
                    In-depth analysis of your website's key performance indicators (KPIs)
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Eye className="text-blue-500 h-5 w-5" />
                  <span className="text-gray-700">
                    Comprehensive review of user flow and navigation
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Zap className="text-blue-500 h-5 w-5" />
                  <span className="text-gray-700">
                    Identification of friction points and areas for improvement
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Star className="text-blue-500 h-5 w-5" />
                  <span className="text-gray-700">
                    Personalized recommendations to optimize conversion paths
                  </span>
                </li>
              </ul>
            </div>

            {/* Call to Action Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Website?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Take the first step towards higher conversions. Request your free audit today!
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Request a Free Audit
              </Button>
            </div>
          </motion.section>

          {/* Contact Section */}
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ConversionAudit;
