import React from "react";
import { ImageAnnotation } from "@/data/structuredCaseStudies";

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
  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-lg shadow-sm"
        loading="lazy"
        decoding="async"
      />
      
      {annotations.map((annotation, index) => (
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
            <div className={`px-3 py-2 text-sm text-white rounded-lg shadow-lg min-w-[280px] w-80 max-w-[90vw] sm:min-w-[300px] sm:max-w-none whitespace-normal ${
              annotation.type === 'issue' ? 'bg-red-600' :
              annotation.type === 'improvement' ? 'bg-blue-600' :
              'bg-green-600'
            }`}>
              {annotation.text}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent ${
                annotation.type === 'issue' ? 'border-t-red-600' :
                annotation.type === 'improvement' ? 'border-t-blue-600' :
                'border-t-green-600'
              }`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnotatedImage;