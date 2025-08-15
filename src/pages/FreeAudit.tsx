import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Target, 
  TrendingUp, 
  Users, 
  ArrowRight,
  Calendar,
  Clock,
  Award,
  Zap
} from 'lucide-react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";

const FreeAudit = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Basic email validation
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      setSubmitted(false);
      return;
    }

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    alert('Thank you! We\'ll be in touch soon.');
    setSubmitted(false);
    setEmail('');
  };

  return (
    <>
      <SEO
        title="Free UX Audit - Identify Conversion Opportunities"
        description="Get a free UX audit and discover hidden opportunities to improve your website's conversion rates. See how design impacts your bottom line."
        image="/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
        type="website"
        url="https://barskydesign.pro/free-audit"
      />
      
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
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
                  Get Your Free UX Audit
                </h1>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed mb-8">
                  Discover Hidden Opportunities to Improve Your Website's Conversion Rates
                </p>
              </motion.div>

              {/* Lead Capture Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-card-elevated p-8 mb-16"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                      Your Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        className="shadow-sm focus:ring-blue-vibrant focus:border-blue-vibrant block w-full sm:text-sm border-neutral-300 rounded-md"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-vibrant hover:bg-blue-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-vibrant"
                      disabled={submitted}
                    >
                      {submitted ? (
                        <>
                          Submitting...
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </>
                      ) : (
                        "Get Free Audit"
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </section>

          {/* What You'll Get Section */}
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
                  What You'll Get
                </h2>
                <p className="text-xl text-neutral-500">
                  A comprehensive report highlighting key areas for improvement:
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="glass-card p-6 flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-success-green flex-shrink-0 mt-1" />
                  <span className="text-neutral-500">Conversion Funnel Analysis</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="glass-card p-6 flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-success-green flex-shrink-0 mt-1" />
                  <span className="text-neutral-500">User Experience Review</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="glass-card p-6 flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-success-green flex-shrink-0 mt-1" />
                  <span className="text-neutral-500">Mobile Responsiveness Check</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="glass-card p-6 flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-success-green flex-shrink-0 mt-1" />
                  <span className="text-neutral-500">Performance Audit</span>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Success Stories Section */}
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
                  Real Results
                </h2>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
                  See how UX improvements can transform your business:
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="glass-card p-6"
                >
                  <TrendingUp className="h-8 w-8 text-blue-vibrant mb-4" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">40% Increase in Conversions</h3>
                  <p className="text-neutral-500">
                    By optimizing the checkout process, we helped a client increase their conversion rate by 40%.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="glass-card p-6"
                >
                  <Users className="h-8 w-8 text-blue-vibrant mb-4" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">60% Reduction in Bounce Rate</h3>
                  <p className="text-neutral-500">
                    A website redesign focused on user experience led to a 60% reduction in bounce rate.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="glass-card p-6"
                >
                  <Zap className="h-8 w-8 text-blue-vibrant mb-4" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">30% Faster Load Times</h3>
                  <p className="text-neutral-500">
                    Optimizing images and code resulted in 30% faster load times, improving user satisfaction.
                  </p>
                </motion.div>
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
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  100% Free, No Obligation
                </h2>
                <p className="text-xl text-neutral-500 leading-relaxed">
                  This free audit is designed to provide you with actionable insights. There's no obligation to purchase any services.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-16 bg-gradient-to-br from-blue-50 to-neutral-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card-elevated p-8"
              >
                <Calendar className="h-12 w-12 text-blue-vibrant mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  What to Expect
                </h2>
                <p className="text-xl text-neutral-500 mb-4">
                  <Clock className="inline-block h-6 w-6 mr-2 align-middle text-blue-accent" />
                  <strong>Timeline:</strong> 3-5 business days
                </p>
                <p className="text-xl text-neutral-500">
                  Our team will analyze your website and deliver a detailed report to your inbox.
                </p>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Ready to Uncover Your Website's Potential?
                </h2>
                <p className="text-xl text-neutral-500 mb-8">
                  Enter your email to receive your free UX audit:
                </p>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      id="email"
                      className="shadow-sm focus:ring-blue-vibrant focus:border-blue-vibrant block w-full sm:w-auto sm:flex-grow sm:text-sm border-neutral-300 rounded-md"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-vibrant hover:bg-blue-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-vibrant"
                      disabled={submitted}
                    >
                      {submitted ? (
                        <>
                          Submitting...
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </>
                      ) : (
                        <>
                          Get Free Audit
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FreeAudit;
