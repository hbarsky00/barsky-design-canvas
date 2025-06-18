
import React from "react";
import { Button } from "@/components/ui/button";
import { X, GripVertical } from "lucide-react";
import MaximizableImage from "../MaximizableImage";
import { useDevMode } from "@/context/DevModeContext";

interface HeroImageSlotProps {
  image: {
    id: string;
    src: string;
    position: number;
  };
  caption?: string;
  projectId: string;
  index: number;
  isDragged: boolean;
  onImageReplace: (id: string, newSrc: string) => void;
  onRemoveImage: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (index: number) => void;
  onDragEnd: () => void;
}

const HeroImageSlot: React.FC<HeroImageSlotProps> = ({
  image,
  caption,
  projectId,
  index,
  isDragged,
  onImageReplace,
  onRemoveImage,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd
}) => {
  const { isDevMode } = useDevMode();

  const handleImageRemove = () => {
    console.log('🗑️ HeroImageSlot: Removing image:', image.id);
    onRemoveImage(image.id);
  };

  const handleImageReplace = (newSrc: string) => {
    console.log('🔄 HeroImageSlot: Replacing image:', image.id, 'with', newSrc);
    onImageReplace(image.id, newSrc);
  };

  return (
    <div 
      className={`relative group/image ${
        isDragged ? 'opacity-50' : ''
      }`}
      draggable={isDevMode}
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(index)}
      onDragEnd={onDragEnd}
    >
      {isDevMode && (
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
            onClick={handleImageRemove}
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
        src={image.src}
        alt={caption || `Showcase image ${index + 1}`}
        caption={caption}
        imageList={[image.src]}
        currentIndex={0}
        priority={index === 0}
        className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
        onImageReplace={handleImageReplace}
        onImageRemove={handleImageRemove}
        projectId={projectId}
        hideEditButton={false}
        allowRemove={true}
      />
    </div>
  );
};

export default HeroImageSlot;
