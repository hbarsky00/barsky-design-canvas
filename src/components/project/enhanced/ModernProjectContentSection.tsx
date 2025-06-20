
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import ContentEditor from "./section/ContentEditor";
import SectionImageManager from "./section/SectionImageManager";
import { useSectionImageUpload } from "./section/useSectionImageUpload";

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

  const { handleAddImage } = useSectionImageUpload({
    projectId,
    sectionKey,
    onImageAdded: (imageSrc) => {
      setSectionImages(prev => [...prev, imageSrc]);
    }
  });

  const handleSaveContent = () => {
    console.log(`Saving ${sectionKey} content:`, editedContent);
    setIsEditingContent(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(content);
    setIsEditingContent(false);
  };

  const handleAddImageWithLoading = useCallback(async () => {
    if (sectionImages.length >= 2 || isSelecting || !projectId) return;
    
    setIsSelecting(true);
    try {
      await handleAddImage();
    } finally {
      setIsSelecting(false);
    }
  }, [sectionImages.length, isSelecting, projectId, handleAddImage]);

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
          <ContentEditor
            isEditing={isEditingContent}
            content={content}
            editedContent={editedContent}
            title={title}
            showEditingControls={showEditingControls}
            onStartEdit={() => setIsEditingContent(true)}
            onSave={handleSaveContent}
            onCancel={handleCancelEdit}
            onContentChange={setEditedContent}
          />
        </div>

        <SectionImageManager
          images={sectionImages}
          title={title}
          imageCaptions={imageCaptions}
          projectId={projectId}
          showEditingControls={showEditingControls}
          maxImages={2}
          isSelecting={isSelecting}
          onAddImage={handleAddImageWithLoading}
          onRemoveImage={handleRemoveImage}
          onImageReplace={handleImageReplace}
        />
      </div>
    </motion.section>
  );
};

export default ModernProjectContentSection;
