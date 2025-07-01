
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Figma, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectProps } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";

interface ProjectGridItemProps {
  project: ProjectProps;
  index: number;
}

const ProjectGridItem: React.FC<ProjectGridItemProps> = ({ project, index }) => {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Project Image */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex space-x-3">
              <Link 
                to={`/project/${project.id}`}
                className="bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors flex items-center [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
              >
                <Eye className="h-4 w-4 mr-1" />
                View Case Study
              </Link>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center [&_svg]:stroke-2 [&_svg]:stroke-white [&_svg]:fill-none"
                >
                  <Figma className="h-4 w-4 mr-1" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Technology Tags - Design-focused */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag}
                variant="secondary" 
                className="bg-gray-100 text-gray-700 text-xs"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge 
                variant="secondary" 
                className="bg-gray-100 text-gray-500 text-xs"
              >
                +{project.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Project Meta */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>2024</span>
              <span>•</span>
              <span>UX/UI Design</span>
            </div>
            <Link 
              to={`/project/${project.id}`}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
            >
              View Case Study
              <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectGridItem;
