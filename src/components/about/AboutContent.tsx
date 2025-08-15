
import React from 'react';
import { motion } from 'framer-motion';

const AboutContent: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-lg text-gray-600 mb-8">
            With over a decade of experience in product design and development, I specialize in creating 
            user-centered digital experiences that leverage the power of AI and modern technology.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Approach</h2>
          <p className="text-gray-600 mb-8">
            I believe in combining thoughtful design with cutting-edge technology to create solutions 
            that are both beautiful and functional. My work focuses on understanding user needs and 
            translating them into intuitive, accessible experiences.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Expertise</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Product Design & UX Strategy</li>
            <li>AI Integration & Gen AI Development</li>
            <li>User Research & Testing</li>
            <li>Design Systems & Accessibility</li>
            <li>Web & Mobile Application Design</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutContent;
