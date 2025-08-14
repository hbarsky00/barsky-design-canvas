
import React from "react";
import SectionTransition from "@/components/transitions/SectionTransition";

interface CaseStudySectionProps {
  section?: {
    type: string;
    title?: string;
    content: {
      text?: string;
      image?: string;
      images?: string[];
    };
  };
  index?: number;
  // Legacy props for backward compatibility
  id?: string;
  title?: string;
  content?: {
    text: string;
    image: {
      src: string;
      alt: string;
    };
  };
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ 
  section, 
  index = 0,
  id,
  title,
  content
}) => {
  // Handle both new and legacy prop structures
  const sectionData = section || {
    type: 'content',
    title: title || '',
    content: {
      text: content?.text || '',
      image: content?.image?.src || ''
    }
  };

  const sectionId = id || `section-${index}`;
  const sectionTitle = sectionData.title || title || '';

  return (
    <SectionTransition as="section" id={sectionId} className="mb-20" variant="wipe">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-8 text-left lg:text-center">
        {sectionTitle}
      </h2>
      
      <div className="space-y-8">
        <div className="relative">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Image Placeholder</p>
                <p className="text-sm text-muted-foreground">
                  {content?.image?.alt || sectionTitle}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
        </div>

        <div className="space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {sectionData.content.text || content?.text || ''}
          </p>
        </div>
      </div>
    </SectionTransition>
  );
};

export default CaseStudySection;
