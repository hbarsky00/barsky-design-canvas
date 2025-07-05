
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

  // Get theme class based on project
  const getThemeClass = () => {
    switch (projectId) {
      case 'barsky-joint': return 'barsky-theme';
      case 'herbalink': return 'herbalink-theme';
      case 'splittime': return 'splittime-theme';
      case 'investor-loan-app': return 'investment-theme';
      default: return 'herbalink-theme';
    }
  };

  const themeClass = getThemeClass();

  // Get subtitle based on project
  const getSubtitle = () => {
    switch (projectId) {
      case 'barsky-joint':
        return "From user research to AI-powered development, here's how I created a seamless mobile ordering experience that reduced wait times and increased customer satisfaction.";
      case 'herbalink':
        return "Through user research, design iteration, and careful testing, I created a trusted platform that connects users with qualified herbalists.";
      case 'splittime':
        return "Through research, wireframing, and emotional design principles, I created a co-parenting platform that reduces conflict and builds trust.";
      case 'investor-loan-app':
        return "From Excel chaos to streamlined digital workflows - here's how I transformed a manual banking process into an efficient, compliant platform.";
      default:
        return "The systematic approach taken to solve the project challenges.";
    }
  };

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
    return images.slice(0, 3); // Limit to 3 for process steps
  }, [processBeforeHeaderImage, processRegularImage]);

  const handleImageReplace = (originalSrc: string, newSrc: string) => {
    handleSectionImageUpdate('process', originalSrc, newSrc);
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
        className="mb-4"
        projectId={projectId}
      />
      
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        {getSubtitle()}
      </p>

      {/* Process Steps Gallery */}
      {processImages.length > 0 && (
        <div className="process-steps">
          {processImages.map((image, index) => (
            <div key={index} className={`process-image ${themeClass}`}>
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
                  handleImageReplace(image, newSrc);
                }}
                onImageRemove={(imgIndex) => console.log('🗑️ Removing image from process:', imgIndex)}
                maxImages={1}
                projectId={projectId}
                imageCaptions={imageCaptions}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Content Grid */}
      <div className="content-grid">
        <div>
          <div className={`content-image ${themeClass} mb-4`}>
            Process Content Block 1
          </div>
          <EnhancedContentEditor
            content={details.process.split('\n\n')[0] || details.process.substring(0, 300)}
            contentType="section"
            onSave={(content) => handleSectionContentSave('process', 'content', content)}
            projectId={projectId}
          />
        </div>
        
        <div>
          <div className={`content-image ${themeClass} mb-4`}>
            Process Content Block 2
          </div>
          <EnhancedContentEditor
            content={details.process.split('\n\n')[1] || details.process.substring(300, 600)}
            contentType="section"
            onSave={(content) => handleSectionContentSave('process', 'content2', content)}
            projectId={projectId}
          />
        </div>
        
        <div>
          <div className={`content-image ${themeClass} mb-4`}>
            Process Content Block 3
          </div>
          <EnhancedContentEditor
            content={details.process.split('\n\n')[2] || details.process.substring(600, 900)}
            contentType="section"
            onSave={(content) => handleSectionContentSave('process', 'content3', content)}
            projectId={projectId}
          />
        </div>
        
        <div>
          <div className={`content-image ${themeClass} mb-4`}>
            Process Content Block 4
          </div>
          <EnhancedContentEditor
            content={details.process.split('\n\n')[3] || details.process.substring(900)}
            contentType="section"
            onSave={(content) => handleSectionContentSave('process', 'content4', content)}
            projectId={projectId}
          />
        </div>
      </div>

      {/* Tech Stack Badges */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {details.technologies.map((tech, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-medium ${themeClass} border`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ModernProjectProcessSection;
