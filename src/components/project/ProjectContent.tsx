
import React from "react";
import { ProjectDetails } from "@/data/types/project";

interface ProjectContentProps {
  details: ProjectDetails;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ details }) => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Challenge Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Challenge</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {details.challenge}
            </p>
            {details.challengeAdditionalText && (
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                {details.challengeAdditionalText}
              </p>
            )}
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
            <h2 className="text-3xl font-bold text-foreground mb-6">Result</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {details.result}
            </p>
          </section>

          {/* Project Info */}
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Technologies</h3>
              <ul className="text-muted-foreground space-y-1">
                {details.technologies.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">Duration</h3>
                <p className="text-muted-foreground">{details.duration}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">Client</h3>
                <p className="text-muted-foreground">{details.client}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">Role</h3>
                <p className="text-muted-foreground">{details.role}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
