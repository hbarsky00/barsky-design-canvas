import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star, Target, Users, TrendingUp, Eye, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ContactSection from "@/components/ContactSection";

const MvpValidation: React.FC = () => {
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
                Validate Your MVP with Expert Design & User Testing
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                De-risk your startup by validating your Minimum Viable Product (MVP) with our proven design and user testing methodologies.
              </p>
              <Button size="lg">Get a Free Consultation</Button>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Reduce Development Costs</h3>
                  <p className="text-gray-600">Identify and fix critical usability issues early to avoid costly rework.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="h-6 w-6 text-yellow-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Improve User Satisfaction</h3>
                  <p className="text-gray-600">Ensure your MVP meets user needs and expectations for a delightful experience.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Target className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Increase Conversion Rates</h3>
                  <p className="text-gray-600">Optimize your MVP for maximum user engagement and conversion.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-purple-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Gain Actionable Insights</h3>
                  <p className="text-gray-600">Receive detailed reports and recommendations based on real user feedback.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-6 w-6 text-teal-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Accelerate Time to Market</h3>
                  <p className="text-gray-600">Launch a validated MVP faster and with greater confidence.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Eye className="h-6 w-6 text-orange-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Enhance Product Vision</h3>
                  <p className="text-gray-600">Refine your product roadmap based on user-centered design principles.</p>
                </div>
              </div>
            </div>

            {/* Our Approach */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our MVP Validation Approach</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  We employ a comprehensive approach to MVP validation, combining expert design with rigorous user testing to ensure your product resonates with your target audience.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li><strong>Design Review:</strong> Expert evaluation of your MVP's design and usability.</li>
                  <li><strong>User Testing:</strong> Real-world testing with your target users to gather actionable feedback.</li>
                  <li><strong>Data Analysis:</strong> In-depth analysis of user behavior and feedback to identify key areas for improvement.</li>
                  <li><strong>Iterative Refinement:</strong> Collaborative refinement of your MVP based on testing results.</li>
                </ul>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our goal is to help you launch a validated MVP that meets user needs, drives engagement, and achieves your business objectives.
                </p>
              </div>
            </div>

            {/* Who is this for? */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who is MVP Validation For?</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our MVP validation service is ideal for:
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li><strong>Startups:</strong> Validating your core product idea before investing heavily in development.</li>
                  <li><strong>Product Teams:</strong> Ensuring new features and products meet user needs and expectations.</li>
                  <li><strong>Entrepreneurs:</strong> De-risking your business by validating your MVP with real users.</li>
                </ul>
                <p className="text-lg text-gray-600 leading-relaxed">
                  If you're looking to launch a successful product, our MVP validation service can help you get there.
                </p>
              </div>
            </div>

            {/* Case Studies & Testimonials */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Success Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Example Case Study */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Validated a Fintech MVP, resulting in a 40% increase in user engagement.
                    </h3>
                    <p className="text-gray-600">
                      "The MVP validation process helped us identify critical usability issues and improve our product's overall user experience."
                    </p>
                    <div className="mt-4">
                      <Badge variant="secondary">Fintech</Badge>
                      <Badge variant="secondary">User Testing</Badge>
                    </div>
                  </div>
                </div>

                {/* Example Testimonial */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      "The insights we gained from user testing were invaluable."
                    </h3>
                    <p className="text-gray-600">
                      "Thanks to the MVP validation, we were able to launch a product that truly meets our users' needs."
                    </p>
                    <div className="mt-4">
                      <Star className="h-4 w-4 text-yellow-500 inline-block mr-1" />
                      <Star className="h-4 w-4 text-yellow-500 inline-block mr-1" />
                      <Star className="h-4 w-4 text-yellow-500 inline-block mr-1" />
                      <Star className="h-4 w-4 text-yellow-500 inline-block mr-1" />
                      <Star className="h-4 w-4 text-yellow-500 inline-block mr-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Validate Your MVP?</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Get a free consultation and learn how our MVP validation service can help you launch a successful product.
              </p>
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

export default MvpValidation;
