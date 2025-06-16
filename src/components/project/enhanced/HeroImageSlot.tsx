
import React from "react";
import { Button } from "@/components/ui/button";
import { X, GripVertical } from "lucide-react";
import MaximizableImage from "../MaximizableImage";
import { useDevMode } from "@/context/DevModeContext";

interface HeroImageSlotProps {
  imageData: { url: string; title: string };
  index: number;
  isEmptySlot: boolean;
  isDragging: boolean;
  imageCaptions: Record<string, string>;
  heroImages: { url: string; title: string }[];
  projectId: string;
  onImageReplace: (index: number, newSrc: string) => void;
  onRemoveImage: (index: number) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
}

const HeroImageSlot: React.FC<HeroImageSlotProps> = ({
  imageData,
  index,
  isEmptySlot,
  isDragging,
  imageCaptions,
  heroImages,
  projectId,
  onImageReplace,
  onRemoveImage,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd
}) => {
  const { isDevMode } = useDevMode();

  return (
    <div 
      className={`relative group/image ${
        isDragging ? 'opacity-50' : ''
      } ${isEmptySlot && isDevMode ? 'opacity-60' : ''}`}
      draggable={isDevMode && !isEmptySlot}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
    >
      {isDevMode && !isEmptySlot && (
        <div className="absolute top-2 right-2 z-30 flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover/image:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <GripVertical className="h-3 w-3" />
          </Button>
          <Button
            onClick={() => onRemoveImage(index)}
            variant="destructive"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover/image:opacity-100 transition-opacity"
            title="Remove image"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <MaximizableImage
        src={imageData.url}
        alt={imageData.title}
        caption={imageCaptions[imageData.url] || imageData.title}
        imageList={heroImages.map(img => img.url)}
        currentIndex={index}
        priority={index === 0}
        className={`rounded-xl shadow-elevated-lg w-full overflow-hidden ${
          isEmptySlot && isDevMode 
            ? 'border-2 border-dashed border-gray-300' 
            : ''
        }`}
        onImageReplace={(newSrc) => onImageReplace(index, newSrc)}
        projectId={projectId}
      />
    </div>
  );
};

export default HeroImageSlot;
