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
  return <section className="relative min-h-[35vh] flex items-center overflow-hidden pt-14 pb-4">
      <HeroBackground />
      <HeroVisualElements />
      
      <div className="relative w-full py-2 sm:py-4 lg:py-6 z-10">
        <div className="w-full text-center">
          
          {/* Minimal Glass Container */}
          
        </div>
      </div>
    </section>;
};
export default EnhancedHero;