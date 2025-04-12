
import React, { useState } from "react";
import { ProjectProps } from "./ProjectCard";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

const projectsData: ProjectProps[] = [
  {
    id: "project1",
    title: "Modern E-Commerce Website",
    description: "A fully responsive e-commerce platform with product filtering, cart functionality, and secure checkout.",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["UI/UX Design", "Web Development", "React"],
    link: "#"
  },
  {
    id: "project2",
    title: "Corporate Brand Identity",
    description: "Complete brand identity design including logo, color palette, typography, and brand guidelines.",
    image: "https://images.unsplash.com/photo-1634942537034-a3f7ae8c5587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Branding", "Logo Design", "Typography"],
    link: "#"
  },
  {
    id: "project3",
    title: "Mobile App UI Design",
    description: "User interface design for a fitness tracking mobile application with clean and intuitive interactions.",
    image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Mobile Design", "UI/UX", "Prototyping"],
    link: "#"
  },
  {
    id: "project4",
    title: "Dashboard Interface",
    description: "A comprehensive analytics dashboard with data visualization and interactive elements.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["UI Design", "Data Visualization", "Web Development"],
    link: "#"
  },
  {
    id: "project5",
    title: "Photography Portfolio",
    description: "Minimalist photography portfolio website showcasing work with elegant transitions and gallery views.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Web Design", "Photography", "Gallery"],
    link: "#"
  },
  {
    id: "project6",
    title: "Restaurant Rebrand",
    description: "Complete visual identity redesign for an upscale restaurant, including menus, signage, and web presence.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Branding", "Print Design", "Web Design"],
    link: "#"
  }
];

const categories = [
  "All",
  "UI/UX Design",
  "Web Development",
  "Branding",
  "Mobile Design"
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => 
        project.tags.some(tag => tag === activeCategory)
      );
  
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title text-center">Featured Projects</h2>
        
        <div className="flex flex-wrap justify-center gap-3 my-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                activeCategory === category
                  ? "bg-barsky-blue text-white"
                  : "bg-gray-100 text-barsky-text hover:bg-gray-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
