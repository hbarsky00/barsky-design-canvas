
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import MaximizableImage from "./MaximizableImage";

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
    <div className="bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MaximizableImage
              src={image}
              alt={title}
              caption={caption}
              imageList={imageList}
              currentIndex={currentIndex}
              priority={true}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
