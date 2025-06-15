
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Image, Text } from 'lucide-react';

interface AddContentButtonProps {
  onAdd: (type: 'text' | 'image') => void;
}

const AddContentButton: React.FC<AddContentButtonProps> = ({ onAdd }) => {
  const { isDevMode } = useDevMode();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!isDevMode) {
    return null;
  }

  const handleSelect = (type: 'text' | 'image') => {
    onAdd(type);
    setIsOpen(false);
  };

  return (
    <div className="absolute top-4 right-4 z-30 opacity-30 group-hover:opacity-100 transition-opacity">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-full shadow-md bg-background/80 backdrop-blur-sm hover:bg-background"
            title="Add content"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-1">
          <div className="flex flex-col gap-1">
            <Button variant="ghost" size="sm" onClick={() => handleSelect('text')} className="justify-start">
              <Text className="h-4 w-4 mr-2" />
              Add Paragraph
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleSelect('image')} className="justify-start">
              <Image className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddContentButton;

