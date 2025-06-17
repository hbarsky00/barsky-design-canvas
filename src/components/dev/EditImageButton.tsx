
import React, { useRef, useState, useCallback } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { useParams } from 'react-router-dom';
import { compressImageFile, validateImageSize, getOptimalCompressionSettings } from '@/utils/imageCompression';

interface EditImageButtonProps {
  src?: string;
  onImageReplace?: (newSrc: string) => void;
  projectId?: string;
}

const EditImageButton: React.FC<EditImageButtonProps> = ({ src, onImageReplace, projectId }) => {
  const { isDevMode } = useDevMode();
  const { projectId: routeProjectId } = useParams<{ projectId: string }>();
  const currentProjectId = projectId || routeProjectId || '';
  const { saveChange } = useDevModeDatabase(currentProjectId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingRef = useRef(false);

  const validateImageUrl = (url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    return url.startsWith('data:') || 
           url.startsWith('blob:') || 
           url.startsWith('http://') || 
           url.startsWith('https://') ||
           url.startsWith('/');
  };

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (processingRef.current || !src) {
      return;
    }
    
    fileInputRef.current?.click();
  }, [src]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file || !src || !currentProjectId || processingRef.current) {
      if (e.target) e.target.value = '';
      return;
    }

    setIsProcessing(true);
    processingRef.current = true;
    
    try {
      console.log('🖼️ Starting image optimization process:', {
        fileName: file.name,
        originalSize: `${(file.size / 1024).toFixed(2)}KB`,
        originalSrc: src.substring(0, 50) + '...',
        projectId: currentProjectId
      });
      
      // Show immediate loading feedback
      toast.loading("Optimizing and compressing image...", { id: 'image-upload' });
      
      // Get optimal settings based on file size
      const { maxSizeKB, quality } = getOptimalCompressionSettings(file);
      console.log(`📐 Using compression settings: maxSize=${maxSizeKB}KB, quality=${quality}`);
      
      // Compress the image with optimal settings
      const compressedDataUrl = await compressImageFile(file, maxSizeKB);
      
      // Validate the compressed image size
      if (!validateImageSize(compressedDataUrl, maxSizeKB)) {
        throw new Error(`Image is still too large after compression. Please use a smaller image or try a different format.`);
      }
      
      // Validate the data URL
      if (!validateImageUrl(compressedDataUrl)) {
        throw new Error('Invalid image data URL generated during compression');
      }
      
      // Save to database
      console.log('💾 Saving optimized image change to database...');
      const success = await saveChange('image', src, compressedDataUrl);
      
      if (success) {
        console.log('✅ Image optimized and saved successfully');
        
        // Call callback immediately for instant UI feedback
        if (onImageReplace) {
          onImageReplace(compressedDataUrl);
        }
        
        // Dispatch update event
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId: currentProjectId, 
            imageReplaced: true, 
            immediate: true,
            src: src,
            newSrc: compressedDataUrl,
            timestamp: Date.now(),
            changeType: 'image',
            isValidUrl: validateImageUrl(compressedDataUrl)
          }
        }));
        
        const finalSizeKB = (compressedDataUrl.length * 0.75 / 1024).toFixed(2);
        toast.success("Image optimized and replaced!", {
          id: 'image-upload',
          description: `Compressed to ${finalSizeKB}KB. Click "Publish Changes" to make it permanent.`,
          duration: 3000,
        });
      } else {
        throw new Error('Failed to save optimized image to database');
      }
    } catch (error) {
      console.error('❌ Error optimizing image:', error);
      const errorMessage = error instanceof Error ? error.message : "There was an error optimizing the image file.";
      
      toast.error("Failed to optimize image", {
        id: 'image-upload',
        description: errorMessage + " Try using a smaller image or different format (JPG/PNG)."
      });
    } finally {
      setIsProcessing(false);
      processingRef.current = false;
      if (e.target) e.target.value = '';
    }
  }, [src, currentProjectId, saveChange, onImageReplace]);

  if (!isDevMode || !src) {
    return null;
  }

  return (
    <>
      <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          onClick={handleEditClick}
          variant="secondary"
          size="sm"
          className="shadow-md"
          disabled={isProcessing}
        >
          <Upload className="h-4 w-4 mr-2" />
          {isProcessing ? 'Optimizing...' : 'Replace'}
        </Button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        disabled={isProcessing}
      />
    </>
  );
};

export default EditImageButton;
