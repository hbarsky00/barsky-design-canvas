
import React from "react";
import { Helmet } from "react-helmet-async";

interface ProjectDetailSeoProps {
  title: string;
  description: string;
  tags: string[];
  projectId: string;
}

const ProjectDetailSeo: React.FC<ProjectDetailSeoProps> = ({ 
  title, 
  description, 
  tags, 
  projectId 
}) => {
  // Determine the primary service category
  const getServiceType = () => {
    if (tags.includes("Mobile App")) return "App Design Services";
    if (tags.includes("Web App")) return "Website Design Services";
    return "Product Design Services";
  };
  
  const serviceType = getServiceType();
  
  return (
    <Helmet>
      <title>{title} | Hiram Barsky Portfolio</title>
      <meta name="description" content={`${title} - ${tags.join(', ')} | Professional Product Design by Hiram Barsky`} />
      <meta property="og:title" content={`${title} | Hiram Barsky Portfolio`} />
      <meta property="og:description" content={`${title} - ${tags.join(', ')} | Professional Product Design by Hiram Barsky`} />
      <meta property="og:image" content="https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9" />
      <meta property="og:url" content={`https://hirambarsky.com/project/${projectId}`} />
      <meta name="twitter:title" content={`${title} | Hiram Barsky Portfolio`} />
      <meta name="twitter:description" content={`${title} - ${tags.join(', ')} | Professional Product Design`} />
      <meta name="twitter:image" content="https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9" />
    </Helmet>
  );
};

export default ProjectDetailSeo;
