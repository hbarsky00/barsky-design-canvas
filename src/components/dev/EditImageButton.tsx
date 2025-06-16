
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

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const convertFileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && src) {
      console.log('🖼️ File selected for replacement:', { 
        fileName: file.name, 
        currentSrc: src, 
        projectId: currentProjectId 
      });
      
      try {
        // Convert file to data URL for persistent storage
        const dataUrl = await convertFileToDataUrl(file);
        console.log('✅ Converted file to data URL, length:', dataUrl.length);
        
        // Save the image replacement to dev mode database FIRST
        console.log('💾 Saving image replacement to dev mode database:', src, '->', dataUrl.substring(0, 50) + '...');
        const success = await saveChange('image', src, dataUrl);
        
        if (success) {
          // Then call the callback if provided for immediate UI update
          if (onImageReplace) {
            console.log('📞 Calling onImageReplace callback for immediate UI update');
            onImageReplace(dataUrl);
          }
          
          // Trigger a project data update event to refresh all components
          window.dispatchEvent(new CustomEvent('projectDataUpdated', {
            detail: { projectId: currentProjectId, imageReplaced: true, immediate: true }
          }));
          
          toast.success("Image replaced!", {
            description: `Replaced with "${file.name}". Click "Publish Changes" to make it permanent.`,
            duration: 5000,
          });
        } else {
          throw new Error('Failed to save image replacement to database');
        }
      } catch (error) {
        console.error('❌ Error replacing image:', error);
        toast.error("Failed to replace image", {
          description: "There was an error saving the image replacement."
        });
      }
    }
    
    // Reset file input to allow selecting the same file again
    if (e.target) {
      e.target.value = '';
    }
  };

  if (!isDevMode) {
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
