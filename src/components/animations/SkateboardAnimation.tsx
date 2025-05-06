import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import GhostSkateboardSvg from "./GhostSkateboardSvg";

interface SkateboardAnimationProps {
  startDelay?: number;
}

const SkateboardAnimation: React.FC<SkateboardAnimationProps> = ({ startDelay = 1500 }) => {
  const controls = useAnimation();
  const ghostRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [ghostOffset, setGhostOffset] = useState<number>(0);
  
  // Start the animation sequence and keep it looping
  useEffect(() => {
    const startAnimation = async () => {
      // Wait for the initial delay
      await new Promise(resolve => setTimeout(resolve, startDelay));
      
      // Start the continuous animation
      const runAnimation = async () => {
        // Initial position - off-screen left
        await controls.start({
          x: "-20vw", // Start off-screen left
          y: "0%",
          rotate: 0,
          scaleX: 1, 
          transition: { duration: 0.1, ease: "easeOut" }
        });
        
        setDirection("right");
        setGhostOffset(0);
        
        // Move from left to 25% with small ollie
        await controls.start({
          x: "25vw",
          y: [0, -15, 0],
          rotate: [-2, 3, -1],
          transition: {
            x: { duration: 1.2, ease: "easeOut" },
            y: { duration: 1.2, times: [0, 0.5, 1], ease: "easeOut" },
            rotate: { duration: 1.2, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Set ghost offset during ollie
        setGhostOffset(8);
        
        // Continue to middle with bigger ollie
        await controls.start({
          x: "50vw",
          y: [0, -25, 0],
          rotate: [0, 8, 0],
          transition: {
            x: { duration: 1.2, ease: "linear" },
            y: { duration: 1.2, times: [0, 0.5, 1], ease: "easeOut" },
            rotate: { duration: 1.2, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Big ollie jump and flip trick at 75% across screen
        setGhostOffset(15);
        await controls.start({
          x: "75vw",
          y: [0, -40, 0],
          rotate: [0, 12, 0],
          transition: {
            x: { duration: 1.1, ease: "linear" },
            y: { duration: 1.1, times: [0, 0.5, 1], ease: "easeOut" },
            rotate: { duration: 1.1, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Reset ghost offset after landing
        setGhostOffset(5);
        
        // Exit to the right with final smaller ollie
        await controls.start({
          x: "120vw", // Go off-screen right
          y: [0, -15, 0],
          rotate: [0, 5, 0],
          transition: {
            x: { duration: 0.8, ease: "easeIn" },
            y: { duration: 0.8, times: [0, 0.5, 1], ease: "easeOut" },
            rotate: { duration: 0.8, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Flip direction for return journey
        await controls.start({
          scaleX: -1,
          transition: { duration: 0.1 }
        });
        
        setDirection("left");
        setGhostOffset(0);
        
        // Return from right to 75% position with a medium ollie
        await controls.start({
          x: "75vw",
          y: [0, -20, 0],
          rotate: [0, -5, 0],
          transition: {
            x: { duration: 0.1 },
            y: { duration: 0.1 },
            rotate: { duration: 0.1 }
          }
        });
        
        // Big ollie coming back at 50% position
        setGhostOffset(12);
        await controls.start({
          x: "50vw",
          y: [0, -35, 0],
          rotate: [0, -10, 0],
          transition: {
            x: { duration: 1.3, ease: "linear" },
            y: { duration: 1.3, times: [0, 0.5, 1], ease: "easeOut" },
            rotate: { duration: 1.3, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Continue to 25% with medium ollie
        setGhostOffset(8);
        await controls.start({
          x: "25vw",
          y: [0, -25, 0],
          rotate: [0, -7, 0],
          transition: {
            x: { duration: 1.2, ease: "linear" },
            y: { duration: 1.2, times: [0, 0.5, 1], ease: "easeOut" },
            rotate: { duration: 1.2, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Reset ghost offset
        setGhostOffset(0);
        
        // Continue to left off-screen with a small ollie
        await controls.start({
          x: "-20vw", // Go off-screen left
          y: [0, -15, 0],
          rotate: [0, -4, 0],
          transition: {
            x: { duration: 1.2, ease: "easeIn" },
            y: { duration: 1.2, times: [0, 0.5, 1], ease: "easeOut" },
            rotate: { duration: 1.2, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Flip back to original direction
        await controls.start({
          scaleX: 1,
          transition: { duration: 0.1 }
        });
        
        // Loop the animation
        setTimeout(runAnimation, 500); // Small pause between loops
      };
      
      runAnimation();
    };
    
    startAnimation();
  }, [controls, startDelay]);

  return (
    <motion.div
      ref={ghostRef}
      className={`absolute z-10 left-0 transform ${direction === "left" ? "opacity-90" : "opacity-100"}`}
      style={{ width: "80px", height: "80px" }} // Fix size to prevent resizing
      initial={{ x: "-20vw", rotate: 0, y: 0, scaleX: 1 }}
      animate={controls}
    >
      <GhostSkateboardSvg className="ghost-rider" ghostOffset={ghostOffset} />
    </motion.div>
  );
};

export default SkateboardAnimation;
