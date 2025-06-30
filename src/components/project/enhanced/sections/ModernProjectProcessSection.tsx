
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
  const { handleSectionContentSave, handleSectionImageUpdate } = useSimplifiedContentEditor({ projectId });

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

  // Check if this is the investor loan app project
  const isInvestorProject = projectId === 'investor-loan-app';

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
                  onImageRemove={(imgIndex) => console.log('🗑️ Removing image from process:', imgIndex)}
                  maxImages={1}
                  projectId={projectId}
                  imageCaptions={imageCaptions}
                  className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                />
              </div>
              
              {/* Show HerbaLink content for non-investor projects after first image */}
              {index === 0 && !isInvestorProject && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Design Solutions</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">1. Trust-Building Through Transparency</h4>
                        <p className="text-sm text-gray-600 mb-2"><strong>Challenge:</strong> Users hesitant to trust online herbalists</p>
                        <p className="text-sm text-gray-700 mb-4 last:mb-0"><strong>Solution:</strong> I designed comprehensive herbalist profiles featuring detailed certification displays, educational backgrounds, years of experience, verified client testimonials, and clearly marked specialization areas to build user trust through transparency.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">2. Personalized Matching Algorithm</h4>
                        <p className="text-sm text-gray-600 mb-2"><strong>Challenge:</strong> Connecting users with the right herbalist for their needs</p>
                        <p className="text-sm text-gray-700 mb-4 last:mb-0"><strong>Solution:</strong> I created a smart matching system that considers users' health goals and concerns, preferred consultation styles, budget constraints, location and timezone preferences, plus herbalist availability and specializations to ensure optimal pairing.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">3. Educational Integration</h4>
                        <p className="text-sm text-gray-600 mb-2"><strong>Challenge:</strong> Users lacking herbal knowledge feel overwhelmed</p>
                        <p className="text-sm text-gray-700 mb-4 last:mb-0"><strong>Solution:</strong> I integrated contextual education features including herb information cards with safety warnings, interactive learning modules, a comprehensive glossary of herbal terms, and progress tracking for educational content to empower users with knowledge.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">4. Streamlined Consultation Experience</h4>
                        <p className="text-sm text-gray-600 mb-2"><strong>Challenge:</strong> Complex booking and consultation process</p>
                        <p className="text-sm text-gray-700 mb-4 last:mb-0"><strong>Solution:</strong> I designed a simplified three-step process: an adaptive health intake questionnaire that adjusts based on user concerns, herbalist selection showing instant availability, and integrated video consultation with built-in note-taking tools.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">5. Competitive Analysis</h4>
                        <p className="text-sm text-gray-600 mb-2"><strong>Competitive Analysis:</strong> Analyzed existing telemedicine platforms and herbal consultation services</p>
                        <p className="text-sm text-gray-700 mb-4 last:mb-0"><strong>Key Insights:</strong> Most competitors lacked proper herbalist verification systems and personalized matching capabilities, creating an opportunity for HerbaLink to differentiate through trust-building features and intelligent pairing algorithms.</p>
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
