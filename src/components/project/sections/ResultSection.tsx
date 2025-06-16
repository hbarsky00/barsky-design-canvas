
import React from "react";
import { Award } from "lucide-react";
import ProjectSection from "../ProjectSection";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";
import EditableText from "@/components/dev/EditableText";

interface ResultSectionProps {
  result: string;
  resultGalleryImages?: string[];
  resultImage?: string;
  imageCaptions: Record<string, string>;
}

const ResultSection: React.FC<ResultSectionProps> = ({
  result,
  resultGalleryImages,
  resultImage,
  imageCaptions
}) => {
  // Remove duplicates by converting to Set and back to array
  const uniqueResultGalleryImages = resultGalleryImages ? Array.from(new Set(resultGalleryImages)) : [];
  
  const handleImageReplace = (oldSrc: string, newSrc: string) => {
    console.log('ResultSection: Replacing image', oldSrc, 'with', newSrc);
    // For now, just log the replacement - in a real app, this would update the project data
  };

  return (
    <div className="mb-12">
      <div className="flex items-center mb-4 space-x-2">
        <Award className="h-5 w-5 text-barsky-blue" />
        <EditableText initialText="The Result">
          {(text) => (
            <h2 className="text-2xl font-bold pr-8">{text}</h2>
          )}
        </EditableText>
      </div>
      <div className="mb-4">
        <EditableText initialText={result} multiline>
          {(text) => (
            <div className="prose prose-slate max-w-none dark:prose-invert pr-8">
              {text.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </EditableText>
      </div>
      
      {/* Show carousel gallery if resultGalleryImages exists, otherwise show single image */}
      {resultGalleryImages && resultGalleryImages.length > 0 ? (
        <div className="mt-4">
          <ProjectMultiImageGallery 
            images={uniqueResultGalleryImages}
            captions={imageCaptions}
            onImageReplace={handleImageReplace}
          />
        </div>
      ) : resultImage ? (
        <ProjectSection
          title=""
          icon={Award}
          content=""
          image={resultImage}
          imageCaption={resultImage && imageCaptions[resultImage]}
          onImageReplace={(newSrc) => handleImageReplace(resultImage, newSrc)}
        />
      ) : null}
    </div>
  );
};

export default ResultSection;
