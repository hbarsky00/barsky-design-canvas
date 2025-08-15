
import React from 'react';
import { motion } from 'framer-motion';

const AboutHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            About Hiram Barsky
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Product Designer & Gen AI Developer specializing in user-centered design and AI integration
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
