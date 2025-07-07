
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import ProcessImageGallery from "./components/ProcessImageGallery";
import { getImageForListItem } from "@/utils/listItemImageMapping";
import MaximizableImage from "../../MaximizableImage";

interface ModernProjectProcessSectionProps {
  details: ProjectDetails;
  projectId: string;
  componentKey: string;
  imageCaptions: Record<string, string>;
}

const ModernProjectProcessSection: React.FC<ModernProjectProcessSectionProps> = ({
  details,
  projectId,
  componentKey,
  imageCaptions
}) => {
  const {
    handleSectionContentSave,
    handleSectionImageUpdate
  } = useSimplifiedContentEditor({
    projectId
  });

  // Extract process images for proper display order
  const processBeforeHeaderImage = details.imageConfig?.process?.beforeHeader;
  const processRegularImage = details.processImage;

  // Create process images array with correct order
  const processImages = React.useMemo(() => {
    const images: string[] = [];
    if (processBeforeHeaderImage) {
      images.push(processBeforeHeaderImage);
    }
    if (processRegularImage) {
      images.push(processRegularImage);
    }
    return images;
  }, [processBeforeHeaderImage, processRegularImage]);

  // Check if this is the splittime or herbalink project
  const isSpittimeProject = projectId === 'splittime';
  const isHerbalinkProject = projectId === 'herbalink';

  const handleImageRemove = (imageIndex: number) => {
    console.log('🗑️ Removing process image at index:', imageIndex);
    const imageToRemove = processImages[imageIndex];
    if (imageToRemove) {
      console.log('🗑️ Removing image:', imageToRemove);
      handleSectionImageUpdate('process', imageToRemove, '');
    }
  };

  const handleImageReplace = (originalSrc: string, newSrc: string) => {
    handleSectionImageUpdate('process', originalSrc, newSrc);
  };

  return (
    <motion.section
      key={`process-${componentKey}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="glass-card-elevated p-4 sm:p-8 layered-depth"
    >
      <EnhancedContentEditor
        content="What I Did"
        contentType="header"
        onSave={(content) => handleSectionContentSave('process', 'title', content)}
        className="mb-6 lg:mb-8 pt-2.5"
        projectId={projectId}
      />
      
      <div className="glass-card p-6 layered-depth bg-blue-50/50 border border-blue-100">
        <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
          {details.process.split('\n\n').map((paragraph, index) => {
            // Check if this is a main header (like "Design Process & Methodology:")
            if (paragraph.includes(':') && !paragraph.includes('•') && paragraph.length < 80) {
              return (
                <h3 key={index} className="text-xl font-semibold text-gray-900 mt-8 mb-4 first:mt-0">
                  {paragraph.replace(':', '')}
                </h3>
              );
            }
            
            // Check if this is a subheader (like "Key Features & Solutions Created:")
            if (paragraph.endsWith(':') && paragraph.length < 150) {
              return (
                <h4 key={index} className="text-lg font-medium text-gray-800 mt-6 mb-3">
                  {paragraph}
                </h4>
              );
            }
            
            // Check if this contains bullet points - create balanced column layout
            if (paragraph.includes('•')) {
              const items = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
              if (items.length > 0) {
                // Calculate optimal columns based on number of items
                const getGridCols = (itemCount: number) => {
                  if (itemCount <= 2) return 'grid-cols-1 md:grid-cols-1';
                  if (itemCount <= 4) return 'grid-cols-1 md:grid-cols-2';
                  if (itemCount <= 6) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
                  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
                };
                
                return (
                  <div key={index} className={`grid ${getGridCols(items.length)} gap-4 mb-6`}>
                    {items.map((item, itemIndex) => {
                      const itemText = item.replace('•', '').trim();
                      const itemImage = getImageForListItem(itemText);
                      
                      return (
                        <div key={itemIndex} className="flex flex-col bg-white/50 p-3 rounded-lg border border-blue-100/50">
                          <div className="flex items-start mb-3">
                            <span className="text-primary mr-3 mt-1 font-bold">•</span>
                            <span className="text-gray-700 text-sm leading-relaxed">{itemText}</span>
                          </div>
                          {itemImage && (
                            <div className="mt-2">
                              <MaximizableImage 
                                src={itemImage} 
                                alt={`Illustration for: ${itemText}`}
                                className="w-full h-48 object-cover rounded-md cursor-pointer"
                                projectId="herbalink"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              }
            }
            
            // Regular paragraph
            return (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>

      {/* Add consistent spacing before image gallery */}
      <ProcessImageGallery
        processImages={processImages}
        projectId={projectId}
        imageCaptions={imageCaptions}
        isSpittimeProject={isSpittimeProject}
        isHerbalinkProject={isHerbalinkProject}
        onImageReplace={handleImageReplace}
        onImageRemove={handleImageRemove}
      />
    </motion.section>
  );
};

export default ModernProjectProcessSection;
