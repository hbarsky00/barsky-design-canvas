
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";

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
      
      <EnhancedContentEditor
        content={details.result}
        contentType="section"
        onSave={(content) => handleSectionContentSave('result', 'content', content)}
        className="mb-8"
        projectId={projectId}
      />

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
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4"><strong>Conclusion</strong></h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Herbalink addresses a significant gap in the wellness market by creating a trusted, educational platform for herbal consultations. The design prioritizes transparency, accessibility, and user empowerment while respecting the expertise of certified herbalists. The app has been developed and is ready for market launch, with the design foundation in place to support both users seeking herbal guidance and practitioners looking to grow their practice digitally.
                    </p>
                    <p className="text-sm text-gray-700 mb-4 last:mb-0">
                      The project demonstrated the importance of understanding both sides of a marketplace, building trust through design, and creating educational experiences that empower users to make informed wellness decisions.
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

export default ModernProjectResultSection;
