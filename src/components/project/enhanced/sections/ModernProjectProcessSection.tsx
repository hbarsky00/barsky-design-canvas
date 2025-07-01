
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
              
              {/* Show Key Features & Solutions content for investor project after first image */}
              {index === 0 && isInvestorProject && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <EnhancedContentEditor
                    content="Key Features & Solutions"
                    contentType="header"
                    onSave={(content) => handleSectionContentSave('process', 'text', content, 'key_features_title')}
                    className="mb-4"
                    projectId={projectId}
                  />
                  
                  <div className="space-y-6">
                    <EnhancedContentEditor
                      content="The platform's AI-powered search functionality addressed the critical problem of users being unable to efficiently find specific loans or borrower information within Excel spreadsheets. Drawing inspiration from Bloomberg's search interface, I implemented a predictive search system with multiple categories that includes predictive text suggestions, category-based filtering for deals, borrowers, and investors, advanced search parameters, and real-time results updating. This comprehensive search solution transformed how users interact with loan data, making information retrieval intuitive and fast."
                      contentType="section"
                      onSave={(content) => handleSectionContentSave('process', 'text', content, 'key_features_paragraph1')}
                      className="mb-4"
                      projectId={projectId}
                    />
                    
                    <EnhancedContentEditor
                      content="Dynamic order book management was another cornerstone feature that solved the complex and error-prone limit management processes that plagued the Excel-based system. The new intuitive interface allows users to seamlessly add and remove limits, edit existing limits without data loss, view real-time total amount calculations, and receive visual feedback for all changes. Complementing this was the flexible deal management system that replaced static Excel sheets with dynamic functionality offering both card views for quick overviews and grid views for detailed analysis, along with real-time collaboration tools and integrated communication features. Additionally, the advanced search and filtering capabilities provide smart defaults showing the most recent deals, borrowers, and investors, while offering advanced filtering options, saved search preferences, and quick access to frequently used searches."
                      contentType="section"
                      onSave={(content) => handleSectionContentSave('process', 'text', content, 'key_features_paragraph2')}
                      projectId={projectId}
                    />
                  </div>
                </div>
              )}
              
              {/* Show HerbaLink content for non-investor projects after first image */}
              {index === 0 && !isInvestorProject && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <EnhancedContentEditor
                    content="Key Design Solutions"
                    contentType="header"
                    onSave={(content) => handleSectionContentSave('process', 'text', content, 'key_design_solutions_title')}
                    className="mb-4"
                    projectId={projectId}
                  />
                  
                  <div className="space-y-6">
                    <div>
                      <EnhancedContentEditor
                        content="1. Trust-Building Through Transparency"
                        contentType="header"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'trust_building_title')}
                        className="mb-2"
                        projectId={projectId}
                      />
                      <EnhancedContentEditor
                        content="<strong>Challenge:</strong> Users hesitant to trust online herbalists"
                        contentType="paragraph"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'trust_building_challenge')}
                        className="mb-2"
                        projectId={projectId}
                      />
                      <EnhancedContentEditor
                        content="<strong>Solution:</strong> I designed comprehensive herbalist profiles featuring detailed certification displays, educational backgrounds, years of experience, verified client testimonials, and clearly marked specialization areas to build user trust through transparency."
                        contentType="paragraph"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'trust_building_solution')}
                        className="mb-4"
                        projectId={projectId}
                      />
                    </div>
                    
                    <div>
                      <EnhancedContentEditor
                        content="2. Personalized Matching Algorithm"
                        contentType="header"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'matching_algorithm_title')}
                        className="mb-2"
                        projectId={projectId}
                      />
                      <EnhancedContentEditor
                        content="<strong>Challenge:</strong> Connecting users with the right herbalist for their needs"
                        contentType="paragraph"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'matching_algorithm_challenge')}
                        className="mb-2"
                        projectId={projectId}
                      />
                      <EnhancedContentEditor
                        content="<strong>Solution:</strong> I created a smart matching system that considers users' health goals and concerns, preferred consultation styles, budget constraints, location and timezone preferences, plus herbalist availability and specializations to ensure optimal pairing."
                        contentType="paragraph"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'matching_algorithm_solution')}
                        className="mb-4"
                        projectId={projectId}
                      />
                    </div>
                    
                    <div>
                      <EnhancedContentEditor
                        content="3. Educational Integration"
                        contentType="header"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'educational_integration_title')}
                        className="mb-2"
                        projectId={projectId}
                      />
                      <EnhancedContentEditor
                        content="<strong>Challenge:</strong> Users lacking herbal knowledge feel overwhelmed"
                        contentType="paragraph"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'educational_integration_challenge')}
                        className="mb-2"
                        projectId={projectId}
                      />
                      <EnhancedContentEditor
                        content="<strong>Solution:</strong> I integrated contextual education features including herb information cards with safety warnings, interactive learning modules, a comprehensive glossary of herbal terms, and progress tracking for educational content to empower users with knowledge."
                        contentType="paragraph"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'educational_integration_solution')}
                        className="mb-4"
                        projectId={projectId}
                      />
                    </div>
                    
                    <div>
                      <EnhancedContentEditor
                        content="4. Streamlined Consultation Experience"
                        contentType="header"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'consultation_experience_title')}
                        className="mb-2"
                        projectId={projectId}
                      />
                      <EnhancedContentEditor
                        content="<strong>Challenge:</strong> Complex booking and consultation process"
                        contentType="paragraph"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'consultation_experience_challenge')}
                        className="mb-2"
                        projectId={projectId}
                      />
                      <EnhancedContentEditor
                        content="<strong>Solution:</strong> I designed a simplified three-step process: an adaptive health intake questionnaire that adjusts based on user concerns, herbalist selection showing instant availability, and integrated video consultation with built-in note-taking tools."
                        contentType="paragraph"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'consultation_experience_solution')}
                        className="mb-4"
                        projectId={projectId}
                      />
                    </div>
                    
                    <div>
                      <EnhancedContentEditor
                        content="5. Competitive Analysis"
                        contentType="header"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'competitive_analysis_title')}
                        className="mb-2"
                        projectId={projectId}
                      />
                      <EnhancedContentEditor
                        content="<strong>Competitive Analysis:</strong> Analyzed existing telemedicine platforms and herbal consultation services"
                        contentType="paragraph"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'competitive_analysis_description')}
                        className="mb-2"
                        projectId={projectId}
                      />
                      <EnhancedContentEditor
                        content="<strong>Key Insights:</strong> Most competitors lacked proper herbalist verification systems and personalized matching capabilities, creating an opportunity for HerbaLink to differentiate through trust-building features and intelligent pairing algorithms."
                        contentType="paragraph"
                        onSave={(content) => handleSectionContentSave('process', 'text', content, 'competitive_analysis_insights')}
                        className="mb-4"
                        projectId={projectId}
                      />
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
