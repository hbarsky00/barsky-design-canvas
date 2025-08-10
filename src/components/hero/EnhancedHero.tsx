
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
    <section className="relative min-h-[35vh] flex items-center overflow-hidden pt-2 md:pt-0 pb-6">
      <HeroBackground />
      <HeroVisualElements />
      
      <div className="relative w-full py-4 sm:py-6 lg:py-8 z-10">
        <div className="w-full text-center">
          
          {/* Minimal Glass Container */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="glass-card-elevated p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6 layered-depth w-full relative overflow-hidden"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 animate-pulse opacity-50" />
            
            <HeroHeading isVisible={isVisible} />
            <HeroDescription isVisible={isVisible} />
            <HeroActionButtons isVisible={isVisible} />
            <HeroSocialLinks isVisible={isVisible} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
