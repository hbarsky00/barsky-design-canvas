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
      // The space between words is a real space character, not a margin.
      // This used to be `className="inline-block mr-[0.25em]"` with the space
      // dropped, which meant every animated heading on the site serialised as
      // one run-on word: a screen reader announced "Fiveproductsyoucanopen
      // rightnow", and the same string is what a non-JS crawler reads out of
      // the prerendered HTML. It looked right and read as gibberish.
      //
      // Whitespace between inline-block elements still renders as a word space,
      // so this also drops the trailing margin the last word used to carry,
      // which was pushing centred headings a quarter-em off centre.
      return text.split(" ").map((word, index) => <React.Fragment key={`word-${index}`}>
          {index > 0 ? " " : null}
          <motion.span custom={index} variants={characterAnimation[animation]} className="inline-block">
            {word}
          </motion.span>
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