
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
      className={`prose prose-lg max-w-none dark:prose-invert prose-headings:text-on-surface prose-p:text-on-surface-variant prose-a:text-primary ${className}`}
      {...createSanitizedHtmlProps(content)}
    />
  );
};
