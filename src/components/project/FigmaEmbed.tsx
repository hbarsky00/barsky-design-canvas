
import React from "react";
import { motion } from "framer-motion";

interface FigmaEmbedProps {
  embedUrl: string;
}

const FigmaEmbed: React.FC<FigmaEmbedProps> = ({ embedUrl }) => {
  return (
    <motion.div 
      className="mb-4 rounded-lg overflow-hidden border border-gray-100 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <iframe 
        style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} 
        width="100%" 
        height="450" 
        src={embedUrl}
        allowFullScreen 
        className="w-full"
      ></iframe>
    </motion.div>
  );
};

export default FigmaEmbed;
