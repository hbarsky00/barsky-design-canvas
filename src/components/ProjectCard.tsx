
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import EditImageButton from "@/components/dev/EditImageButton";
import EditableText from "@/components/dev/EditableText";
import { useProjectPersistence } from "@/hooks/useProjectPersistence";
import { useProjectDataUpdater } from "@/hooks/useProjectDataUpdater";

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
  link?: string;
  category?: string;
}

interface ProjectCardProps {
  project: ProjectProps;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const { saveImageReplacement, getProjectData } = useProjectPersistence(project.id);
  const { updateImageInProjectData } = useProjectDataUpdater();

  const handleImageReplace = (newSrc: string) => {
    console.log('🔄 ProjectCard: Replacing project image', project.image, 'with', newSrc);
    
    // Save the replacement persistently
    saveImageReplacement(project.image, newSrc);
    
    // Update project data
    updateImageInProjectData(project.id, project.image, newSrc);
  };

  // Get replaced image source
  const getReplacedImageSrc = () => {
    const savedData = getProjectData();
    return savedData.imageReplacements[project.image] || project.image;
  };

  const displayedImage = getReplacedImageSrc();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link to={`/projects/${project.id}`} className="block h-full">
        <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
          <div className="aspect-video overflow-hidden relative">
            <EditImageButton 
              src={project.image}
              onImageReplace={handleImageReplace}
              projectId={project.id}
              allowRemove={false}
            />
            <img
              src={displayedImage}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex-grow">
              <EditableText initialText={project.title}>
                {(text) => (
                  <h3 className="text-xl font-bold mb-3 group-hover:text-barsky-blue transition-colors pr-8">
                    {text}
                  </h3>
                )}
              </EditableText>
              <EditableText initialText={project.description} multiline>
                {(text) => (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed pr-8">
                    {text}
                  </p>
                )}
              </EditableText>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  variant="secondary"
                  className="text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
