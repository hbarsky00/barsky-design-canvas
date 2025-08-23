import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ServicePageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const ServicePage: React.FC<ServicePageProps> = ({ title, description, children }) => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8 lg:p-12">
                <header className="mb-8">
                  <h1 className="heading-section lg:text-4xl text-gray-900 mb-4">
                    {title}
                  </h1>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {description}
                  </p>
                </header>
                
                <div className="prose prose-lg max-w-none">
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ServicePage;
