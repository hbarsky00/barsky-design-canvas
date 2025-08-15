
import React from 'react';
import { ProjectDetails } from '@/data/types/project';

interface ProjectContentProps {
  details: ProjectDetails;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ details }) => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Challenge Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Challenge</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {details.challenge}
            </p>
          </section>

          {/* Process Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Process</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {details.process}
            </p>
          </section>

          {/* Result Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Results</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {details.result}
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
