
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import ImageTextGallery from "@/components/project/sections/ImageTextGallery";

interface ModernProjectChallengeSectionProps {
  details: ProjectDetails;
  projectId: string;
  componentKey: string;
  imageCaptions: Record<string, string>;
}

const ModernProjectChallengeSection: React.FC<ModernProjectChallengeSectionProps> = ({
  details,
  projectId,
  componentKey,
  imageCaptions
}) => {
  const { handleSectionContentSave, handleSectionImageUpdate } = useSimplifiedContentEditor({ projectId });

  const handleTextSave = (textKey: string, content: string) => {
    handleSectionContentSave('challenge', 'text', content, textKey);
  };

  // Check if this is the investor loan app project
  const isInvestorProject = projectId === 'investor-loan-app';

  return (
    <motion.section
      key={`challenge-${componentKey}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card-elevated p-4 sm:p-8 layered-depth"
    >
      <EnhancedContentEditor
        content="The Challenge"
        contentType="header"
        onSave={(content) => handleSectionContentSave('challenge', 'title', content)}
        className="mb-6 lg:mb-8"
        projectId={projectId}
      />
      
      <EnhancedContentEditor
        content={details.challenge}
        contentType="section"
        onSave={(content) => handleSectionContentSave('challenge', 'content', content)}
        className="mb-8"
        projectId={projectId}
      />

      {/* Challenge Images Gallery with text positioned between images */}
      {details.challengeGalleryImages && details.challengeGalleryImages.length > 0 && (
        <div className="mt-12 space-y-8">
          {details.challengeGalleryImages.map((image, index) => (
            <React.Fragment key={index}>
              {/* Each Image */}
              <div className="glass-card p-4 layered-depth">
                <EnhancedContentEditor
                  content=""
                  contentType="section"
                  onSave={() => {}}
                  images={[image]}
                  onImageAdd={(imageSrc) => {
                    console.log('➕ Adding image to challenge section:', imageSrc);
                  }}
                  onImageReplace={(imgIndex, newSrc) => {
                    console.log('🔄 Replacing challenge image:', image, '->', newSrc);
                    handleSectionImageUpdate('challenge', image, newSrc);
                  }}
                  onImageRemove={(imgIndex) => console.log('🗑️ Removing image from challenge:', imgIndex)}
                  maxImages={1}
                  projectId={projectId}
                  imageCaptions={imageCaptions}
                  className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                />
              </div>
              
              {/* Show Research & Discovery text ONLY after first image (index 0) for investor project */}
              {index === 0 && isInvestorProject && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Research & Discovery</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-gray-700 mb-4">
                          I conducted extensive research with the banking team to understand their current pain points, identifying critical issues including manual data entry errors causing compliance issues, time-consuming Excel-based tracking processes, difficulty collaborating on complex deals, limited search and filtering capabilities, and email-based communication creating information silos. Through this research, I developed three key user personas: Investment Managers who need quick access to deal information and real-time updates, Loan Officers who require efficient deal processing and client communication tools, and Compliance Officers who need accurate reporting and audit trails.
                        </p>
                        
                        <p className="text-sm text-gray-700 mb-4 last:mb-0">
                          My competitive analysis focused on existing financial platforms, with particular emphasis on Bloomberg's search functionality, which became a key inspiration for our AI-powered search feature. This analysis revealed opportunities to modernize traditional banking workflows while maintaining the professional standards and regulatory compliance requirements that are essential in the financial services industry.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Show Key Features & Solutions text ONLY after second image (index 1) for investor project */}
              {index === 1 && isInvestorProject && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features & Solutions</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-gray-700 mb-4">
                          The platform's AI-powered search functionality addressed the critical problem of users being unable to efficiently find specific loans or borrower information within Excel spreadsheets. Drawing inspiration from Bloomberg's search interface, I implemented a predictive search system with multiple categories that includes predictive text suggestions, category-based filtering for deals, borrowers, and investors, advanced search parameters, and real-time results updating. This comprehensive search solution transformed how users interact with loan data, making information retrieval intuitive and fast.
                        </p>
                        
                        <p className="text-sm text-gray-700 mb-4 last:mb-0">
                          Dynamic order book management was another cornerstone feature that solved the complex and error-prone limit management processes that plagued the Excel-based system. The new intuitive interface allows users to seamlessly add and remove limits, edit existing limits without data loss, view real-time total amount calculations, and receive visual feedback for all changes. Complementing this was the flexible deal management system that replaced static Excel sheets with dynamic functionality offering both card views for quick overviews and grid views for detailed analysis, along with real-time collaboration tools and integrated communication features. Additionally, the advanced search and filtering capabilities provide smart defaults showing the most recent deals, borrowers, and investors, while offering advanced filtering options, saved search preferences, and quick access to frequently used searches.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Show additional challenge text ONLY after first image (index 0) for non-investor projects */}
              {index === 0 && !isInvestorProject && details.challengeAdditionalText && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    {details.challengeAdditionalText.split('\n\n').map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Enhanced gallery with text sections */}
      {details.challengeGalleryContent && details.challengeGalleryContent.length > 0 && (
        <ImageTextGallery
          items={details.challengeGalleryContent}
          imageCaptions={imageCaptions}
          projectId={projectId}
          sectionName="Challenge"
          onTextSave={handleTextSave}
        />
      )}
    </motion.section>
  );
};

export default ModernProjectChallengeSection;
