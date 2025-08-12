
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <section className="relative py-10 sm:py-16 bg-transparent">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4 sm:space-y-6"
          >
            <HeroHeading isVisible={isVisible} />
            <HeroDescription isVisible={isVisible} />
            <HeroActionButtons isVisible={isVisible} />
            <div className="hidden sm:block">
              <HeroSocialLinks isVisible={isVisible} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
