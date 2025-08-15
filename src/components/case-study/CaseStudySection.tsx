
import React from "react";
import SectionTransition from "@/components/transitions/SectionTransition";

interface CaseStudySectionProps {
  id: string;
  title: string;
  type?: 'text' | 'image' | 'gallery' | 'video';
  content: {
    text?: string;
    image?: {
      src: string;
      alt: string;
    };
    gallery?: {
      src: string;
      alt: string;
    }[];
    video?: {
      src: string;
      poster?: string;
    };
  };
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ id, title, type, content }) => {
  return (
    <SectionTransition as="section" id={id} className="mb-20" variant="wipe">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-8 text-left lg:text-center">
        {title}
      </h2>
      
      <div className="space-y-8">
        {/* Text Content */}
        {content.text && (
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.text}
            </p>
          </div>
        )}

        {/* Image Content */}
        {content.image && (
          <div className="relative">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Image Placeholder</p>
                  <p className="text-sm text-muted-foreground">{content.image.alt}</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
          </div>
        )}

        {/* Gallery Content */}
        {content.gallery && content.gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.gallery.map((item, index) => (
              <div key={index} className="relative">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Gallery Image {index + 1}</p>
                      <p className="text-sm text-muted-foreground">{item.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Content */}
        {content.video && (
          <div className="relative">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Video Placeholder</p>
                  <p className="text-sm text-muted-foreground">Video: {content.video.src}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionTransition>
  );
};

export default CaseStudySection;
