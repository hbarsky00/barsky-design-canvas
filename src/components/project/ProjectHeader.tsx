
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getServiceUrlFromTag } from "@/utils/tagServiceMapping";

interface ProjectHeaderProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  imageCaptions: Record<string, string>;
  imageList: string[];
  currentIndex: number;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  description,
  image,
  tags,
  imageCaptions,
  imageList,
  currentIndex,
}) => {
  const caption = imageCaptions[image] || title;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white pt-24 pb-8 lg:pt-28 lg:pb-16">
      <div className="w-full px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 lg:mb-8"
        >
          <Link to="/projects" className="flex items-center text-barsky-text hover:text-barsky-blue transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 text-center">
              {title}
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed text-center">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  to={getServiceUrlFromTag(tag)}
                  className="inline-block"
                >
                  <Badge 
                    variant="secondary" 
                    className="px-3 py-1 hover:bg-barsky-blue hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <figure className="project-image-container">
              <img
                src={image}
                alt={title}
                className="w-full h-auto shadow-elevated-lg object-contain cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              />
              <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                {caption}
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
