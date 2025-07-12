import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, TrendingUp, Users, Clock, DollarSign, Rocket, Target, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";
import { Helmet } from "react-helmet-async";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Services = () => {
  usePageIndexing();

  const servicePackages = [
    {
      id: "mvp-validation",
      icon: <Rocket className="h-12 w-12 text-blue-vibrant" />,
      title: "MVP Validation Package",
      price: "$8,500",
      timeline: "3 weeks",
      bestFor: "Funded startups needing rapid market validation",
      description: "From Idea to Launch-Ready Design in 3 Weeks",
      features: [
        "AI-powered competitive analysis using Claude AI",
        "User persona development with ChatGPT data synthesis",
        "Strategic wireframing & user journey optimization",
        "High-fidelity design system creation",
        "Interactive prototype development",
        "Developer handoff documentation",
        "30-day post-launch support"
      ],
      guarantee: "40% better engagement than industry benchmarks or free redesign",
      exampleResult: "Similar to how I helped Herbalink achieve 65% engagement increase through intelligent matching algorithms",
      caseStudyLink: "/case-study-herbalink"
    },
    {
      id: "conversion-audit",
      icon: <Target className="h-12 w-12 text-orange-vibrant" />,
      title: "Conversion Optimization Audit",
      price: "$2,500",
      timeline: "7 days",
      bestFor: "Existing products underperforming expectations",
      description: "Discover How to Double Your Conversions in 7 Days",
      features: [
        "AI-enhanced user behavior analysis",
        "Conversion funnel breakdown with bottlenecks identified",
        "Accessibility audit (WCAG 2.1 compliance)",
        "Mobile responsiveness and performance analysis",
        "25-page detailed report with actionable recommendations",
        "1-hour strategy call to review findings",
        "30-day email support for implementation"
      ],
      guarantee: "Average 40% conversion rate improvement within 60 days",
      exampleResult: "Using the same methodology that helped Splittime reduce user onboarding time by 50%",
      caseStudyLink: "/case-study-splittime"
    },
    {
      id: "ai-redesign",
      icon: <Trophy className="h-12 w-12 text-purple-vibrant" />,
      title: "AI-Enhanced Redesign",
      price: "$18,500",
      timeline: "10-12 weeks",
      bestFor: "Enterprises ready to dominate their market",
      description: "Complete Digital Transformation with Measurable ROI",
      features: [
        "Complete UX research with AI-powered user insights",
        "Strategic redesign with conversion optimization focus",
        "AI integration (ChatGPT/Claude interfaces where applicable)",
        "Comprehensive design system creation",
        "React/Vue.js development collaboration",
        "Accessibility-first design (WCAG 2.1 compliant)",
        "90-day ongoing optimization and support"
      ],
      guarantee: "Complete digital transformation with measurable ROI",
      exampleResult: "Similar to the Investor Loan App project where I achieved 70% faster processing through AI-enhanced automation",
      caseStudyLink: "/case-study-investor-loan-app"
    }
  ];

  const caseStudies = [
    {
      title: "Herbalink (Healthcare)",
      results: ["65% increase in user engagement", "45% faster consultation booking", "Mobile-first platform with AI matching"],
      link: "/case-study-herbalink"
    },
    {
      title: "Splittime (Family Tech)",
      results: ["50% reduction in onboarding time", "40% fewer support tickets", "Conflict-reduction through design"],
      link: "/case-study-splittime"
    },
    {
      title: "Investor Loan App (FinTech)",
      results: ["70% faster loan processing", "35% improvement in retention", "AI-powered risk assessment"],
      link: "/case-study-investor-loan-app"
    }
  ];

  const testimonials = [
    {
      quote: "Hiram's AI-enhanced research revealed user pain points we never considered. The redesign not only looked amazing but converted 45% better than our old site. The intelligent matching system has become our biggest competitive advantage.",
      author: "Sarah Chen",
      title: "Founder, Herbalink",
      rating: 5
    },
    {
      quote: "Hiram understood the emotional complexity of co-parenting and designed an app that actually reduces stress instead of adding to it. The AI-powered conflict prevention has been a game-changer for our families.",
      author: "Mike Rodriguez",
      title: "CTO, Splittime",
      rating: 5
    },
    {
      quote: "Hiram transformed our complex loan management process into an intuitive, AI-powered system that our investors actually enjoy using. The automated reporting alone has saved us hundreds of hours monthly.",
      author: "Jennifer Walsh",
      title: "CEO, Investor Loan App",
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://barskydesign.pro/services" />
      </Helmet>
      <DynamicSeo 
        type="service"
        title="Design Systems That Teams Actually Use"
        description="Stop building design systems that die in Figma. Get scalable, AI-powered systems that accelerate development and maintain consistency."
        serviceName="UX Design Services"
        benefits={["40-70% improvement guarantee", "AI-enhanced research", "Proven results"]}
        targetAudience="Startups and Enterprises"
        path="/services"
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
                  UX Design Services That Deliver Measurable Results
                </h1>
                <p className="text-xl text-neutral-500 max-w-4xl mx-auto leading-relaxed mb-8">
                  I don't just design pretty interfaces - I build revenue-generating experiences using AI-enhanced UX research. 
                  Proven results across healthcare, fintech, and family tech.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <Link 
                    to="/case-study-herbalink"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    View HerbaLink Case Study
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    to="/case-study-splittime"
                    className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    View SplitTime Case Study
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Results Banner */}
                <div className="glass-card p-6 max-w-5xl mx-auto mt-8">
                  <p className="text-lg font-semibold text-neutral-900">
                    <span className="text-success-green">Proven Track Record:</span> 70% faster processing (FinTech) • 65% engagement increase (Healthcare) • 50% faster onboarding (Family Tech)
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-xl text-neutral-500 leading-relaxed mb-12">
                  While other designers guess what users want, I use AI-powered research to know exactly what drives conversions. 
                  Every project is backed by data, optimized for accessibility, and guaranteed to improve your bottom line.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="glass-card p-6">
                    <h3 className="font-bold text-neutral-900 mb-2">Herbalink</h3>
                    <p className="text-success-green font-semibold">65% increase in user engagement</p>
                  </div>
                  <div className="glass-card p-6">
                    <h3 className="font-bold text-neutral-900 mb-2">Splittime</h3>
                    <p className="text-success-green font-semibold">50% reduction in onboarding time</p>
                  </div>
                  <div className="glass-card p-6">
                    <h3 className="font-bold text-neutral-900 mb-2">Investor Loan App</h3>
                    <p className="text-success-green font-semibold">70% faster loan processing</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Service Packages Section */}
          <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Choose Your Revenue Growth Path
                </h2>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
                  Three proven packages designed to accelerate your business growth through AI-enhanced UX design.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8">
                {servicePackages.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="glass-card-elevated p-8 relative hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Icon and Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        {service.icon}
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-success-green" />
                          <span className="text-2xl font-bold text-neutral-900">{service.price}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">{service.title}</h3>
                      <p className="text-neutral-500 mb-4">{service.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-blue-accent bg-blue-50 px-3 py-2 rounded-lg mb-4">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">{service.timeline}</span>
                      </div>

                      <p className="text-sm text-neutral-500 mb-4">
                        <strong>Best for:</strong> {service.bestFor}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="mb-6">
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-success-green mt-0.5 flex-shrink-0" />
                            <span className="text-neutral-500 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Success Example */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-accent">
                      <p className="text-sm text-neutral-600 mb-2">
                        <strong>Success Example:</strong>
                      </p>
                      <p className="text-sm text-neutral-500">{service.exampleResult}</p>
                      <Link to={service.caseStudyLink} className="text-blue-accent hover:text-blue-vibrant text-sm font-medium">
                        Read Full Case Study →
                      </Link>
                    </div>

                    {/* Guarantee */}
                    <div className="mb-6 p-4 bg-success-green/10 rounded-lg">
                      <p className="text-sm font-semibold text-success-green mb-1">Guarantee:</p>
                      <p className="text-sm text-neutral-600">{service.guarantee}</p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <Button 
                        variant="default" 
                        className="w-full group mb-3"
                        size="lg"
                        onClick={() => window.location.href = '/free-audit'}
                      >
                        <span>Get Started</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Link to={service.caseStudyLink} className="block text-center text-blue-accent hover:text-blue-vibrant text-sm font-medium">
                        View Related Case Study
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Case Studies Preview Section */}
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
                  Proven Results Across Industries
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {caseStudies.map((study, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">{study.title}</h3>
                    <ul className="space-y-2 mb-6">
                      {study.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-success-green rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-500 text-sm">{result}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={study.link} className="text-blue-accent hover:text-blue-vibrant font-semibold">
                      Read Full Case Study →
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
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
                  What Clients Say
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="glass-card-elevated p-6"
                  >
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-neutral-500 mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-200 rounded-full"></div>
                      <div>
                        <p className="font-bold text-neutral-900">{testimonial.author}</p>
                        <p className="text-sm text-neutral-500">{testimonial.title}</p>
                      </div>
                    </div>
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
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  40-70% Improvement Guarantee
                </h2>
                <p className="text-xl text-neutral-500 leading-relaxed">
                  I'm so confident in my AI-enhanced approach that I guarantee measurable improvements. Based on proven results 
                  like Herbalink's 65% engagement increase and Investor Loan App's 70% processing improvement, 
                  I'll work for free until you see results.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Bottom CTA Section */}
          <section className="py-16 bg-gradient-to-br from-blue-50 to-neutral-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Ready to Join My Success Stories?
                </h2>
                <p className="text-xl text-neutral-500 mb-8 leading-relaxed">
                  Book a free consultation and I'll show you exactly how to achieve similar results for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-blue-vibrant hover:bg-blue-accent focus:bg-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-vibrant focus:ring-offset-2 text-white font-semibold py-4 px-8 text-lg group transition-all duration-200"
                    onClick={() => window.location.href = '/free-audit'}
                  >
                    Get Your Free Audit
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Link to="/projects">
                    <Button 
                      variant="outline" 
                      className="py-4 px-8 text-lg focus:outline-none focus:ring-2 focus:ring-blue-vibrant focus:ring-offset-2 transition-all duration-200"
                    >
                      View All Case Studies
                    </Button>
                  </Link>
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

export default Services;