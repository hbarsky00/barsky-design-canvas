
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";

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

  // Check if this is the splittime project
  const isSpittimeProject = projectId === 'splittime';

  const handleImageRemove = (imageIndex: number) => {
    console.log('🗑️ Removing process image at index:', imageIndex);
    const imageToRemove = processImages[imageIndex];
    if (imageToRemove) {
      console.log('🗑️ Removing image:', imageToRemove);
      handleSectionImageUpdate('process', imageToRemove, '');
    }
  };

  // Handle saving the editable research content
  const handleResearchContentSave = (content: string) => {
    console.log('💾 Saving research content:', content.substring(0, 100) + '...');
    handleSectionContentSave('process', 'text', content, 'process_research_content');
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
        className="mb-6 lg:mb-8"
        projectId={projectId}
      />
      
      <EnhancedContentEditor
        content={details.process}
        contentType="section"
        onSave={(content) => handleSectionContentSave('process', 'content', content)}
        className="mb-8"
        projectId={projectId}
      />

      {/* Process Images Gallery with text positioned between images */}
      {processImages && processImages.length > 0 && (
        <div className="mt-12 space-y-8">
          {processImages.map((image, index) => (
            <React.Fragment key={index}>
              {/* Each Image */}
              <div className="glass-card p-4 layered-depth">
                <EnhancedContentEditor
                  content=""
                  contentType="section"
                  onSave={() => {}}
                  images={[image]}
                  onImageAdd={(imageSrc) => {
                    console.log('➕ Adding image to process section:', imageSrc);
                  }}
                  onImageReplace={(imgIndex, newSrc) => {
                    console.log('🔄 Replacing process image:', image, '->', newSrc);
                    handleSectionImageUpdate('process', image, newSrc);
                  }}
                  onImageRemove={() => handleImageRemove(index)}
                  maxImages={1}
                  projectId={projectId}
                  imageCaptions={imageCaptions}
                  className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                />
              </div>
              
              {/* Show Splittime research content after first image - now editable */}
              {index === 0 && isSpittimeProject && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Research & User Insights</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <EnhancedContentEditor
                          content="Based on comprehensive research methodology that included 12 in-depth interviews with divorced and separated parents, 8 interviews with family counselors and mediators, a survey of over 150 parents currently using existing co-parenting tools, and competitive analysis of 8 existing co-parenting applications, several critical pain points emerged. The research revealed that parents consistently struggle with emotional triggers embedded in standard messaging systems, face scheduling chaos without centralized coordination systems, encounter ongoing financial disputes over child-related expenses, experience documentation issues that lead to critical information loss, and worry about their children being caught in the middle of parental conflicts.

Three distinct user personas crystallized from this research: the Overwhelmed Parent who struggles to balance demanding work schedules with complex childcare coordination needs, the Detail-Oriented Parent who requires comprehensive tracking and documentation capabilities to manage every aspect of co-parenting arrangements, and the Conflict-Avoidant Parent who desperately seeks solutions that minimize direct communication with their ex-partner while still maintaining effective coordination for their children's wellbeing."
                          contentType="section"
                          onSave={handleResearchContentSave}
                          projectId={projectId}
                          className="text-sm text-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default ModernProjectProcessSection;
