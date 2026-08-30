import React, { useState } from "react";
import { HeadingHierarchyContext } from "./headingHierarchyContext";

interface HeadingHierarchyProviderProps {
  children: React.ReactNode;
}

/**
 * Provider to track and enforce proper heading hierarchy (H1 -> H2 -> H3) 
 * across the application for better SEO and accessibility.
 */
export const HeadingHierarchyProvider: React.FC<HeadingHierarchyProviderProps> = ({ children }) => {
  const [h1Used, setH1Used] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);

  return (
    <HeadingHierarchyContext.Provider value={{
      h1Used,
      setH1Used,
      currentLevel,
      setCurrentLevel
    }}>
      {children}
    </HeadingHierarchyContext.Provider>
  );
};