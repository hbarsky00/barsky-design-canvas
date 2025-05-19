
import React, { createContext, useContext, useState, ReactNode } from 'react';
import ImageMaximizer from '@/components/project/ImageMaximizer';

interface ImageMaximizerContextType {
  maximizeImage: (image: string, title: string) => void;
}

const ImageMaximizerContext = createContext<ImageMaximizerContextType | undefined>(undefined);

export const useImageMaximizer = () => {
  const context = useContext(ImageMaximizerContext);
  if (!context) {
    throw new Error('useImageMaximizer must be used within an ImageMaximizerProvider');
  }
  return context;
};

interface ImageMaximizerProviderProps {
  children: ReactNode;
}

export const ImageMaximizerProvider: React.FC<ImageMaximizerProviderProps> = ({ children }) => {
  const [maximizedImage, setMaximizedImage] = useState<string | null>(null);
  const [maximizedTitle, setMaximizedTitle] = useState("");
  
  const maximizeImage = (image: string, title: string) => {
    setMaximizedImage(image);
    setMaximizedTitle(title);
  };
  
  const handleCloseMaximizer = () => {
    setMaximizedImage(null);
    setMaximizedTitle("");
  };
  
  return (
    <ImageMaximizerContext.Provider value={{ maximizeImage }}>
      {children}
      
      {/* Image Maximizer Component */}
      {maximizedImage && (
        <ImageMaximizer
          image={maximizedImage}
          title={maximizedTitle}
          isOpen={!!maximizedImage}
          onClose={handleCloseMaximizer}
        />
      )}
    </ImageMaximizerContext.Provider>
  );
};
