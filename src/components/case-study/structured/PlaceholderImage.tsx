
import React from "react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  title: string;
  className?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ 
  title, 
  className 
}) => {
  console.log('🖼️ PlaceholderImage rendering with title:', title);
  
  return (
    <div className={cn(
      "relative rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800",
      "min-h-[400px] md:min-h-[500px] lg:min-h-[600px]",
      "w-full",
      className
    )}
    style={{ 
      contain: 'layout',
      willChange: 'transform',
      aspectRatio: '16/9'
    }}>
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
        {/* Section title */}
        <h3 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 max-w-md">
          {title}
        </h3>
        
        {/* Caption */}
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Placeholder — replace with final image
        </p>
      </div>
      
      {/* Subtle pattern overlay for texture */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
    </div>
  );
};

export default PlaceholderImage;
