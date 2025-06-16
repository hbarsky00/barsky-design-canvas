
import React from "react";
import HeroImageSlot from "./HeroImageSlot";

interface HeroImageGridProps {
  heroImages: { url: string; title: string }[];
  imageCaptions: Record<string, string>;
  projectId: string;
  draggedIndex: number | null;
  onImageReplace: (index: number, newSrc: string) => void;
  onRemoveImage: (index: number) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
}

const HeroImageGrid: React.FC<HeroImageGridProps> = ({
  heroImages,
  imageCaptions,
  projectId,
  draggedIndex,
  onImageReplace,
  onRemoveImage,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd
}) => {
  // Always show exactly 2 slots, filling with existing images or placeholders
  const displaySlots = Array.from({ length: 2 }, (_, index) => {
    if (index < heroImages.length) {
      return heroImages[index];
    }
    return {
      url: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
      title: "Empty slot - click to add image"
    };
  });

  return (
    <div className="floating-element">
      <div className="glass-card p-4 layered-depth">
        <div className="grid grid-cols-2 gap-4">
          {displaySlots.map((imageData, index) => {
            const isEmptySlot = index >= heroImages.length;
            
            return (
              <HeroImageSlot
                key={`${imageData.url}-${index}`}
                imageData={imageData}
                index={index}
                isEmptySlot={isEmptySlot}
                isDragging={draggedIndex === index}
                imageCaptions={imageCaptions}
                heroImages={heroImages}
                projectId={projectId}
                onImageReplace={onImageReplace}
                onRemoveImage={onRemoveImage}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroImageGrid;
