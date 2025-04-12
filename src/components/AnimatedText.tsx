
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  tag = "div",
  className,
  delay = 0,
}) => {
  const elementRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.style.animationDelay = `${delay}ms`;
    }
  }, [delay]);

  const Tag = tag;
  
  return (
    <div className="text-reveal-container">
      <Tag 
        ref={elementRef as React.RefObject<any>}
        className={cn("text-reveal", className)}
      >
        {text}
      </Tag>
    </div>
  );
};

export default AnimatedText;
