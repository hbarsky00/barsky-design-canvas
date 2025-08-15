import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutValues from '@/components/about/AboutValues';
import AboutProcess from '@/components/about/AboutProcess';
import ContactSection from '@/components/homepage/ContactSection';
import { usePageIndexing } from '@/hooks/usePageIndexing';

const About = () => {
  usePageIndexing();

  return (
    <>
      <SEO
        title="About Hiram Barsky - AI-Powered UX Design & Development"
        description="Learn about Hiram Barsky's experience in UX design, AI development, and creating innovative digital solutions. See how AI can transform your product."
        image="/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
        type="website"
        url="https://barskydesign.pro/about"
      />
      
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        
        <main className="flex-grow">
          <AboutHero />
          <AboutValues />
          <AboutProcess />
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ContactSection />
          </motion.section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default About;
