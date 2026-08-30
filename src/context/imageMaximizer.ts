import { createContext, useContext } from "react";

// The context and its hook live here, apart from the provider component, so
// that ImageMaximizerContext.tsx exports only components. A file that mixes
// components with other exports loses React Fast Refresh for the whole file.
export interface ImageMaximizerContextType {
  maximizeImage: (image: string, title: string, imageList?: string[], currentIndex?: number) => void;
}

export const ImageMaximizerContext = createContext<ImageMaximizerContextType | undefined>(undefined);

export const useImageMaximizer = () => {
  const context = useContext(ImageMaximizerContext);
  if (!context) {
    // Fallback no-op so consumers rendered outside a provider don't crash the page.
    console.warn('useImageMaximizer used outside ImageMaximizerProvider — using no-op fallback.');
    return { maximizeImage: () => {} } as ImageMaximizerContextType;
  }
  return context;
};
