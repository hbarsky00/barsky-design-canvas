import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BackgroundRemovalService } from '@/services/backgroundRemovalService';
import { toast } from 'sonner';

interface BackgroundRemovalProcessorProps {
  currentImageSrc: string;
  onImageProcessed: (newImageSrc: string) => void;
}

const BackgroundRemovalProcessor: React.FC<BackgroundRemovalProcessorProps> = ({
  currentImageSrc,
  onImageProcessed
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveBackground = async () => {
    if (!currentImageSrc) {
      toast.error('No image to process');
      return;
    }

    setIsProcessing(true);
    toast.info('Removing background... This may take a moment.');

    try {
      const processedImageUrl = await BackgroundRemovalService.processAndUploadImage(
        currentImageSrc
      );
      
      onImageProcessed(processedImageUrl);
      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Background removal failed:', error);
      toast.error('Failed to remove background. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2">
      <Button
        onClick={handleRemoveBackground}
        disabled={isProcessing}
        variant="outline"
        size="sm"
      >
        {isProcessing ? 'Processing...' : 'Remove Background'}
      </Button>
    </div>
  );
};

export default BackgroundRemovalProcessor;