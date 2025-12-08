import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";
import HeroActionButtons from "./HeroActionButtons";
import HeroSocialLinks from "./HeroSocialLinks";
import AnimatedBackground from "./AnimatedBackground";
import CursorSpotlight from "../effects/CursorSpotlight";


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

  // Scroll-driven parallax values with different speeds for depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background moves slowest (furthest away)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.6, 0.3]);
  
  // Heading - medium speed
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  
  // Description - slightly faster
  const descriptionY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const descriptionOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1, 0]);
  
  // Buttons - fastest (closest to viewer)
  const buttonsY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const buttonsOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0]);
  
  // Social links - fastest
  const socialY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const socialOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 1, 0]);

  // Explore button parallax
  const exploreY = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const exploreOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 0.5, 0]);

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
      style={{ perspective: "1200px" }}
    >
      {/* Cursor Spotlight Effect */}
      <CursorSpotlight containerRef={sectionRef} size={500} opacity={0.12} />

      {/* Animated Background with parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          y: prefersReducedMotion ? 0 : backgroundY,
          scale: prefersReducedMotion ? 1 : backgroundScale,
          opacity: prefersReducedMotion ? 1 : backgroundOpacity,
        }}
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
          >
            {/* Main content with generous spacing and layered parallax */}
            <div className="space-y-6 lg:space-y-10">
              <motion.div 
                style={{ 
                  y: prefersReducedMotion ? 0 : headingY,
                  opacity: prefersReducedMotion ? 1 : headingOpacity,
                }}
              >
                <HeroHeading isVisible={isVisible} />
              </motion.div>
              
              <motion.div 
                className="space-y-4 lg:space-y-6"
                style={{ 
                  y: prefersReducedMotion ? 0 : descriptionY,
                  opacity: prefersReducedMotion ? 1 : descriptionOpacity,
                }}
              >
                <HeroDescription isVisible={isVisible} />
              </motion.div>
              
              <motion.div 
                className="pt-4 lg:pt-8"
                style={{ 
                  y: prefersReducedMotion ? 0 : buttonsY,
                  opacity: prefersReducedMotion ? 1 : buttonsOpacity,
                }}
              >
                <HeroActionButtons isVisible={isVisible} />
              </motion.div>
              
              <motion.div 
                className="hidden sm:block pt-6 lg:pt-10"
                style={{ 
                  y: prefersReducedMotion ? 0 : socialY,
                  opacity: prefersReducedMotion ? 1 : socialOpacity,
                }}
              >
                <HeroSocialLinks isVisible={isVisible} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls with parallax */}
      <motion.div 
        className="flex-shrink-0 relative z-10 pb-8"
        style={{ 
          y: prefersReducedMotion ? 0 : exploreY,
          opacity: prefersReducedMotion ? 1 : exploreOpacity,
        }}
      >
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
      </motion.div>
    </section>
  );
};

export default EnhancedHero;
