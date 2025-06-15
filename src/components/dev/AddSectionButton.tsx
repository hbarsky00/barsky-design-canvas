
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, FileText, Image, Layout } from 'lucide-react';
import { toast } from 'sonner';

interface AddSectionButtonProps {
  projectId: string;
  insertAfter?: string;
}

const AddSectionButton: React.FC<AddSectionButtonProps> = ({ projectId, insertAfter }) => {
  const { isDevMode } = useDevMode();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!isDevMode) {
    return null;
  }

  const handleAddSection = (type: 'text' | 'image' | 'gallery') => {
    let command = `For project ID '${projectId}', in the data file for its details, `;
    
    if (insertAfter) {
      command += `add a new section after the '${insertAfter}' section. `;
    } else {
      command += `add a new section at the end. `;
    }

    switch (type) {
      case 'text':
        command += `Create a new text section with title: "New Section" and content: "This is a new text section. You can edit the title and content."`;
        break;
      case 'image':
        command += `Create a new image section with title: "Image Gallery" and add this image: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png" with caption: "A newly added image section."`;
        break;
      case 'gallery':
        command += `Create a new gallery section with title: "Project Gallery" containing multiple images for showcasing the project.`;
        break;
    }

    navigator.clipboard.writeText(command);
    toast.success("Section command copied!", {
      description: "Paste the command into our chat to add the new section permanently.",
      duration: 8000,
    });
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center my-8">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="bg-background/80 backdrop-blur-sm hover:bg-background border-2 border-dashed border-blue-300 hover:border-blue-500 opacity-60 hover:opacity-100 transition-all"
            title="Add new section"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-1">
          <div className="flex flex-col gap-1">
            <Button variant="ghost" size="sm" onClick={() => handleAddSection('text')} className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Text Section
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleAddSection('image')} className="justify-start">
              <Image className="h-4 w-4 mr-2" />
              Image Section
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleAddSection('gallery')} className="justify-start">
              <Layout className="h-4 w-4 mr-2" />
              Gallery Section
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddSectionButton;
