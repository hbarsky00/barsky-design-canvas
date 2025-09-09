import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useVelocity } from "framer-motion";
import { cn } from "@/lib/utils";

interface Enhanced3DScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  dampening?: number;
  perspective?: number;
}

const Enhanced3DScrollContainer: React.FC<Enhanced3DScrollContainerProps> = ({
  children,
  className = "",
  intensity = 1,
  dampening = 0.9,
  perspective = 1000
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'none'>('none');
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth springs for natural movement
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 300,
    damping: 30
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll direction
  useEffect(() => {
    const updateDirection = (velocity: number) => {
      if (Math.abs(velocity) < 10) {
        setScrollDirection('none');
      } else if (velocity > 0) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
    };

    const unsubscribe = smoothVelocity.on('change', updateDirection);
    return unsubscribe;
  }, [smoothVelocity]);

  // Enhanced 3D transforms based on scroll - Further reduced intensity to prevent scrollbars
  const rotateX = useTransform(
    smoothProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    [1.5 * intensity, -0.5 * intensity, 0, 0.5 * intensity, -1.5 * intensity]
  );

  const rotateY = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [-2 * intensity, 0, 2 * intensity]
  );

  const rotateZ = useTransform(
    smoothVelocity,
    [-500, 0, 500],
    [0.5 * intensity, 0, -0.5 * intensity]
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0.98, 1, 0.98]
  );

  const y = useTransform(
    smoothProgress,
    [0, 1],
    [3 * intensity, -3 * intensity]
  );

  // Dynamic blur based on velocity
  const blur = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [3, 0, 3]
  );

  // Momentum-based floating animation - Further reduced for stability
  const floatY = useTransform(
    smoothVelocity,
    [-500, 0, 500],
    [2 * intensity, 0, -2 * intensity]
  );

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={cn("relative", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ,
          scale,
          y: useTransform([y, floatY], ([yVal, floatVal]: [number, number]) => yVal + floatVal),
          filter: useTransform(blur, (b) => `blur(${b}px)`),
          transformStyle: "preserve-3d",
          transition: "filter 0.2s ease-out"
        }}
        className="relative"
      >
        {/* Depth layers for enhanced 3D effect */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            rotateX: useTransform(rotateX, (r) => r * 0.5),
            rotateY: useTransform(rotateY, (r) => r * 0.5),
            scale: useTransform(scale, (s) => s * 0.98),
            y: useTransform(y, (yVal) => yVal * 1.1),
            opacity: 0.1,
            background: "hsl(var(--primary) / 0.05)",
            filter: "blur(20px)",
            transformStyle: "preserve-3d"
          }}
          aria-hidden="true"
        />

        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            rotateX: useTransform(rotateX, (r) => r * 0.3),
            rotateY: useTransform(rotateY, (r) => r * 0.3),
            scale: useTransform(scale, (s) => s * 0.96),
            y: useTransform(y, (yVal) => yVal * 1.2),
            opacity: 0.05,
            background: "hsl(var(--secondary) / 0.03)",
            filter: "blur(40px)",
            transformStyle: "preserve-3d"
          }}
          aria-hidden="true"
        />

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, z: -50 }}
          whileInView={{ opacity: 1, z: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          {children}
        </motion.div>

        {/* Interactive particles that respond to scroll */}
        <motion.div 
          className="absolute inset-0 pointer-events-none -z-30"
          aria-hidden="true"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-primary/10"
              style={{
                top: `${20 + i * 20}%`,
                left: `${10 + i * 15}%`,
                x: useTransform(smoothVelocity, [-1000, 1000], [-100 * (i + 1), 100 * (i + 1)]),
                y: useTransform(y, (yVal) => yVal * (0.5 + i * 0.1)),
                rotate: useTransform(smoothProgress, [0, 1], [0, 360 * (i + 1)]),
                scale: useTransform(
                  smoothVelocity,
                  [-500, 0, 500],
                  [0.5, 1, 0.5]
                ),
                opacity: useTransform(
                  smoothProgress,
                  [0, 0.5, 1],
                  [0, 0.6, 0]
                )
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Enhanced3DScrollContainer;