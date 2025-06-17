import React, { useRef } from 'react';
import { GripVertical, X, Upload, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDevMode } from '@/context/DevModeContext';
import EditableText from './EditableText';
import MaximizableImage from '@/components/project/MaximizableImage';
import InsertContentButton from './InsertContentButton';
import { toast } from 'sonner';
import { ImageStorageService } from '@/services/imageStorage';

export interface ContentBlock {
  type: 'text' | 'image' | 'header' | 'video' | 'pdf';
  value?: string;
  src?: string;
  embedUrl?: string; // New property for video embeds
  caption?: string;
  level?: number; // for header levels
}

interface DraggableContentBlockProps {
  block: ContentBlock;
  index: number;
  onUpdate: (index: number, newValue: string) => void;
  onDelete: (index: number) => void;
  onImageReplace?: (index: number, newSrc: string) => void;
  onImageRemove?: (index: number) => void;
  onVideoUrlUpdate?: (index: number, newUrl: string) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  isDragging: boolean;
  projectId?: string;
  onAddContent?: (type: 'text' | 'image' | 'header' | 'video' | 'pdf', position?: number) => void;
}

const DraggableContentBlock: React.FC<DraggableContentBlockProps> = ({
  block,
  index,
  onUpdate,
  onDelete,
  onImageReplace,
  onImageRemove,
  onVideoUrlUpdate,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
  projectId,
  onAddContent
}) => {
  const { isDevMode } = useDevMode();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingVideoUrl, setIsEditingVideoUrl] = React.useState(false);
  const [videoUrlInput, setVideoUrlInput] = React.useState(block.embedUrl || '');

  // Utility function to convert video URLs to embeddable format
  const convertToEmbedUrl = (url: string): string => {
    if (!url) return '';
    
    // YouTube conversions
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    
    // Vimeo conversions
    if (url.includes('vimeo.com/') && !url.includes('player.vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }
    
    // If it's already an embed URL or iframe, return as is
    return url;
  };

  const handleVideoUrlSave = () => {
    if (videoUrlInput.trim()) {
      const embedUrl = convertToEmbedUrl(videoUrlInput.trim());
      if (onVideoUrlUpdate) {
        onVideoUrlUpdate(index, embedUrl);
      }
      setIsEditingVideoUrl(false);
      toast.success('Video URL updated successfully');
    } else {
      toast.error('Please enter a valid video URL');
    }
  };

  console.log('🎯 DraggableContentBlock render:', { 
    index, 
    blockType: block.type, 
    blockSrc: block.src,
    hasOnImageReplace: !!onImageReplace,
    hasOnImageRemove: !!onImageRemove
  });

  const handleImageReplace = async (newSrc: string) => {
    console.log('🖼️ DraggableContentBlock: Processing image replacement for index', index, 'with', newSrc);
    
    // If it's a storage URL, use it directly
    if (newSrc.startsWith('http') || newSrc.startsWith('/')) {
      if (onImageReplace) {
        onImageReplace(index, newSrc);
      }
      return;
    }
    
    // If it's base64 data, we need to upload it to storage first
    if (newSrc.startsWith('data:')) {
      if (!projectId) {
        toast.error('Cannot upload image: No project ID');
        return;
      }
      
      try {
        toast.loading('Uploading image to storage...', { id: 'content-image-upload' });
        
        // Convert data URL to File
        const response = await fetch(newSrc);
        const blob = await response.blob();
        const file = new File([blob], `content-image-${index}.jpg`, { type: 'image/jpeg' });
        
        // Upload to storage
        const storageUrl = await ImageStorageService.uploadImage(file, projectId, `content-block-${index}`);
        
        if (storageUrl && onImageReplace) {
          onImageReplace(index, storageUrl);
          toast.success('Image uploaded successfully', { id: 'content-image-upload' });
        } else {
          throw new Error('Failed to upload image to storage');
        }
      } catch (error) {
        console.error('❌ Failed to upload content block image:', error);
        toast.error('Failed to upload image', { 
          id: 'content-image-upload',
          description: 'Please try again with a smaller image'
        });
      }
    }
  };

  const handleImageRemove = () => {
    console.log('🗑️ DraggableContentBlock: Removing image for index', index);
    if (onImageRemove) {
      onImageRemove(index);
    } else {
      // Fallback: delete the entire block
      onDelete(index);
    }
  };

  const handleImageUploadClick = () => {
    console.log('📁 Upload button clicked for content block:', index);
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
    console.log('📁 File selected for content block:', { 
      hasFile: !!file, 
      fileName: file?.name, 
      index 
    });
    
    if (file && projectId) {
      try {
        // Upload directly to storage instead of converting to data URL
        toast.loading('Uploading image...', { id: 'content-upload' });
        
        const storageUrl = await ImageStorageService.uploadImage(file, projectId, `content-block-${index}`);
        
        if (storageUrl) {
          handleImageReplace(storageUrl);
          toast.success('Image uploaded successfully', { id: 'content-upload' });
        } else {
          throw new Error('Failed to upload image');
        }
      } catch (error) {
        console.error('❌ Error uploading file:', error);
        toast.error('Failed to upload image', { 
          id: 'content-upload',
          description: 'Please try again with a smaller image'
        });
      }
    } else if (file && onImageReplace) {
      // Fallback to data URL if no project ID (should be rare)
      try {
        const dataUrl = await convertFileToDataUrl(file);
        console.log('✅ File converted to data URL for content block:', index);
        handleImageReplace(dataUrl);
      } catch (error) {
        console.error('❌ Error converting file:', error);
        toast.error('Failed to process image');
      }
    }
    
    // Reset file input
    if (e.target) {
      e.target.value = '';
    }
  };

  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return (
          <>
            <EditableText initialText={block.value || ''} multiline>
              {(text) => (
                <div className="prose prose-slate max-w-none dark:prose-invert pr-8">
                  {text.split('\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </EditableText>
            {/* Add insertion point after text blocks */}
            {onAddContent && (
              <div className="group">
                <InsertContentButton 
                  onAdd={(type) => onAddContent(type, index + 1)}
                  position={index + 1}
                  className="mt-2"
                />
              </div>
            )}
          </>
        );

      case 'header':
        const HeaderTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <>
            <EditableText initialText={block.value || ''}>
              {(text) => (
                <HeaderTag className={`font-bold text-gray-900 pr-8 ${
                  block.level === 1 ? 'text-4xl' : 
                  block.level === 2 ? 'text-3xl' : 
                  block.level === 3 ? 'text-2xl' : 'text-xl'
                }`}>
                  {text}
                </HeaderTag>
              )}
            </EditableText>
            {/* Add insertion point right after headers */}
            {onAddContent && (
              <div className="group">
                <InsertContentButton 
                  onAdd={(type) => onAddContent(type, index + 1)}
                  position={index + 1}
                  label="Add content under this header"
                  className="mt-2 mb-2"
                />
              </div>
            )}
          </>
        );

      case 'image':
        // Show upload placeholder only if no src is provided OR if it's the specific placeholder image
        const isPlaceholder = !block.src || block.src === '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png';
        
        console.log('🖼️ Rendering image block:', { 
          index, 
          src: block.src, 
          isPlaceholder,
          caption: block.caption 
        });

        if (isPlaceholder) {
          return (
            <div className="glass-card p-8 layered-depth floating-element">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">Click to upload an image</p>
                <Button onClick={handleImageUploadClick} variant="outline">
                  Choose Image
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
          );
        }

        return (
          <div className="glass-card p-4 layered-depth floating-element">
            <MaximizableImage
              src={block.src}
              alt={block.caption || 'Content image'}
              caption={block.caption}
              className="rounded-lg shadow-elevated w-full"
              onImageReplace={handleImageReplace}
              onImageRemove={handleImageRemove}
              projectId={projectId}
              allowRemove={true}
            />
          </div>
        );

      case 'video':
        // Check if we need to show URL input interface
        const needsVideoUrl = !block.embedUrl || block.embedUrl === 'placeholder';
        
        if (needsVideoUrl || isEditingVideoUrl) {
          return (
            <div className="glass-card p-8 layered-depth floating-element">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-4">
                <div className="text-gray-600">
                  <h3 className="font-medium mb-2">Add Video Embed</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Paste a YouTube, Vimeo, or other video URL
                  </p>
                </div>
                <div className="max-w-md mx-auto space-y-3">
                  <Input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex gap-2 justify-center">
                    <Button onClick={handleVideoUrlSave} size="sm">
                      {needsVideoUrl ? 'Add Video' : 'Update Video'}
                    </Button>
                    {!needsVideoUrl && (
                      <Button 
                        onClick={() => setIsEditingVideoUrl(false)} 
                        variant="outline" 
                        size="sm"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="glass-card p-4 layered-depth floating-element relative group">
            {isDevMode && (
              <Button
                onClick={() => {
                  setVideoUrlInput(block.embedUrl || '');
                  setIsEditingVideoUrl(true);
                }}
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Edit video URL"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            )}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                src={block.embedUrl}
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-elevated"
                allowFullScreen
                title={block.caption || 'Embedded video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            {block.caption && (
              <EditableText initialText={block.caption}>
                {(text) => (
                  <p className="text-sm text-gray-600 mt-2 italic text-center pr-8">
                    {text}
                  </p>
                )}
              </EditableText>
            )}
          </div>
        );

      case 'pdf':
        return (
          <div className="glass-card p-4 layered-depth floating-element">
            <embed 
              src={block.src} 
              type="application/pdf" 
              className="w-full h-96 rounded-lg shadow-elevated"
            />
            {block.caption && (
              <EditableText initialText={block.caption}>
                {(text) => (
                  <p className="text-sm text-gray-600 mt-2 italic text-center pr-8">
                    {text}
                  </p>
                )}
              </EditableText>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`relative group ${isDragging ? 'opacity-50' : ''}`}
      draggable={isDevMode}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
    >
      {isDevMode && (
        <div className="absolute top-2 right-2 z-30 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 bg-background/80 backdrop-blur-sm cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <GripVertical className="h-3 w-3" />
          </Button>
          <Button
            onClick={() => onDelete(index)}
            variant="destructive"
            size="icon"
            className="h-6 w-6"
            title="Delete content"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      {renderContent()}
    </div>
  );
};

export default DraggableContentBlock;
