
import React from 'react';

interface RichTextRendererProps {
  text: string;
  className?: string;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ text, className = "" }) => {
  const renderFormattedText = (content: string) => {
    // Handle paragraphs
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, pIndex) => {
      // Check if paragraph is a header
      if (paragraph.startsWith('### ')) {
        const headerText = paragraph.replace(/^### /, '');
        return (
          <h3 key={pIndex} className="text-xl font-semibold text-gray-800 mb-1">
            {formatInlineText(headerText)}
          </h3>
        );
      }
      
      if (paragraph.startsWith('## ')) {
        const headerText = paragraph.replace(/^## /, '');
        return (
          <h2 key={pIndex} className="text-2xl font-bold text-gray-800 mb-1">
            {formatInlineText(headerText)}
          </h2>
        );
      }
      
      if (paragraph.startsWith('# ')) {
        const headerText = paragraph.replace(/^# /, '');
        return (
          <h1 key={pIndex} className="text-3xl font-bold text-gray-800 mb-1">
            {formatInlineText(headerText)}
          </h1>
        );
      }
      
      // Check if paragraph is a list
      if (paragraph.includes('• ') || paragraph.includes('- ')) {
        const listItems = paragraph.split('\n').filter(item => item.trim());
        return (
          <ul key={pIndex} className="list-disc list-inside mb-2 space-y-1">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="ml-2">
                {formatInlineText(item.replace(/^[•\-]\s*/, ''))}
              </li>
            ))}
          </ul>
        );
      }
      
      // Check if paragraph is a numbered list
      if (/^\d+\.\s/.test(paragraph)) {
        const listItems = paragraph.split('\n').filter(item => item.trim());
        return (
          <ol key={pIndex} className="list-decimal list-inside mb-2 space-y-1">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="ml-2">
                {formatInlineText(item.replace(/^\d+\.\s*/, ''))}
              </li>
            ))}
          </ol>
        );
      }
      
      // Regular paragraph
      return (
        <p key={pIndex} className="mb-2">
          {formatInlineText(paragraph)}
        </p>
      );
    });
  };

  const formatInlineText = (text: string) => {
    // Handle bold text (**text**)
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic text (*text*)
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <div className={`prose prose-lg text-gray-600 leading-relaxed max-w-none ${className}`}>
      {renderFormattedText(text)}
    </div>
  );
};

export default RichTextRenderer;
