
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { Badge } from "@/components/ui/badge";
import MaximizableImage from "../MaximizableImage";

interface ModernProjectHeroProps {
  project: ProjectProps;
  details: ProjectDetails;
  imageCaptions: Record<string, string>;
}

// Challenge images for each project to display below project name
const challengeImages: Record<string, string> = {
  "medication-app": "/lovable-uploads/5faa6be9-9602-4fd5-8dff-4f95864e7142.png",
  "investor-loan-app": "/lovable-uploads/647c00bd-470d-4fc5-8c5e-34c8d1c42676.png",
  "dae-search": "/lovable-uploads/8445f64a-5401-42d2-8888-d423cd24ea73.png",
  "splittime": "/lovable-uploads/d247fe26-c5c2-450d-a27d-fd1d41739b55.png",
  "herbalink": "/lovable-uploads/a874ae96-464b-4d3f-825b-4678373c6cc8.png",
  "gold2crypto": "/lovable-uploads/ddd4793c-96fd-4af4-a35a-6ee17e1ad879.png",
  "barskyjoint": "/lovable-uploads/2bd2eddc-5394-4d81-890a-57eaa00a7ed3.png",
  "spectrum": "/lovable-uploads/8a8efa4e-4d69-4f21-8ea3-b45b70284058.png"
};

const ModernProjectHero: React.FC<ModernProjectHeroProps> = ({
  project,
  details,
  imageCaptions
}) => {
  const challengeImage = challengeImages[project.id];
  
  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            to="/projects" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Project Meta */}
            <div className="flex items-center space-x-3 text-sm">
              <span className="font-medium text-blue-600">{details.client}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{details.duration}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{details.role}</span>
            </div>
            
            {/* Project Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {project.title}
            </h1>
            
            {/* Challenge Image - Below Project Name */}
            {challengeImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="my-8"
              >
                <MaximizableImage
                  src={challengeImage}
                  alt={`${project.title} - Challenge Overview`}
                  caption={imageCaptions[challengeImage] || `${project.title} - Key challenges and problem identification`}
                  imageList={[challengeImage]}
                  currentIndex={0}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            )}
            
            {/* Project Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary" 
                  className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Project Links */}
            {details.projectLink && (
              <div className="flex items-center space-x-4 pt-4">
                <a
                  href={details.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  View Live Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            )}
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <MaximizableImage
              src={project.image}
              alt={project.title}
              caption={imageCaptions[project.image] || project.title}
              imageList={[project.image]}
              currentIndex={0}
              priority={true}
              className="rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernProjectHero;
