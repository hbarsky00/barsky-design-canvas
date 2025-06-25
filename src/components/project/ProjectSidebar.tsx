
import React from "react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";

interface ProjectSidebarProps {
  project: ProjectProps;
  details: ProjectDetails;
  getTextContent: (key: string, fallback?: string) => string;
  saveTextContent: (key: string, content: string) => Promise<void>;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  project,
  details,
  getTextContent,
  saveTextContent
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Project Details</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Client</h4>
          <p className="text-gray-600">{getTextContent('client', details.client)}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Duration</h4>
          <p className="text-gray-600">{getTextContent('duration', details.duration)}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Role</h4>
          <p className="text-gray-600">{getTextContent('role', details.role)}</p>
        </div>
        
        {details.technologies && details.technologies.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {details.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSidebar;
