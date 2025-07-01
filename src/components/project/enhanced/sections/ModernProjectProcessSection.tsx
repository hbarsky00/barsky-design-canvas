
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

  // Handle saving the editable research content with a unique key to avoid conflicts
  const handleResearchContentSave = (content: string) => {
    console.log('💾 Saving research content:', content.substring(0, 100) + '...');
    handleSectionContentSave('process', 'text', content, 'splittime_research_content_unique');
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
              
              {/* Show Splittime research content after first image - with sexy blue box styling */}
              {index === 0 && isSpittimeProject && (
                <div className="sexy p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Research & User Insights</h3>
                    
                    <div className="space-y-6">
                      <div className="text-sm text-gray-700">
                        <p>
                          Based on comprehensive research methodology that included 12 in-depth interviews with divorced and separated parents, 8 interviews with family counselors and mediators, a survey of over 150 parents currently using existing co-parenting tools, and competitive analysis of 8 existing co-parenting applications, several critical pain points emerged. The research revealed that parents consistently struggle with emotional triggers embedded in standard messaging systems, face scheduling chaos without centralized coordination systems, encounter ongoing financial disputes over child-related expenses, experience documentation issues that lead to critical information loss, and worry about their children being caught in the middle of parental conflicts.
                        </p>
                        <p className="mt-4">
                          Three distinct user personas crystallized from this research: the Overwhelmed Parent who struggles to balance demanding work schedules with complex childcare coordination needs, the Detail-Oriented Parent who requires comprehensive tracking and documentation capabilities to manage every aspect of co-parenting arrangements, and the Conflict-Avoidant Parent who desperately seeks solutions that minimize direct communication with their ex-partner while still maintaining effective coordination for their children's wellbeing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Show Herbalink research content after first image - with blue box styling */}
              {index === 0 && isHerbalinkProject && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Research & Discovery</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-800 mb-3"><span className="font-bold">User Research</span></h4>
                        <p className="text-sm text-gray-700 mb-3">
                          I conducted interviews with 12 participants (6 potential users, 6 practicing herbalists) to understand pain points and opportunities.
                        </p>
                        <div>
                          <p className="font-bold text-gray-800 mb-2"><span className="font-bold">Key Findings</span></p>
                          <p className="text-sm text-gray-700">
                            Users struggled with finding qualified, credentialed herbalists and felt uncertain about practitioner backgrounds and herbal recommendation safety. High costs and limited rural availability created additional barriers to accessing herbal care. Meanwhile, herbalists faced challenges building their client base, managing time-consuming intake processes, and maintaining remote client relationships without a centralized platform.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-gray-800 mb-3"><span className="font-bold">Competitive Analysis</span></h4>
                        <p className="text-sm text-gray-700 mb-3">
                          Analyzed BetterHelp, Headspace Health, and Zocdoc to identify opportunities for differentiation in the herbal wellness space.
                        </p>
                        <div>
                          <p className="font-bold text-gray-800 mb-2"><span className="font-bold">Key Insights</span></p>
                          <p className="text-sm text-gray-700">
                            The analysis revealed no platforms specifically designed for herbalist consultations, creating an opportunity for specialized intake forms tailored to herbal needs and education-focused features that build user confidence in natural wellness approaches.
                          </p>
                        </div>
                      </div>

                      {/* Design System Image */}
                      <div className="mt-6">
                        <h4 className="text-lg font-medium text-gray-800 mb-3"><span className="font-bold">Design System</span></h4>
                        <div className="glass-card p-4 layered-depth">
                          <EnhancedContentEditor
                            content=""
                            contentType="section"
                            onSave={() => {}}
                            images={["/lovable-uploads/a8ef8ea7-ae55-4f15-8f9b-13dcf5efe9d1.png"]}
                            onImageAdd={(imageSrc) => {
                              console.log('➕ Adding design system image:', imageSrc);
                            }}
                            onImageReplace={(imgIndex, newSrc) => {
                              console.log('🔄 Replacing design system image:', newSrc);
                            }}
                            onImageRemove={() => {}}
                            maxImages={1}
                            projectId={projectId}
                            imageCaptions={{
                              "/lovable-uploads/a8ef8ea7-ae55-4f15-8f9b-13dcf5efe9d1.png": "Herbalink comprehensive design system emphasizing trust, accessibility, and natural wellness through calming colors and user-friendly typography"
                            }}
                            className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                          />
                        </div>
                        <p className="text-sm text-gray-700 mt-3">
                          Created a comprehensive design system built for natural wellness experiences, emphasizing trust, accessibility, and user empowerment through carefully chosen color palettes and typography that reflect the organic nature of herbal wellness.
                        </p>
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
