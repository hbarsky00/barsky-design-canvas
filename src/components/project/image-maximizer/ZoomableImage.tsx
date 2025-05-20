
import React, { useState, useRef, useEffect } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  // Reset position when scale changes or image changes
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [scale, image]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    
    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners to handle cases when mouse leaves the container
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };
    
    window.addEventListener('mouseup', handleMouseUpGlobal);
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`relative transition-transform duration-200 flex items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${scale <= 1 ? 'cursor-default' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        overflow: 'hidden',
        width: '100%',
        height: '100%'
      }}
    >
      <div
        className="transition-transform duration-200"
        style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
        }}
      >
        <img
          src={image}
          alt={title}
          className="max-w-full max-h-full object-contain"
          loading="lazy"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ZoomableImage;
