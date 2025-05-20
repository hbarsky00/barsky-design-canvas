
import React from "react";

interface ZoomableImageProps {
  image: string;
  title: string;
  scale: number;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  image,
  title,
  scale,
}) => {
  return (
    <div 
      className="relative cursor-grab active:cursor-grabbing transition-all duration-200 overflow-auto"
      style={{
        transform: `scale(${scale})`,
        maxWidth: '100%',
        maxHeight: '100%'
      }}
    >
      <img
        src={image}
        alt={title}
        className="max-w-full max-h-full object-contain"
        loading="lazy"
      />
    </div>
  );
};

export default ZoomableImage;
