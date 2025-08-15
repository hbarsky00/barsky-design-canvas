
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicSeo from '@/components/seo/DynamicSeo';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  projectName?: string;
}

interface StructuredCaseStudyLayoutProps {
  children: React.ReactNode;
  seo?: SEOProps;
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  children,
  seo
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {seo && (
        <DynamicSeo
          type="project"
          title={seo.title || 'Case Study - Hiram Barsky Design'}
          description={seo.description || 'Detailed case study showcasing design process and results'}
          image={seo.image}
          projectName={seo.projectName}
          path={window.location.pathname}
        />
      )}
      
      <Header />
      
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StructuredCaseStudyLayout;
