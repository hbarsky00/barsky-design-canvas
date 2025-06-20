
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, X, Image, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TinyMCEEditor from './TinyMCEEditor';
import MaximizableImage from '../project/MaximizableImage';

interface EnhancedContentEditorProps {
  content: string;
  contentType: 'paragraph' | 'header' | 'section';
  onSave: (content: string) => void;
  images?: string[];
  onImageAdd?: (imageSrc: string) => void;
  onImageReplace?: (index: number, newSrc: string) => void;
  onImageRemove?: (index: number) => void;
  maxImages?: number;
  className?: string;
  projectId?: string;
  imageCaptions?: Record<string, string>;
}

const EnhancedContentEditor: React.FC<EnhancedContentEditorProps> = ({
  content,
  contentType,
  onSave,
  images = [],
  onImageAdd,
  onImageReplace,
  onImageRemove,
  maxImages = 3,
  className = "",
  projectId,
  imageCaptions = {}
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [localImages, setLocalImages] = useState<string[]>(images);

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const handleImageAdd = () => {
    if (localImages.length < maxImages) {
      const newImage = "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png";
      const newImages = [...localImages, newImage];
      setLocalImages(newImages);
      if (onImageAdd) {
        onImageAdd(newImage);
      }
    }
  };

  const handleImageReplace = (index: number, newSrc: string) => {
    const newImages = localImages.map((src, i) => i === index ? newSrc : src);
    setLocalImages(newImages);
    if (onImageReplace) {
      onImageReplace(index, newSrc);
    }
  };

  const handleImageRemove = (index: number) => {
    const newImages = localImages.filter((_, i) => i !== index);
    setLocalImages(newImages);
    if (onImageRemove) {
      onImageRemove(index);
    }
  };

  const getEditorHeight = () => {
    switch (contentType) {
      case 'header': return 150;
      case 'paragraph': return 200;
      case 'section': return 300;
      default: return 200;
    }
  };

  const getPlaceholder = () => {
    switch (contentType) {
      case 'header': return 'Edit header text...';
      case 'paragraph': return 'Edit paragraph content...';
      case 'section': return 'Edit section content...';
      default: return 'Start editing...';
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {!isEditing ? (
        <div className="group/content relative">
          {contentType === 'header' ? (
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {editedContent}
            </h2>
          ) : (
            <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
              {editedContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="absolute top-0 right-0 opacity-0 group-hover/content:opacity-100 transition-opacity duration-200"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <TinyMCEEditor
            initialValue={editedContent}
            onEditorChange={setEditedContent}
            height={getEditorHeight()}
            placeholder={getPlaceholder()}
          />
          
          <div className="flex justify-center space-x-2">
            <Button
              onClick={handleSave}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {/* Images Section */}
      {(onImageAdd || localImages.length > 0) && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800">Images</h4>
            {onImageAdd && localImages.length < maxImages && (
              <Button
                onClick={handleImageAdd}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Image</span>
              </Button>
            )}
          </div>

          {localImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localImages.map((imageSrc, index) => (
                <div key={index} className="relative group/image">
                  <div className="glass-card p-3 layered-depth">
                    <MaximizableImage
                      src={imageSrc}
                      alt={`Content image ${index + 1}`}
                      caption={imageCaptions[imageSrc] || `Image ${index + 1}`}
                      imageList={localImages}
                      currentIndex={index}
                      className="rounded-lg shadow-md w-full overflow-hidden"
                      projectId={projectId}
                      hideEditButton={false}
                      allowRemove={true}
                      onImageReplace={(newSrc) => handleImageReplace(index, newSrc)}
                      onImageRemove={() => handleImageRemove(index)}
                    />
                  </div>
                  {onImageRemove && (
                    <Button
                      onClick={() => handleImageRemove(index)}
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedContentEditor;
