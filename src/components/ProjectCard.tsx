
import React from "react";
import { Link } from "react-router-dom";
import { 
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { getServiceUrlFromTag } from "@/utils/tagServiceMapping";

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

interface ProjectCardProps {
  project: ProjectProps;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const handleTagClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Link to={`/project/${project.id}`} className="block h-full" onClick={() => window.scrollTo(0, 0)}>
      <Card className="h-full transition-all duration-300 hover:shadow-lg overflow-hidden">
        {/* Image container with hover effect */}
        <div className="relative h-[250px] overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
        </div>
        
        {/* Content below image */}
        <CardContent className="pt-4">
          <h3 className="text-xl font-bold text-barsky-dark mb-2">{project.title}</h3>
          <p className="text-barsky-text text-sm line-clamp-3 mb-3">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <Link
                key={tag}
                to={getServiceUrlFromTag(tag)}
                onClick={handleTagClick}
                className="text-xs bg-gray-100 hover:bg-barsky-blue hover:text-white text-barsky-text px-2 py-1 rounded-full transition-all duration-200 hover:shadow-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-barsky-blue hover:text-barsky-dark transition-all duration-300">
            View Details <ArrowRight className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
