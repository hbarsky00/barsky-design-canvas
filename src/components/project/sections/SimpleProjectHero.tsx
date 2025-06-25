
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import MaximizableImage from "../MaximizableImage";

interface SimpleProjectHeroProps {
  project: ProjectProps;
  details: ProjectDetails;
  imageCaptions?: Record<string, string>;
  projectId: string;
}

const SimpleProjectHero: React.FC<SimpleProjectHeroProps> = ({
  project,
  details,
  imageCaptions = {},
  projectId
}) => {
  const heroCaption = imageCaptions[project.image];
  console.log('🎬 SimpleProjectHero: Hero image caption:', heroCaption);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {project.description}
            </p>
            
            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-900">Duration:</span>
                <p className="text-gray-600">{details.duration}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Client:</span>
                <p className="text-gray-600">{details.client}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Role:</span>
                <p className="text-gray-600">{details.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MaximizableImage
              src={project.image}
              alt={heroCaption || project.title}
              caption={heroCaption}
              priority={true}
              className="rounded-xl shadow-2xl"
              projectId={projectId}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SimpleProjectHero;
