import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Target, Zap, Trophy, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Services = () => {
  const servicesOffered = [
    {
      title: "AI-Enhanced Redesign",
      description: "Transform your digital presence with AI-powered redesign. Achieve measurable ROI and stay ahead of the curve.",
      price: "$18,500",
      timeline: "10-12 weeks",
      link: "/services/ai-redesign",
      icon: Trophy,
      benefits: ["Complete digital transformation", "AI integration", "90-day support"],
      caseStudy: "Investor Loan App"
    },
    {
      title: "Conversion Optimization Audit",
      description: "Double your conversions in 7 days with our comprehensive UX audit. Strategic improvements for immediate impact.",
      price: "$2,500",
      timeline: "7 days",
      link: "/services/conversion-audit",
      icon: TrendingUp,
      benefits: ["40% conversion rate improvement", "7-day delivery", "AI-enhanced analysis"],
      caseStudy: "Splittime"
    },
    {
      title: "MVP Validation Package",
      description: "Validate your startup MVP in 3 weeks with our launch-ready design package. AI-powered research for rapid market entry.",
      price: "$8,500",
      timeline: "3 weeks",
      link: "/services/mvp-validation",
      icon: Zap,
      benefits: ["40% better engagement guarantee", "3-week delivery", "AI-powered research"],
      caseStudy: "Herbalink"
    }
  ];

  return (
    <>
      <SEO
        title="Design Services - AI-Enhanced Product Design"
        description="Expert product design services specializing in Gen AI integration, UX research, UI design, and user-centered solutions that drive business growth and user satisfaction."
        image="/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
        type="website"
        url="https://barskydesign.pro/services"
      />
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="flex justify-center mb-6">
                  <Target className="h-16 w-16 text-blue-vibrant" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                  Design Services
                </h1>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
                  Expert product design services specializing in Gen AI integration, UX research, UI design, and user-centered solutions that drive business growth and user satisfaction.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Services Offered Section */}
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
                  Our Services
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesOffered.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <service.icon className="h-8 w-8 text-blue-vibrant" />
                      <h3 className="text-xl font-bold text-neutral-900">{service.title}</h3>
                    </div>
                    <p className="text-neutral-500 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm font-medium text-neutral-500">Price:</span>
                        <span className="text-lg font-bold text-neutral-900">{service.price}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-neutral-500">Timeline:</span>
                        <span className="text-lg font-bold text-neutral-900">{service.timeline}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-neutral-500">
                          <CheckCircle className="h-4 w-4 text-success-green" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-neutral-500">Case Study:</span>
                        <span className="text-blue-accent font-semibold">{service.caseStudy}</span>
                      </div>
                      <Link to={service.link}>
                        <Button size="sm" className="group">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Ready to Elevate Your Product?
                </h2>
                <p className="text-xl text-neutral-500 mb-8">
                  Let's discuss how our design services can transform your business and create exceptional user experiences.
                </p>
                <Button 
                  className="bg-blue-vibrant hover:bg-blue-accent text-white font-semibold py-4 px-8 text-lg group"
                  onClick={() => window.location.href = '/contact'}
                >
                  Book Free Consultation
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

export default Services;
