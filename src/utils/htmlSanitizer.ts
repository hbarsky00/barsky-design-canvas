
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
      // Added 2026-11-17, found by scripts/check-prose-integrity.mjs.
      //
      // `table` and friends were missing, and because of how HTML parses
      // tables, stripping the cell elements did not merely unwrap them — it
      // dropped their text. The comparison table in
      // /blog/chatgpt-vs-claude-vs-gemini-for-ux shipped with its header row
      // ("Model", "Best for", "Where it pulls ahead") simply gone.
      //
      // `figure` and `figcaption` were missing too, so every captioned image
      // in a blog body lost its <figcaption> element. The caption text
      // survived as ordinary body copy — same size, same weight as the
      // paragraph above it, photo credit and all.
      //
      // All of these are inert, non-scriptable editorial elements. 'style' and
      // 'div', already allowed above, each carry strictly more risk.
      'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
      'hr', 'small', 'sup', 'sub', 'del', 'ins'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'title', 'class',
      'style', 'id', 'data-*',
      // width/height/loading were missing, so DOMPurify stripped them from every
      // <img> in a blog body. That is why blog images shipped with no intrinsic
      // dimensions (CLS on every post) and why only 36 of 260 images site-wide were
      // lazy-loaded despite the markup asking for it. All of these are inert
      // presentation attributes — 'style', already allowed above, carries strictly
      // more risk than any of them.
      'width', 'height', 'loading', 'decoding', 'sizes', 'srcset', 'fetchpriority',
      // Needed by the table elements allowed above; 'scope' is what makes a
      // header cell announce correctly to a screen reader.
      'colspan', 'rowspan', 'scope'
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
