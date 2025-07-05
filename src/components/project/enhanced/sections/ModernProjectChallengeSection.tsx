
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import ProjectContentBox from "@/components/project/ProjectContentBox";
import MaximizableImage from "@/components/project/MaximizableImage";
import ProjectVideo from "@/components/project/ProjectVideo";

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

  // Helper function to detect if a URL is a video
  const isVideoUrl = (url: string): boolean => {
    return url.includes('loom.com/share/') || 
           url.includes('youtube.com/') || 
           url.includes('youtu.be/') || 
           url.includes('vimeo.com/') ||
           url.endsWith('.mp4') || 
           url.endsWith('.webm') || 
           url.endsWith('.ogg');
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

      {/* Show intro text in blue box before images for Splittime */}
      {isSpittimeProject && (
        <ProjectContentBox className="mb-8">
          <p>
            Co-parenting can be one of the most emotionally and logistically challenging experiences in modern family life. Many parents rely on a mix of disconnected tools—texts, emails, calendars, and spreadsheets—to manage shared custody, expenses, and communication. Emotional tension only compounds the complexity. Despite a few existing apps in this space, most are either too rigid, too outdated, or unintuitive. SplitTime was designed to address this gap with a fresh, emotionally-aware, and mobile-first experience.
          </p>
        </ProjectContentBox>
      )}

      {/* Show first two challenge images side by side immediately after header for Splittime */}
      {isSpittimeProject && challengeImages && challengeImages.length >= 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* First image */}
          <MaximizableImage
            src={challengeImages[0]}
            alt={imageCaptions[challengeImages[0]] || 'Challenge image 1'}
            caption={imageCaptions[challengeImages[0]] || 'Challenge image 1'}
            imageList={challengeImages}
            currentIndex={0}
            projectId={projectId}
            className="w-full h-auto object-cover rounded-lg"
          />
          
          {/* Second image */}
          <MaximizableImage
            src={challengeImages[1]}
            alt={imageCaptions[challengeImages[1]] || 'Challenge image 2'}
            caption={imageCaptions[challengeImages[1]] || 'Challenge image 2'}
            imageList={challengeImages}
            currentIndex={1}
            projectId={projectId}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      )}
      
      <EnhancedContentEditor
        content={details.challenge}
        contentType="section"
        onSave={(content) => handleSectionContentSave('challenge', 'content', content)}
        className="mb-8"
        projectId={projectId}
      />

      {/* Challenge Gallery Images - for Splittime show remaining images after first two, for others show all */}
      {challengeImages && challengeImages.length > 0 && (isSpittimeProject ? challengeImages.length > 2 : true) && (
        <div className="mt-12 space-y-8">
           {(isSpittimeProject ? challengeImages.slice(2) : challengeImages).map((item, index) => (
             <React.Fragment key={isSpittimeProject ? index + 2 : index}>
               {isVideoUrl(item) ? (
                 <ProjectVideo
                   src={item}
                   title={imageCaptions[item] || `Challenge video ${isSpittimeProject ? index + 3 : index + 1}`}
                   caption={imageCaptions[item] || `Challenge video ${isSpittimeProject ? index + 3 : index + 1}`}
                   projectId={projectId}
                   className="w-full rounded-lg shadow-elevated-lg bg-white p-4"
                 />
               ) : (
                 <MaximizableImage
                   src={item}
                   alt={imageCaptions[item] || `Challenge image ${isSpittimeProject ? index + 3 : index + 1}`}
                   caption={imageCaptions[item] || `Challenge image ${isSpittimeProject ? index + 3 : index + 1}`}
                   imageList={challengeImages.filter(img => !isVideoUrl(img))}
                   currentIndex={challengeImages.filter(img => !isVideoUrl(img)).indexOf(item)}
                   projectId={projectId}
                   className="w-full h-auto object-cover rounded-lg shadow-elevated-lg bg-white p-4"
                 />
               )}
              
              {/* Show research box after first image for investor project */}
              {index === 0 && isInvestorProject && (
                <ProjectContentBox title="Research & Analysis">
                  <p>
                    I conducted extensive research with the banking team to understand their current pain points, identifying critical issues including manual data entry errors causing compliance issues, time-consuming Excel-based tracking processes, difficulty collaborating on complex deals, limited search and filtering capabilities, and email-based communication creating information silos. Through this research, I developed three key user personas: Investment Managers who need quick access to deal information and real-time updates, Loan Officers who require efficient deal processing and client communication tools, and Compliance Officers who need accurate reporting and audit trails.
                  </p>
                  <p>
                    My competitive analysis focused on existing financial platforms, with particular emphasis on Bloomberg's search functionality, which became a key inspiration for our AI-powered search feature. This analysis revealed opportunities to modernize traditional banking workflows while maintaining the professional standards and regulatory compliance requirements that are essential in the financial services industry.
                  </p>
                  
                  {/* Two images side by side after research text */}
                  {challengeImages && challengeImages.length >= 4 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                      <MaximizableImage
                        src={challengeImages[2]}
                        alt={imageCaptions[challengeImages[2]] || 'Loan Central interface'}
                        caption={imageCaptions[challengeImages[2]] || 'Loan Central interface'}
                        imageList={challengeImages}
                        currentIndex={2}
                        projectId={projectId}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                      
                      <MaximizableImage
                        src={challengeImages[3]}
                        alt={imageCaptions[challengeImages[3]] || 'Orderbook interface'}
                        caption={imageCaptions[challengeImages[3]] || 'Orderbook interface'}
                        imageList={challengeImages}
                        currentIndex={3}
                        projectId={projectId}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </div>
                  )}
                </ProjectContentBox>
              )}

              {/* Show custom text after first image for Splittime project */}
              {index === 0 && isSpittimeProject && (
                <ProjectContentBox>
                  <p>
                    Key challenges include emotional triggers in messaging, scheduling chaos from lack of centralized systems, financial disputes over child expenses, documentation issues causing information loss, and children caught in parental conflicts.
                  </p>
                </ProjectContentBox>
              )}

              {/* Show key findings after first image for Herbalink project */}
              {index === 0 && isHerbalinkProject && (
                <ProjectContentBox title="Key Findings">
                  <p>
                    Users struggled with finding qualified, credentialed herbalists and felt uncertain about practitioner backgrounds and herbal recommendation safety. High costs and limited rural availability created additional barriers to accessing herbal care. Meanwhile, herbalists faced challenges building their client base, managing time-consuming intake processes, and maintaining remote client relationships without a centralized platform.
                  </p>
                </ProjectContentBox>
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
                        className="rounded-xl shadow-elevated-lg w-full glass-card layered-depth"
                      />
                      {/* Second image */}
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
                        className="rounded-xl shadow-elevated-lg w-full glass-card layered-depth"
                      />
                    </div>
                  )}
                </>
              )}
              
              {/* Regular image display for other projects or images after the first two */}
              {item.type === 'image' && (!isSpittimeProject || index >= 2) && (
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
                  className="rounded-xl shadow-elevated-lg w-full glass-card layered-depth"
                />
              )}
              
              {/* Show custom text after third image (index 2) for Splittime project */}
              {index === 2 && isSpittimeProject && (
                <ProjectContentBox>
                  <p>
                    Key challenges include emotional triggers in messaging, scheduling chaos from lack of centralized systems, financial disputes over child expenses, documentation issues causing information loss, and children caught in parental conflicts.
                  </p>
                </ProjectContentBox>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default ModernProjectChallengeSection;
