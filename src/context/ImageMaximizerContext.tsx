
import React, { createContext, useContext, useState, ReactNode } from 'react';
import ImageMaximizer from '@/components/project/ImageMaximizer';

interface ImageMaximizerContextType {
  maximizeImage: (image: string, title: string, imageList?: string[], currentIndex?: number) => void;
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
  const [imageList, setImageList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const maximizeImage = (image: string, title: string, images?: string[], index?: number) => {
    setMaximizedImage(image);
    setMaximizedTitle(title);
    
    if (images && images.length > 0) {
      setImageList(images);
      setCurrentIndex(index !== undefined ? index : images.indexOf(image));
    } else {
      setImageList([image]);
      setCurrentIndex(0);
    }
  };
  
  const handleCloseMaximizer = () => {
    setMaximizedImage(null);
    setMaximizedTitle("");
    setImageList([]);
    setCurrentIndex(0);
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
          imageList={imageList}
          currentIndex={currentIndex}
        />
      )}
    </ImageMaximizerContext.Provider>
  );
};
