import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TerminalTypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  triggerOnView?: boolean;
}

const TerminalTypingText: React.FC<TerminalTypingTextProps> = ({
  text,
  speed = 20,
  delay = 0,
  className = "",
  onComplete,
  triggerOnView = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [hasStarted, text, speed, delay, onComplete]);

  return (
    <div ref={containerRef} className={className}>
      <span>{displayedText}</span>
      {isTyping && (
        <motion.span
          className="inline-block w-2 h-5 bg-primary ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </div>
  );
};

export default TerminalTypingText;
