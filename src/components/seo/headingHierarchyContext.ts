import { createContext, useContext } from "react";

// Context and hook split out from HeadingHierarchyProvider.tsx so that file
// exports only its component — mixing the two costs Fast Refresh.
export interface HeadingHierarchyContextType {
  h1Used: boolean;
  setH1Used: (used: boolean) => void;
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
}

export const HeadingHierarchyContext = createContext<HeadingHierarchyContextType | undefined>(undefined);

export const useHeadingHierarchy = () => {
  const context = useContext(HeadingHierarchyContext);
  if (!context) {
    throw new Error("useHeadingHierarchy must be used within a HeadingHierarchyProvider");
  }
  return context;
};
