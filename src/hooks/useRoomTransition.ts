import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface UseRoomTransitionProps {
  exitDuration?: number;
  corridorDuration?: number;
  enterDuration?: number;
}

export const useRoomTransition = ({
  exitDuration = 400,
  corridorDuration = 800,
  enterDuration = 500,
}: UseRoomTransitionProps = {}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState<"exiting" | "corridor" | "entering">("corridor");
  const [projectTitle, setProjectTitle] = useState<string>("");
  const navigate = useNavigate();

  const triggerRoomTransition = useCallback((
    destination: string,
    title?: string,
    callback?: () => void
  ) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setProjectTitle(title || "");
    
    // Stage 1: Exit current room
    setTransitionStage("exiting");
    
    setTimeout(() => {
      // Stage 2: Show corridor/loading
      setTransitionStage("corridor");
      
      setTimeout(() => {
        // Navigate and execute callback
        navigate(destination);
        callback?.();
        
        // Stage 3: Enter new room
        setTransitionStage("entering");
        
        setTimeout(() => {
          // Complete transition
          setIsTransitioning(false);
          setProjectTitle("");
        }, enterDuration);
      }, corridorDuration);
    }, exitDuration);
  }, [isTransitioning, navigate, exitDuration, corridorDuration, enterDuration]);

  const triggerSimpleTransition = useCallback((callback?: () => void) => {
    setIsTransitioning(true);
    setTransitionStage("corridor");
    
    setTimeout(() => {
      callback?.();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  }, []);

  return {
    isTransitioning,
    transitionStage,
    projectTitle,
    triggerRoomTransition,
    triggerSimpleTransition,
  };
};