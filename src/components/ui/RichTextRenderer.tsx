
import React from 'react';
import { createSanitizedHtmlProps } from '@/utils/htmlSanitizer';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ 
  content, 
  className = "" 
}) => {
  if (!content) return null;

  return (
    <div 
      className={`prose prose-slate max-w-none ${className}`}
      {...createSanitizedHtmlProps(content)}
    />
  );
};
