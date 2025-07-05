
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import ProjectContentBox from "@/components/project/ProjectContentBox";

interface ModernProjectResultSectionProps {
  details: ProjectDetails;
  projectId: string;
  componentKey: string;
  imageCaptions: Record<string, string>;
}

const ModernProjectResultSection: React.FC<ModernProjectResultSectionProps> = ({
  details,
  projectId,
  componentKey,
  imageCaptions
}) => {
  const { handleSectionContentSave, handleSectionImageUpdate } = useSimplifiedContentEditor({ projectId });

  // Check if this is the investor loan app project
  const isInvestorProject = projectId === 'investor-loan-app';
  // Check if this is the Splittime project
  const isSpittimeProject = projectId === 'splittime';

  return (
    <motion.section
      key={`result-${componentKey}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="glass-card-elevated p-4 sm:p-8 layered-depth"
    >
      <EnhancedContentEditor
        content="The Result"
        contentType="header"
        onSave={(content) => handleSectionContentSave('result', 'title', content)}
        className="mb-6 lg:mb-8"
        projectId={projectId}
      />
      
      <ProjectContentBox>
        <EnhancedContentEditor
          content={details.result}
          contentType="section"
          onSave={(content) => handleSectionContentSave('result', 'content', content)}
          className="mb-8"
          projectId={projectId}
        />
      </ProjectContentBox>

      {/* Result Images Gallery with text positioned between images */}
      {details.resultGalleryImages && details.resultGalleryImages.length > 0 && (
        <div className="mt-12 space-y-8">
          {details.resultGalleryImages.map((image, index) => (
            <React.Fragment key={index}>
              {/* Each Image */}
              <div className="glass-card p-4 layered-depth">
                <EnhancedContentEditor
                  content=""
                  contentType="section"
                  onSave={() => {}}
                  images={[image]}
                  onImageAdd={(imageSrc) => {
                    console.log('➕ Adding image to result section:', imageSrc);
                  }}
                  onImageReplace={(imgIndex, newSrc) => {
                    console.log('🔄 Replacing result image:', image, '->', newSrc);
                    handleSectionImageUpdate('result', image, newSrc);
                  }}
                  onImageRemove={(imgIndex) => console.log('🗑️ Removing image from result:', imgIndex)}
                  maxImages={1}
                  projectId={projectId}
                  imageCaptions={imageCaptions}
                  className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                />
              </div>
              
              {/* Show Conclusion text ONLY after first image (index 0) */}
              {index === 0 && (
                <ProjectContentBox title="Conclusion">
                  {isInvestorProject ? (
                    <>
                      <p>
                        This project successfully transformed a manual, error-prone Excel-based system into a modern, efficient digital platform. The key to success was understanding user needs deeply and designing solutions that not only solved technical problems but also improved the daily work experience for banking professionals.
                      </p>
                      <p>
                        The 85% reduction in errors and 40% improvement in processing speed demonstrate the tangible business impact, while the high user satisfaction scores show that the solution truly met user needs. This project positioned the private bank for future growth while making their current operations significantly more efficient and enjoyable.
                      </p>
                    </>
                  ) : isSpittimeProject ? (
                    <>
                      <p>
                        The platform reduced court visits, generated significant legal fee savings, achieved high user satisfaction, and increased productive co-parent communication. One beta user noted: "This app saved my relationship with my ex-partner. We can actually focus on our kids now instead of fighting about logistics."
                      </p>
                      <p>
                        Additional benefits included reduced stress, better coordination, improved documentation, and stronger focus on children's wellbeing over conflict.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Herbalink addresses a significant gap in the wellness market by creating a trusted platform connecting people with certified herbalists for personalized wellness consultations.
                      </p>
                      <p>
                        The project demonstrated the importance of understanding both sides of a marketplace, building trust through design, and creating educational experiences that empower users to make informed wellness decisions.
                      </p>
                    </>
                  )}
                </ProjectContentBox>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default ModernProjectResultSection;
