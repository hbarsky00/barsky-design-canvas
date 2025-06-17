
import React, { useRef, useState, useCallback } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { useParams } from 'react-router-dom';

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
      console.log('🖼️ Starting image upload process:', {
        fileName: file.name,
        fileSize: file.size,
        originalSrc: src.substring(0, 50) + '...',
        projectId: currentProjectId
      });
      
      // Show immediate loading feedback
      toast.loading("Processing image...", { id: 'image-upload' });
      
      // Convert file to data URL
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          console.log('✅ File converted to data URL:', result.substring(0, 50) + '...');
          resolve(result);
        };
        reader.onerror = () => {
          console.error('❌ Failed to read file');
          reject(new Error('Failed to read file'));
        };
        reader.readAsDataURL(file);
      });
      
      // Validate the data URL
      if (!validateImageUrl(dataUrl)) {
        throw new Error('Invalid image data URL generated');
      }
      
      // Save to database and wait for completion
      console.log('💾 Saving image change to database...');
      const success = await saveChange('image', src, dataUrl);
      
      if (success) {
        console.log('✅ Image saved successfully, triggering UI updates');
        
        // Call callback immediately for instant UI feedback
        if (onImageReplace) {
          onImageReplace(dataUrl);
        }
        
        // Dispatch update event with detailed info
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId: currentProjectId, 
            imageReplaced: true, 
            immediate: true,
            src: src,
            newSrc: dataUrl,
            timestamp: Date.now(),
            changeType: 'image',
            isValidUrl: validateImageUrl(dataUrl)
          }
        }));
        
        toast.success("Image replaced!", {
          id: 'image-upload',
          description: `Replaced with "${file.name}". Click "Publish Changes" to make it permanent.`,
          duration: 3000,
        });
      } else {
        throw new Error('Failed to save image replacement to database');
      }
    } catch (error) {
      console.error('❌ Error replacing image:', error);
      toast.error("Failed to replace image", {
        id: 'image-upload',
        description: error instanceof Error ? error.message : "There was an error processing the image file."
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
          {isProcessing ? 'Processing...' : 'Replace'}
        </Button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        disabled={isProcessing}
      />
    </>
  );
};

export default EditImageButton;
