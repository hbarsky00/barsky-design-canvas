
import React, { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MaximizableImage from '../project/MaximizableImage';
import { shouldShowEditingControls } from '@/utils/devModeDetection';
import { VercelBlobStorageService } from '@/services/vercelBlobStorage';
import { toast } from 'sonner';

interface ContentImageManagerProps {
  images: string[];
  onImageAdd?: (imageSrc: string) => void;
  onImageReplace?: (index: number, newSrc: string) => void;
  onImageRemove?: (index: number) => void;
  maxImages?: number;
  projectId?: string;
  imageCaptions?: Record<string, string>;
}

const ContentImageManager: React.FC<ContentImageManagerProps> = ({
  images,
  onImageAdd,
  onImageReplace,
  onImageRemove,
  maxImages = 3,
  projectId,
  imageCaptions = {}
}) => {
  const [localImages, setLocalImages] = useState<string[]>(images);
  const [componentKey, setComponentKey] = useState(Date.now());
  const [isSelecting, setIsSelecting] = useState(false);
  const showEditingControls = shouldShowEditingControls();

  // Sync with parent images prop and force complete refresh
  useEffect(() => {
    if (JSON.stringify(images) !== JSON.stringify(localImages)) {
      console.log('🔄 ContentImageManager: Images changed, forcing complete refresh');
      console.log('Old images:', localImages);
      console.log('New images:', images);
      
      setLocalImages(images);
      setComponentKey(Date.now()); // Force complete re-render
    }
  }, [images]);

  // Listen for global image replacement events
  useEffect(() => {
    const handleImageReplaced = (event: CustomEvent) => {
      const { oldSrc, newSrc } = event.detail;
      console.log('🔄 Global image replacement detected:', oldSrc, '->', newSrc);
      
      setLocalImages(prev => {
        const updated = prev.map(img => img === oldSrc ? newSrc : img);
        console.log('Updated local images:', updated);
        return updated;
      });
      setComponentKey(Date.now());
    };

    window.addEventListener('imageReplaced', handleImageReplaced as EventListener);
    return () => {
      window.removeEventListener('imageReplaced', handleImageReplaced as EventListener);
    };
  }, []);

  const handleImageAdd = useCallback(async () => {
    if (localImages.length >= maxImages || !onImageAdd || isSelecting || !projectId) return;
    
    setIsSelecting(true);
    
    try {
      console.log('📁 Opening file picker for image selection...');
      
      // Create file input
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      
      const selectedImageSrc = await new Promise<string>((resolve, reject) => {
        input.onchange = async (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            try {
              // Validate file
              if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                reject(new Error('Invalid file type'));
                return;
              }

              if (file.size > 10 * 1024 * 1024) { // 10MB limit
                toast.error('Image must be smaller than 10MB');
                reject(new Error('File too large'));
                return;
              }

              toast.info('Uploading image to Vercel Blob...');
              console.log('📤 Uploading image to Vercel Blob:', file.name);
              
              const uploadedUrl = await VercelBlobStorageService.uploadImage(file, projectId, `content-${Date.now()}`);
              
              if (uploadedUrl) {
                resolve(uploadedUrl);
              } else {
                toast.error('Image upload failed. Please check your Vercel Blob configuration.');
                reject(new Error('Upload failed'));
              }
            } catch (error) {
              console.error('❌ Error uploading image:', error);
              toast.error('Image upload failed. Please try again.');
              reject(error);
            }
          } else {
            reject(new Error('No file selected'));
          }
        };
        
        input.oncancel = () => {
          reject(new Error('File selection cancelled'));
        };
        
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
      });
      
      const updatedImages = [...localImages, selectedImageSrc];
      
      console.log('➕ ContentImageManager: Adding uploaded image:', selectedImageSrc.substring(0, 50) + '...');
      setLocalImages(updatedImages);
      setComponentKey(Date.now());
      onImageAdd(selectedImageSrc);
      
      toast.success('Image uploaded and added successfully!');
    } catch (error) {
      console.log('❌ Image upload cancelled or failed:', error);
      if (error instanceof Error && error.message !== 'File selection cancelled') {
        toast.error('Failed to add image');
      }
    } finally {
      setIsSelecting(false);
    }
  }, [localImages, maxImages, onImageAdd, isSelecting, projectId]);

  const handleImageReplace = useCallback((index: number, newSrc: string) => {
    if (!onImageReplace) return;
    
    console.log('🔄 ContentImageManager: Replacing image at index', index, 'with:', newSrc);
    
    setLocalImages(prev => {
      const updated = [...prev];
      updated[index] = newSrc;
      console.log('Updated images after replacement:', updated);
      return updated;
    });
    
    setComponentKey(Date.now());
    onImageReplace(index, newSrc);
  }, [onImageReplace]);

  const handleImageRemove = useCallback((index: number) => {
    if (!onImageRemove) return;
    
    const updatedImages = localImages.filter((_, i) => i !== index);
    
    console.log('🗑️ ContentImageManager: Removing image at index:', index);
    setLocalImages(updatedImages);
    setComponentKey(Date.now());
    onImageRemove(index);
  }, [localImages, onImageRemove]);

  if (!onImageAdd && localImages.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-4" key={`manager-${componentKey}`}>
      {showEditingControls && onImageAdd && localImages.length < maxImages && (
        <div className="flex justify-start">
          <Button
            onClick={handleImageAdd}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
            disabled={isSelecting || !projectId}
          >
            <Plus className="h-4 w-4" />
            <span>{isSelecting ? 'Uploading...' : 'Add Image'}</span>
          </Button>
          {!projectId && (
            <p className="text-xs text-gray-500 ml-2 mt-1">Project ID required for uploads</p>
          )}
        </div>
      )}

      {localImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {localImages.map((imageSrc, index) => (
            <div key={`${imageSrc}-${index}-${componentKey}`} className="relative group/image">
              <div className="glass-card p-3 layered-depth">
                <MaximizableImage
                  src={imageSrc}
                  alt={`Content image ${index + 1}`}
                  caption={imageCaptions[imageSrc] || `Image ${index + 1}`}
                  imageList={localImages}
                  currentIndex={index}
                  className="rounded-lg shadow-md w-full overflow-hidden"
                  projectId={projectId}
                  hideEditButton={!showEditingControls}
                  allowRemove={showEditingControls}
                  onImageReplace={(newSrc) => handleImageReplace(index, newSrc)}
                  onImageRemove={() => handleImageRemove(index)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentImageManager;
