import React from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, Target, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";

const LinkedInVisitors: React.FC = () => {
  const businessOutcomes = [
    {
      metric: "65%",
      description: "Increase in user engagement (Herbalink case study)",
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />
    },
    {
      metric: "70%",
      description: "Faster processing time (Investor Loan App)",
      icon: <Clock className="h-6 w-6 text-green-600" />
    },
    {
      metric: "40%+",
      description: "Average conversion rate improvement",
      icon: <Target className="h-6 w-6 text-purple-600" />
    },
    {
      metric: "$2M+",
      description: "Total client revenue generated",
      icon: <Zap className="h-6 w-6 text-yellow-600" />
    }
  ];

  const painPoints = [
    "Your current UX isn't converting visitors into customers",
    "Competitors are outpacing you with AI-enhanced experiences", 
    "You need both design expertise AND AI integration capabilities",
    "Traditional agencies either do design OR development—not both strategically"
  ];

  const solutions = [
    "AI-enhanced UX that adapts to user behavior in real-time",
    "Complete design-to-development pipeline with measurable ROI",
    "Strategic partnership combining 15+ years UX expertise with cutting-edge AI",
    "Guaranteed conversion improvements or redesign for free"
  ];

  const credibilityIndicators = [
    { label: "Google UX Certified", icon: <Award className="h-5 w-5 text-blue-600" /> },
    { label: "WCAG 2.1 Accessibility Expert", icon: <CheckCircle className="h-5 w-5 text-green-600" /> },
    { label: "15+ Years Experience", icon: <Users className="h-5 w-5 text-purple-600" /> },
    { label: "AI Integration Specialist", icon: <Zap className="h-5 w-5 text-yellow-600" /> }
  ];

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://barskydesign.pro/linkedin-visitors" />
      </Helmet>
      <EnhancedGlobalSeo 
        title="Turn Your Digital Product Into a Revenue Machine | LinkedIn Exclusive"
        description="Senior Product Designer + Gen AI Developer helping business leaders achieve 40%+ conversion improvements. Free strategy session for LinkedIn professionals."
        
        pageType="service"
        keywords={["UX design ROI", "AI integration business", "conversion optimization", "digital transformation", "startup UX consultant"]}
      />
      
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section - LinkedIn Focused */}
          <section className="py-12 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full inline-block mb-6 font-semibold">
                  👋 Welcome LinkedIn Professional
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Stop Losing Revenue to Poor UX
                </h1>
                
                <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
                  I help business leaders like you bridge the gap between traditional UX design and AI integration—
                  delivering <strong>40%+ conversion improvements</strong> that translate directly to revenue growth.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      window.location.href = '/contact';
                    }}
                  >
                    Book Free Strategy Session
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 text-lg transition-all duration-300"
                    onClick={() => {
                      const resultsSection = document.getElementById('business-results');
                      if (resultsSection) {
                        resultsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    See Business Results
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Credibility Bar */}
          <section className="py-8 bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {credibilityIndicators.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 justify-center">
                    {item.icon}
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Business Results Section */}
          <section id="business-results" className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Measurable Business Results
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Real ROI from real projects. Here's what strategic UX + AI integration delivers:
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {businessOutcomes.map((outcome, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex justify-center mb-3">
                      {outcome.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{outcome.metric}</div>
                    <div className="text-sm text-gray-600">{outcome.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Pain Points vs Solutions */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  The Strategic Difference
                </h2>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Pain Points */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
                    ❌ Common Business Challenges
                  </h3>
                  <div className="space-y-4">
                    {painPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Solutions */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                    ✅ My Strategic Solutions
                  </h3>
                  <div className="space-y-4">
                    {solutions.map((solution, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{solution}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl mb-8 leading-relaxed white-text-nuclear">
                  Get a free 30-minute strategy session where I'll analyze your current setup and show you exactly 
                  how to implement AI-enhanced UX that drives measurable ROI.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      window.location.href = '/contact';
                    }}
                  >
                    Book Free Strategy Session
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <Link to="/projects">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 text-lg transition-all duration-300"
                    >
                      View Case Studies
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-8 text-sm opacity-90">
                  <p>✓ No commitment required  ✓ 24-hour response guarantee  ✓ NYC-based, serving globally</p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Let's Discuss Your Project
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Ready to see how AI-enhanced UX can transform your business metrics? 
                  Reach out for a free consultation.
                </p>
                
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <span className="text-blue-600 font-semibold">hello@barskydesign.pro</span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                      <a href="https://linkedin.com/in/hirambarsky" target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:text-blue-800 font-semibold">
                        linkedin.com/in/hirambarsky
                      </a>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <span className="text-gray-600">New York, NY • Serving Globally</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                    onClick={() => window.location.href = 'mailto:hello@barskydesign.pro?subject=LinkedIn%20Strategy%20Session%20Request&body=Hi%20Hiram,%0A%0AI%20found%20you%20through%20LinkedIn%20and%20would%20like%20to%20discuss%20a%20potential%20project.%0A%0A[Please%20briefly%20describe%20your%20project%20and%20goals]%0A%0ABest%20regards,'}
                  >
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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

export default LinkedInVisitors;