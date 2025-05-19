
import React from "react";

interface TechnologiesListProps {
  technologies: string[];
}

const TechnologiesList: React.FC<TechnologiesListProps> = ({ technologies }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-barsky-dark mb-4">Technologies Used</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {technologies.map((tech) => (
          <span key={tech} className="bg-barsky-blue/10 text-barsky-blue px-3 py-1 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechnologiesList;
