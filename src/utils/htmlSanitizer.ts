
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
      'pre', 'img', 'div', 'span',
      // figure/figcaption were missing, so DOMPurify unwrapped every image
      // caption in the blog — including the Unsplash attribution we're
      // required to display.
      'figure', 'figcaption'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'title', 'class',
      'style', 'id', 'data-*',
      // needed so images reserve space and don't shift layout while loading
      'width', 'height', 'loading'
    ],
    // The \- below is redundant, but this is the URI allowlist for the
    // sanitiser and it is not worth re-typing a security-critical regex to
    // satisfy a style rule.
    // eslint-disable-next-line no-useless-escape
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
