
import React from 'react';
import { motion } from 'framer-motion';

const PersonalStory: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-display">
          About Me (Hiram Barsky)
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Product Designer & Gen AI Developer focused on building AI-powered digital experiences 
          that solve real business problems and deliver results.
        </p>
      </div>
      
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">My Story</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            With 15+ years in product design, I've seen digital products transform—from simple static sites 
            to intelligent, dynamic platforms. My roots are in classic UX, but my passion now is for 
            integrating generative AI to unlock smarter, more adaptive user experiences.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, I help businesses harness AI to boost engagement, conversions, and real-world impact. 
            I believe AI isn't just hype—it's a game-changer for making digital products more personal, 
            accessible, and effective for everyone.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default PersonalStory;
