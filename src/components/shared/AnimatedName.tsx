import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const ANIMATIONS = [
  "animate-name-glow",
  "animate-name-wave",
  "animate-name-pop",
  "animate-name-track",
  "animate-name-shimmer",
  "animate-name-breathe",
] as const;

interface AnimatedNameProps {
  name: string;
  className?: string;
}

const AnimatedName: React.FC<AnimatedNameProps> = ({ name, className }) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Trigger first animation immediately on mount
    setIsPlaying(true);
    const endTimer = setTimeout(() => setIsPlaying(false), 2500);

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANIMATIONS.length);
      setIsPlaying(true);
      const t = setTimeout(() => setIsPlaying(false), 2500);
      return () => clearTimeout(t);
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(endTimer);
    };
  }, []);

  return (
    <span
      className={cn(
        className,
        "inline-block origin-center",
        isPlaying ? ANIMATIONS[index] : ""
      )}
      style={
        ANIMATIONS[index] === "animate-name-shimmer"
          ? {
              backgroundImage:
                "linear-gradient(90deg, hsl(var(--foreground)) 0%, #3b82f6 50%, hsl(var(--foreground)) 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }
          : undefined
      }
    >
      {name}
    </span>
  );
};

export default AnimatedName;
