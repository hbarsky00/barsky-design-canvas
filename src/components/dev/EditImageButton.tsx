
import React, { useRef } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface EditImageButtonProps {
  src?: string;
  onImageReplace?: (newSrc: string) => void;
  projectId?: string;
}

const EditImageButton: React.FC<EditImageButtonProps> = ({ src, onImageReplace, projectId }) => {
  const { isDevMode } = useDevMode();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      // Modern clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File selected for replacement:', { 
        fileName: file.name, 
        currentSrc: src, 
        projectId 
      });
      
      if (onImageReplace) {
        // Create a temporary URL for immediate preview
        const tempImageUrl = URL.createObjectURL(file);
        
        console.log('Calling onImageReplace with temp URL:', tempImageUrl);
        onImageReplace(tempImageUrl);
        
        toast.success("Image replaced successfully!", {
          description: `Replaced with "${file.name}". This change is now persistent and will be saved in the project data.`,
          duration: 5000,
        });
      } else {
        // Fallback behavior - copy original path to clipboard if available
        if (src) {
          const copied = await copyToClipboard(src);
          if (copied) {
            toast.success("Original image path copied to clipboard!", {
              description: `Path: ${src}\nNow upload "${file.name}" to the project and ask me to replace the copied path with the new one.`,
              duration: 10000,
            });
          } else {
            // Show the path in a way the user can manually copy
            toast.info("Please manually copy this path:", {
              description: `${src}\nThen upload "${file.name}" to the project and ask me to replace this path with the new one.`,
              duration: 15000,
            });
            console.log('Image path for manual copying:', src);
          }
        } else {
          toast.info("Image selected for upload", {
            description: `"${file.name}" is ready. Please upload it to the project and ask me to use it.`,
            duration: 8000,
          });
        }
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
