
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";
import HeroSkillsTags from "./HeroSkillsTags";
import HeroActionButtons from "./HeroActionButtons";
import HeroSocialLinks from "./HeroSocialLinks";
import HeroVisualElements from "./HeroVisualElements";

const EnhancedHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-16">
      <HeroBackground />
      <HeroVisualElements />
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 z-10">
        <div className="w-full text-center">
          
          {/* Enhanced Glass Container with minimal padding */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="glass-card-elevated p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 layered-depth max-w-6xl mx-auto relative overflow-hidden"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 animate-pulse opacity-50" />
            
            <HeroHeading isVisible={isVisible} />
            <HeroDescription isVisible={isVisible} />
            <HeroSkillsTags isVisible={isVisible} />
            <HeroActionButtons isVisible={isVisible} />
            <HeroSocialLinks isVisible={isVisible} />
          </motion.div>

          {/* Scroll indicator with minimal margin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-4 flex flex-col items-center"
          >
            <p className="text-sm text-gray-500 mb-2">Discover our work</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
