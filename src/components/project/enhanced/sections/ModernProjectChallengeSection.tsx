
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
      id="challenge"
      data-section="challenge"
      aria-labelledby="challenge-heading"
      key={`challenge-${componentKey}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="rounded-2xl bg-card border border-border shadow-elevated p-4 sm:p-8 scroll-mt-[calc(var(--header-height,64px)+2rem)]"
    >
      <h2 id="challenge-heading" className="sr-only">Challenge Section</h2>
      
      {/* Eyebrow */}
      <div className="text-center mb-4">
        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 tracking-wide uppercase">
          The Problem
        </span>
      </div>
      
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
      
      <ProjectContentBox>
        <EnhancedContentEditor
          content={details.challenge}
          contentType="section"
          onSave={(content) => handleSectionContentSave('challenge', 'content', content)}
          className="mb-8"
          projectId={projectId}
        />
      </ProjectContentBox>

      {/* Two-column image row for Herbalink project */}
      {isHerbalinkProject && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <MaximizableImage
              src="/lovable-uploads/a7f0be86-72db-4c00-86f7-798b641bcf7a.png"
              alt="Herbalist consultation illustration showing the challenge of trust-building between practitioner and patient"
              caption="Trust-building consultation process between herbalist and patient"
              projectId={projectId}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
            
            <MaximizableImage
              src="/lovable-uploads/d5720e5f-50e6-418f-ada9-6b089ae091c1.png"
              alt="Herbalink video consultation interface showing platform functionality"
              caption="Herbalink video consultation interface with practitioner credentials and live recommendations"
              projectId={projectId}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Additional challenge context between image rows */}
          <div className="mt-8 mb-8">
            <ProjectContentBox>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Building Trust in a Skeptical Market
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The biggest challenge was creating a platform that would instill confidence in users who are often skeptical about online health services, especially in the alternative medicine space. Users needed assurance about herbalist qualifications while herbalists needed tools to establish credibility and manage their practice effectively.
              </p>
            </ProjectContentBox>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MaximizableImage
              src="/lovable-uploads/9fcd93b1-bcda-4b24-bfc8-f67b544b17ec.png"
              alt="The Problem illustration showing user frustration with unreliable information, finding practitioners, tracking progress, and poor interfaces"
              caption="Key challenges users face: unreliable information, difficulty finding practitioners, tracking progress, and poor interfaces"
              projectId={projectId}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
            
            <MaximizableImage
              src="/lovable-uploads/37dc4599-85f2-42b0-b1c9-e1c49c4006c3.png"
              alt="HerbaLink platform overview showing cross-platform solution, reliable herbal remedies, and licensed practitioners"
              caption="HerbaLink platform featuring wellness services, classes, and personalized consultations with certified herbalists"
              projectId={projectId}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Additional challenge details in two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <ProjectContentBox>
              <h3 className="text-2xl font-black text-blue-900 mb-4 uppercase tracking-wide">
                Complex Information Architecture
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Creating an intuitive flow that balances comprehensive health intake with user-friendly simplicity. Initial testing showed users were overwhelmed by too many questions upfront. I solved this by implementing progressive disclosure and adaptive questioning that adjusts based on user responses.
              </p>
            </ProjectContentBox>

            <ProjectContentBox>
              <h3 className="text-2xl font-black text-blue-900 mb-4 uppercase tracking-wide">
                Regulatory & Safety Considerations
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ensuring the platform met health information privacy requirements while providing clear disclaimers about herbal consultations not replacing medical care. I worked closely with legal advisors to implement appropriate safeguards and user education about the scope of herbal consultations.
              </p>
            </ProjectContentBox>
          </div>
        </>
      )}

      {/* Challenge Gallery Images - for Splittime show remaining images after first two, for others show all */}
      {challengeImages && challengeImages.length > 0 && (isSpittimeProject ? challengeImages.length > 2 : true) && (
        <div className="mt-16 space-y-12">
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
              

              {/* Show custom text after first image for Splittime project */}
              {index === 0 && isSpittimeProject && (
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

      {/* Challenge Gallery Content - Fallback for new format */}
      {details.challengeGalleryContent && details.challengeGalleryContent.length > 0 && !challengeImages.length && (
        <div className="mt-16 space-y-12">
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
