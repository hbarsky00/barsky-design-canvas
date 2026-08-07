
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  
  // Configure DOMPurify with safe options
  const cleanHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code',
      'pre', 'img', 'div', 'span'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'title', 'class', 
      'style', 'id', 'data-*'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  });
  
  return cleanHtml;
};

/**
 * Create sanitized HTML props for React components
 */
export const createSanitizedHtmlProps = (html: string) => ({
  dangerouslySetInnerHTML: { __html: sanitizeHtml(html) }
});
