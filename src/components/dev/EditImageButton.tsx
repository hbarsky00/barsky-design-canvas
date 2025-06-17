
import React, { useRef, useState } from 'react';
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

  console.log('🎯 EditImageButton render:', { 
    isDevMode, 
    src: src?.substring(0, 50) + '...', 
    currentProjectId, 
    hasOnImageReplace: !!onImageReplace 
  });

  const handleEditClick = (e: React.MouseEvent) => {
    console.log('🖱️ Edit button clicked for image:', src?.substring(0, 50) + '...');
    e.preventDefault();
    e.stopPropagation();
    
    if (isProcessing) {
      console.log('⏳ Already processing, ignoring click');
      return;
    }
    
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('📁 File selected:', { 
      hasFile: !!file, 
      fileName: file?.name, 
      fileSize: file?.size,
      currentSrc: src?.substring(0, 50) + '...', 
      projectId: currentProjectId 
    });
    
    if (file && src && currentProjectId && !isProcessing) {
      setIsProcessing(true);
      
      try {
        console.log('🔄 Starting image replacement process for:', src.substring(0, 50) + '...');
        
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const dataUrl = reader.result as string;
            console.log('✅ File converted to data URL, saving to database for src:', src.substring(0, 50) + '...');
            
            // Save the image replacement to dev mode database
            const success = await saveChange('image', src, dataUrl);
            console.log('💾 Database save result for', src.substring(0, 50) + '...', ':', success);
            
            if (success) {
              console.log('✅ Successfully saved image replacement to database');
              
              // Call the callback immediately for instant UI feedback
              if (onImageReplace) {
                console.log('📞 Calling onImageReplace callback for immediate UI update');
                onImageReplace(dataUrl);
              }
              
              // Dispatch comprehensive update events for all listeners
              const updateEvent = new CustomEvent('projectDataUpdated', {
                detail: { 
                  projectId: currentProjectId, 
                  imageReplaced: true, 
                  immediate: true,
                  src: src,
                  newSrc: dataUrl,
                  timestamp: Date.now(),
                  changeType: 'image'
                }
              });
              
              console.log('📡 Dispatching project update event for:', src.substring(0, 50) + '...');
              window.dispatchEvent(updateEvent);
              
              toast.success("Image replaced!", {
                description: `Replaced with "${file.name}". Click "Publish Changes" to make it permanent.`,
                duration: 3000,
              });
              
              console.log('🎉 Image replacement process completed successfully for:', src.substring(0, 50) + '...');
            } else {
              throw new Error('Failed to save image replacement to database');
            }
          } catch (error) {
            console.error('❌ Error in file reader onload:', error);
            toast.error("Failed to replace image", {
              description: "There was an error processing the image file."
            });
          } finally {
            setIsProcessing(false);
          }
        };
        
        reader.onerror = () => {
          console.error('❌ FileReader error');
          toast.error("Failed to read file", {
            description: "There was an error reading the image file."
          });
          setIsProcessing(false);
        };
        
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('❌ Error replacing image:', error);
        toast.error("Failed to replace image", {
          description: "There was an error saving the image replacement."
        });
        setIsProcessing(false);
      }
    } else if (isProcessing) {
      console.log('⏳ Already processing, ignoring file change');
    } else {
      console.error('❌ Missing required data for image replacement:', { 
        file: !!file, 
        src: src?.substring(0, 50) + '...', 
        currentProjectId 
      });
      toast.error("Cannot replace image", {
        description: "Missing required information for image replacement."
      });
    }
    
    // Reset file input
    if (e.target) {
      e.target.value = '';
    }
  };

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
