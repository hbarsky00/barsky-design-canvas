
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ProjectDetails } from "@/data/types/project";

interface ModernProjectOverviewProps {
  details: ProjectDetails;
  tags: string[];
}

const ModernProjectOverview: React.FC<ModernProjectOverviewProps> = ({
  details,
  tags
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-12"
    >
      {/* Technologies */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Technologies
        </h3>
        <div className="flex flex-wrap gap-2">
          {details.technologies.slice(0, 6).map((tech) => (
            <Badge 
              key={tech}
              variant="secondary" 
              className="text-xs px-3 py-1 bg-gray-100 text-gray-700"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Services
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <Badge 
              key={tag}
              variant="outline" 
              className="text-xs px-3 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Project Link */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Project
        </h3>
        {details.projectLink ? (
          <a
            href={details.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
          >
            View Live Project →
          </a>
        ) : (
          <p className="text-sm text-gray-500">
            Confidential Project
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default ModernProjectOverview;
