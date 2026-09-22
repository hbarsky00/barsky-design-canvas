import React from "react";
import { cn } from "@/lib/utils";

interface ProjectContentBoxProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const ProjectContentBox: React.FC<ProjectContentBoxProps> = ({
  children,
  title,
  className
}) => {
  return (
      <div className={cn('p-6 bg-card border border-border rounded-xl shadow-elevated', className)}>
        <div className="prose prose-lg text-muted-foreground leading-relaxed">
          {title && (
            <h3 className="text-xl font-semibold text-foreground mb-4">
              <strong>{title}</strong>
            </h3>
          )}
        <div className="space-y-4 [&>p]:text-sm [&>p]:text-gray-700 [&>p]:mb-4 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProjectContentBox;