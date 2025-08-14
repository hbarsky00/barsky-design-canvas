
import React from "react";
import { ProjectDetails } from "@/data/types/project";

interface ProjectContentProps {
  details: ProjectDetails;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ details }) => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Challenge Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Challenge</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {details.challenge}
              </p>
            </div>
          </section>

          {/* Process Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Process</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {details.process}
              </p>
            </div>
          </section>

          {/* Result Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Result</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {details.result}
              </p>
            </div>
          </section>

          {/* Project Details */}
          <section className="bg-muted/50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Project Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-foreground mb-2">Duration</h4>
                <p className="text-muted-foreground">{details.duration}</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Client</h4>
                <p className="text-muted-foreground">{details.client}</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Role</h4>
                <p className="text-muted-foreground">{details.role}</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Technologies</h4>
                <p className="text-muted-foreground">{details.technologies.join(', ')}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
