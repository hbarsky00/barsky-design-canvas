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
      //
      // The gap between words is a real space character, not a margin. It used
      // to be `mr-[0.25em]` with nothing between the spans, which looked right
      // and made the DOM text one run-on token: every heading rendered through
      // here came out as "FrequentlyAskedQuestions". Google's extractor, screen
      // readers and copy-paste all read that, not the visual gap.
      //
      // Whitespace between inline-block elements collapses to a single word
      // space, so this spaces identically without the margin.
      const words = text.split(" ");
      return words.map((word, index) => <React.Fragment key={`word-${index}`}>
          <motion.span custom={index} variants={characterAnimation[animation]} className="inline-block">
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </React.Fragment>);
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