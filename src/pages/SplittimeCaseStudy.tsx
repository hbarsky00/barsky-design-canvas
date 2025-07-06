import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, TrendingUp, Users, Clock, Smartphone, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";

const SplittimeCaseStudy: React.FC = () => {
  const results = [
    { metric: "50%", label: "Reduction in Onboarding Time", icon: <Clock className="h-6 w-6" /> },
    { metric: "40%", label: "Fewer Support Tickets", icon: <CheckCircle className="h-6 w-6" /> },
    { metric: "65%", label: "Improvement in Completion Rates", icon: <TrendingUp className="h-6 w-6" /> },
    { metric: "35%", label: "Reduction in Communication Conflicts", icon: <Heart className="h-6 w-6" /> }
  ];

  const keyFeatures = [
    {
      title: "Streamlined Onboarding",
      description: "Progressive disclosure reduces cognitive load with smart defaults based on custody arrangements, visual progress indicators, and skip-ahead options for experienced users.",
      icon: TrendingUp
    },
    {
      title: "AI-Powered Conflict Prevention", 
      description: "Communication tone analysis, smart scheduling that avoids conflict times, automatic neutral language recommendations, and escalation prevention through design.",
      icon: Shield
    },
    {
      title: "Intuitive Calendar Management",
      description: "Drag-and-drop scheduling with conflict detection, automatic notifications, integration with existing calendar systems, and child-focused event prioritization.",
      icon: Clock  
    },
    {
      title: "Stress-Reducing Design",
      description: "Calming color palette, clear visual hierarchy reducing decision fatigue, positive reinforcement, and emergency contact resources.",
      icon: Heart
    }
  ];

  const processSteps = [
    {
      week: "Week 1-2",
      title: "Discovery & Sensitive User Research",
      description: "Conducted interviews with divorced/separated parents and AI-powered analysis of co-parenting communication patterns to identify emotional stress points."
    },
    {
      week: "Week 3-4", 
      title: "Strategic Planning & Information Architecture",
      description: "Developed simplified user flows with conflict reduction focus, progressive onboarding strategy, and communication features with tone analysis."
    },
    {
      week: "Week 5-7",
      title: "Visual Design & Prototyping", 
      description: "Created calming, stress-reducing visual design system with interactive prototypes featuring smart scheduling and mobile-first accessibility optimization."
    },
    {
      week: "Week 8-10",
      title: "Testing & Conflict Prevention Optimization",
      description: "Conducted usability testing with real co-parenting families and implemented AI-powered communication analysis with stress-testing of conflict scenarios."
    }
  ];

  return (
    <>
      <EnhancedGlobalSeo 
        title="Case Study: How Splittime Reduced User Onboarding Time 50% With AI-Enhanced UX"
        description="See how AI-enhanced UX design helped Splittime reduce user onboarding by 50% and decrease support tickets by 40%. Real results from Barsky Design."
        canonicalUrl="https://barskydesign.pro/case-study-splittime"
        pageType="content"
        keywords={[
          "Splittime case study", "AI-enhanced UX design", "co-parenting app UX", "family tech design",
          "communication platform design", "conflict reduction UX", "family coordination app"
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
                  Splittime: 50% Faster Onboarding Through AI-Enhanced Co-Parenting UX
                </h1>
                <p className="text-xl text-neutral-500 max-w-4xl mx-auto leading-relaxed">
                  How intelligent coordination features and conflict-reduction design transformed family communication
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
                    <p className="text-neutral-500">Splittime</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Industry</h3>
                    <p className="text-neutral-500">Family Tech/Communication</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Timeline</h3>
                    <p className="text-neutral-500">10 weeks</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Results</h3>
                    <p className="text-neutral-500">50% faster onboarding</p>
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
                      Splittime needed to create a co-parenting coordination app that would reduce conflict and improve communication between separated parents. 
                      The existing user flow was complicated, leading to user frustration and high abandonment rates during onboarding.
                    </p>
                    <div className="glass-card p-6 text-left">
                      <h3 className="font-bold text-neutral-900 mb-4">Key Problems:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-500">Complex onboarding process causing 60% user drop-off</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-500">Confusing interface leading to miscommunication</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-500">High emotional stress during app usage</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-500">Frequent support tickets from confused users</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-vibrant rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-500">No intelligent conflict prevention features</span>
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
                  I designed an intuitive co-parenting platform with AI-powered conflict detection and smart scheduling features 
                  that automatically reduce friction points between parents.
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
                  The AI-enhanced redesign delivered significant improvements in user experience and family communication within 10 weeks.
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
                  "Hiram understood the emotional complexity of co-parenting and designed an app that actually reduces stress instead of adding to it. 
                  The AI-powered conflict prevention has been a game-changer for our families."
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
                  <div className="text-left">
                    <p className="font-bold text-neutral-900">Mike Rodriguez</p>
                    <p className="text-sm text-neutral-500">CTO, Splittime</p>
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
                    "Figma for sensitive user experience design",
                    "React for responsive web application", 
                    "AI communication analysis tools",
                    "Claude AI for user research synthesis",
                    "Calendar API integrations",
                    "Accessibility-first design principles"
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
                  Ready to Create User Experiences That Reduce Friction?
                </h2>
                <p className="text-xl text-neutral-500 mb-8 leading-relaxed">
                  Get a free consultation and discover how AI-enhanced UX can solve your most complex user challenges.
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

export default SplittimeCaseStudy;