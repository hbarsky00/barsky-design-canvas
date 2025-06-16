
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
  const { saveImageReplacement } = useProjectPersistence(projectId || routeProjectId || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && src) {
      console.log('File selected for replacement:', { 
        fileName: file.name, 
        currentSrc: src, 
        projectId: projectId || routeProjectId 
      });
      
      // Create a temporary URL for immediate preview
      const tempImageUrl = URL.createObjectURL(file);
      
      if (onImageReplace) {
        console.log('Calling onImageReplace with temp URL:', tempImageUrl);
        onImageReplace(tempImageUrl);
      }
      
      // Save the image replacement persistently
      saveImageReplacement(src, tempImageUrl);
      
      toast.success("Image replaced and saved!", {
        description: `Replaced with "${file.name}". This change is now persistent and will be saved across page refreshes.`,
        duration: 5000,
      });
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
