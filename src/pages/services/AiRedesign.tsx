import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star, Zap, Sparkles, Target, TrendingUp, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ContactSection from "@/components/ContactSection";

const AiRedesign: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

        <main className="pt-24 pb-16">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                AI-Powered Website Redesign
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Transform your website into a lead-generating machine with our AI-driven redesign services.
              </p>
              <Button size="lg">Get a Free Consultation</Button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Zap className="text-blue-500 h-6 w-6" />
                  <h3 className="text-xl font-semibold text-gray-900">AI-Driven Analysis</h3>
                </div>
                <p className="text-gray-600">
                  We use AI to analyze your website's performance, identify areas for improvement, and create a data-backed redesign strategy.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Sparkles className="text-purple-500 h-6 w-6" />
                  <h3 className="text-xl font-semibold text-gray-900">Personalized Design</h3>
                </div>
                <p className="text-gray-600">
                  Our AI algorithms generate personalized design recommendations based on your brand, target audience, and business goals.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Target className="text-green-500 h-6 w-6" />
                  <h3 className="text-xl font-semibold text-gray-900">Conversion Optimization</h3>
                </div>
                <p className="text-gray-600">
                  We optimize your website for conversions, ensuring that your visitors are more likely to become customers.
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-gray-50 rounded-2xl py-12 px-6 mb-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Benefits of AI-Powered Redesign
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Benefit 1 */}
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-green-500 h-6 w-6" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Increased Conversions</h3>
                    <p className="text-gray-600">
                      Our AI-driven redesigns are proven to increase conversion rates, helping you generate more leads and sales.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start gap-4">
                  <Star className="text-yellow-500 h-6 w-6" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Improved User Experience</h3>
                    <p className="text-gray-600">
                      We create a seamless and intuitive user experience that keeps your visitors engaged and coming back for more.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start gap-4">
                  <TrendingUp className="text-blue-500 h-6 w-6" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Data-Driven Results</h3>
                    <p className="text-gray-600">
                      Our redesigns are based on data, not guesswork, ensuring that you get the best possible results.
                    </p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="flex items-start gap-4">
                  <Eye className="text-purple-500 h-6 w-6" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern Design</h3>
                    <p className="text-gray-600">
                      We use the latest design trends and technologies to create a website that looks great and performs even better.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                What Our Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <p className="text-gray-600 italic mb-4">
                    "The AI-powered redesign transformed our website into a lead-generating machine. We've seen a significant increase in conversions since the redesign."
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Client"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">John Doe</h4>
                      <p className="text-gray-500">CEO, Example Company</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <p className="text-gray-600 italic mb-4">
                    "We were amazed by the personalized design recommendations generated by the AI algorithms. Our new website is not only beautiful but also highly effective."
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Client"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Jane Smith</h4>
                      <p className="text-gray-500">Marketing Manager, Another Company</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Ready to transform your website?
              </h2>
              <Button size="lg">Get a Free Consultation</Button>
            </div>
          </motion.section>
        </main>

        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default AiRedesign;
