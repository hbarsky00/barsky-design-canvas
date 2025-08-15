
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Users, TrendingUp, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/contact/ContactForm';
import SEO from '@/components/seo/SEO';

const FreeAudit = () => {
  const benefits = [
    {
      icon: Target,
      title: "Conversion Rate Analysis",
      description: "Identify exactly what's preventing visitors from becoming customers"
    },
    {
      icon: Users,
      title: "User Experience Review",
      description: "Pinpoint friction points in your user journey"
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Discover untapped potential for business growth"
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Get actionable insights within 48 hours"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        type="service"
        title="Free UX Audit - Boost Your Conversion Rate by 40%+"
        description="Get a comprehensive UX audit that reveals exactly how to increase conversions. Free analysis of your website's user experience and conversion barriers."
        url="https://barskydesign.pro/free-audit"
      />
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Free UX Audit
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover exactly how to <strong>boost your conversion rate by 40%+</strong> with a comprehensive analysis of your website's user experience.
              </p>
              <div className="flex items-center justify-center gap-4 text-green-600 mb-8">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">100% Free • No Strings Attached • 48 Hour Delivery</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What You'll Get in Your Free Audit
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <CardHeader>
                      <benefit.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Get Your Free UX Audit
                </h2>
                <p className="text-gray-600">
                  Share your website details and I'll send you a comprehensive audit within 48 hours.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FreeAudit;
