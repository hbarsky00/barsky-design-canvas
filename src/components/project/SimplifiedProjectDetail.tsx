
import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { projectDetailsData } from "@/data/projectDetailsData";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ImageMaximizer from "@/components/ImageMaximizer";
import SEO from "@/components/seo/SEO";

const SimplifiedProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  if (!projectId) {
    return <div>Project not found</div>;
  }

  const project: ProjectProps | undefined = projectsData.find(p => p.id === projectId);
  const details: ProjectDetails | undefined = projectDetailsData[projectId];
  
  if (!project || !details) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        type="article"
        title={`${project.title} - Case Study`}
        description={project.description}
        url={`https://barskydesign.pro/project/${projectId}`}
        image={project.image}
      />
      
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
              <p className="text-xl text-gray-600 mb-8">{project.description}</p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-600">Role: {details.role}</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-600">Duration: {details.duration}</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-600">Client: {details.client}</span>
                </div>
              </div>
              
              {details.projectLink && (
                <Button asChild className="mb-8">
                  <a href={details.projectLink} target="_blank" rel="noopener noreferrer">
                    View Live Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </motion.div>
          </div>
        </section>

        {/* Project Image */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ImageMaximizer
              src={project.image}
              alt={project.title}
              className="max-w-4xl mx-auto"
            />
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-16">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{details.challenge}</p>
              </motion.div>

              {/* Process */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">The Process</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{details.process}</p>
              </motion.div>

              {/* Result */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">The Result</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{details.result}</p>
              </motion.div>

              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {details.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Back to Projects */}
        <section className="py-16 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <Button variant="outline" asChild>
              <a href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SimplifiedProjectDetail;
