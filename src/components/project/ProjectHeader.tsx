
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { trackContentEngagement } from "@/lib/analytics";

interface ProjectHeaderProps {
  title: string;
  tags: string[];
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ title, tags }) => {
  // Track project view
  React.useEffect(() => {
    const projectId = window.location.pathname.split('/').pop() || '';
    trackContentEngagement('project', projectId, title);
  }, [title]);
  
  return (
    <>
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
