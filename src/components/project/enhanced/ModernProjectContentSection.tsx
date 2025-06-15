
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";
import { ProjectImageConfig } from "@/data/types/project";
import EditableText from "@/components/dev/EditableText";
import { useDevMode } from "@/context/DevModeContext";
import AddContentButton from "@/components/dev/AddContentButton";
import { toast } from "sonner";

// Define a flexible content block structure locally
export type ContentBlock = 
  | { type: 'text'; value: string }
  | { type: 'image'; src: string; caption?: string };

interface ModernProjectContentSectionProps {
  title: string;
  content: string | ContentBlock[];
  sectionKey: keyof ProjectImageConfig;
  imageConfig?: ProjectImageConfig;
  imageCaptions: Record<string, string>;
  projectId: string;
}

const ModernProjectContentSection: React.FC<ModernProjectContentSectionProps> = ({
  title,
  content,
  sectionKey,
  imageConfig,
  imageCaptions,
  projectId
}) => {
  const { isDevMode } = useDevMode();

  const handleAddContent = (type: 'text' | 'image') => {
    let command = `For project ID '${projectId}', in the data file for its details, find the '${sectionKey}' property.`;

    if (typeof content === 'string') {
      command += `\nIts current value is a string. Please convert it to an array of content blocks. The first block should be a 'text' block containing the original string.`;
    }

    if (type === 'text') {
      command += `\nThen, add a new text block to the end of the array with the value: "This is a new paragraph. You can edit me."`;
    } else {
      command += `\nThen, add a new image block to the end of the array with src: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png" and caption: "A newly added image."`;
    }

    navigator.clipboard.writeText(command);
    toast.success("Command copied to clipboard!", {
      description: "Paste the command into our chat to permanently add this content.",
      duration: 8000,
    });
  };
  
  const renderContent = () => {
    if (typeof content === 'string') {
      return (
        <EditableText initialText={content} multiline>
          {(text) => (
            <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none pr-8">
              {text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          )}
        </EditableText>
      );
    }

    return content.map((block, index) => {
      if (block.type === 'text') {
        return (
          <EditableText key={index} initialText={block.value} multiline>
            {(text) => (
              <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none pr-8">
                {text.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4">{paragraph}</p>
                ))}
              </div>
            )}
          </EditableText>
        );
      }
      if (block.type === 'image') {
        return (
          <div key={index} className="my-8">
            <MaximizableImage
              src={block.src}
              alt={block.caption || `${title} content image`}
              caption={block.caption}
              className="w-full"
            />
          </div>
        );
      }
      return null;
    });
  };

  const sectionImages = imageConfig?.[sectionKey];
  const beforeHeaderImage = sectionImages?.beforeHeader;
  const afterHeaderImage = sectionImages?.afterHeader;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card-elevated p-8 space-y-8 layered-depth floating-element relative group"
    >
      {isDevMode && <AddContentButton onAdd={handleAddContent} />}
      
      {beforeHeaderImage && (
        <div className="glass-card p-4 layered-depth floating-element">
          <MaximizableImage
            src={beforeHeaderImage}
            alt={imageCaptions[beforeHeaderImage] || `${title} overview`}
            caption={imageCaptions[beforeHeaderImage]}
            className="rounded-lg shadow-elevated w-full"
          />
        </div>
      )}

      <EditableText initialText={title}>
        {(text) => (
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text pr-8">
            {text}
          </h2>
        )}
      </EditableText>

      {afterHeaderImage && (
        <div className="glass-card p-4 layered-depth floating-element">
          <MaximizableImage
            src={afterHeaderImage}
            alt={imageCaptions[afterHeaderImage] || `${title} details`}
            caption={imageCaptions[afterHeaderImage]}
            className="rounded-lg shadow-elevated w-full"
          />
        </div>
      )}

      {renderContent()}
    </motion.section>
  );
};

export default ModernProjectContentSection;
