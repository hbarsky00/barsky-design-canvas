import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, DollarSign, Target, TrendingUp, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";

const ConversionAudit: React.FC = () => {
  const processBreakdown = [
    {
      days: "Day 1-2",
      title: "AI-Enhanced Analysis",
      tasks: [
        "Claude AI-powered user behavior analysis",
        "Conversion funnel breakdown with bottleneck identification",
        "Accessibility audit using automated tools + manual review",
        "Mobile responsiveness and performance assessment"
      ]
    },
    {
      days: "Day 3-4",
      title: "Competitive Intelligence",
      tasks: [
        "AI-enhanced competitor conversion strategy analysis",
        "Industry benchmark comparison and gap analysis",
        "Best practice identification from similar industries",
        "Opportunity mapping for quick wins"
      ]
    },
    {
      days: "Day 5-7",
      title: "Strategic Recommendations",
      tasks: [
        "Prioritized improvement roadmap with ROI projections",
        "Quick-win implementation guide (24-48 hour fixes)",
        "Long-term optimization strategy development",
        "Video walkthrough of findings and recommendations"
      ]
    }
  ];

  const deliverables = [
    "25-page detailed audit report with screenshots and analysis",
    "Video walkthrough of findings (30-45 minutes)",
    "Implementation priority matrix with effort vs. impact",
    "Quick-win checklist for immediate improvements",
    "1-hour strategy call to review recommendations",
    "30-day email support for implementation questions"
  ];

  const perfectFor = [
    "Existing products with traffic but poor conversion",
    "E-commerce sites underperforming industry benchmarks", 
    "SaaS platforms with high user drop-off rates",
    "Companies needing quick wins before major redesigns"
  ];

  const sampleFindings = [
    "Onboarding flow optimization opportunities",
    "Mobile experience improvements",
    "Accessibility compliance gaps",
    "Conversion funnel bottlenecks",
    "User interface friction points"
  ];

  return (
    <>
      <EnhancedGlobalSeo 
        title="Conversion Optimization Audit - Double Your Conversions in 7 Days"
        description="Get a comprehensive UX audit in 7 days. Same methodology that helped Splittime reduce onboarding time by 50%. $2,500 investment."
        canonicalUrl="https://barskydesign.pro/services/conversion-audit"
        pageType="service"
        keywords={[
          "conversion optimization", "UX audit", "conversion rate optimization", "user behavior analysis",
          "conversion funnel", "website audit", "performance audit", "accessibility audit"
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
                  <Target className="h-16 w-16 text-orange-vibrant" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                  Conversion Optimization Audit
                </h1>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed mb-8">
                  Discover How to Double Your Conversions in 7 Days
                </p>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-success-green/10 px-4 py-2 rounded-lg">
                    <DollarSign className="h-5 w-5 text-success-green" />
                    <span className="text-2xl font-bold text-neutral-900">$2,500</span>
                  </div>
                  <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-vibrant" />
                    <span className="font-medium text-orange-vibrant">7 days</span>
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
                  <TrendingUp className="h-8 w-8 text-success-green flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Success Story</h3>
                    <p className="text-neutral-500 mb-4">
                      Using this methodology, I helped Splittime reduce user onboarding time by 50% 
                      and decrease support tickets by 40% through strategic UX improvements and conflict-reduction design.
                    </p>
                    <Link to="/case-study-splittime" className="text-blue-accent hover:text-blue-vibrant font-semibold">
                      Read Full Splittime Case Study →
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

          {/* 7-Day Process Breakdown */}
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
                  7-Day Process Breakdown
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
                      <div className="w-12 h-12 bg-orange-vibrant text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <span className="text-orange-vibrant font-medium">{phase.days}</span>
                        <h3 className="text-2xl font-bold text-neutral-900">{phase.title}</h3>
                      </div>
                    </div>
                    <ul className="space-y-3 ml-16">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-orange-vibrant rounded-full mt-2 flex-shrink-0"></div>
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

          {/* Sample Findings Section */}
          <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Sample Findings
                </h2>
                <p className="text-xl text-neutral-500">
                  Based on previous audits like Splittime:
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {sampleFindings.map((finding, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="glass-card p-6 flex items-start gap-3"
                  >
                    <BarChart3 className="h-6 w-6 text-orange-vibrant flex-shrink-0 mt-1" />
                    <span className="text-neutral-500">{finding}</span>
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
                <TrendingUp className="h-12 w-12 text-success-green mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Results Guarantee
                </h2>
                <p className="text-xl text-neutral-500 leading-relaxed">
                  If you don't see at least 3 actionable improvements that could increase conversions by 40%+, 
                  I'll refund your investment completely. Average clients see 40% conversion rate improvement within 60 days.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Investment & CTA Section */}
          <section className="py-16 bg-gradient-to-br from-orange-50 to-neutral-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Ready to Double Your Conversions?
                </h2>
                <div className="mb-8">
                  <p className="text-xl text-neutral-500 mb-4">
                    <strong>Timeline:</strong> 7 days from data access
                  </p>
                  <p className="text-xl text-neutral-500 mb-4">
                    <strong>Investment:</strong> $2,500 (immediate ROI expected)
                  </p>
                  <p className="text-xl text-neutral-500">
                    <strong>Includes:</strong> All deliverables + strategy call + 30-day support
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-orange-vibrant hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg group"
                    onClick={() => window.location.href = '/free-audit'}
                  >
                    Get Your Conversion Audit
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="py-4 px-8 text-lg"
                    onClick={() => window.location.href = '/contact'}
                  >
                    See Sample Audit Report
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

export default ConversionAudit;