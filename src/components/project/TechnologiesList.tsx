
import React from "react";
import { motion } from "framer-motion";

interface TechnologiesListProps {
  technologies: string[];
}

const TechnologiesList: React.FC<TechnologiesListProps> = ({ technologies }) => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-2xl font-semibold text-barsky-dark mb-4">Technologies Used</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {technologies.map((tech, index) => (
          <motion.span 
            key={tech} 
            className="bg-barsky-blue/10 text-barsky-blue px-3 py-1 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default TechnologiesList;
