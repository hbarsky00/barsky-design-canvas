// Utility to convert HTML content to plain text while preserving structure

export function htmlToText(html: string): string {
  if (!html) return '';
  
  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Handle specific tags to preserve structure
  const processNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      const children = Array.from(node.childNodes).map(processNode).join('');
      
      // Add line breaks for block elements
      switch (tagName) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          return `\n${children}\n`;
        case 'p':
        case 'div':
          return `${children}\n`;
        case 'br':
          return '\n';
        case 'li':
          return `• ${children}\n`;
        case 'ul':
        case 'ol':
          return `\n${children}`;
        default:
          return children;
      }
    }
    
    return '';
  };
  
  const text = processNode(tempDiv);
  
  // Clean up multiple newlines and trim
  return text
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace multiple newlines with double
    .replace(/^\s+|\s+$/g, '') // Trim
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/&amp;/g, '&') // Decode common entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
}