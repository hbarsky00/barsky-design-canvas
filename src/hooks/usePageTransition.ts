import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const triggerTransition = (callback?: () => void) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      callback?.();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 350);
  };

  return {
    isTransitioning,
    triggerTransition
  };
};