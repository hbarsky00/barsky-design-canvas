
import { useState, useEffect } from "react";
import { useProjectDataUpdater } from "@/hooks/useProjectDataUpdater";
import { useProjectPersistence } from "@/hooks/useProjectPersistence";

interface HeroImage {
  id: string;
  src: string;
  position: number;
}

interface UseHeroImagesProps {
  projectId: string;
}

export const useHeroImages = ({ projectId }: UseHeroImagesProps) => {
  const { updateImageInProjectData, getUpdatedImagePath } = useProjectDataUpdater();
  const { saveContentBlocks } = useProjectPersistence(projectId);

  // Define which projects have hero images and their URLs
  const projectHeroImagesData: Record<string, { url: string; title: string }[]> = {
    "medication-app": [
      {
        url: "/lovable-uploads/5ebc710e-fd8f-40aa-b092-99290c136a57.png",
        title: "Medication App Task Completion Interface"
      }
    ],
    "investor-loan-app": [
      {
        url: "/lovable-uploads/b49f4918-37cd-4ffa-bae3-2468e22f2fce.png",
        title: "Advanced Search Functionality"
      },
      {
        url: "/lovable-uploads/d9596b32-c5a5-42bd-9229-db1b496aeea4.png",
        title: "Advanced Loans Orderbook Interface"
      }
    ]
  };

  const initialImagesData = projectHeroImagesData[projectId] || [];
  const initialImages: HeroImage[] = initialImagesData.map((img, index) => ({
    id: `hero-${index}`,
    src: img.url,
    position: index
  }));

  const [heroImages, setHeroImages] = useState<HeroImage[]>(initialImages);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Apply any existing image updates from localStorage
  useEffect(() => {
    const updateImagesWithLatestPaths = () => {
      return heroImages.map(img => {
        const updatedSrc = getUpdatedImagePath(projectId, img.src);
        return updatedSrc !== img.src ? { ...img, src: updatedSrc } : img;
      });
    };

    setHeroImages(prev => updateImagesWithLatestPaths());
  }, [projectId, getUpdatedImagePath]);

  // Save hero images to content blocks whenever they change
  useEffect(() => {
    if (heroImages.length > 0) {
      console.log('🔄 useHeroImages: Saving hero images to content blocks');
      saveContentBlocks('hero_images', heroImages);
    }
  }, [heroImages, saveContentBlocks]);

  const handleAddImage = () => {
    const newImage: HeroImage = {
      id: `hero-${heroImages.length}`,
      src: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
      position: heroImages.length
    };
    setHeroImages(prev => [...prev, newImage]);
  };

  const handleRemoveImage = (id: string) => {
    console.log('🗑️ useHeroImages: Removing hero image with id:', id);
    setHeroImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      // Reorder positions after removal
      return filtered.map((img, index) => ({ ...img, position: index }));
    });
  };

  const handleImageReplace = (id: string, newSrc: string) => {
    console.log('useHeroImages: Replacing image with id', id, 'with', newSrc, 'for project', projectId);
    
    const oldImage = heroImages.find(img => img.id === id);
    setHeroImages(prev => prev.map(img => 
      img.id === id ? { ...img, src: newSrc } : img
    ));
    
    // Also update the project data
    if (oldImage) {
      updateImageInProjectData(projectId, oldImage.src, newSrc);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newImages = [...heroImages];
    const draggedImage = newImages[draggedIndex];
    
    // Remove the dragged image
    newImages.splice(draggedIndex, 1);
    
    // Insert at new position
    const insertIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newImages.splice(insertIndex, 0, draggedImage);
    
    // Update positions
    const updatedImages = newImages.map((img, index) => ({
      ...img,
      position: index
    }));
    
    setHeroImages(updatedImages);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return {
    heroImages,
    draggedIndex,
    handleAddImage,
    handleRemoveImage,
    handleImageReplace,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  };
};
