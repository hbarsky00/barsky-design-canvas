import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";
import HeroActionButtons from "./HeroActionButtons";
import HeroSocialLinks from "./HeroSocialLinks";

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

  // Scroll-driven 3D/parallax values
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const tiltX = useTransform(scrollYProgress, [0, 0.5, 1], ["6deg", "0deg", "-4deg"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.995, 1, 0.997]);

  const headingY = useTransform(scrollYProgress, [0, 1], [8, -8]);
  const descY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const buttonsY = useTransform(scrollYProgress, [0, 1], [12, -12]);

  return (
    <section ref={sectionRef} className="relative py-8 pb-4 sm:py-16 lg:py-20 bg-transparent" style={{ perspective: "1000px" }}>
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4 sm:space-y-6 lg:space-y-8"
            style={{
              rotateX: prefersReducedMotion ? 0 : tiltX,
              y: prefersReducedMotion ? 0 : contentY,
              scale: prefersReducedMotion ? 1 : contentScale,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <motion.div style={{ y: prefersReducedMotion ? 0 : headingY }}>
              <HeroHeading isVisible={isVisible} />
            </motion.div>
            <motion.div style={{ y: prefersReducedMotion ? 0 : descY }}>
              <HeroDescription isVisible={isVisible} />
            </motion.div>
            <motion.div style={{ y: prefersReducedMotion ? 0 : buttonsY }}>
              <HeroActionButtons isVisible={isVisible} />
            </motion.div>
            <div className="hidden sm:block pt-4 lg:pt-6">
              <HeroSocialLinks isVisible={isVisible} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
