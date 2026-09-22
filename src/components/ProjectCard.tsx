import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Interactive3DCard from "./3d/Interactive3DCard";

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
  link?: string;
  category?: string;
  video?: string;
  videoThumbnail?: string;
}

interface ProjectCardProps {
  project: ProjectProps;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Interactive3DCard 
      className="h-full"
      maxTilt={6}
      scale={1.02}
      glare={true}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="h-full"
      >
        <Link to={`/project/${project.id}`} className="block h-full">
          <Card 
            className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="aspect-video overflow-hidden relative">
              {project.video && isHovering ? (
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-all duration-300"
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  width="640"
                  height="360"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="heading-card mb-3 group-hover:text-barsky-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
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
    </Interactive3DCard>
  );
};

export default ProjectCard;