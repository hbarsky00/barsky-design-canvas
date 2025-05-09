
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlockAnimatedTextProps } from "./AnimatedTextTypes";
import { useAnimatedText } from "./useAnimatedText";

export const BlockAnimation: React.FC<BlockAnimatedTextProps> = ({
  text,
  tag = "div",
  className,
  delay = 0,
  animateOnce = true,
  onComplete
}) => {
  const { elementRef, isVisible } = useAnimatedText({
    text,
    delay,
    animateOnce,
    onComplete
  });

  const Tag = tag as any;
  
  const blockVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <div className="text-reveal-container">
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={blockVariants}
      >
        <Tag 
          ref={elementRef}
          className={cn("text-reveal", className)}
        >
          {text}
        </Tag>
      </motion.div>
    </div>
  );
};
