
import React from "react";

interface FigmaEmbedProps {
  embedUrl: string;
}

const FigmaEmbed: React.FC<FigmaEmbedProps> = ({ embedUrl }) => {
  return (
    <div className="mb-4 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
      <iframe 
        style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} 
        width="100%" 
        height="450" 
        src={embedUrl}
        allowFullScreen 
        className="w-full"
      ></iframe>
    </div>
  );
};

export default FigmaEmbed;
