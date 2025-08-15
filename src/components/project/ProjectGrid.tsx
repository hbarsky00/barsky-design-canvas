
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { homepageCaseStudyPreviews } from "@/data/caseStudies";

const ProjectGrid: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {homepageCaseStudyPreviews.map((project, index) => (
        <Link key={index} to={project.url} className="group">
          <div className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
              {project.video ? (
                <video 
                  autoPlay 
                  muted 
                  loop 
                  className="w-full h-full object-cover"
                  poster={project.videoThumbnail}
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={project.videoThumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectGrid;
