
import React, { useRef } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useProjectPersistence } from '@/hooks/useProjectPersistence';
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
  const { saveImageReplacement } = useProjectPersistence(currentProjectId);
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
        
        // Save the image replacement persistently FIRST
        console.log('💾 Saving image replacement to persistence:', src, '->', dataUrl.substring(0, 50) + '...');
        saveImageReplacement(src, dataUrl);
        
        // Then call the callback if provided
        if (onImageReplace) {
          console.log('📞 Calling onImageReplace callback');
          onImageReplace(dataUrl);
        }
        
        // Force a small delay to ensure data is saved
        setTimeout(() => {
          // Trigger a project data update event to refresh components
          window.dispatchEvent(new CustomEvent('projectDataUpdated', {
            detail: { projectId: currentProjectId, imageReplaced: true }
          }));
        }, 100);
        
        toast.success("Image replaced and saved!", {
          description: `Replaced with "${file.name}". Click "Publish Changes" to apply your edits.`,
          duration: 5000,
        });
      } catch (error) {
        console.error('❌ Error converting file to data URL:', error);
        toast.error("Failed to process image", {
          description: "There was an error processing the uploaded image."
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
