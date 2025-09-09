import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AdvancedSectionTransitionProps {
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: "morph" | "perspective" | "wave" | "parallax";
  backgroundGradient?: {
    from: string;
    to: string;
    via?: string;
  };
  intensity?: number;
  delay?: number;
}

const AdvancedSectionTransition: React.FC<AdvancedSectionTransitionProps> = ({
  as = "section",
  id,
  className = "",
  children,
  variant = "morph",
  backgroundGradient = {
    from: "hsl(var(--primary) / 0.02)",
    to: "hsl(var(--background))",
    via: "hsl(var(--secondary) / 0.01)"
  },
  intensity = 1,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values for different variants
  const transforms = {
    morph: {
      y: useTransform(smoothProgress, [0, 0.5, 1], [60 * intensity, 0, -60 * intensity]),
      rotateX: useTransform(smoothProgress, [0, 0.5, 1], [8 * intensity, 0, -8 * intensity]),
      scale: useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.95]),
      opacity: useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7])
    },
    perspective: {
      y: useTransform(smoothProgress, [0, 1], [100 * intensity, -100 * intensity]),
      rotateX: useTransform(smoothProgress, [0, 0.5, 1], [15 * intensity, 0, -15 * intensity]),
      rotateY: useTransform(smoothProgress, [0, 0.5, 1], [-5 * intensity, 0, 5 * intensity]),
      scale: useTransform(smoothProgress, [0, 0.5, 1], [0.9, 1, 0.9])
    },
    wave: {
      y: useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [40 * intensity, -20 * intensity, 0, 20 * intensity, -40 * intensity]),
      rotateZ: useTransform(smoothProgress, [0, 0.5, 1], [-2 * intensity, 0, 2 * intensity]),
      scale: useTransform(smoothProgress, [0, 0.5, 1], [0.98, 1, 0.98])
    },
    parallax: {
      y: useTransform(smoothProgress, [0, 1], [80 * intensity, -80 * intensity]),
      scale: useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 1.05])
    }
  };

  const currentTransforms = transforms[variant];

  // Background morphing
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const backgroundOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const MotionTag: any = motion[as as keyof typeof motion] || motion.section;

  if (prefersReducedMotion) {
    return (
      <MotionTag
        ref={containerRef}
        id={id}
        className={cn("relative", className)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      ref={containerRef}
      id={id}
      className={cn("relative overflow-hidden", className)}
      style={{
        ...currentTransforms,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Morphing Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          y: backgroundY,
          opacity: backgroundOpacity,
          background: backgroundGradient.via 
            ? `linear-gradient(135deg, ${backgroundGradient.from}, ${backgroundGradient.via}, ${backgroundGradient.to})`
            : `linear-gradient(135deg, ${backgroundGradient.from}, ${backgroundGradient.to})`,
          filter: "blur(60px)",
          transform: "scale(1.2)"
        }}
        aria-hidden="true"
      />

      {/* Geometric floating elements */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          opacity: useTransform(smoothProgress, [0, 0.5, 1], [0, 0.1, 0])
        }}
        aria-hidden="true"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, hsl(var(--primary) / 0.1), transparent)`,
              top: `${20 + i * 30}%`,
              right: `${10 + i * 20}%`,
              y: useTransform(smoothProgress, [0, 1], [50 * (i + 1), -50 * (i + 1)]),
              x: useTransform(smoothProgress, [0, 1], [-20 * i, 20 * i]),
              rotate: useTransform(smoothProgress, [0, 1], [0, 180 * (i + 1)])
            }}
          />
        ))}
      </motion.div>

      {/* Content with staggered children animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: delay
            }
          }
        }}
      >
        <motion.div
          variants={{
            hidden: { 
              opacity: 0, 
              y: 30,
              scale: 0.95,
              filter: "blur(10px)"
            },
            visible: { 
              opacity: 1, 
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </MotionTag>
  );
};

export default AdvancedSectionTransition;