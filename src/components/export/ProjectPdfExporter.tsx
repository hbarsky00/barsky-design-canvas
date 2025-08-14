
import React from "react";
import { ProjectDetails } from "@/data/types/project";
import { ProjectProps } from "@/data/types/project";

interface ProjectPdfExporterProps {
  project: ProjectProps;
  details: ProjectDetails;
}

const ProjectPdfExporter: React.FC<ProjectPdfExporterProps> = ({
  project,
  details
}) => {
  const handleExportPdf = () => {
    // Mock PDF export functionality
    console.log("Exporting PDF for project:", project.title);
    
    // Create a simple text content for the PDF
    const content = `
      ${project.title}
      
      Description: ${project.description}
      
      Challenge: ${details.challenge}
      
      Process: ${details.process}
      
      Result: ${details.result}
      
      Duration: ${details.duration}
      Client: ${details.client}
      Role: ${details.role}
      
      Technologies: ${details.technologies.join(', ')}
      
      ${details.projectLink ? `Project Link: ${details.projectLink}` : ''}
      
      ${details.challengeAdditionalText ? `Additional Context: ${details.challengeAdditionalText}` : ''}
    `;
    
    // In a real implementation, you would use jsPDF or similar
    // For now, just create a downloadable text file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.id}-case-study.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-2">Export Options</h3>
      <button
        onClick={handleExportPdf}
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default ProjectPdfExporter;
