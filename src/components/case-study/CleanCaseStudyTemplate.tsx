import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";

interface CleanCaseStudyProps {
  // SEO
  title: string;
  description: string;
  image: string;
  projectName: string;
  seoResults: string[];
  technologies: string[];
  path: string;
  
  // Clean content
  projectTitle: string;
  subtitle: string;
  heroImage: string;
  challenge: string;
  solution: string;
  impact: string;
  problemText: string;
  problemImage: string;
  solutionSteps: Array<{
    text: string;
    image: string;
  }>;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  currentProjectId: string;
}

const CleanCaseStudyTemplate: React.FC<CleanCaseStudyProps> = ({
  title,
  description,
  image,
  projectName,
  seoResults,
  technologies,
  path,
  projectTitle,
  subtitle,
  heroImage,
  challenge,
  solution,
  impact,
  problemText,
  problemImage,
  solutionSteps,
  metrics,
  currentProjectId,
}) => {
  return (
    <div className="min-h-screen bg-background">
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
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </motion.div>
      </div>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
                {projectTitle}
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                {subtitle}
              </p>
              <div className="max-w-4xl mx-auto">
                <img
                  src={heroImage}
                  alt={`${projectTitle} hero image`}
                  className="w-full rounded-xl shadow-elevated"
                />
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Three Boxes */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center p-8 bg-background rounded-xl shadow-soft"
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">Challenge</h3>
                <p className="text-muted-foreground leading-relaxed">{challenge}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center p-8 bg-background rounded-xl shadow-soft"
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">Solution</h3>
                <p className="text-muted-foreground leading-relaxed">{solution}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-8 bg-background rounded-xl shadow-soft"
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">Impact</h3>
                <p className="text-muted-foreground leading-relaxed">{impact}</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* The Problem */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
                The Problem
              </h2>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {problemText}
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src={problemImage}
                  alt="Problem illustration"
                  className="w-full rounded-xl shadow-elevated"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Solution */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
                Our Solution
              </h2>
            </motion.div>
            
            <div className="space-y-20">
              {solutionSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <img
                      src={step.image}
                      alt={`Solution step ${index + 1}`}
                      className="w-full rounded-xl shadow-elevated"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Results */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
                Results
              </h2>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center p-8 bg-background rounded-xl shadow-soft"
                >
                  <div className="text-5xl font-bold text-primary mb-4">
                    {metric.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CleanCaseStudyTemplate;