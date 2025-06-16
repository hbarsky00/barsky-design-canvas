
import { useState, useEffect } from "react";
import { useProjectDataUpdater } from "@/hooks/useProjectDataUpdater";

interface HeroImage {
  url: string;
  title: string;
}

interface UseHeroImagesProps {
  projectId: string;
}

export const useHeroImages = ({ projectId }: UseHeroImagesProps) => {
  const { updateImageInProjectData, getUpdatedImagePath } = useProjectDataUpdater();

  // Define which projects have hero images and their URLs
  const projectHeroImages: Record<string, HeroImage[]> = {
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

  const initialImages = projectHeroImages[projectId] || [];
  const [heroImages, setHeroImages] = useState<HeroImage[]>(initialImages);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Apply any existing image updates from localStorage
  useEffect(() => {
    const updateImagesWithLatestPaths = () => {
      return heroImages.map(img => {
        const updatedUrl = getUpdatedImagePath(projectId, img.url);
        return updatedUrl !== img.url ? { ...img, url: updatedUrl } : img;
      });
    };

    setHeroImages(prev => updateImagesWithLatestPaths());
  }, [projectId, getUpdatedImagePath]);

  const handleAddImage = () => {
    const newImage: HeroImage = {
      url: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
      title: "New showcase image"
    };
    setHeroImages(prev => [...prev, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    setHeroImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageReplace = (index: number, newSrc: string) => {
    console.log('useHeroImages: Replacing image at index', index, 'with', newSrc, 'for project', projectId);
    
    // Update the hero images state immediately for UI feedback
    if (index >= heroImages.length) {
      const newImages = [...heroImages];
      // Fill gaps with placeholder images if needed
      while (newImages.length <= index) {
        newImages.push({
          url: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
          title: "New showcase image"
        });
      }
      // Replace the image at the specific index
      newImages[index] = {
        url: newSrc,
        title: `Showcase image ${index + 1}`
      };
      setHeroImages(newImages);
    } else {
      // Normal replacement for existing images
      const oldImage = heroImages[index];
      setHeroImages(prev => prev.map((img, i) => 
        i === index ? { ...img, url: newSrc } : img
      ));
      
      // Also update the project data
      if (oldImage) {
        updateImageInProjectData(projectId, oldImage.url, newSrc);
      }
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
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
    
    setHeroImages(newImages);
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
