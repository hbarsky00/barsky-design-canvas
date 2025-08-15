
import React from 'react';

interface CaseStudySectionProps {
  section: {
    type: string;
    title?: string;
    content: any;
  };
  index: number;
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ section, index }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {section.title && (
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {section.title}
          </h2>
        )}
        <div className="prose max-w-none">
          {/* Render section content based on type */}
          {section.type === 'text' && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {section.content.text}
            </p>
          )}
          {section.type === 'image' && (
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Image placeholder</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
