
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";

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
  console.log('🔍 Challenge gallery content for', projectId, ':', details.challengeGalleryContent);
  
  const { handleSectionContentSave } = useSimplifiedContentEditor({
    projectId
  });

  const handleImageRemove = (index: number) => {
    console.log('🗑️ Removing image from challenge section at index:', index);
    // For now, just log the removal - you can implement actual removal logic if needed
    // This could involve updating the project details or triggering a refresh
  };

  // Check if this is the splittime or herbalink project
  const isSpittimeProject = projectId === 'splittime';
  const isHerbalinkProject = projectId === 'herbalink';
  const isInvestorProject = projectId === 'investor-loan-app';

  // Get challenge gallery images from details
  const challengeImages = details.challengeGalleryImages || [];

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

      {/* Show first two challenge images side by side immediately after header for Splittime */}
      {isSpittimeProject && challengeImages && challengeImages.length >= 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* First image */}
          <figure className="rounded-xl shadow-elevated-lg overflow-hidden bg-white p-4">
            <img
              src={challengeImages[0]}
              alt={imageCaptions[challengeImages[0]] || 'Challenge image 1'}
              className="w-full h-auto object-cover rounded-lg"
              loading="lazy"
            />
            <figcaption className="mt-3 text-sm text-gray-600 leading-relaxed">
              {imageCaptions[challengeImages[0]] || 'Challenge image 1'}
            </figcaption>
          </figure>
          
          {/* Second image */}
          <figure className="rounded-xl shadow-elevated-lg overflow-hidden bg-white p-4">
            <img
              src={challengeImages[1]}
              alt={imageCaptions[challengeImages[1]] || 'Challenge image 2'}
              className="w-full h-auto object-cover rounded-lg"
              loading="lazy"
            />
            <figcaption className="mt-3 text-sm text-gray-600 leading-relaxed">
              {imageCaptions[challengeImages[1]] || 'Challenge image 2'}
            </figcaption>
          </figure>
        </div>
      )}
      
      <EnhancedContentEditor
        content={details.challenge}
        contentType="section"
        onSave={(content) => handleSectionContentSave('challenge', 'content', content)}
        className="mb-8"
        projectId={projectId}
      />

      {/* Challenge Gallery Images - remaining images after the first two */}
      {challengeImages && challengeImages.length > 2 && (
        <div className="mt-12 space-y-8">
          {challengeImages.slice(2).map((image, index) => (
            <React.Fragment key={index + 2}>
              <figure className="rounded-xl shadow-elevated-lg overflow-hidden bg-white p-4">
                <img
                  src={image}
                  alt={imageCaptions[image] || `Challenge image ${index + 3}`}
                  className="w-full h-auto object-cover rounded-lg"
                  loading="lazy"
                />
                <figcaption className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {imageCaptions[image] || `Challenge image ${index + 3}`}
                </figcaption>
              </figure>
              
              {/* Show research box after first image for investor project */}
              {index === 0 && isInvestorProject && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4"><strong>Research & Analysis</strong></h3>
                    <p className="text-sm text-gray-700 mb-4">
                      I conducted extensive research with the banking team to understand their current pain points, identifying critical issues including manual data entry errors causing compliance issues, time-consuming Excel-based tracking processes, difficulty collaborating on complex deals, limited search and filtering capabilities, and email-based communication creating information silos. Through this research, I developed three key user personas: Investment Managers who need quick access to deal information and real-time updates, Loan Officers who require efficient deal processing and client communication tools, and Compliance Officers who need accurate reporting and audit trails.
                    </p>
                    <p className="text-sm text-gray-700 mb-4 last:mb-0">
                      My competitive analysis focused on existing financial platforms, with particular emphasis on Bloomberg's search functionality, which became a key inspiration for our AI-powered search feature. This analysis revealed opportunities to modernize traditional banking workflows while maintaining the professional standards and regulatory compliance requirements that are essential in the financial services industry.
                    </p>
                  </div>
                </div>
              )}

              {/* Show custom text after first image for Splittime project */}
              {index === 0 && isSpittimeProject && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <p className="text-sm text-gray-700 mb-4 last:mb-0">
                      Key challenges include emotional triggers in messaging, scheduling chaos from lack of centralized systems, financial disputes over child expenses, documentation issues causing information loss, and children caught in parental conflicts.
                    </p>
                  </div>
                </div>
              )}

              {/* Show key findings after first image for Herbalink project */}
              {index === 0 && isHerbalinkProject && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Key Findings:</h4>
                    <p className="text-sm text-gray-700 mb-4 last:mb-0">
                      Users struggled with finding qualified, credentialed herbalists and felt uncertain about practitioner backgrounds and herbal recommendation safety. High costs and limited rural availability created additional barriers to accessing herbal care. Meanwhile, herbalists faced challenges building their client base, managing time-consuming intake processes, and maintaining remote client relationships without a centralized platform.
                    </p>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Challenge Gallery Content - Fallback for new format */}
      {details.challengeGalleryContent && details.challengeGalleryContent.length > 0 && !challengeImages.length && (
        <div className="mt-12 space-y-8">
          {details.challengeGalleryContent.map((item, index) => (
            <React.Fragment key={index}>
              {/* Special handling for first two images in Splittime - display side by side */}
              {item.type === 'image' && isSpittimeProject && index < 2 && (
                <>
                  {index === 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* First image */}
                      <div className="glass-card p-4 layered-depth">
                        <EnhancedContentEditor
                          content=""
                          contentType="section"
                          onSave={() => {}}
                          images={[item.content]}
                          onImageAdd={(imageSrc) => {
                            console.log('➕ Adding image to challenge section:', imageSrc);
                          }}
                          onImageReplace={(imgIndex, newSrc) => {
                            console.log('🔄 Replacing challenge image:', item.content, '->', newSrc);
                          }}
                          onImageRemove={() => handleImageRemove(index)}
                          maxImages={1}
                          projectId={projectId}
                          imageCaptions={imageCaptions}
                          className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                        />
                      </div>
                      {/* Second image */}
                      <div className="glass-card p-4 layered-depth">
                        <EnhancedContentEditor
                          content=""
                          contentType="section"
                          onSave={() => {}}
                          images={[details.challengeGalleryContent[1].content]}
                          onImageAdd={(imageSrc) => {
                            console.log('➕ Adding image to challenge section:', imageSrc);
                          }}
                          onImageReplace={(imgIndex, newSrc) => {
                            console.log('🔄 Replacing challenge image:', details.challengeGalleryContent[1].content, '->', newSrc);
                          }}
                          onImageRemove={() => handleImageRemove(1)}
                          maxImages={1}
                          projectId={projectId}
                          imageCaptions={imageCaptions}
                          className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {/* Regular image display for other projects or images after the first two */}
              {item.type === 'image' && (!isSpittimeProject || index >= 2) && (
                <div className="glass-card p-4 layered-depth">
                  <EnhancedContentEditor
                    content=""
                    contentType="section"
                    onSave={() => {}}
                    images={[item.content]}
                    onImageAdd={(imageSrc) => {
                      console.log('➕ Adding image to challenge section:', imageSrc);
                    }}
                    onImageReplace={(imgIndex, newSrc) => {
                      console.log('🔄 Replacing challenge image:', item.content, '->', newSrc);
                    }}
                    onImageRemove={() => handleImageRemove(index)}
                    maxImages={1}
                    projectId={projectId}
                    imageCaptions={imageCaptions}
                    className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                  />
                </div>
              )}
              
              {/* Show custom text after third image (index 2) for Splittime project */}
              {index === 2 && isSpittimeProject && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <p className="text-sm text-gray-700 mb-4 last:mb-0">
                      Key challenges include emotional triggers in messaging, scheduling chaos from lack of centralized systems, financial disputes over child expenses, documentation issues causing information loss, and children caught in parental conflicts.
                    </p>
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

export default ModernProjectChallengeSection;
