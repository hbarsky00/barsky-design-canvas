import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CharacterAnimatedTextProps } from "./AnimatedTextTypes";
import { characterAnimation } from "./CharacterAnimationVariants";
import { useAnimatedText } from "./useAnimatedText";
export const CharacterAnimation: React.FC<CharacterAnimatedTextProps> = ({
  text,
  tag = "div",
  className,
  delay = 0,
  staggerChildren = 0.03,
  duration = 0.5,
  animation = "fade",
  animateOnce = true,
  onComplete,
  type
}) => {
  const {
    elementRef,
    isVisible
  } = useAnimatedText({
    text,
    delay,
    staggerChildren,
    duration,
    animateOnce,
    onComplete
  });
  const Tag = tag as any;

  // Render characters or words based on type
  const renderElements = () => {
    if (type === "character") {
      return text.split("").map((char, index) => <motion.span key={`char-${index}`} custom={index} variants={characterAnimation[animation]} className={animation === "typewriter" ? "inline-block" : ""} style={{
        display: "inline-block",
        whiteSpace: "pre"
      }}>
          {char}
        </motion.span>);
    } else {
      // type === "word"
      return text.split(" ").map((word, index) => <motion.span key={`word-${index}`} custom={index} variants={characterAnimation[animation]} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>);
    }
  };
  return <Tag ref={elementRef} className={cn("block", className)}>
      <motion.span initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerChildren
        }
      }
    }}>
        {renderElements()}
      </motion.span>
    </Tag>;
};