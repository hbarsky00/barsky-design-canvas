
import React from "react";
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
  const { elementRef } = useAnimatedText({
    text,
    delay,
    animateOnce,
    onComplete
  });

  const Tag = tag as any;
  
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
