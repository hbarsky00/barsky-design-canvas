
import React, { useRef, useState, useCallback } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Upload, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { compressImageFile, validateImageSize, getOptimalCompressionSettings } from '@/utils/imageCompression';
import { ImageStorageService } from '@/services/imageStorage';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';

interface EditImageButtonProps {
  src?: string;
  onImageReplace?: (newSrc: string) => void;
  onImageRemove?: () => void;
  projectId?: string;
  allowRemove?: boolean;
}

const EditImageButton: React.FC<EditImageButtonProps> = ({ 
  src, 
  onImageReplace, 
  onImageRemove,
  projectId,
  allowRemove = true 
}) => {
  const { isDevMode } = useDevMode();
  const { projectId: routeProjectId } = useParams<{ projectId: string }>();
  const currentProjectId = projectId || routeProjectId || '';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingRef = useRef(false);
  const { saveChange } = useDevModeDatabase(currentProjectId);
  const { setCaption } = useSimpleCaptions(currentProjectId);

  const validateImageUrl = (url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    return url.startsWith('data:') || 
           url.startsWith('blob:') || 
           url.startsWith('http://') || 
           url.startsWith('https://') ||
           url.startsWith('/');
  };

  const generateAiCaption = async (imageSrc: string): Promise<string> => {
    try {
      console.log('🤖 EditImageButton: Generating AI caption for new image:', imageSrc.substring(0, 30) + '...');
      
      const response = await fetch('/functions/v1/generate-image-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ 
          imageSrc,
          contextType: 'project'
        }),
      });

      if (!response.ok) {
        throw new Error(`AI caption generation failed: ${response.status}`);
      }

      const data = await response.json();
      const caption = data.caption || 'Professional project showcase demonstrating innovative solutions and user-centered design';
      
      console.log('✅ EditImageButton: AI caption generated:', caption.substring(0, 50) + '...');
      return caption;
    } catch (error) {
      console.warn('⚠️ EditImageButton: AI caption generation failed, using fallback:', error);
      return 'Professional project showcase demonstrating innovative solutions and user-centered design';
    }
  };

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (processingRef.current || !src) {
      return;
    }
    
    console.log('🎯 EditImageButton: Starting image replacement for:', src.substring(0, 50) + '...');
    fileInputRef.current?.click();
  }, [src]);

  const handleRemoveClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (processingRef.current || !onImageRemove) {
      return;
    }
    
    console.log('🗑️ EditImageButton: Removing image:', src?.substring(0, 50) + '...');
    onImageRemove();
    toast.success('Image removed successfully');
  }, [src, onImageRemove]);

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
      toast.loading("Uploading image and generating AI caption...", { id: 'image-upload' });
      
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
      
      console.log('💾 EditImageButton: Saving image replacement to database for persistence');
      // Save to database for persistence
      await saveChange('image', src, publicUrl);
      
      console.log('⚡ EditImageButton: IMMEDIATE callback for instant UI update');
      // Call callback IMMEDIATELY for instant visual feedback
      if (onImageReplace) {
        onImageReplace(publicUrl);
      }
      
      // Generate AI caption for the new image
      console.log('🤖 EditImageButton: Generating AI caption for replaced image...');
      const aiCaption = await generateAiCaption(publicUrl);
      
      // Set the AI-generated caption
      setCaption(publicUrl, aiCaption);
      
      // Dispatch events for immediate updates
      setTimeout(() => {
        console.log('🚀 EditImageButton: Dispatching immediate project update event');
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId: currentProjectId, 
            imageReplaced: true, 
            immediate: true,
            timestamp: Date.now(),
            source: 'edit-image-button',
            src: src,
            newSrc: publicUrl
          }
        }));
        
        // Dispatch AI caption event
        window.dispatchEvent(new CustomEvent('aiCaptionGenerated', {
          detail: {
            imageSrc: publicUrl,
            caption: aiCaption,
            projectId: currentProjectId,
            autoPublish: false
          }
        }));
      }, 50);
      
      const finalSizeKB = (compressedFile.size / 1024).toFixed(2);
      toast.success("Image uploaded with AI caption!", {
        id: 'image-upload',
        description: `Uploaded ${finalSizeKB}KB and generated smart caption automatically.`,
        duration: 3000,
      });
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
  }, [src, currentProjectId, onImageReplace, saveChange, setCaption]);

  if (!isDevMode || !src) {
    return null;
  }

  return (
    <>
      <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
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
        {allowRemove && onImageRemove && (
          <Button
            onClick={handleRemoveClick}
            variant="destructive"
            size="sm"
            className="shadow-md"
            disabled={isProcessing}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
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
