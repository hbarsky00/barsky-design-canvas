
import React from "react";

interface SimpleContentSectionProps {
  title: string;
  content: string;
  images: string[];
  sectionKey: string;
  projectId: string;
  getTextContent: (key: string, fallback?: string) => string;
  getImageSrc: (originalSrc: string) => string;
  saveTextContent: (key: string, content: string) => Promise<void>;
  saveImageReplacement: (originalSrc: string, newSrc: string) => Promise<void>;
  finalCaptions: Record<string, string>;
}

const SimpleContentSection: React.FC<SimpleContentSectionProps> = ({
  title,
  content,
  images,
  sectionKey,
  projectId,
  getTextContent,
  getImageSrc,
  saveTextContent,
  saveImageReplacement,
  finalCaptions
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
      
      <div className="prose max-w-none mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          {getTextContent(`${sectionKey}_content`, content)}
        </p>
      </div>

      {images && images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div key={index} className="space-y-2">
              <img
                src={getImageSrc(image)}
                alt={finalCaptions[image] || `${title} ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
              {finalCaptions[image] && (
                <p className="text-sm text-gray-600 italic">
                  {finalCaptions[image]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleContentSection;
