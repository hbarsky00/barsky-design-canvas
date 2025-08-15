import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Target, 
  TrendingUp, 
  Users, 
  ArrowRight,
  Calendar,
  Clock
} from 'lucide-react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LinkedInVisitors = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Simulate a successful submission
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      alert('Thank you for signing up!');
    }, 2000);
  };

  return (
    <>
      <SEO
        title="Unlock Your LinkedIn Potential - Free Lead Generation Guide"
        description="Download our free guide to attract more LinkedIn visitors and generate high-quality leads. Proven strategies to boost your profile and network effectively."
        image="/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
        type="website"
        url="https://barskydesign.pro/linkedin-visitors"
      />
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow pt-20">
          <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="flex justify-center mb-6">
                  <Users className="h-16 w-16 text-blue-vibrant" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                  Attract More LinkedIn Visitors
                </h1>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed mb-8">
                  Download our free guide to generate high-quality leads and boost your LinkedIn presence.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-card-elevated p-8 mb-16 border-l-4 border-blue-vibrant"
              >
                <div className="flex items-start gap-4">
                  <Target className="h-8 w-8 text-blue-vibrant flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Unlock Your LinkedIn Potential</h3>
                    <p className="text-neutral-500 mb-4">
                      Learn proven strategies to optimize your profile, engage with your network, and attract more visitors.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="shadow-sm focus:ring-blue-vibrant focus:border-blue-vibrant block w-full sm:w-auto rounded-md border-gray-300"
                          required
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-vibrant text-white hover:bg-blue-600 py-2 px-4"
                          disabled={submitted}
                        >
                          {submitted ? (
                            <>
                              Submitting...
                              <Clock className="ml-2 h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              Download Free Guide
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

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
                  What You'll Learn
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="glass-card p-6 flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-blue-vibrant flex-shrink-0 mt-1" />
                  <span className="text-neutral-500">Optimize your LinkedIn profile for maximum visibility</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="glass-card p-6 flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-blue-vibrant flex-shrink-0 mt-1" />
                  <span className="text-neutral-500">Engage with your network to build meaningful connections</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="glass-card p-6 flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-blue-vibrant flex-shrink-0 mt-1" />
                  <span className="text-neutral-500">Attract high-quality leads with targeted content</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="glass-card p-6 flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-blue-vibrant flex-shrink-0 mt-1" />
                  <span className="text-neutral-500">Convert visitors into customers with proven strategies</span>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card-elevated p-8"
              >
                <TrendingUp className="h-12 w-12 text-blue-vibrant mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Boost Your LinkedIn Presence Today
                </h2>
                <p className="text-xl text-neutral-500 leading-relaxed">
                  Download our free guide and start attracting more LinkedIn visitors and generating high-quality leads.
                </p>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LinkedInVisitors;
