
import React from 'react';
import EditableText from '@/components/dev/EditableText';

interface SectionContentProps {
  title: string;
  content: string;
  sectionKey: string;
  projectId: string;
}

const SectionContent: React.FC<SectionContentProps> = ({
  title,
  content,
  sectionKey,
  projectId
}) => {
  return (
    <>
      {/* Section Title */}
      <EditableText 
        initialText={title}
        textKey={`${sectionKey}_title_${projectId}`}
      >
        {(text) => (
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center">
            {text}
          </h2>
        )}
      </EditableText>
      
      {/* Section Content */}
      <EditableText 
        initialText={content} 
        multiline
        textKey={`${sectionKey}_content_${projectId}`}
      >
        {(text) => (
          <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
            {text.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-3 sm:mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </EditableText>
    </>
  );
};

export default SectionContent;
