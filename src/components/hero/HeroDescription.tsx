
import React from "react";
import { motion } from "framer-motion";

interface HeroDescriptionProps {
  isVisible: boolean;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({
  isVisible
}) => {
  return (
    <div className="relative mb-4">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-lg mb-8 text-gray-700 font-medium sm:text-xl max-w-4xl mx-auto leading-relaxed"
      >
        I help startups and enterprises bridge the gap between traditional UX design and cutting-edge AI integration. 
        While others just make things "look pretty," I create intelligent systems that learn, adapt, and convert—
        delivering measurable ROI for businesses ready to dominate their market.
      </motion.p>
      
      {/* Trust Indicators & Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-gray-600 mb-8"
      >
        <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
          <span className="text-green-600 font-bold">✓</span>
          <span className="font-medium text-green-700">Google UX Certified</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
          <span className="text-blue-600 font-bold">✓</span>
          <span className="font-medium text-blue-700">WCAG 2.1 Certified</span>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
          <span className="text-purple-600 font-bold">✓</span>
          <span className="font-medium text-purple-700">AI Integration Expert</span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroDescription;
