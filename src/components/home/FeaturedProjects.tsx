
import React from "react";
import { ProjectProps } from "@/data/types/project";

const FeaturedProjects: React.FC = () => {
  // Mock featured projects data
  const featuredProjects: ProjectProps[] = [
    {
      id: "splittime",
      title: "SplitTime - Time Tracking App",
      description: "A modern time tracking application for freelancers and teams",
      image: "/api/placeholder/800/600",
      tags: ["Mobile App", "Time Tracking", "Productivity"],
      link: "/projects/splittime"
    },
    {
      id: "herbalink", 
      title: "HerbaLink - Health Platform",
      description: "Connecting patients with herbal medicine practitioners",
      image: "/api/placeholder/800/600",
      tags: ["Healthcare", "Platform", "Mobile"],
      link: "/projects/herbalink"
    },
    {
      id: "investor-loan-app",
      title: "Investor Loan Application", 
      description: "Streamlined loan application process for real estate investors",
      image: "/api/placeholder/800/600",
      tags: ["FinTech", "Real Estate", "Application"],
      link: "/projects/investor-loan-app"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div key={project.id} className="bg-card rounded-lg shadow-lg overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a 
                    href={project.link}
                    className="text-primary hover:underline"
                  >
                    View Project →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
