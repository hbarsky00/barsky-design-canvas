
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

export interface ContentTypeCount {
  images: number;
  videos: number;
  text: number;
  headers: number;
  pdfs: number;
  total: number;
}

export const analyzeContentTypes = (contentBlocks: ContentBlock[]): ContentTypeCount => {
  const counts = {
    images: 0,
    videos: 0,
    text: 0,
    headers: 0,
    pdfs: 0,
    total: contentBlocks.length
  };

  contentBlocks.forEach(block => {
    switch (block.type) {
      case 'image':
        counts.images++;
        break;
      case 'video':
        counts.videos++;
        break;
      case 'text':
        counts.text++;
        break;
      case 'header':
        counts.headers++;
        break;
      case 'pdf':
        counts.pdfs++;
        break;
    }
  });

  return counts;
};

export const generateContentHeader = (contentBlocks: ContentBlock[]): string => {
  if (contentBlocks.length === 0) {
    return '';
  }

  const counts = analyzeContentTypes(contentBlocks);
  const { images, videos, text, headers, pdfs, total } = counts;

  // Single type scenarios
  if (images === total) {
    return `Project Images (${images} ${images === 1 ? 'item' : 'items'})`;
  }
  
  if (videos === total) {
    return `Project Videos (${videos} ${videos === 1 ? 'item' : 'items'})`;
  }
  
  if (text === total) {
    return `Additional Text (${text} ${text === 1 ? 'section' : 'sections'})`;
  }
  
  if (headers === total) {
    return `Section Headers (${headers} ${headers === 1 ? 'item' : 'items'})`;
  }
  
  if (pdfs === total) {
    return `Documents (${pdfs} ${pdfs === 1 ? 'file' : 'files'})`;
  }

  // Mixed content scenarios
  const mediaCount = images + videos + pdfs;
  const contentCount = text + headers;

  if (mediaCount > 0 && contentCount === 0) {
    return `Project Media (${total} ${total === 1 ? 'item' : 'items'})`;
  }
  
  if (contentCount > 0 && mediaCount === 0) {
    return `Additional Content (${total} ${total === 1 ? 'section' : 'sections'})`;
  }

  // Mixed media and content
  return `Media & Content (${total} ${total === 1 ? 'item' : 'items'})`;
};

export const generateContentBreakdown = (contentBlocks: ContentBlock[]): string => {
  if (contentBlocks.length === 0) {
    return '';
  }

  const counts = analyzeContentTypes(contentBlocks);
  const parts: string[] = [];

  if (counts.images > 0) {
    parts.push(`${counts.images} ${counts.images === 1 ? 'Image' : 'Images'}`);
  }
  
  if (counts.videos > 0) {
    parts.push(`${counts.videos} ${counts.videos === 1 ? 'Video' : 'Videos'}`);
  }
  
  if (counts.pdfs > 0) {
    parts.push(`${counts.pdfs} ${counts.pdfs === 1 ? 'Document' : 'Documents'}`);
  }
  
  if (counts.text > 0) {
    parts.push(`${counts.text} Text ${counts.text === 1 ? 'Block' : 'Blocks'}`);
  }
  
  if (counts.headers > 0) {
    parts.push(`${counts.headers} ${counts.headers === 1 ? 'Header' : 'Headers'}`);
  }

  if (parts.length <= 1) {
    return '';
  }

  if (parts.length === 2) {
    return parts.join(' & ');
  }

  return parts.slice(0, -1).join(', ') + ' & ' + parts[parts.length - 1];
};
