import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

interface OriginalCaseStudyLayoutProps {
  title: string;
  description: string;
  image: string;
  projectName: string;
  results: string[];
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  children: React.ReactNode;
}

const OriginalCaseStudyLayout: React.FC<OriginalCaseStudyLayoutProps> = ({
  title,
  description,
  image,
  projectName,
  results,
  technologies,
  liveLink,
  githubLink,
  children
}) => {
  return (
    <>
      <SEO
        title={title}
        description={description}
        image={image}
        type="article"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                {title}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {description}
              </p>
            </motion.div>

            {children}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Explore the Project
              </h2>
              <div className="flex items-center justify-center space-x-4">
                {liveLink && (
                  <Button asChild>
                    <Link to={liveLink} target="_blank" className="flex items-center space-x-2">
                      <span>View Live</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {githubLink && (
                  <Button asChild variant="outline">
                    <Link to={githubLink} target="_blank" className="flex items-center space-x-2">
                      <span>GitHub Repo</span>
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
              <Button asChild variant="ghost" className="mt-8">
                <Link to="/projects" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Projects</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default OriginalCaseStudyLayout;
