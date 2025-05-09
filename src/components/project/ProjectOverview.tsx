
import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectOverviewProps {
  fullDescription: string;
  technologies: string[];
  projectLink?: string;
  caseStudyLink?: string;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ 
  fullDescription, 
  technologies,
  projectLink
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-barsky-dark mb-4">Overview</h2>
      <p className="text-barsky-text mb-8 leading-relaxed">
        {fullDescription}
      </p>
      
      <h2 className="text-2xl font-semibold text-barsky-dark mb-4">Technologies Used</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {technologies.map((tech) => (
          <span key={tech} className="bg-barsky-blue/10 text-barsky-blue px-3 py-1 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-barsky-dark mb-4">Services Provided</h2>
        <ul className="list-disc pl-5 space-y-2 text-barsky-text">
          <li>UX/UI Design Consultation</li>
          <li>Responsive Web Development</li>
          <li>User Research & Testing</li>
          <li>Design System Creation</li>
        </ul>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-8">
        {projectLink && (
          <a
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-barsky-blue text-white hover:bg-barsky-blue/90 transition-colors">
              View Live Project <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectOverview;
