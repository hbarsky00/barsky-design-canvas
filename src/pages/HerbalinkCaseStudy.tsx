import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, TrendingUp, Users, Clock, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";

const HerbalinkCaseStudy: React.FC = () => {
  const results = [
    { metric: "65%", label: "Increase in User Engagement", icon: <TrendingUp className="h-6 w-6" /> },
    { metric: "45%", label: "Faster Consultation Booking", icon: <Clock className="h-6 w-6" /> },
    { metric: "40%", label: "Improvement in User Retention", icon: <Users className="h-6 w-6" /> },
    { metric: "50%", label: "Reduction in Support Tickets", icon: <CheckCircle className="h-6 w-6" /> }
  ];

  const keyFeatures = [
    "Intelligent herbalist matching based on user needs",
    "Simplified consultation booking process",
    "Mobile-optimized interface with accessibility compliance",
    "Real-time availability system",
    "Personalized dashboard for ongoing consultations"
  ];

  const processSteps = [
    {
      week: "Week 1-2",
      title: "Discovery & AI-Enhanced User Research",
      description: "Used ChatGPT and Claude AI to analyze user behavior patterns and identify pain points in healthcare consultation platforms."
    },
    {
      week: "Week 3-4", 
      title: "Strategic Planning & Wireframing",
      description: "Created user journey maps optimized for conversion and developed wireframes focusing on trust-building and ease of use."
    },
    {
      week: "Week 5-6",
      title: "Visual Design & Prototyping", 
      description: "Designed mobile-first interface with accessibility standards and created interactive prototypes for user testing."
    },
    {
      week: "Week 7-8",
      title: "Testing & Optimization",
      description: "Conducted usability testing with target users and optimized the matching algorithm and booking flow."
    }
  ];

  return (
    <>
      <EnhancedGlobalSeo 
        title="Herbalink Case Study: 65% Engagement Increase with AI-Powered UX | Hiram Barsky"
        description="See how AI-enhanced UX design helped Herbalink increase user engagement by 65% and booking speed by 45%. Complete case study with process and results."
        canonicalUrl="https://barskydesign.pro/case-study/herbalink"
        pageType="project"
        keywords={[
          "Herbalink case study", "UX case study", "AI UX design", "healthcare UX", "mobile app design",
          "consultation platform design", "user engagement improvement"
        ]}
      />
      
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        
        <main className="flex-grow pt-20">
          
          {/* Hero Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                  How Herbalink Increased User Engagement 65% With AI-Powered UX
                </h1>
                <p className="text-xl text-neutral-500 max-w-4xl mx-auto leading-relaxed">
                  A complete redesign of a healthcare consultation platform using AI-enhanced user research and mobile-first design principles.
                </p>
              </motion.div>

              {/* Project Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-card-elevated p-8 mb-16"
              >
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Client</h3>
                    <p className="text-neutral-500">Herbalink</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Industry</h3>
                    <p className="text-neutral-500">Healthcare/Wellness</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Project Type</h3>
                    <p className="text-neutral-500">Mobile-first Platform</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Timeline</h3>
                    <p className="text-neutral-500">8 weeks</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Challenge Section */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  The Challenge
                </h2>
                <div className="max-w-4xl mx-auto">
                  <p className="text-xl text-neutral-500 leading-relaxed mb-8">
                    Herbalink needed to connect users with certified herbalists for personalized consultations, 
                    but their existing platform had poor user engagement and complicated booking processes.
                  </p>
                  <div className="glass-card p-6 text-left">
                    <h3 className="font-bold text-neutral-900 mb-4">Key Pain Points Identified:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-neutral-500">Users couldn't easily find herbalists matching their specific needs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-neutral-500">Booking process was lengthy and confusing on mobile devices</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-neutral-500">Lack of trust signals and practitioner verification</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-neutral-500">Poor accessibility and mobile responsiveness</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Solution Section */}
          <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  AI-Enhanced Solution Approach
                </h2>
                <p className="text-xl text-neutral-500 max-w-4xl mx-auto leading-relaxed mb-12">
                  I used AI-powered research and mobile-first design principles to create an intelligent platform 
                  that connects users with the right herbalists seamlessly.
                </p>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid md:grid-cols-2 gap-8 mb-16"
              >
                <div className="glass-card p-8">
                  <Smartphone className="h-12 w-12 text-blue-vibrant mb-6" />
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">Key Features Designed</h3>
                  <ul className="space-y-3">
                    {keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success-green mt-1 flex-shrink-0" />
                        <span className="text-neutral-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="glass-card p-8">
                  <div className="w-full h-64 bg-neutral-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-neutral-500">Herbalink App Screenshots</span>
                  </div>
                  <p className="text-neutral-500 text-sm">
                    Mobile-first design with intelligent matching and streamlined booking flow
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Design Process Breakdown
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-vibrant text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-blue-vibrant">{step.week}</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                    <p className="text-neutral-500">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Results Achieved
                </h2>
                <p className="text-xl text-neutral-500 max-w-4xl mx-auto leading-relaxed">
                  The AI-enhanced redesign delivered measurable improvements across all key metrics within 8 weeks.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="glass-card p-6 text-center"
                  >
                    <div className="flex justify-center mb-4 text-blue-vibrant">
                      {result.icon}
                    </div>
                    <div className="text-3xl font-bold text-success-green mb-2">{result.metric}</div>
                    <div className="text-sm text-neutral-500 uppercase tracking-wide">{result.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Client Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass-card-elevated p-8 text-center max-w-4xl mx-auto"
              >
                <p className="text-xl text-neutral-500 italic mb-6 leading-relaxed">
                  "Hiram's AI-enhanced research revealed user pain points we never considered. 
                  The redesign not only looked amazing but converted 45% better than our old site. 
                  The intelligent matching system has become our biggest competitive advantage."
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
                  <div className="text-left">
                    <p className="font-bold text-neutral-900">Sarah Chen</p>
                    <p className="text-sm text-neutral-500">Founder, Herbalink</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Technologies Section */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-8">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Figma", "React", "ChatGPT API", "Claude AI", "Supabase", "Mobile-first Design", "WCAG 2.1", "User Testing"].map((tech, index) => (
                    <span key={index} className="bg-blue-50 text-blue-accent px-4 py-2 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-br from-blue-50 to-neutral-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Ready to See Similar Results for Your Project?
                </h2>
                <p className="text-xl text-neutral-500 mb-8 leading-relaxed">
                  Get your free 30-minute conversion audit and discover how AI-enhanced UX can transform your business.
                </p>
                <Button 
                  className="bg-blue-vibrant hover:bg-blue-accent text-white font-semibold py-4 px-8 text-lg group"
                  onClick={() => window.location.href = '/free-audit'}
                >
                  Get Your Free Audit
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HerbalinkCaseStudy;