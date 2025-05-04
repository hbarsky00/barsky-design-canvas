
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface SkateboardAnimationProps {
  startDelay?: number;
}

const SkateboardAnimation: React.FC<SkateboardAnimationProps> = ({ startDelay = 1500 }) => {
  const controls = useAnimation();
  const skaterRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = React.useState<"right" | "left">("right");
  
  // Start the animation sequence and keep it looping
  useEffect(() => {
    const startAnimation = async () => {
      // Wait for the initial delay
      await new Promise(resolve => setTimeout(resolve, startDelay));
      
      // Start the continuous animation
      const runAnimation = async () => {
        // Going right (start from left side, outside the screen)
        await controls.start({
          x: "-120%",
          scaleX: 1, // Ensure skateboard faces right direction
          transition: { duration: 0.1, ease: "easeOut" }
        });
        
        setDirection("right");
        
        // Move to center with subtle bounce
        await controls.start({
          x: "0%",
          y: [0, -2, 0],
          rotate: [-2, 2, -1],
          transition: {
            x: { duration: 1.2, ease: "easeOut" },
            y: { duration: 1.2, times: [0, 0.5, 1], ease: "easeOut" },
            rotate: { duration: 1.2, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Hit the "curb" (Hiram's name) with a big jump
        await controls.start({
          x: "50%",
          y: [0, -25, 0], // Higher jump to simulate hitting a curb
          rotate: [0, 20, 0], // More rotation for dramatic effect
          transition: {
            x: { duration: 0.6, ease: "easeInOut" },
            y: { duration: 0.6, times: [0, 0.5, 1], ease: "circOut" },
            rotate: { duration: 0.6, times: [0, 0.5, 1], ease: "easeInOut" }
          }
        });
        
        // Exit to the right
        await controls.start({
          x: "150%",
          y: [-2, 2, -1, 0],
          rotate: [-1, 3, -2, 0],
          transition: {
            x: { duration: 0.8, ease: "easeIn" },
            y: { duration: 0.8, times: [0, 0.3, 0.6, 1], ease: "easeInOut" },
            rotate: { duration: 0.8, times: [0, 0.3, 0.6, 1], ease: "easeInOut" }
          }
        });
        
        // Return journey preparation - flip the skateboard to face left
        await controls.start({
          scaleX: -1, // Flip horizontally to face left
          transition: { duration: 0.1 }
        });
        
        setDirection("left");
        
        // Start return journey from right side
        await controls.start({
          x: "150%",
          transition: { duration: 0.1 }
        });
        
        // Move to center on return journey (under the text)
        await controls.start({
          x: "50%",
          y: [0, -2, 0],
          rotate: [2, -2, 1],
          transition: {
            x: { duration: 0.8, ease: "easeOut" },
            y: { duration: 0.8, times: [0, 0.5, 1], ease: "easeOut" },
            rotate: { duration: 0.8, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Continue to left side
        await controls.start({
          x: "0%",
          y: [0, -3, 0],
          rotate: [1, -3, 2],
          transition: {
            x: { duration: 1, ease: "easeInOut" },
            y: { duration: 1, times: [0, 0.5, 1], ease: "easeInOut" },
            rotate: { duration: 1, times: [0, 0.5, 1], ease: "easeInOut" }
          }
        });
        
        // Exit to the left
        await controls.start({
          x: "-120%",
          y: [0, -2, 0],
          rotate: [0, -2, 0],
          transition: {
            x: { duration: 0.8, ease: "easeIn" },
            y: { duration: 0.8, times: [0, 0.5, 1], ease: "easeInOut" },
            rotate: { duration: 0.8, times: [0, 0.5, 1], ease: "easeInOut" }
          }
        });
        
        // Flip back to face right for the next loop
        await controls.start({
          scaleX: 1,
          transition: { duration: 0.1 }
        });
        
        // Loop the animation
        runAnimation();
      };
      
      runAnimation();
    };
    
    startAnimation();
  }, [controls, startDelay]);

  return (
    <motion.div
      ref={skaterRef}
      className={`absolute z-10 transform ${direction === "left" ? "top-24" : ""}`}
      initial={{ x: "-150%", rotate: 0, y: 0, scaleX: 1 }}
      animate={controls}
    >
      <svg
        width="60"
        height="20"
        viewBox="0 0 60 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform rotate-3"
      >
        {/* Skateboard deck */}
        <rect x="10" y="7" width="40" height="6" rx="3" fill="#5D5DFF" />
        
        {/* Wheels */}
        <circle cx="15" cy="16" r="4" fill="#333644" />
        <circle cx="45" cy="16" r="4" fill="#333644" />
        
        {/* Trucks */}
        <rect x="13" y="13" width="4" height="2" fill="#888" />
        <rect x="43" y="13" width="4" height="2" fill="#888" />
        
        {/* Character */}
        <circle cx="30" cy="5" r="4" fill="#333644" />
        <rect x="28" y="9" width="4" height="6" fill="#333644" />
        <line x1="28" y1="11" x2="24" y2="14" stroke="#333644" strokeWidth="2" />
        <line x1="32" y1="11" x2="36" y2="14" stroke="#333644" strokeWidth="2" />
        <line x1="28" y1="15" x2="26" y2="19" stroke="#333644" strokeWidth="2" />
        <line x1="32" y1="15" x2="34" y2="19" stroke="#333644" strokeWidth="2" />
      </svg>
    </motion.div>
  );
};

export default SkateboardAnimation;
