
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, User, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

interface StructuredCaseStudyLayoutProps {
  title: string;
  description: string;
  image?: string;
  projectName?: string;
  results?: string[];
  technologies?: string[];
  tags?: string[];
  path?: string;
  sections: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
  gradientClasses?: string;
  githubLink?: string;
  externalLink?: string;
  projectLink?: string;
  heroVideo?: {
    src: string;
    poster: string;
    alt: string;
  };
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  title,
  description,
  image,
  projectName,
  results = [],
  technologies = [],
  tags = [],
  path,
  sections,
  gradientClasses = "from-blue-50 via-slate-50 to-indigo-50",
  githubLink,
  externalLink,
  projectLink,
  heroVideo
}) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://barskydesign.pro${path || ''}`;

  return (
    <>
      <SEO
        title={title}
        description={description}
        image={image || heroVideo?.poster}
        type="article"
        url={`https://barskydesign.pro${path || ''}`}
      />
      
      <div className={`min-h-screen bg-gradient-to-br ${gradientClasses}`}>
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-[calc(var(--header-height,64px)+12px)]">
          <main className="flex-1 min-w-0">
            {/* Hero Section */}
            <section id="overview" className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{projectName || title}</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">{description}</p>
                
                {results.length > 0 && (
                  <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
                    {results.map((result, index) => (
                      <div key={index} className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-gray-900">{result}</span>
                      </div>
                    ))}
                  </div>
                )}

                {technologies.length > 0 && (
                  <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
                    {technologies.map((tech, index) => (
                      <div key={index} className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                        {tech}
                      </div>
                    ))}
                  </div>
                )}

                {tags.length > 0 && (
                  <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                    {tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-center gap-4">
                  {githubLink && (
                    <Button asChild variant="secondary">
                      <Link to={githubLink} target="_blank" className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub
                      </Link>
                    </Button>
                  )}
                  {(externalLink || projectLink) && (
                    <Button asChild variant="secondary">
                      <Link to={externalLink || projectLink || ''} target="_blank" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Live Project
                      </Link>
                    </Button>
                  )}
                </div>
              </motion.div>

              {heroVideo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-12"
                >
                  <video
                    src={heroVideo.src}
                    poster={heroVideo.poster}
                    controls
                    className="w-full rounded-lg shadow-lg max-w-4xl mx-auto"
                  >
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              )}
            </section>

            {/* Case Study Sections */}
            <div className="space-y-16 pb-20">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-white/20">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">{section.title}</h2>
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default StructuredCaseStudyLayout;
