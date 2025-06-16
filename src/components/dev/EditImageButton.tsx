
import React, { useRef } from 'react';
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

  console.log('🎯 EditImageButton render:', { 
    isDevMode, 
    src, 
    currentProjectId, 
    hasOnImageReplace: !!onImageReplace 
  });

  const handleEditClick = (e: React.MouseEvent) => {
    console.log('🖱️ Edit button clicked for image:', src);
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const convertFileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('📄 File converted to data URL, size:', (reader.result as string).length);
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('📁 File selected:', { 
      hasFile: !!file, 
      fileName: file?.name, 
      fileSize: file?.size,
      currentSrc: src, 
      projectId: currentProjectId 
    });
    
    if (file && src) {
      try {
        console.log('🔄 Starting image replacement process...');
        
        // Convert file to data URL for persistent storage
        const dataUrl = await convertFileToDataUrl(file);
        console.log('✅ File converted successfully, data URL length:', dataUrl.length);
        
        // Save the image replacement to dev mode database
        console.log('💾 Attempting to save to database...', { 
          changeType: 'image', 
          changeKey: src, 
          changeValueLength: dataUrl.length 
        });
        
        const success = await saveChange('image', src, dataUrl);
        console.log('💾 Database save result:', success);
        
        if (success) {
          console.log('✅ Successfully saved image replacement to database');
          
          // Call the callback immediately for instant UI feedback
          if (onImageReplace) {
            console.log('📞 Calling onImageReplace callback for immediate UI update');
            onImageReplace(dataUrl);
          } else {
            console.log('⚠️ No onImageReplace callback provided');
          }
          
          // Dispatch multiple events to ensure all components update
          console.log('📡 Dispatching update events...');
          
          const updateEvent = new CustomEvent('projectDataUpdated', {
            detail: { 
              projectId: currentProjectId, 
              imageReplaced: true, 
              immediate: true,
              src: src,
              newSrc: dataUrl
            }
          });
          window.dispatchEvent(updateEvent);
          console.log('📡 Dispatched projectDataUpdated event');
          
          // Also dispatch a storage event to trigger useImageState refresh
          const storageEvent = new StorageEvent('storage', {
            key: `imageOverrides_${currentProjectId}`,
            newValue: JSON.stringify({ [src]: dataUrl }),
            url: window.location.href
          });
          window.dispatchEvent(storageEvent);
          console.log('📡 Dispatched storage event');
          
          toast.success("Image replaced!", {
            description: `Replaced with "${file.name}". Click "Publish Changes" to make it permanent.`,
            duration: 5000,
          });
          
          console.log('🎉 Image replacement process completed successfully');
        } else {
          throw new Error('Failed to save image replacement to database');
        }
      } catch (error) {
        console.error('❌ Error replacing image:', error);
        toast.error("Failed to replace image", {
          description: "There was an error saving the image replacement."
        });
      }
    } else {
      console.log('❌ Cannot proceed:', { hasFile: !!file, hasSrc: !!src });
    }
    
    // Reset file input to allow selecting the same file again
    if (e.target) {
      e.target.value = '';
      console.log('🔄 File input reset');
    }
  };

  if (!isDevMode || !src) {
    console.log('❌ EditImageButton not rendered:', { isDevMode, hasSrc: !!src });
    return null;
  }

  console.log('✅ EditImageButton rendering button');

  return (
    <>
      <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          onClick={handleEditClick}
          variant="secondary"
          size="sm"
          className="shadow-md"
        >
          <Upload className="h-4 w-4 mr-2" />
          Replace
        </Button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </>
  );
};

export default EditImageButton;
