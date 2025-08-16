import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/data/projectsData";

const AllProjects: React.FC = () => {
  return (
    <>
      <Header />
      
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <main className="pt-24 pb-16">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-4">
                Explore Our Projects
              </h1>
              <p className="text-lg text-gray-600">
                A curated selection of our most impactful work.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AllProjects;
