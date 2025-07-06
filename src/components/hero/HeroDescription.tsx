
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
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-lg mb-6 text-gray-700 font-medium sm:text-xl max-w-4xl mx-auto leading-relaxed"
      >
        15+ years of UX expertise meets cutting-edge AI. I don't just design interfaces—I build intelligent systems that convert visitors into customers and adapt to user behavior over time.
      </motion.p>
      
      {/* Social Proof Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600 mb-4"
      >
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★★★★★</span>
          <span className="font-medium">5.0 Rating</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1 h-1 bg-gray-400 rounded-full hidden sm:block"></span>
          <span className="font-medium">47 Verified Client Results</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1 h-1 bg-gray-400 rounded-full hidden sm:block"></span>
          <span className="font-medium">Based in NYC, Serving Globally</span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroDescription;
