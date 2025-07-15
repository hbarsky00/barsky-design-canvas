import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";
import RelatedProjects from "@/components/RelatedProjects";

interface SimplifiedCaseStudyProps {
  // SEO Data
  title: string;
  description: string;
  image: string;
  projectName: string;
  seoResults: string[];
  technologies: string[];
  path: string;
  
  // Hero Section
  hero: {
    subtitle: string;
    title: string;
    description: string;
    heroImage: string;
    heroImageAlt: string;
    projectId: string;
    client?: string;
    timeline?: string;
    services?: string[];
  };
  
  // Challenge Section
  challenge: {
    title: string;
    subtitle: string;
    description: string;
    painPoints: Array<{
      title: string;
      description: string;
      impact: string;
      icon: React.ReactNode;
    }>;
    supportingImage?: string;
    supportingImageAlt?: string;
  };
  
  // Solution Section
  solution: {
    title: string;
    subtitle: string;
    description: string;
    features: Array<{
      title: string;
      description: string;
      image: string;
      imageAlt: string;
      benefit: string;
    }>;
    methodology?: string;
  };
  
  // Results Section
  results: {
    title: string;
    subtitle: string;
    description: string;
    metrics: Array<{
      value: string;
      label: string;
      icon: React.ReactNode;
    }>;
    testimonial?: {
      quote: string;
      author: string;
      title: string;
      company: string;
    };
  };
  
  // CTA Section
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonAction: () => void;
  };
  
  // Related Projects
  currentProjectId: string;
}

const SimplifiedCaseStudyTemplate: React.FC<SimplifiedCaseStudyProps> = ({
  title,
  description,
  image,
  projectName,
  seoResults,
  technologies,
  path,
  hero,
  challenge,
  solution,
  results: resultsData,
  cta,
  currentProjectId,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DynamicSeo
        type="project"
        title={title}
        description={description}
        image={image}
        projectName={projectName}
        results={seoResults}
        technologies={technologies}
        path={path}
      />
      
      <Header />
      
      {/* Back Navigation */}
      <div className="pt-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/projects"
            className="inline-flex items-center text-blue-700 hover:text-blue-900 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </motion.div>
      </div>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-8 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <span className="text-blue-600 font-semibold text-lg">
                    {hero.subtitle}
                  </span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                    {hero.title}
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {hero.description}
                  </p>
                </div>
                
                {/* Project Details */}
                {(hero.client || hero.timeline || hero.services) && (
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-blue-200 shadow-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      {hero.client && (
                        <div>
                          <span className="text-slate-500 font-medium">Client:</span>
                          <p className="text-slate-900">{hero.client}</p>
                        </div>
                      )}
                      {hero.timeline && (
                        <div>
                          <span className="text-slate-500 font-medium">Timeline:</span>
                          <p className="text-slate-900">{hero.timeline}</p>
                        </div>
                      )}
                      {hero.services && (
                        <div>
                          <span className="text-slate-500 font-medium">Services:</span>
                          <p className="text-slate-900">{hero.services.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <img
                  src={hero.heroImage}
                  alt={hero.heroImageAlt}
                  className="w-full rounded-3xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Challenge Section */}
        <section className="py-20 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-red-600 font-semibold text-lg mb-4 block">
                {challenge.subtitle}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8">
                {challenge.title}
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                {challenge.description}
              </p>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                {challenge.painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-red-500 flex-shrink-0">
                        {point.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">
                          {point.title}
                        </h4>
                        <p className="text-slate-600 mb-3">{point.description}</p>
                        <div className="bg-red-100 p-3 rounded-lg">
                          <p className="text-sm font-medium text-red-700">
                            Impact: {point.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {challenge.supportingImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <img
                    src={challenge.supportingImage}
                    alt={challenge.supportingImageAlt}
                    className="w-full rounded-3xl shadow-2xl"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </section>
        
        {/* Solution Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-blue-600 font-semibold text-lg mb-4 block">
                {solution.subtitle}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8">
                {solution.title}
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                {solution.description}
              </p>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {solution.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-blue-200"
                >
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="w-full h-48 object-cover rounded-2xl mb-6"
                  />
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-700">
                      ✓ {feature.benefit}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {solution.methodology && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-500 p-8 rounded-3xl text-center"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Our Approach</h3>
                <p className="text-lg max-w-3xl mx-auto text-white">
                  {solution.methodology}
                </p>
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Results Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-green-600 font-semibold text-lg mb-4 block">
                {resultsData.subtitle}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8">
                {resultsData.title}
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                {resultsData.description}
              </p>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {resultsData.metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-lg border border-blue-200"
                >
                  <div className="flex justify-center mb-4 text-blue-500">
                    {metric.icon}
                  </div>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-slate-600 uppercase tracking-wide">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {resultsData.testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-12 rounded-3xl text-center max-w-5xl mx-auto border border-blue-200 shadow-xl"
              >
                <p className="text-2xl text-slate-700 italic leading-relaxed mb-8">
                  "{resultsData.testimonial.quote}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-left">
                    <p className="font-bold text-slate-900 text-lg">
                      {resultsData.testimonial.author}
                    </p>
                    <p className="text-blue-600 font-medium">
                      {resultsData.testimonial.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {resultsData.testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Related Projects */}
        <RelatedProjects currentProjectId={currentProjectId} />
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">
                {cta.title}
              </h2>
              <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-white">
                {cta.description}
              </p>
              <button
                onClick={cta.buttonAction}
                className="bg-white text-blue-600 font-semibold px-10 py-6 text-lg rounded-full hover:bg-gray-100 transition-colors inline-flex items-center gap-3"
              >
                {cta.buttonText}
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SimplifiedCaseStudyTemplate;