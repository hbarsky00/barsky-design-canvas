
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getOverlayLabelClasses } from "@/utils/captionStyles";

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
}

const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  title,
  description
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="before-after-container space-y-6">
      {title && (
        <div className="text-center">
          <h3 className="text-heading-2 text-navy-primary mb-2">{title}</h3>
          {description && (
            <p className="text-body text-neutral-500">{description}</p>
          )}
        </div>
      )}

      <div 
        className="relative aspect-[16/10] overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-lg flex items-center justify-center">
            <ArrowRight className="h-4 w-4 text-navy-primary" />
          </div>
        </div>

        {/* Labels */}
        <div className={getOverlayLabelClasses("left-4")}>
          {beforeLabel}
        </div>
        <div className={getOverlayLabelClasses("right-4")}>
          {afterLabel}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isDragging ? 0 : 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 text-sm"
        >
          Drag to compare
        </motion.div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
