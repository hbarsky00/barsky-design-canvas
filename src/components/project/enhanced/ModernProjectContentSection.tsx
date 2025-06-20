
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Edit3, Save, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactQuillEditor from "@/components/editor/ReactQuillEditor";
import MaximizableImage from "../MaximizableImage";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import { VercelBlobStorageService } from "@/services/vercelBlobStorage";
import { toast } from "sonner";

interface ModernProjectContentSectionProps {
  title: string;
  content: string;
  sectionKey: string;
  imageConfig: any;
  imageCaptions: Record<string, string>;
  projectId?: string;
}

const ModernProjectContentSection: React.FC<ModernProjectContentSectionProps> = ({
  title,
  content,
  sectionKey,
  imageConfig,
  imageCaptions,
  projectId
}) => {
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [sectionImages, setSectionImages] = useState<string[]>([
    "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
    "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png"
  ]);
  const [isSelecting, setIsSelecting] = useState(false);
  const showEditingControls = shouldShowEditingControls();

  const handleSaveContent = () => {
    console.log(`Saving ${sectionKey} content:`, editedContent);
    setIsEditingContent(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(content);
    setIsEditingContent(false);
  };

  const handleAddImage = useCallback(async () => {
    if (sectionImages.length >= 2 || isSelecting || !projectId) return;
    
    setIsSelecting(true);
    
    try {
      console.log('📁 Opening file picker for section image...');
      
      // Create file input
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      
      const selectedImageSrc = await new Promise<string>((resolve, reject) => {
        input.onchange = async (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            try {
              // Validate file
              if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                reject(new Error('Invalid file type'));
                return;
              }

              if (file.size > 10 * 1024 * 1024) { // 10MB limit
                toast.error('Image must be smaller than 10MB');
                reject(new Error('File too large'));
                return;
              }

              toast.info('Uploading image to Vercel Blob...');
              console.log('📤 Uploading section image to Vercel Blob:', file.name);
              
              const uploadedUrl = await VercelBlobStorageService.uploadImage(file, projectId, `section-${sectionKey}-${Date.now()}`);
              
              if (uploadedUrl) {
                resolve(uploadedUrl);
              } else {
                toast.error('Image upload failed. Please check your Vercel Blob configuration.');
                reject(new Error('Upload failed'));
              }
            } catch (error) {
              console.error('❌ Error uploading section image:', error);
              toast.error('Image upload failed. Please try again.');
              reject(error);
            }
          } else {
            reject(new Error('No file selected'));
          }
        };
        
        input.oncancel = () => {
          reject(new Error('File selection cancelled'));
        };
        
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
      });
      
      setSectionImages(prev => [...prev, selectedImageSrc]);
      toast.success('Image uploaded and added successfully!');
    } catch (error) {
      console.log('❌ Image upload cancelled or failed:', error);
      if (error instanceof Error && error.message !== 'File selection cancelled') {
        toast.error('Failed to add image');
      }
    } finally {
      setIsSelecting(false);
    }
  }, [sectionImages.length, isSelecting, projectId, sectionKey]);

  const handleRemoveImage = (index: number) => {
    setSectionImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageReplace = (index: number, newSrc: string) => {
    setSectionImages(prev => prev.map((src, i) => i === index ? newSrc : src));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card-elevated p-8 layered-depth mb-12 relative group max-w-6xl mx-auto"
    >
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {title}
        </h2>
        
        <div className="relative">
          {!isEditingContent ? (
            <div className="group/content relative">
              <div 
                className="prose prose-lg text-gray-600 leading-relaxed max-w-none text-center"
                dangerouslySetInnerHTML={{ __html: editedContent }}
              />
              {showEditingControls && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingContent(true)}
                  className="absolute top-0 right-0 opacity-0 group-hover/content:opacity-100 transition-opacity duration-200"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <ReactQuillEditor
                initialValue={editedContent}
                onEditorChange={setEditedContent}
                height={300}
                placeholder={`Edit ${title.toLowerCase()} content...`}
              />
              <div className="flex justify-center space-x-2">
                <Button
                  onClick={handleSaveContent}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  variant="outline"
                  size="sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Images Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Section Images</h3>
            {showEditingControls && sectionImages.length < 2 && projectId && (
              <Button
                onClick={handleAddImage}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                disabled={isSelecting}
              >
                <Plus className="h-4 w-4" />
                <span>{isSelecting ? 'Uploading...' : 'Add Image'}</span>
              </Button>
            )}
            {showEditingControls && !projectId && (
              <p className="text-xs text-gray-500">Project ID required for uploads</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sectionImages.map((imageSrc, index) => (
              <div key={index} className="relative group/image">
                <div className="glass-card p-4 layered-depth relative group">
                  <MaximizableImage
                    src={imageSrc}
                    alt={`${title} image ${index + 1}`}
                    caption={imageCaptions[imageSrc] || `${title} supporting image`}
                    imageList={sectionImages}
                    currentIndex={index}
                    className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                    projectId={projectId}
                    hideEditButton={!showEditingControls}
                    allowRemove={showEditingControls}
                    onImageReplace={(newSrc) => handleImageReplace(index, newSrc)}
                    onImageRemove={() => handleRemoveImage(index)}
                  />
                </div>
                {showEditingControls && (
                  <Button
                    onClick={() => handleRemoveImage(index)}
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ModernProjectContentSection;
