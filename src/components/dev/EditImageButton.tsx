
import React, { useRef } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface EditImageButtonProps {
  src?: string;
}

const EditImageButton: React.FC<EditImageButtonProps> = ({ src }) => {
  const { isDevMode } = useDevMode();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && src) {
      navigator.clipboard.writeText(src);
      toast.success("Original image path copied.", {
        description: `Now, upload "${file.name}" to the project and ask me to replace the copied path with the new one.`,
        duration: 10000,
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
