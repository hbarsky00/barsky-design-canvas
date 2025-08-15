import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from '@/components/SEO';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectGrid from "@/components/project/ProjectGrid";

const AllProjects = () => {
  return (
    <>
      <SEO
        title="Product Design & Gen AI Portfolio | AI-Powered Web Applications"
        description="Explore Product Design portfolio featuring Gen AI integration, intelligent web applications, and AI-powered user interfaces. Real case studies demonstrating AI-enhanced design solutions."
        image="/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
        type="website"
        url="https://barskydesign.pro/projects"
      />
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-white">
          <section className="py-12">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
                <h1 className="text-3xl font-semibold text-gray-900 mt-4">
                  Product Design & Gen AI Portfolio
                </h1>
                <p className="text-gray-600 mt-2">
                  Explore our case studies featuring AI-enhanced web applications and user interfaces.
                </p>
              </motion.div>
              
              <ProjectGrid />
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AllProjects;
