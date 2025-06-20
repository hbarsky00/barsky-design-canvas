
import React, { useRef, useState, useCallback } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Upload, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { useImageUpload } from '@/hooks/useImageUpload';

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
  
  const { uploadImage } = useImageUpload(currentProjectId);

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
      const publicUrl = await uploadImage(file, src, onImageReplace);
      
      if (publicUrl && onImageReplace) {
        console.log('✅ EditImageButton: Image replaced successfully');
      }
    } catch (error) {
      console.error('❌ EditImageButton: Error uploading image:', error);
    } finally {
      setIsProcessing(false);
      processingRef.current = false;
      if (e.target) e.target.value = '';
    }
  }, [src, currentProjectId, onImageReplace, uploadImage]);

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
