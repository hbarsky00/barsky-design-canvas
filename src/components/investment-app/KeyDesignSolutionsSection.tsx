
import React from "react";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";

const KeyDesignSolutionsSection: React.FC = () => {
  const { maximizeImage } = useImageMaximizer();

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
            Key Design Solutions
          </h2>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive approach to building trust, education, and streamlined user experience 
            in the investment learning platform.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full"
        >
          <figure className="project-image-container">
            <img 
              src="/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png" 
              alt="Investment app key design solutions showing educational transparency, simplified interface design, risk management guidance, and progressive learning experience" 
              className="w-full rounded-3xl shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              onClick={() => maximizeImage("/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png", "Comprehensive design solutions for the investment learning platform")}
            />
            <figcaption className="text-sm text-neutral-600 italic mt-2 text-center">
              Comprehensive design solutions for the investment learning platform
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </div>
  );
};

export default KeyDesignSolutionsSection;
