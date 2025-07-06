import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, TrendingUp, Users, Clock, Smartphone, DollarSign, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";

const InvestorLoanAppCaseStudy: React.FC = () => {
  const results = [
    { metric: "70%", label: "Faster Loan Processing Times", icon: <Clock className="h-6 w-6" /> },
    { metric: "35%", label: "Improvement in User Retention", icon: <Users className="h-6 w-6" /> },
    { metric: "60%", label: "Reduction in Processing Errors", icon: <CheckCircle className="h-6 w-6" /> },
    { metric: "45%", label: "Increase in Loan Volume Capacity", icon: <TrendingUp className="h-6 w-6" /> }
  ];

  const keyFeatures = [
    {
      title: "AI-Powered Risk Assessment",
      description: "Automated loan risk analysis and scoring with real-time market condition integration, predictive analytics for portfolio performance, and intelligent alerts for high-risk situations.",
      icon: BarChart3
    },
    {
      title: "Automated Reporting Dashboard", 
      description: "Real-time portfolio tracking and visualization, automated compliance and tax reporting, custom report generation with AI insights, and performance analytics.",
      icon: TrendingUp
    },
    {
      title: "Streamlined Loan Processing",
      description: "Automated document processing and verification, AI-enhanced application review and approval, digital signature integration, and real-time status tracking.",
      icon: Clock  
    },
    {
      title: "Mobile-First Investor Experience",
      description: "Touch-optimized interface for complex data, secure mobile access with biometric authentication, offline capability for critical functions, and push notifications.",
      icon: Smartphone
    }
  ];

  const processSteps = [
    {
      week: "Week 1-3",
      title: "Financial Discovery & Compliance Research",
      description: "Conducted interviews with professional investors and loan officers, performed AI-powered analysis of loan processing workflows, and mapped regulatory compliance requirements."
    },
    {
      week: "Week 4-6", 
      title: "Information Architecture & Data Visualization",
      description: "Simplified complex data hierarchy, designed dashboards with AI-powered insights, mapped automated workflows, and planned mobile-responsive financial interfaces."
    },
    {
      week: "Week 7-9",
      title: "Visual Design & Interactive Prototyping", 
      description: "Created professional FinTech design system, built interactive prototypes with real-time data simulation, planned AI integration for risk assessment, and designed security-focused user experience."
    },
    {
      week: "Week 10-12",
      title: "Testing & Financial Optimization",
      description: "Conducted usability testing with professional investors, implemented AI-powered analytics and reporting, optimized performance for large datasets, and validated compliance and security."
    }
  ];

  return (
    <>
      <EnhancedGlobalSeo 
        title="Case Study: How Investor Loan App Accelerated Processing 70% With AI-Enhanced UX"
        description="See how AI-enhanced UX design helped Investor Loan App speed up loan processing by 70% and improve user retention by 35%. Real results from Barsky Design."
        canonicalUrl="https://barskydesign.pro/case-study-investor-loan-app"
        pageType="content"
        keywords={[
          "Investor Loan App case study", "AI-enhanced UX design", "FinTech UX design", "loan management platform",
          "financial app design", "investment portfolio UX", "automated loan processing"
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
                  Investor Loan App: 70% Faster Processing Through AI-Enhanced Portfolio Management
                </h1>
                <p className="text-xl text-neutral-500 max-w-4xl mx-auto leading-relaxed">
                  How intelligent automation and data visualization transformed loan management for investors
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
                    <p className="text-neutral-500">Investor Loan App</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Industry</h3>
                    <p className="text-neutral-500">FinTech/Investment</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Timeline</h3>
                    <p className="text-neutral-500">12 weeks</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Results</h3>
                    <p className="text-neutral-500">70% faster processing</p>
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
                      The Investor Loan App needed a comprehensive loan management platform that could handle complex investor portfolios, risk assessment, 
                      and automated reporting while remaining intuitive for users managing multiple high-value transactions.
                    </p>
                    <div className="glass-card p-6 text-left">
                      <h3 className="font-bold text-neutral-900 mb-4">Key Problems:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-500">Manual loan processing taking weeks instead of days</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-500">Complex data overwhelming users and causing errors</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-500">No automated risk assessment or reporting</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-500">Poor mobile experience for busy investors</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-500">Lack of real-time portfolio tracking and insights</span>
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
                  The AI-Enhanced Solution
                </h2>
                <p className="text-xl text-neutral-500 max-w-4xl mx-auto leading-relaxed mb-12">
                  I designed an intelligent loan management platform with AI-powered risk assessment, automated reporting, and intuitive data visualization 
                  that transforms complex financial data into actionable insights.
                </p>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              >
                {keyFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="glass-card p-6"
                    >
                      <IconComponent className="h-12 w-12 text-blue-vibrant mb-4" />
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
                      <p className="text-neutral-500 text-sm leading-relaxed">{feature.description}</p>
                    </motion.div>
                  );
                })}
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
                  Design Process
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
                  Measurable Results
                </h2>
                <p className="text-xl text-neutral-500 max-w-4xl mx-auto leading-relaxed">
                  The AI-enhanced platform delivered significant improvements in processing efficiency and user satisfaction within 12 weeks.
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
                  "Hiram transformed our complex loan management process into an intuitive, AI-powered system that our investors actually enjoy using. 
                  The automated reporting alone has saved us hundreds of hours monthly."
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
                  <div className="text-left">
                    <p className="font-bold text-neutral-900">Jennifer Walsh</p>
                    <p className="text-sm text-neutral-500">CEO, Investor Loan App</p>
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
                  {[
                    "Figma for complex financial interface design",
                    "React for high-performance web application", 
                    "AI risk assessment and analytics tools",
                    "Claude AI for financial data analysis",
                    "Secure API integrations for banking",
                    "Advanced data visualization libraries"
                  ].map((tech, index) => (
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
                  Ready to Transform Complex Processes Into Simple Experiences?
                </h2>
                <p className="text-xl text-neutral-500 mb-8 leading-relaxed">
                  Get a free consultation and discover how AI-enhanced UX can streamline your most challenging workflows.
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

export default InvestorLoanAppCaseStudy;