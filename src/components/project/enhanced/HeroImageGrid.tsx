
import React from "react";
import { motion } from "framer-motion";
import HeroImageSlot from "./HeroImageSlot";
import { useDevMode } from "@/context/DevModeContext";

interface HeroImageGridProps {
  heroImages: Array<{
    id: string;
    src: string;
    position: number;
  }>;
  imageCaptions: Record<string, string>;
  projectId: string;
  draggedIndex: number | null;
  onImageReplace: (id: string, newSrc: string) => void;
  onRemoveImage: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (index: number) => void;
  onDragEnd: () => void;
  onCaptionUpdate?: (id: string, newCaption: string) => void;
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
  onDragEnd,
  onCaptionUpdate
}) => {
  const { isDevMode } = useDevMode();

  if (heroImages.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No showcase images</p>
      </div>
    );
  }

  if (heroImages.length === 1) {
    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
        <HeroImageSlot
          image={heroImages[0]}
          caption={imageCaptions[heroImages[0].src]}
          projectId={projectId}
          index={0}
          isDragged={draggedIndex === 0}
          onImageReplace={onImageReplace}
          onRemoveImage={onRemoveImage}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragEnd={onDragEnd}
          onCaptionUpdate={onCaptionUpdate}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-0">
      {/* Mobile: Stack images vertically with full width */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:hidden">
        {heroImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="w-full"
          >
            <HeroImageSlot
              image={image}
              caption={imageCaptions[image.src]}
              projectId={projectId}
              index={index}
              isDragged={draggedIndex === index}
              onImageReplace={onImageReplace}
              onRemoveImage={onRemoveImage}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragEnd={onDragEnd}
              onCaptionUpdate={onCaptionUpdate}
            />
          </motion.div>
        ))}
      </div>

      {/* Desktop: Side by side layout */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
        {heroImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="w-full"
          >
            <HeroImageSlot
              image={image}
              caption={imageCaptions[image.src]}
              projectId={projectId}
              index={index}
              isDragged={draggedIndex === index}
              onImageReplace={onImageReplace}
              onRemoveImage={onRemoveImage}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragEnd={onDragEnd}
              onCaptionUpdate={onCaptionUpdate}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroImageGrid;
