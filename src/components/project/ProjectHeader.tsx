
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface ProjectHeaderProps {
  title: string;
  tags: string[];
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ title, tags }) => {
  return (
    <>
      <Helmet>
        <title>{title} | Hiram Barsky Portfolio</title>
        <meta name="description" content={`${title} - ${tags.join(', ')} | Professional UX/UI design and development by Hiram Barsky`} />
        <meta name="keywords" content={`${tags.join(', ')}, portfolio, Hiram Barsky, design project`} />
        <meta property="og:title" content={`${title} | Hiram Barsky Portfolio`} />
        <meta property="og:description" content={`${title} - ${tags.join(', ')} | Professional UX/UI design and development by Hiram Barsky`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={`${title} | Hiram Barsky Portfolio`} />
        <meta name="twitter:description" content={`${title} - ${tags.join(', ')} | Professional UX/UI design and development`} />
      </Helmet>
      
      <div className="flex items-center mb-8">
        <Link to="/projects" className="flex items-center text-barsky-text hover:text-barsky-blue transition-colors mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold text-barsky-dark mb-4">{title}</h1>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span key={tag} className="bg-gray-100 text-barsky-text px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </>
  );
};

export default ProjectHeader;
