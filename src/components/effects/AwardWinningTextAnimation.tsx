import React from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AwardWinningTextAnimationProps {
  text: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
  type?: "word" | "character" | "line";
  animation?: "slide" | "fade" | "elastic" | "spring" | "morphing" | "reveal";
  stagger?: number;
}

const AwardWinningTextAnimation: React.FC<AwardWinningTextAnimationProps> = ({
  text,
  className,
  tag: Tag = "div",
  delay = 0,
  duration = 0.8,
  type = "word",
  animation = "slide",
  stagger = 0.05,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const slideVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      rotateX: -15,
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }
    }
  };

  const fadeVariants: Variants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: "easeOut",
      }
    }
  };

  const elasticVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.3,
      y: 30,
      rotateZ: -5
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        duration: duration * 1.2,
        ease: [0.68, -0.55, 0.265, 1.55] as const,
      }
    }
  };

  const springVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8
      }
    }
  };

  const morphingVariants: Variants = {
    hidden: { 
      opacity: 0,
      scaleX: 0.2,
      scaleY: 1.5,
      skewX: 15
    },
    visible: { 
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      transition: {
        duration: duration * 1.3,
        ease: [0.19, 1, 0.22, 1] as const,
      }
    }
  };

  const revealVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: "100%",
      rotateX: -90
    },
    visible: { 
      opacity: 1,
      y: "0%",
      rotateX: 0,
      transition: {
        duration: duration * 1.1,
        ease: [0.19, 1, 0.22, 1] as const,
      }
    }
  };

  const animationVariants = {
    slide: slideVariants,
    fade: fadeVariants,
    elastic: elasticVariants,
    spring: springVariants,
    morphing: morphingVariants,
    reveal: revealVariants
  };

  const getTextSegments = () => {
    if (type === "character") {
      return text.split("");
    } else if (type === "word") {
      return text.split(" ");
    } else {
      return text.split("\n");
    }
  };

  const segments = getTextSegments();
  const variant = animationVariants[animation];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      }
    }
  };

  const Component = Tag as any;
  
  return (
    <Component ref={ref} className={cn("relative", className)}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap justify-center"
        style={{ 
          perspective: "1000px",
          transformStyle: "preserve-3d" 
        }}
      >
        {segments.map((segment, index) => (
          <motion.span
            key={index}
            variants={variant}
            className={cn(
              "inline-block",
              type === "word" && "mr-[0.25em]",
              type === "character" && segment === " " && "mr-[0.25em]"
            )}
            style={{
              transformOrigin: "bottom center",
              willChange: "transform, opacity"
            }}
          >
            {segment === " " ? "\u00A0" : segment}
            {type === "line" && index < segments.length - 1 && <br />}
          </motion.span>
        ))}
      </motion.div>
      
      {/* Premium Background Gradient Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-lg opacity-0"
        animate={isInView ? { 
          opacity: [0, 0.3, 0],
          scale: [0.8, 1.1, 1],
        } : {}}
        transition={{
          duration: duration * 2,
          delay: delay + segments.length * stagger,
          ease: "easeOut"
        }}
      />
    </Component>
  );
};

export default AwardWinningTextAnimation;