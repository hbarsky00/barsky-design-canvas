import React, { createContext, useContext, useState } from "react";

interface HeadingHierarchyContextType {
  h1Used: boolean;
  setH1Used: (used: boolean) => void;
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
}

const HeadingHierarchyContext = createContext<HeadingHierarchyContextType | undefined>(undefined);

export const useHeadingHierarchy = () => {
  const context = useContext(HeadingHierarchyContext);
  if (!context) {
    throw new Error("useHeadingHierarchy must be used within a HeadingHierarchyProvider");
  }
  return context;
};

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