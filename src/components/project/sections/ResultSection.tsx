
import React from "react";
import { Award } from "lucide-react";
import ProjectSection from "../ProjectSection";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";
import { getEmbedUrl } from "@/utils/videoUtils";

interface ResultSectionProps {
  result: string;
  resultGalleryImages?: string[];
  resultImage?: string;
  videoUrl?: string;
  imageCaptions: Record<string, string>;
}

const ResultSection: React.FC<ResultSectionProps> = ({
  result,
  resultGalleryImages,
  resultImage,
  videoUrl,
  imageCaptions
}) => {
  // Remove duplicates by converting to Set and back to array
  const uniqueResultGalleryImages = resultGalleryImages ? Array.from(new Set(resultGalleryImages)) : [];
  
  return (
    <div className="mb-12">
      <div className="flex items-center mb-4 space-x-2">
        <Award className="h-5 w-5 text-barsky-blue" />
        <h2 className="text-2xl font-bold">The Result</h2>
      </div>
      <div className="mb-4">
        <div className="prose prose-slate max-w-none dark:prose-invert">
          {result.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      
      {/* Show carousel gallery if resultGalleryImages exists, otherwise show single image */}
      {resultGalleryImages && resultGalleryImages.length > 0 ? (
        <div className="mt-4">
          <ProjectMultiImageGallery 
            images={uniqueResultGalleryImages}
            captions={imageCaptions}
          />
        </div>
      ) : resultImage ? (
        <ProjectSection
          title=""
          icon={Award}
          content=""
          image={resultImage}
          imageCaption={resultImage && imageCaptions[resultImage]}
        />
      ) : null}

      {/* Video Section - Show in result section if videoUrl exists */}
      {videoUrl && (
        <div className="mt-6">
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src={getEmbedUrl(videoUrl)}
              title="Project Demo Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultSection;
