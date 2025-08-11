import React from "react";
import SectionTransition from "@/components/transitions/SectionTransition";

interface CaseStudySectionProps {
  id: string;
  title: string;
  content: {
    text: string;
    image: {
      src: string;
      alt: string;
    };
  };
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ id, title, content }) => {
  return (
    <SectionTransition as="section" id={id} className="mb-20" variant="wipe">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 align-start">
        {title}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {content.text}
          </p>
        </div>
        
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
      </div>
    </SectionTransition>
  );
};

export default CaseStudySection;