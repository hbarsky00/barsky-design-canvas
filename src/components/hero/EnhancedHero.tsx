
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroStatusBadge from "./HeroStatusBadge";
import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";
import HeroSkillsTags from "./HeroSkillsTags";
import HeroActionButtons from "./HeroActionButtons";
import HeroSocialLinks from "./HeroSocialLinks";

const EnhancedHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center overflow-hidden pt-4 sm:pt-6">
      <HeroBackground />
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 z-10">
        <div className="w-full text-center">
          
          {/* Glass Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-card-elevated p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 layered-depth max-w-6xl mx-auto"
          >
            <HeroStatusBadge isVisible={isVisible} />
            <HeroHeading isVisible={isVisible} />
            <HeroDescription isVisible={isVisible} />
            <HeroSkillsTags isVisible={isVisible} />
            <HeroActionButtons isVisible={isVisible} />
            <HeroSocialLinks isVisible={isVisible} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
