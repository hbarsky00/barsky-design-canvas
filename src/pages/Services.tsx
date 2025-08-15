
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Brain, Target, BarChart3, Zap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Services = () => {
  usePageIndexing();

  const services = [
    {
      icon: <Target className="h-6 w-6 text-blue-vibrant" />,
      title: "UX Audits (2-Week Sprint)",
      description: "Find the 10 changes that unlock conversion and retention across web or app."
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-vibrant" />,
      title: "MVP Design (0→1)",
      description: "Scope, wireframe, and ship a testable MVP with developer-ready files."
    },
    {
      icon: <Settings className="h-6 w-6 text-orange-vibrant" />,
      title: "Design Systems in Figma",
      description: "Reusable components, tokens, and docs that speed builds and prevent drift."
    },
    {
      icon: <Brain className="h-6 w-6 text-blue-vibrant" />,
      title: "AI-Assisted Discovery",
      description: "Rapid user insights using JTBD + AI to reduce research time by 50%+."
    },
    {
      icon: <Users className="h-6 w-6 text-purple-vibrant" />,
      title: "Enterprise Workflow Redesign",
      description: "Simplify complex, compliance-heavy processes without breaking controls."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-orange-vibrant" />,
      title: "Analytics & Experimentation",
      description: "Instrument key flows and run evidence-based improvements, not guesses."
    }
  ];

  const caseStudies = [
    {
      id: "herbalink",
      title: "AI symptom tracking plus a certified-herbalist marketplace. Personalized matches, instant availability, and a frictionless booking flow.",
      metric: "+3× Bookings",
      tags: ["#HealthTech", "#Marketplace", "#AI-Driven Matching"],
      image: "/lovable-uploads/76e9e0a1-af7f-4588-b47e-b71433a25b12.png",
      link: "/project/herbalink"
    },
    {
      id: "splittime",
      title: "Shared calendars, neutral messaging, and reminders that remove friction from co-parenting.",
      metric: "−40% Conflict",
      tags: ["#Family Tech", "#iOS→Android", "#Legal UX"],
      image: "/lovable-uploads/24e4c9dc-e7c4-4d46-b8a3-f85afaef9b77.png",
      link: "/project/splittime"
    },
    {
      id: "business-ops",
      title: "One dashboard for dispatch, inventory, and reporting; removes duplicate entry and clarifies daily priorities.",
      metric: "−68% Errors",
      tags: ["#Enterprise", "#Analytics", "#Dashboard"],
      image: "/lovable-uploads/4d0f57b5-653d-42fb-88c0-f942d18a6a84.png",
      link: "/project/investor-loan-app"
    },
    {
      id: "investment",
      title: "Goal-based onboarding, tutorials, and real-time insights that keep first-time investors engaged.",
      metric: "+23% Engagement",
      tags: ["#Finance", "#Analytics", "#Tutorial"],
      image: "/lovable-uploads/4d0f57b5-653d-42fb-88c0-f942d18a6a84.png",
      link: "/project/investor-loan-app"
    }
  ];

  const workSteps = [
    {
      number: "1",
      title: "Diagnose",
      description: "Quick audit + interviews to find the highest-leverage problems."
    },
    {
      number: "2",
      title: "Design & Test",
      description: "Prototype, validate, and iterate with real users."
    },
    {
      number: "3",
      title: "Deliver",
      description: "Developer-ready Figma, acceptance criteria, and rollout support."
    }
  ];

  const packages = [
    {
      title: "Audit Sprint (2 weeks)",
      features: [
        "Heuristic + analytics + 3 user sessions",
        "Prioritized fixes and ROI estimate",
        "Quick wins shipped immediately"
      ]
    },
    {
      title: "MVP Accelerator (4–6 weeks)",
      features: [
        "Scope → wireframes → high-fidelity UI",
        "Design system starter + tokens",
        "Dev handoff with acceptance criteria"
      ]
    },
    {
      title: "Scale & Systemize (ongoing)",
      features: [
        "Design system governance",
        "Experiment roadmap",
        "Monthly insight reports"
      ]
    }
  ];

  return (
    <>
      <DynamicSeo 
        type="service"
        title="UX Design That Drives Measurable Business Results"
        description="AI-enhanced product design services that deliver proven ROI. From UX audits to MVP design and enterprise workflows. Book a free consultation."
        serviceName="UX Design Services"
        benefits={["AI-Enhanced Research", "Proven ROI", "Fast Results"]}
        targetAudience="Startups and Enterprises"
        path="/services"
      />
      
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                  UX Design That Drives Measurable Business Results
                </h1>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed mb-8">
                  I design revenue-generating products using AI-enhanced research and fast experimentation. 
                  Proven outcomes across health, finance, and family tech.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button asChild variant="brand" size="lg" className="font-medium">
                    <a href="https://calendly.com/barskyuxdesignservices/30min" target="_blank" rel="noopener noreferrer">
                      Book a 30-min Intro
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="font-medium">
                    <a href="#case-studies">
                      See Case Studies
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>

                {/* Proof Bar */}
                <div className="glass-card p-4 max-w-5xl mx-auto">
                  <p className="text-sm font-medium text-neutral-600">
                    <span className="text-success-green font-semibold">Recent Wins:</span> 3× more bookings (HealthTech) • 68% fewer errors (Enterprise) • 23% higher engagement (Finance) • 40% less conflict (Family Tech)
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                  Services That Move the Needle
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <a href="#contact" className="text-blue-accent hover:text-blue-vibrant text-sm font-medium">
                      Learn more →
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Case Studies */}
          <section id="case-studies" className="py-16 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                  Proven Results Across Industries
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {caseStudies.map((study, index) => (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card-elevated overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 mb-4">
                      <img 
                        src={study.image} 
                        alt={`${study.id} case study`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {study.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs px-2 py-1 bg-blue-50 text-blue-accent rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-neutral-600 mb-4 leading-relaxed">
                        {study.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-green/10 text-success-green">
                          {study.metric}
                        </span>
                        <Link to={study.link} className="text-blue-accent hover:text-blue-vibrant font-medium text-sm">
                          View Case Study →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link to="/work" className="text-blue-accent hover:text-blue-vibrant font-semibold">
                  View all case studies →
                </Link>
              </div>
            </div>
          </section>

          {/* How I Work */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                  How I Work
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {workSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-blue-accent text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Packages */}
          <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                  Ways to Work Together
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                      {pkg.title}
                    </h3>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-success-green mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button asChild variant="brand" size="lg">
                  <a href="https://calendly.com/barskyuxdesignservices/30min" target="_blank" rel="noopener noreferrer">
                    Book a 30-min Intro
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* Social Proof */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card-elevated p-8"
              >
                <blockquote className="text-xl text-neutral-600 italic mb-6">
                  "Hiram translated complex workflows into a product our teams actually enjoy using—and he proved the impact with data."
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
                  <div className="text-left">
                    <p className="font-semibold text-neutral-900">Sarah Chen</p>
                    <p className="text-sm text-neutral-500">Product Director, Enterprise SaaS</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 bg-gradient-to-br from-blue-50 to-neutral-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Ready to turn UX into business outcomes?
                </h2>
                <Button asChild variant="brand" size="lg" className="font-semibold">
                  <a href="https://calendly.com/barskyuxdesignservices/30min" target="_blank" rel="noopener noreferrer">
                    Book a 30-min Intro
                  </a>
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

export default Services;
