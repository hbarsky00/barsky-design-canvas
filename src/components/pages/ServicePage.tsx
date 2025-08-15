
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/seo/SEO';

const ServicePage: React.FC = () => {
  const defaultMetadata = {
    title: 'Design Services - AI-Enhanced Product Design',
    description: 'Expert product design services specializing in Gen AI integration, UX research, UI design, and user-centered solutions that drive business growth and user satisfaction.',
    image: 'https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png'
  };

  return (
    <>
      <SEO
        type="service"
        title={defaultMetadata.title}
        description={defaultMetadata.description}
        url="https://barskydesign.pro/services"
        image={defaultMetadata.image}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Design Services
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {defaultMetadata.description}
              </p>
            </motion.div>

            {/* Services content would go here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service cards would be rendered here */}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ServicePage;
