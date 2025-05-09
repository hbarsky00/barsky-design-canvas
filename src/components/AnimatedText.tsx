
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  type?: "block" | "character" | "word";
  staggerChildren?: number;
  duration?: number;
  animateOnce?: boolean;
  animation?: "fade" | "bounce" | "wave" | "rainbow" | "typewriter";
  onComplete?: () => void;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  tag = "div",
  className,
  delay = 0,
  type = "block",
  staggerChildren = 0.03,
  duration = 0.5,
  animateOnce = true,
  animation = "fade",
  onComplete,
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.style.animationDelay = `${delay}ms`;
    }
    
    // Setup IntersectionObserver for triggering animation when element is in view
    if (!animateOnce || !hasAnimated) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasAnimated(true);
            
            // Call onComplete after animation duration
            if (onComplete) {
              const totalDuration = delay + (text.length * staggerChildren * 1000) + (duration * 1000);
              setTimeout(onComplete, totalDuration);
            }
          }
        },
        { threshold: 0.2 }
      );
      
      if (element) {
        observer.observe(element);
      }
      
      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }
  }, [delay, animateOnce, hasAnimated, onComplete, text, staggerChildren, duration]);

  const Tag = tag as any;
  
  // Character-by-character animation variants
  const characterAnimation = {
    // Fade animation (default)
    fade: {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 }
    },
    // Bounce animation
    bounce: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          damping: 10,
          stiffness: 200
        }
      }
    },
    // Wave effect animation
    wave: {
      hidden: { y: 0 },
      visible: (i: number) => ({
        y: [0, -15, 0],
        transition: {
          delay: i * staggerChildren,
          duration: 0.5,
          times: [0, 0.5, 1],
          repeat: animation === "wave" ? 0 : 0
        }
      })
    },
    // Rainbow color effect
    rainbow: {
      hidden: { color: "#000000" },
      visible: (i: number) => ({
        color: [
          "#FF0000", // Red
          "#FF7F00", // Orange
          "#FFFF00", // Yellow
          "#00FF00", // Green
          "#0000FF", // Blue
          "#4B0082", // Indigo
          "#9400D3", // Violet
          "#000000"  // Back to original
        ],
        transition: {
          delay: i * staggerChildren,
          duration: 2,
          repeat: 0
        }
      })
    },
    // Typewriter effect
    typewriter: {
      hidden: { opacity: 0, display: "none" },
      visible: (i: number) => ({
        opacity: 1,
        display: "inline-block",
        transition: {
          delay: i * staggerChildren * 3
        }
      })
    }
  };
  
  // Split text into character spans for character-by-character animation
  const renderCharacters = () => {
    return text.split("").map((char, index) => (
      <motion.span
        key={`char-${index}`}
        custom={index}
        variants={characterAnimation[animation]}
        className={animation === "typewriter" ? "inline-block" : ""}
        style={{ 
          display: "inline-block",
          whiteSpace: animation === "typewriter" ? "pre" : "normal"
        }}
      >
        {char}
      </motion.span>
    ));
  };
  
  // Split by words
  const renderWords = () => {
    return text.split(" ").map((word, index) => (
      <motion.span
        key={`word-${index}`}
        custom={index}
        variants={characterAnimation[animation]}
        className="inline-block mr-[0.25em]"
      >
        {word}
      </motion.span>
    ));
  };
  
  // Render based on animation type
  if (type === "character") {
    return (
      <Tag 
        ref={elementRef}
        className={cn("inline-block", className)}
      >
        <motion.span
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: staggerChildren
              }
            }
          }}
        >
          {renderCharacters()}
        </motion.span>
      </Tag>
    );
  } else if (type === "word") {
    return (
      <Tag 
        ref={elementRef}
        className={cn("inline-block", className)}
      >
        <motion.span
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: staggerChildren * 4
              }
            }
          }}
        >
          {renderWords()}
        </motion.span>
      </Tag>
    );
  }
  
  // Original block animation
  return (
    <div className="text-reveal-container">
      <Tag 
        ref={elementRef}
        className={cn("text-reveal", className)}
      >
        {text}
      </Tag>
    </div>
  );
};

export default AnimatedText;
