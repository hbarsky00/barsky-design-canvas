
import React from "react";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import SpittimeResearchContent from "./SpittimeResearchContent";
import HerbalinkResearchContent from "./HerbalinkResearchContent";
import HerbalinkProcessCards from "./HerbalinkProcessCards";

interface ProcessImageGalleryProps {
  processImages: string[];
  projectId: string;
  imageCaptions: Record<string, string>;
  isSpittimeProject: boolean;
  isHerbalinkProject: boolean;
  onImageReplace: (originalSrc: string, newSrc: string) => void;
  onImageRemove: (index: number) => void;
}

const ProcessImageGallery: React.FC<ProcessImageGalleryProps> = ({
  processImages,
  projectId,
  imageCaptions,
  isSpittimeProject,
  isHerbalinkProject,
  onImageReplace,
  onImageRemove
}) => {
  const isInvestorProject = projectId === 'investor-loan-app';

  if (!processImages || processImages.length === 0) {
    return null;
  }

  return (
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
                onImageReplace(image, newSrc);
              }}
              onImageRemove={() => onImageRemove(index)}
              maxImages={1}
              projectId={projectId}
              imageCaptions={imageCaptions}
              className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
            />
          </div>
          
          {/* Show Key UX Enhancements after first image for investor project */}
          {index === 0 && isInvestorProject && (
            <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
              <div className="prose prose-lg text-gray-700 leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-900 mb-4"><strong>Key UX Enhancements</strong></h3>
                <p className="text-sm text-gray-700 mb-4">
                  The user experience improvements focused on five critical areas that transformed how banking professionals interact with the platform. I reduced cognitive load by creating a simplified interface that focuses on essential information, allowing users to process complex financial data without overwhelming visual clutter. Error prevention became a cornerstone of the design through built-in validation and confirmation dialogs that catch mistakes before they impact compliance or financial accuracy. Throughout the application, contextual help provides tooltips and guidance, ensuring users never feel lost in complex workflows.
                </p>
                <p className="text-sm text-gray-700 mb-4 last:mb-0">
                  The platform's responsive design optimization ensures seamless functionality across both desktop and tablet environments, accommodating the varied work styles of modern banking professionals. Most importantly, the entire system maintains WCAG 2.1 AA compliance standards, ensuring accessibility for all users regardless of their abilities or assistive technology needs. These enhancements collectively created an interface that not only meets strict banking requirements but actually makes daily tasks more intuitive and efficient for end users.
                </p>
              </div>
            </div>
          )}
          
          {/* Show project-specific content after first image */}
          {index === 0 && isSpittimeProject && <SpittimeResearchContent />}
          {index === 0 && isHerbalinkProject && (
            <>
              <HerbalinkResearchContent 
                projectId={projectId}
                imageCaptions={imageCaptions}
              />
              <HerbalinkProcessCards />
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProcessImageGallery;
