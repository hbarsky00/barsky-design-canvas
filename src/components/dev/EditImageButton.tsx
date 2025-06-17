
import React, { useRef, useState, useCallback } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { useParams } from 'react-router-dom';
import { compressImageFile, validateImageSize, getOptimalCompressionSettings } from '@/utils/imageCompression';
import { ImageStorageService } from '@/services/imageStorage';

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
      console.log('⚠️ EditImageButton: Click ignored - processing or no src:', {
        processing: processingRef.current,
        hasSrc: !!src
      });
      return;
    }
    
    console.log('🎯 EditImageButton: Starting image replacement for:', src.substring(0, 50) + '...');
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
      console.log('🖼️ EditImageButton: Starting image upload process:', {
        fileName: file.name,
        originalSize: `${(file.size / 1024).toFixed(2)}KB`,
        fileType: file.type,
        originalSrc: src.substring(0, 50) + '...',
        projectId: currentProjectId
      });
      
      // Validate file type first
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`Invalid file type: ${file.type}. Please use JPG, PNG, or WebP format.`);
      }
      
      // Check initial file size
      const maxInitialSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxInitialSize) {
        throw new Error(`File is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum allowed size is 50MB.`);
      }
      
      // Show loading feedback
      toast.loading("Compressing and uploading image...", { id: 'image-upload' });
      
      // Get optimal compression settings
      const { maxSizeKB } = getOptimalCompressionSettings(file);
      console.log(`📐 Using compression settings: maxSize=${maxSizeKB}KB`);
      
      // Compress the image
      const compressedFile = await compressImageFile(file, maxSizeKB);
      
      // Validate the compressed file size
      if (!validateImageSize(compressedFile, maxSizeKB)) {
        throw new Error(`Image is still too large after compression. Please use a smaller image.`);
      }
      
      console.log('☁️ Uploading to Supabase Storage...');
      const publicUrl = await ImageStorageService.uploadImage(compressedFile, currentProjectId, src);
      
      if (!publicUrl) {
        throw new Error('Failed to upload image to storage. Please try again or use a different image.');
      }
      
      // Validate the storage URL
      if (!validateImageUrl(publicUrl)) {
        throw new Error('Invalid image URL received from storage');
      }
      
      console.log('⚡ EditImageButton: IMMEDIATE callback for instant UI update');
      // Call callback IMMEDIATELY for instant visual feedback
      if (onImageReplace) {
        onImageReplace(publicUrl);
      }
      
      // Dispatch IMMEDIATE visual update event FIRST
      const immediateEventDetail = { 
        projectId: currentProjectId, 
        imageReplaced: true, 
        immediate: true,
        src: src,
        newSrc: publicUrl,
        timestamp: Date.now(),
        changeType: 'image',
        isValidUrl: validateImageUrl(publicUrl),
        source: 'EditImageButton-immediate'
      };
      
      console.log('📡 EditImageButton: Dispatching IMMEDIATE visual update event:', immediateEventDetail);
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: immediateEventDetail
      }));
      
      console.log('💾 EditImageButton: Saving image URL reference to database...');
      const success = await saveChange('image', src, publicUrl);
      
      if (success) {
        console.log('✅ EditImageButton: Image uploaded and reference saved successfully');
        
        // Dispatch database update confirmation event
        const dbEventDetail = { 
          projectId: currentProjectId, 
          imageReplaced: true, 
          databaseSaved: true,
          src: src,
          newSrc: publicUrl,
          timestamp: Date.now(),
          changeType: 'image',
          source: 'EditImageButton-database'
        };
        
        console.log('📡 EditImageButton: Dispatching database save confirmation event:', dbEventDetail);
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: dbEventDetail
        }));
        
        const finalSizeKB = (compressedFile.size / 1024).toFixed(2);
        toast.success("Image uploaded successfully!", {
          id: 'image-upload',
          description: `Uploaded ${finalSizeKB}KB to cloud storage.`,
          duration: 3000,
        });
      } else {
        throw new Error('Failed to save image reference to database');
      }
    } catch (error) {
      console.error('❌ EditImageButton: Error uploading image:', error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
      // Provide specific error guidance
      let description = "Try using a smaller image or different format (JPG/PNG).";
      
      if (errorMessage.includes('file type') || errorMessage.includes('format')) {
        description = "Please use JPG, PNG, or WebP format.";
      } else if (errorMessage.includes('too large') || errorMessage.includes('size')) {
        description = "Please use a smaller image (under 50MB).";
      } else if (errorMessage.includes('storage') || errorMessage.includes('upload')) {
        description = "Storage service temporarily unavailable. Please try again.";
      }
      
      toast.error("Failed to upload image", {
        id: 'image-upload',
        description: `${errorMessage} ${description}`
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
          {isProcessing ? 'Uploading...' : 'Replace'}
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
