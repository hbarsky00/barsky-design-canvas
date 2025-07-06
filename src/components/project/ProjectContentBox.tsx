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
    <div className={cn("p-6 bg-blue-50/50 border border-blue-100", className)}>
      <div className="prose prose-lg text-gray-700 leading-relaxed">
        {title && (
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
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