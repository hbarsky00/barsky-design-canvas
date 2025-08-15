
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";
import TextSection from "./TextSection";
import { ImageTextItem } from "@/data/types/project";

interface ImageTextGalleryProps {
  items: ImageTextItem[];
  imageCaptions?: Record<string, string>;
  projectId?: string;
  sectionName?: string;
  onTextSave?: (textKey: string, content: string) => void;
  onImageRemove?: (index: number) => void;
  className?: string;
}

const ImageTextGallery: React.FC<ImageTextGalleryProps> = ({
  items,
  imageCaptions = {},
  projectId,
  sectionName,
  onTextSave,
  onImageRemove,
  className = ""
}) => {
  const handleTextSave = (textKey: string, content: string) => {
    if (onTextSave) {
      onTextSave(textKey, content);
    }
  };

  const handleImageRemove = (itemIndex: number) => {
    if (onImageRemove) {
      onImageRemove(itemIndex);
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
            <MaximizableImage
              src={item.content}
              alt={item.caption || `${sectionName} image ${index + 1}`}
              caption={item.caption || imageCaptions[item.content] || `${sectionName} supporting image`}
              className="rounded-lg shadow-elevated w-full glass-card layered-depth"
              projectId={projectId}
              hideEditButton={false}
              allowRemove={true}
              onImageRemove={() => handleImageRemove(index)}
            />
          ) : item.type === 'video' ? (
            <MaximizableImage
              src={item.content}
              alt={item.caption || `${sectionName} video ${index + 1}`}
              caption={item.caption || `${sectionName} supporting video`}
              className="rounded-lg shadow-elevated w-full glass-card layered-depth"
              projectId={projectId}
              hideEditButton={false}
              allowRemove={true}
              onImageRemove={() => handleImageRemove(index)}
            />
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
