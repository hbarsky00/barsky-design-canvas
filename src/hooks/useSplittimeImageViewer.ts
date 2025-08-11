import { useState, useEffect } from "react";

export const useSplittimeImageViewer = () => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({ src: '', alt: '', caption: '' });
  const [currentZoom, setCurrentZoom] = useState(1);

  const openImageViewer = (imageId: string) => {
    const imgElement = document.getElementById(imageId) as HTMLImageElement;
    if (imgElement) {
      const figcaption = imgElement.parentElement?.querySelector('figcaption');
      setCurrentImage({
        src: imgElement.src,
        alt: imgElement.alt,
        caption: figcaption?.textContent || imgElement.alt
      });
      setViewerOpen(true);
      setCurrentZoom(1);
    }
  };

  const closeImageViewer = () => {
    setViewerOpen(false);
    setCurrentZoom(1);
  };

  const zoomIn = () => {
    setCurrentZoom(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setCurrentZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setCurrentZoom(1);
  };

  const handleImageKeypress = (event: React.KeyboardEvent, imageId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openImageViewer(imageId);
    }
  };

  // Keyboard navigation for viewer
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (!viewerOpen) return;
      
      switch(event.key) {
        case 'Escape':
          closeImageViewer();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [viewerOpen]);

  return {
    viewerOpen,
    currentImage,
    currentZoom,
    openImageViewer,
    closeImageViewer,
    zoomIn,
    zoomOut,
    resetZoom,
    handleImageKeypress
  };
};