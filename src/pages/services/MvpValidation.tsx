import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, DollarSign, Rocket, Users, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";

const MvpValidation: React.FC = () => {
  const weeklyBreakdown = [
    {
      week: "Week 1",
      title: "AI-Powered Discovery",
      tasks: [
        "Competitive analysis using Claude AI (saves 2 weeks of manual research)",
        "User persona development with ChatGPT data synthesis",
        "Market opportunity assessment and validation",
        "Technical feasibility review with development team"
      ]
    },
    {
      week: "Week 2",
      title: "Strategic Design",
      tasks: [
        "User journey mapping with conversion optimization",
        "Wireframe creation with accessibility considerations",
        "Information architecture optimization",
        "Initial usability testing setup and execution"
      ]
    },
    {
      week: "Week 3",
      title: "High-Fidelity Execution",
      tasks: [
        "Visual design system creation (like Herbalink's mobile-first approach)",
        "Interactive prototype development",
        "Developer handoff documentation",
        "Launch readiness checklist and optimization recommendations"
      ]
    }
  ];

  const deliverables = [
    "Complete Figma design system with reusable components",
    "Interactive prototype ready for development",
    "AI-generated user insights report (25+ pages)",
    "Technical specifications and developer documentation",
    "Conversion optimization recommendations",
    "30-day post-launch support and consultation calls"
  ];

  const perfectFor = [
    "Funded startups with validated business models",
    "Teams needing rapid market entry",
    "Entrepreneurs with technical co-founders ready to build",
    "Companies requiring investor-ready prototypes"
  ];

  return (
    <>
      <DynamicSeo 
        type="service"
        title="MVP Validation Package - 3 Weeks to Launch-Ready Design"
        description="Get your startup MVP validated and designed in 3 weeks. Same process that helped Herbalink achieve 65% engagement increase. $8,500 investment."
        serviceName="MVP Validation Package"
        benefits={["40% better engagement guarantee", "3-week delivery", "AI-powered research"]}
        targetAudience="Funded Startups"
        path="/services/mvp-validation"
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
                  <Rocket className="h-16 w-16 text-blue-vibrant" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                  MVP Validation Package
                </h1>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed mb-8">
                  From Idea to Launch-Ready Design in 3 Weeks
                </p>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-success-green/10 px-4 py-2 rounded-lg">
                    <DollarSign className="h-5 w-5 text-success-green" />
                    <span className="text-2xl font-bold text-neutral-900">$8,500</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-accent" />
                    <span className="font-medium text-blue-accent">3 weeks</span>
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
                  <Target className="h-8 w-8 text-success-green flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Success Story</h3>
                    <p className="text-neutral-500 mb-4">
                      Using this exact process, I helped Herbalink achieve a 65% increase in user engagement 
                      and 45% faster consultation booking through intelligent matching algorithms and mobile-first design.
                    </p>
                    <Link to="/project/herbalink" className="text-blue-accent hover:text-blue-vibrant font-semibold">
                      Read Full Herbalink Case Study →
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

          {/* Week-by-Week Breakdown */}
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
                  Week-by-Week Breakdown
                </h2>
              </motion.div>

              <div className="space-y-8">
                {weeklyBreakdown.map((week, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="glass-card p-8"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-vibrant text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <span className="text-blue-accent font-medium">{week.week}</span>
                        <h3 className="text-2xl font-bold text-neutral-900">{week.title}</h3>
                      </div>
                    </div>
                    <ul className="space-y-3 ml-16">
                      {week.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
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

          {/* Guarantee Section */}
          <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card-elevated p-8"
              >
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Performance Guarantee
                </h2>
                <p className="text-xl text-neutral-500 leading-relaxed">
                  If your MVP doesn't achieve 40% better engagement than industry benchmarks within 60 days, 
                  I'll redesign it for free. Based on proven results like Herbalink's 65% engagement increase.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Investment & CTA Section */}
          <section className="py-16 bg-gradient-to-br from-blue-50 to-neutral-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Ready to Validate Your MVP?
                </h2>
                <div className="mb-8">
                  <p className="text-xl text-neutral-500 mb-4">
                    <strong>Timeline:</strong> 3 weeks from kickoff
                  </p>
                  <p className="text-xl text-neutral-500 mb-4">
                    <strong>Investment:</strong> $8,500 (payment plan available)
                  </p>
                  <p className="text-xl text-neutral-500">
                    <strong>Includes:</strong> All deliverables + 30-day support
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-blue-vibrant hover:bg-blue-accent text-white font-semibold py-4 px-8 text-lg group"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="py-4 px-8 text-lg"
                    onClick={() => window.location.href = '/free-audit'}
                  >
                    Learn More
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

export default MvpValidation;