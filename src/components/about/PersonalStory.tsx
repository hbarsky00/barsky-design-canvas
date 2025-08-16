
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
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          About Hiram Barsky
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Product Designer & Gen AI Developer passionate about creating AI-enhanced digital experiences 
          that solve real problems and drive business results.
        </p>
      </div>
      
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Story</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            With over 15 years in product design, I've witnessed the evolution from static websites 
            to dynamic, AI-powered applications. My journey began in traditional UX design, but 
            I've embraced the AI revolution to create more intelligent, adaptive user experiences.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, I specialize in integrating generative AI into digital products, helping businesses 
            leverage cutting-edge technology to enhance user engagement and drive conversions. 
            I believe in the power of AI to make digital experiences more personalized, accessible, 
            and effective.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default PersonalStory;
