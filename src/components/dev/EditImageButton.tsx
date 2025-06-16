
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
    src: src?.substring(0, 50) + '...', 
    currentProjectId, 
    hasOnImageReplace: !!onImageReplace 
  });

  const handleEditClick = (e: React.MouseEvent) => {
    console.log('🖱️ Edit button clicked for image:', src?.substring(0, 50) + '...');
    e.preventDefault();
    e.stopPropagation();
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
    
    if (file && src && currentProjectId) {
      try {
        console.log('🔄 Starting image replacement process for:', src.substring(0, 50) + '...');
        
        const reader = new FileReader();
        reader.onload = async () => {
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
            
            // Also dispatch a more general event
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('projectDataUpdated', {
                detail: { 
                  projectId: currentProjectId, 
                  immediate: true,
                  timestamp: Date.now() + 1
                }
              }));
            }, 50);
            
            toast.success("Image replaced!", {
              description: `Replaced with "${file.name}". Click "Publish Changes" to make it permanent.`,
              duration: 5000,
            });
            
            console.log('🎉 Image replacement process completed successfully for:', src.substring(0, 50) + '...');
          } else {
            throw new Error('Failed to save image replacement to database');
          }
        };
        
        reader.onerror = () => {
          throw new Error('Failed to read file');
        };
        
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('❌ Error replacing image:', error);
        toast.error("Failed to replace image", {
          description: "There was an error saving the image replacement."
        });
      }
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
