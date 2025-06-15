
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getServiceUrlFromTag } from "@/utils/tagServiceMapping";
import MaximizableImage from "./MaximizableImage";
import EditTextButton from "@/components/dev/EditTextButton";

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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/projects" className="flex items-center text-barsky-text hover:text-barsky-blue transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <EditTextButton text={title} />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 pr-8">
                {title}
              </h1>
            </div>
            
            <div className="relative group">
              <EditTextButton text={description} />
              <p className="text-xl text-gray-600 mb-8 leading-relaxed pr-8">
                {description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
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
