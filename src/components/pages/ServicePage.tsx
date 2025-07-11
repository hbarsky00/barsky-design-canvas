import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicSeo from '@/components/seo/DynamicSeo';
import { usePageMetadata } from '@/hooks/usePageMetadata';

const ServicePage: React.FC = () => {
  const { metadata, loading } = usePageMetadata('/services');

  const defaultMetadata = {
    title: 'Design Services - AI-Enhanced Product Design',
    description: 'Expert product design services specializing in Gen AI integration, UX research, UI design, and user-centered solutions that drive business growth and user satisfaction.',
    image: undefined as string | undefined
  };

  const pageData = metadata || defaultMetadata;

  return (
    <>
      <DynamicSeo
        type="page"
        title={pageData.title}
        description={pageData.description}
        image={pageData.image}
        path="/services"
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
                {pageData.description}
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