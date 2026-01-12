import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface RoomTransitionContextType {
  isTransitioning: boolean;
  transitionStage: "exiting" | "corridor" | "entering";
  projectTitle: string;
  triggerRoomTransition: (destination: string, title?: string, callback?: () => void) => void;
  triggerSimpleTransition: (callback?: () => void) => void;
}

const RoomTransitionContext = createContext<RoomTransitionContextType | null>(null);

interface RoomTransitionProviderProps {
  children: ReactNode;
  exitDuration?: number;
  corridorDuration?: number;
  enterDuration?: number;
}

export const RoomTransitionProvider: React.FC<RoomTransitionProviderProps> = ({
  children,
  exitDuration = 400,
  corridorDuration = 800,
  enterDuration = 500,
}) => {
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

  return (
    <RoomTransitionContext.Provider
      value={{
        isTransitioning,
        transitionStage,
        projectTitle,
        triggerRoomTransition,
        triggerSimpleTransition,
      }}
    >
      {children}
    </RoomTransitionContext.Provider>
  );
};

export const useRoomTransitionContext = (): RoomTransitionContextType => {
  const context = useContext(RoomTransitionContext);
  if (!context) {
    throw new Error("useRoomTransitionContext must be used within a RoomTransitionProvider");
  }
  return context;
};
