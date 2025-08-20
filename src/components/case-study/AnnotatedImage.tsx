import React, { useState, useEffect } from "react";
import { ImageAnnotation } from "@/data/structuredCaseStudies";
import { getResponsiveTruncatedText } from "@/utils/captionStyles";

interface AnnotatedImageProps {
  src: string;
  alt: string;
  annotations?: ImageAnnotation[];
  className?: string;
}

const AnnotatedImage: React.FC<AnnotatedImageProps> = ({
  src,
  alt,
  annotations = [],
  className = ""
}) => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Sort annotations by priority and limit based on screen size
  const priorityOrder = { issue: 3, improvement: 2, feature: 1 };
  const sortedAnnotations = [...annotations].sort((a, b) => 
    (priorityOrder[b.type as keyof typeof priorityOrder] || 0) - 
    (priorityOrder[a.type as keyof typeof priorityOrder] || 0)
  );

  const maxAnnotations = screenSize === 'mobile' ? 2 : screenSize === 'tablet' ? 3 : annotations.length;
  const visibleAnnotations = sortedAnnotations.slice(0, maxAnnotations);
  const hiddenCount = annotations.length - visibleAnnotations.length;

  // Get appropriate text truncation with word boundaries
  const getTruncatedText = (text: string) => {
    const maxLength = screenSize === 'mobile' ? 42 : screenSize === 'tablet' ? 58 : 75;
    
    if (text.length <= maxLength) return text;
    
    // Find the last complete word that fits within the limit
    const truncated = text.substring(0, maxLength - 3);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    // If we can find a word boundary, use it; otherwise fall back to character truncation
    const finalText = lastSpaceIndex > maxLength * 0.7 ? truncated.substring(0, lastSpaceIndex) : truncated;
    return finalText + "...";
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-lg shadow-sm"
        loading="lazy"
        decoding="async"
      />
      
      {visibleAnnotations.map((annotation, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${annotation.x}%`,
            top: `${annotation.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Callout dot */}
          <div 
            className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
              annotation.type === 'issue' ? 'bg-red-500' :
              annotation.type === 'improvement' ? 'bg-blue-500' :
              'bg-green-500'
            }`}
          />
          
          {/* Always visible text */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
            <div className={`px-3 py-2 text-xs sm:text-sm text-white rounded-lg shadow-lg w-48 max-w-[192px] sm:w-52 sm:max-w-[208px] lg:w-64 lg:max-w-[256px] whitespace-normal ${
              annotation.type === 'issue' ? 'bg-red-600' :
              annotation.type === 'improvement' ? 'bg-blue-600' :
              'bg-green-600'
            }`}>
              {getTruncatedText(annotation.text)}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent ${
                annotation.type === 'issue' ? 'border-t-red-600' :
                annotation.type === 'improvement' ? 'border-t-blue-600' :
                'border-t-green-600'
              }`} />
            </div>
          </div>
        </div>
      ))}

      {/* Hidden annotations indicator */}
      {hiddenCount > 0 && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          +{hiddenCount} more
        </div>
      )}
    </div>
  );
};

export default AnnotatedImage;