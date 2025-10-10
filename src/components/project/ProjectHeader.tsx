
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { getServiceUrlFromTag } from "@/utils/tagServiceMapping";
import AnimatedText from "@/components/AnimatedText";

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
    <div className="bg-gradient-to-br from-gray-50 to-white pt-24 pb-8 lg:pt-28 lg:pb-16 hero-no-overflow project-hero-root">
      <div className="w-full px-0 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center max-w-6xl mx-auto px-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-text-stack">
              <AnimatedText
                text={title}
                tag="h1"
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 text-center leading-tight"
                type="character"
                animation="typewriter"
                delay={200}
                staggerChildren={0.03}
              />
              
              <p className="text-lg lg:text-xl text-gray-600 hero-subtitle text-center">
                {description}
              </p>
              
              <div className="hero-tags flex flex-wrap justify-center gap-2 mt-4">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    to={getServiceUrlFromTag(tag)}
                    className="inline-block"
                  >
                    <Badge 
                      variant="secondary" 
                      className="px-3 py-1.5 hover:bg-barsky-blue hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
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
