
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { CaseStudyData } from '@/data/caseStudies';

export interface OriginalCaseStudyLayoutProps {
  caseStudy: CaseStudyData;
  projectId: string;
}

const OriginalCaseStudyLayout: React.FC<OriginalCaseStudyLayoutProps> = ({
  caseStudy,
  projectId
}) => {
  return (
    <>
      <SEO
        title={caseStudy.title}
        description={caseStudy.description}
        image={caseStudy.videoThumbnail}
        type="article"
        url={`https://barskydesign.pro/project/${projectId}`}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-[calc(var(--header-height,64px)+12px)]">
          <main className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Button asChild variant="ghost" className="mb-6">
                <Link to="/projects" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Projects
                </Link>
              </Button>
              
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{caseStudy.title}</h1>
              <p className="text-lg text-gray-600 max-w-3xl">{caseStudy.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {caseStudy.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {caseStudy.video && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-12"
              >
                <video
                  src={caseStudy.video}
                  poster={caseStudy.videoThumbnail}
                  controls
                  className="w-full rounded-lg shadow-lg"
                >
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            )}

            <div className="space-y-16 pb-20">
              {caseStudy.stickyNav.map((navItem, index) => {
                const sectionKey = navItem.anchor.replace('#', '');
                const section = caseStudy.sections[sectionKey];
                
                if (!section) return null;
                
                return (
                  <section key={sectionKey} id={sectionKey} className="scroll-mt-24">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-white/20"
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-8">{navItem.label}</h2>
                      
                      <div className="grid lg:grid-cols-2 gap-8 items-start">
                        <div className="prose prose-lg text-gray-600">
                          <p>{section.text}</p>
                        </div>
                        
                        {section.image && (
                          <div className="lg:order-first">
                            <img
                              src={section.image.src}
                              alt={section.image.alt}
                              className="w-full rounded-lg shadow-md"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </section>
                );
              })}
            </div>
            
            {caseStudy.projectLink && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center pb-16"
              >
                <Button asChild size="lg">
                  <Link to={caseStudy.projectLink} target="_blank" rel="noopener noreferrer">
                    View Live Project
                  </Link>
                </Button>
              </motion.div>
            )}
          </main>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default OriginalCaseStudyLayout;
