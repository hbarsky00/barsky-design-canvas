
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";
import HeroActionButtons from "./HeroActionButtons";
import HeroSocialLinks from "./HeroSocialLinks";
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

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen flex flex-col bg-transparent overflow-hidden relative"
      style={{ perspective: "1000px" }}
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: prefersReducedMotion ? 0 : backgroundY }}
      >
        <AnimatedBackground />
      </motion.div>

      {/* Main Hero Content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
            style={{ y: prefersReducedMotion ? 0 : contentY }}
          >
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
      </div>

      {/* Navigation Controls - Separated from main content */}
      <div className="flex-shrink-0 relative z-10 pb-8">
        <div className="flex justify-center">
          <button
            onClick={scrollToNextSection}
            className="group flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg min-w-[80px]"
            aria-label="Explore"
          >
            <span className="text-xs font-medium opacity-70 group-hover:opacity-100 transition-opacity mb-2 text-center w-full">Explore</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center w-full"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-200 mx-auto">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
