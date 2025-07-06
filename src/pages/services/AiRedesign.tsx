import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, DollarSign, Trophy, Zap, Brain, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";

const AiRedesign: React.FC = () => {
  const processBreakdown = [
    {
      weeks: "Week 1-3",
      title: "Complete UX Research with AI Insights",
      tasks: [
        "AI-powered user behavior analysis and research synthesis",
        "Advanced competitive intelligence using machine learning",
        "User persona development with predictive analytics",
        "Comprehensive accessibility and performance audit"
      ]
    },
    {
      weeks: "Week 4-6",
      title: "Strategic Redesign Planning",
      tasks: [
        "Information architecture optimization with AI recommendations",
        "Conversion funnel redesign with predictive modeling",
        "Design system planning with component intelligence",
        "AI integration strategy and technical planning"
      ]
    },
    {
      weeks: "Week 7-9",
      title: "High-Fidelity Design & AI Integration",
      tasks: [
        "Complete visual redesign with advanced design systems",
        "AI interface integration (ChatGPT/Claude where applicable)",
        "Interactive prototype development with AI features",
        "Comprehensive accessibility optimization (WCAG 2.1+)"
      ]
    },
    {
      weeks: "Week 10-12",
      title: "Development Support & Optimization",
      tasks: [
        "React/Vue.js development collaboration and code review",
        "Performance optimization for AI-enhanced features",
        "Quality assurance testing and bug resolution",
        "Launch preparation with 90-day optimization plan"
      ]
    }
  ];

  const deliverables = [
    "Complete website/app redesign with AI-enhanced features",
    "Advanced design system with comprehensive documentation",
    "AI integration setup and implementation guide",
    "Development support throughout entire build phase",
    "Performance optimization recommendations and implementation",
    "90-day ongoing support with monthly optimization check-ins"
  ];

  const perfectFor = [
    "Enterprises requiring market-leading digital experiences",
    "Companies ready for complete digital transformation",
    "Businesses needing AI integration with existing systems",
    "Organizations requiring comprehensive design systems"
  ];

  const aiFeatures = [
    {
      title: "Intelligent User Interfaces",
      description: "AI-powered interfaces that adapt to user behavior and preferences in real-time"
    },
    {
      title: "Automated Personalization",
      description: "Machine learning algorithms that customize experiences for individual users"
    },
    {
      title: "Predictive Analytics Integration",
      description: "Built-in analytics that predict user needs and optimize conversion paths"
    },
    {
      title: "Smart Content Management",
      description: "AI-assisted content optimization and automated A/B testing capabilities"
    }
  ];

  return (
    <>
      <EnhancedGlobalSeo 
        title="AI-Enhanced Redesign - Complete Digital Transformation"
        description="Transform your digital presence with AI-powered redesign. Same approach that helped Investor Loan App achieve 70% faster processing. $18,500 investment."
        canonicalUrl="https://barskydesign.pro/services/ai-redesign"
        pageType="service"
        keywords={[
          "AI-enhanced redesign", "digital transformation", "AI integration", "enterprise UX",
          "design systems", "AI interfaces", "machine learning UX", "intelligent design"
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
                <div className="flex justify-center mb-6">
                  <Trophy className="h-16 w-16 text-purple-vibrant" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                  AI-Enhanced Redesign
                </h1>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed mb-8">
                  Complete Digital Transformation with Measurable ROI
                </p>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-success-green/10 px-4 py-2 rounded-lg">
                    <DollarSign className="h-5 w-5 text-success-green" />
                    <span className="text-2xl font-bold text-neutral-900">$18,500</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-vibrant" />
                    <span className="font-medium text-purple-vibrant">10-12 weeks</span>
                  </div>
                </div>
              </motion.div>

              {/* Success Story Callout */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-card-elevated p-8 mb-16 border-l-4 border-success-green"
              >
                <div className="flex items-start gap-4">
                  <Brain className="h-8 w-8 text-success-green flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Success Story</h3>
                    <p className="text-neutral-500 mb-4">
                      Similar to the Investor Loan App project where I achieved 70% faster processing through AI-enhanced automation, 
                      comprehensive data visualization, and intelligent risk assessment systems that transformed loan management for investors.
                    </p>
                    <Link to="/case-study-investor-loan-app" className="text-blue-accent hover:text-blue-vibrant font-semibold">
                      Read Full Investor Loan App Case Study →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Perfect For Section */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Perfect For
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {perfectFor.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="glass-card p-6 flex items-start gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-success-green flex-shrink-0 mt-1" />
                    <span className="text-neutral-500">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* AI Features Section */}
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
                  AI-Enhanced Features
                </h2>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
                  Transform your digital experience with cutting-edge AI integration
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {aiFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="glass-card p-6"
                  >
                    <Brain className="h-8 w-8 text-purple-vibrant mb-4" />
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
                    <p className="text-neutral-500">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Breakdown */}
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
                  12-Week Transformation Process
                </h2>
              </motion.div>

              <div className="space-y-8">
                {processBreakdown.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="glass-card p-8"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-purple-vibrant text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <span className="text-purple-vibrant font-medium">{phase.weeks}</span>
                        <h3 className="text-2xl font-bold text-neutral-900">{phase.title}</h3>
                      </div>
                    </div>
                    <ul className="space-y-3 ml-16">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-vibrant rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-500">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Deliverables Section */}
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
                  What You'll Receive
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {deliverables.map((deliverable, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="glass-card p-6 flex items-start gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-success-green flex-shrink-0 mt-1" />
                    <span className="text-neutral-500">{deliverable}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Guarantee Section */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card-elevated p-8"
              >
                <Shield className="h-12 w-12 text-purple-vibrant mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Transformation Guarantee
                </h2>
                <p className="text-xl text-neutral-500 leading-relaxed">
                  Complete digital transformation with measurable ROI. Based on proven results like 70% processing improvements, 
                  I guarantee your new AI-enhanced platform will deliver significant business value within 90 days of launch.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Investment & CTA Section */}
          <section className="py-16 bg-gradient-to-br from-purple-50 to-neutral-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Ready for Complete Transformation?
                </h2>
                <div className="mb-8">
                  <p className="text-xl text-neutral-500 mb-4">
                    <strong>Timeline:</strong> 10-12 weeks from project kickoff
                  </p>
                  <p className="text-xl text-neutral-500 mb-4">
                    <strong>Investment:</strong> $18,500 (payment plan available)
                  </p>
                  <p className="text-xl text-neutral-500">
                    <strong>Includes:</strong> Complete redesign + AI integration + 90-day support
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-purple-vibrant hover:bg-purple-700 text-white font-semibold py-4 px-8 text-lg group"
                    onClick={() => window.location.href = '/free-audit'}
                  >
                    Start Full Redesign
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="py-4 px-8 text-lg"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Schedule Strategy Call
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

export default AiRedesign;