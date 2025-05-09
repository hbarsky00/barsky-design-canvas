
import { AnimationType } from "./AnimatedTextTypes";

export const characterAnimation: Record<AnimationType, any> = {
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
        delay: i * 0.03, // Use default staggering 
        duration: 0.5,
        times: [0, 0.5, 1],
        repeat: 0
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
        delay: i * 0.03, // Use default staggering
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
        delay: i * 0.09 // Use triple default staggering for typewriter
      }
    })
  }
};
