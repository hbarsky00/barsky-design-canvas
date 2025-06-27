
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";
import TextSection from "./TextSection";

interface ImageTextItem {
  type: 'image' | 'text';
  content: string; // For images: image path, for text: text content
  caption?: string; // Only for images
  textKey?: string; // Only for text sections, used for saving
}

interface ImageTextGalleryProps {
  items: ImageTextItem[];
  imageCaptions?: Record<string, string>;
  projectId?: string;
  sectionName?: string;
  onTextSave?: (textKey: string, content: string) => void;
  className?: string;
}

const ImageTextGallery: React.FC<ImageTextGalleryProps> = ({
  items,
  imageCaptions = {},
  projectId,
  sectionName,
  onTextSave,
  className = ""
}) => {
  const handleTextSave = (textKey: string, content: string) => {
    if (onTextSave) {
      onTextSave(textKey, content);
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={`${item.type}-${index}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {item.type === 'image' ? (
            <div className="glass-card p-4 layered-depth">
              <MaximizableImage
                src={item.content}
                alt={item.caption || `${sectionName} image ${index + 1}`}
                caption={item.caption || imageCaptions[item.content] || `${sectionName} supporting image`}
                className="rounded-lg shadow-elevated w-full"
                projectId={projectId}
                hideEditButton={false}
                allowRemove={false}
              />
            </div>
          ) : (
            <TextSection
              content={item.content}
              onSave={item.textKey ? (content) => handleTextSave(item.textKey!, content) : undefined}
              projectId={projectId}
              sectionKey={item.textKey}
              className="my-6 px-4"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ImageTextGallery;
