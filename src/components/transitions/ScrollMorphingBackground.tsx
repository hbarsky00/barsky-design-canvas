import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

interface ScrollMorphingBackgroundProps {
  sections: {
    id: string;
    colors: {
      primary: string;
      secondary: string;
      accent?: string;
    };
    particles?: boolean;
  }[];
  className?: string;
}

const ScrollMorphingBackground: React.FC<ScrollMorphingBackgroundProps> = ({
  sections,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Create color transitions between sections
  const createColorTransition = (colorKey: 'primary' | 'secondary' | 'accent') => {
    const colors = sections.map(section => 
      colorKey === 'accent' ? (section.colors.accent || section.colors.primary) : section.colors[colorKey]
    );
    const points = sections.map((_, index) => index / (sections.length - 1));
    return useTransform(smoothProgress, points, colors);
  };

  const primaryColor = createColorTransition('primary');
  const secondaryColor = createColorTransition('secondary');
  const accentColor = createColorTransition('accent');

  // Particle system transforms
  const particleRotation = useTransform(smoothProgress, [0, 1], [0, 360]);
  const particleScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1]);

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`fixed inset-0 -z-50 ${className}`}
        style={{
          background: `linear-gradient(135deg, ${sections[0]?.colors.primary}, ${sections[0]?.colors.secondary})`
        }}
      />
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`fixed inset-0 -z-50 ${className}`}
      style={{
        background: useTransform(
          [primaryColor, secondaryColor, accentColor],
          ([primary, secondary, accent]) =>
            `radial-gradient(ellipse at center, ${primary}, ${secondary} 50%, ${accent} 100%)`
        )
      }}
    >
      {/* Primary gradient layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            [primaryColor, secondaryColor],
            ([primary, secondary]) =>
              `linear-gradient(45deg, ${primary} 0%, transparent 50%, ${secondary} 100%)`
          ),
          opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.6, 0.3])
        }}
      />

      {/* Secondary moving gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            [secondaryColor, accentColor],
            ([secondary, accent]) =>
              `conic-gradient(from 0deg, ${secondary}, ${accent}, ${secondary})`
          ),
          opacity: useTransform(smoothProgress, [0, 1], [0.1, 0.3]),
          rotate: useTransform(smoothProgress, [0, 1], [0, 180]),
          scale: useTransform(smoothProgress, [0, 0.5, 1], [1.5, 1, 1.5])
        }}
      />

      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            [primaryColor, secondaryColor, accentColor],
            ([primary, secondary, accent]) =>
              `radial-gradient(circle at 20% 20%, ${primary} 0%, transparent 50%), 
               radial-gradient(circle at 80% 80%, ${secondary} 0%, transparent 50%),
               radial-gradient(circle at 40% 60%, ${accent} 0%, transparent 50%)`
          ),
          opacity: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.2, 0.4, 0.4, 0.2]),
          x: useTransform(smoothProgress, [0, 1], ["-10%", "10%"]),
          y: useTransform(smoothProgress, [0, 1], ["-5%", "5%"])
        }}
      />

      {/* Floating geometric shapes */}
      {sections.some(s => s.particles) && (
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full"
              style={{
                background: useTransform(
                  accentColor,
                  (color) => `radial-gradient(circle, ${color}20, transparent 70%)`
                ),
                top: `${10 + (i * 15)}%`,
                left: `${5 + (i * 18)}%`,
                rotate: useTransform(smoothProgress, [0, 1], [0, 360 * (i % 2 === 0 ? 1 : -1)]),
                scale: particleScale,
                x: useTransform(smoothProgress, [0, 1], [
                  -50 * Math.sin(i), 
                  50 * Math.sin(i)
                ]),
                y: useTransform(smoothProgress, [0, 1], [
                  -30 * Math.cos(i), 
                  30 * Math.cos(i)
                ])
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Noise overlay for texture */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          opacity: useTransform(smoothProgress, [0, 1], [0.02, 0.08])
        }}
      />
    </motion.div>
  );
};

export default ScrollMorphingBackground;