
import React, { useEffect, useRef } from 'react';
import { createSanitizedHtmlProps } from '@/utils/htmlSanitizer';

interface InternalLinkEnhancerProps {
  content: string;
  className?: string;
}

export const InternalLinkEnhancer: React.FC<InternalLinkEnhancerProps> = ({
  content,
  className = ""
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Enhance internal links after content is rendered
    const links = contentRef.current.querySelectorAll('a[href^="/"]');
    
    links.forEach((link) => {
      const anchor = link as HTMLAnchorElement;
      
      // Add proper attributes for internal links
      if (!anchor.getAttribute('rel')) {
        anchor.setAttribute('rel', 'noopener');
      }
      
      // Add hover effects
      anchor.classList.add('text-blue-vibrant', 'hover:underline', 'transition-colors');
    });
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className={className}
      {...createSanitizedHtmlProps(content)}
    />
  );
};
