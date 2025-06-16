
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Image, Text, Heading, Video, FileText } from 'lucide-react';

interface AddContentButtonProps {
  onAdd: (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => void;
}

const AddContentButton: React.FC<AddContentButtonProps> = ({ onAdd }) => {
  const { isDevMode } = useDevMode();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!isDevMode) {
    return null;
  }

  const handleSelect = (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => {
    onAdd(type);
    setIsOpen(false);
  };

  return (
    <div className="absolute top-4 right-4 z-30 opacity-70 group-hover:opacity-100 transition-opacity">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-full shadow-md bg-background/90 backdrop-blur-sm hover:bg-background border-blue-300 hover:border-blue-500"
            title="Add content to this section"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-1">
          <div className="flex flex-col gap-1">
            <Button variant="ghost" size="sm" onClick={() => handleSelect('header')} className="justify-start">
              <Heading className="h-4 w-4 mr-2" />
              Add Header
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleSelect('text')} className="justify-start">
              <Text className="h-4 w-4 mr-2" />
              Add Paragraph
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleSelect('image')} className="justify-start">
              <Image className="h-4 w-4 mr-2" />
              Add Image
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleSelect('video')} className="justify-start">
              <Video className="h-4 w-4 mr-2" />
              Add Video
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleSelect('pdf')} className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Add PDF
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddContentButton;
