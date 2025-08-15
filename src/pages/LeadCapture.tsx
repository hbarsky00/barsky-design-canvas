import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LeadCapture = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // such as sending the email to a backend service.
    console.log('Email submitted:', email);
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Unlock Exclusive Insights"
        description="Sign up to receive the latest trends, tips, and strategies."
        image="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
        type="website"
        url="https://barskydesign.pro/lead-capture"
      />
      
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        <main className="flex-grow pt-20">
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <Target className="h-16 w-16 text-blue-vibrant mx-auto mb-6" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                  Stay Ahead of the Curve
                </h1>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
                  Join our newsletter to receive exclusive insights, early access to new features, and special offers.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-card-elevated p-8"
              >
                {submitted ? (
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-success-green mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                      Thank You!
                    </h2>
                    <p className="text-neutral-500">
                      You've successfully subscribed to our newsletter.
                      Expect exciting updates and valuable content soon!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                        Email Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          id="email"
                          className="shadow-sm focus:ring-blue-vibrant focus:border-blue-vibrant block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Button type="submit" className="w-full">
                        Subscribe
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </section>

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
                  What You'll Get
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="glass-card p-6 flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-success-green flex-shrink-0 mt-1" />
                  <span className="text-neutral-500">Exclusive insights and industry trends</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="glass-card p-6 flex items-start gap-3"
                >
                  <TrendingUp className="h-6 w-6 text-blue-vibrant flex-shrink-0 mt-1" />
                  <span className="text-neutral-500">Early access to new features and products</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="glass-card p-6 flex items-start gap-3"
                >
                  <Target className="h-6 w-6 text-orange-vibrant flex-shrink-0 mt-1" />
                  <span className="text-neutral-500">Special offers and discounts</span>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LeadCapture;
