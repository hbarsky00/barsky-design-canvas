
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";
import HeroActionButtons from "./HeroActionButtons";
import HeroSocialLinks from "./HeroSocialLinks";
import HeroLogo from "./HeroLogo";
import AnimatedBackground from "./AnimatedBackground";

const EnhancedHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll-driven parallax values
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: prefersReducedMotion ? 0 : backgroundY }}
      >
        <AnimatedBackground />
      </motion.div>

      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
          style={{ y: prefersReducedMotion ? 0 : contentY }}
        >
          {/* Logo with enhanced spacing */}
          <div className="mb-8 lg:mb-12">
            <HeroLogo isVisible={isVisible} />
          </div>

          {/* Main content with generous spacing */}
          <div className="space-y-6 lg:space-y-10">
            <HeroHeading isVisible={isVisible} />
            
            <div className="space-y-4 lg:space-y-6">
              <HeroDescription isVisible={isVisible} />
            </div>
            
            <div className="pt-4 lg:pt-8">
              <HeroActionButtons isVisible={isVisible} />
            </div>
            
            <div className="hidden sm:block pt-6 lg:pt-10">
              <HeroSocialLinks isVisible={isVisible} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
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
    </section>
  );
};

export default EnhancedHero;
