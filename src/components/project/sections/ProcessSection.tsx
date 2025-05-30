
import React from "react";
import { List } from "lucide-react";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";
import MaximizableImage from "../MaximizableImage";
import { removeDuplicateImages } from "@/utils/imageUtils";

interface ProcessSectionProps {
  processBeforeGallery: string;
  processAfterGallery: string;
  isInvestorProject: boolean;
  isDaeSearchProject: boolean;
  bloombergSearchImages: string[];
  bloombergCaptions: Record<string, string>;
  servicesGalleryImages: string[];
  servicesCaptions: Record<string, string>;
  processImage?: string;
  processBottomImage?: string;
  imageCaptions: Record<string, string>;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({
  processBeforeGallery,
  processAfterGallery,
  isInvestorProject,
  isDaeSearchProject,
  bloombergSearchImages,
  bloombergCaptions,
  servicesGalleryImages,
  servicesCaptions,
  processImage,
  processBottomImage,
  imageCaptions
}) => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-4 space-x-2">
        <List className="h-5 w-5 text-barsky-blue" />
        <h2 className="text-2xl font-bold">What I Did</h2>
      </div>
      
      {processBeforeGallery && (
        <div className="prose prose-slate max-w-none dark:prose-invert mb-4">
          {processBeforeGallery.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
          ))}
        </div>
      )}

      {/* Bloomberg Search Interface Gallery - Only for investor project */}
      {isInvestorProject && processBeforeGallery && (
        <div className="mb-6">
          <ProjectMultiImageGallery 
            images={bloombergSearchImages}
            captions={bloombergCaptions}
          />
        </div>
      )}

      {/* Services Gallery - Only for DAE Search project */}
      {isDaeSearchProject && servicesGalleryImages.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-barsky-dark">Services Provided</h3>
          <ProjectMultiImageGallery 
            images={removeDuplicateImages(servicesGalleryImages)}
            captions={servicesCaptions}
          />
        </div>
      )}

      <div className="prose prose-slate max-w-none dark:prose-invert mb-4">
        {processAfterGallery.split('\n').map((paragraph, index) => (
          paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
        ))}
      </div>

      {processImage && (
        <div className="mt-4">
          <MaximizableImage
            src={processImage}
            alt="What I Did"
            caption={processImage && imageCaptions[processImage]}
          />
        </div>
      )}

      {processBottomImage && (
        <div className="mt-4">
          <MaximizableImage
            src={processBottomImage}
            alt="What I Did"
            caption={processBottomImage && imageCaptions[processBottomImage]}
          />
        </div>
      )}
    </div>
  );
};

export default ProcessSection;
