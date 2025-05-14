
import React from "react";
import { ExternalLink, FileText, List, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contact/ContactForm";

interface ProjectOverviewProps {
  challenge: string;
  process: string;
  result: string;
  technologies: string[];
  projectLink?: string;
  caseStudyLink?: string;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ 
  challenge, 
  process, 
  result,
  technologies,
  projectLink,
}) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-barsky-dark mb-4 flex items-center">
          <FileText className="h-6 w-6 mr-2 text-barsky-blue" />
          The Challenge
        </h2>
        <p className="text-barsky-text mb-6 leading-relaxed">
          {challenge}
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-barsky-dark mb-4 flex items-center">
          <List className="h-6 w-6 mr-2 text-barsky-blue" />
          What I Did
        </h2>
        <p className="text-barsky-text mb-6 leading-relaxed">
          {process}
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-barsky-dark mb-4 flex items-center">
          <Award className="h-6 w-6 mr-2 text-barsky-blue" />
          The Result
        </h2>
        <p className="text-barsky-text mb-6 leading-relaxed">
          {result}
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-barsky-dark mb-4">Platform Compatibility</h2>
        <p className="text-barsky-text mb-4">
          This application is designed to work seamlessly across both mobile and desktop platforms, providing a responsive and consistent user experience regardless of device. Our cross-platform approach ensures accessibility on smartphones, tablets, laptops, and desktop computers.
        </p>
      </div>
      
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
          <li>User Research & Testing</li>
          <li>Design System Creation</li>
          <li>Cross-Platform Optimization</li>
          <li>Mobile and Desktop Interface Design</li>
          <li>User Flow Optimization</li>
          <li>Accessibility Implementation</li>
          <li>Responsive Web Development</li>
        </ul>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-8">
        {projectLink && (
          <a
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the live project"
          >
            <Button className="bg-barsky-blue text-white hover:bg-barsky-blue/90 transition-colors">
              View Live Project <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        )}
      </div>
      
      <div className="mt-8">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-barsky-dark mb-3">Need Similar Services?</h3>
          <p className="text-barsky-text mb-6">
            I offer professional UX/UI design and development services for both mobile and desktop applications. Let's create your next digital experience.
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-medium text-barsky-dark mb-4">Get In Touch</h4>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
