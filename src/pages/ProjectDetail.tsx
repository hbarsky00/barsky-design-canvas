
import React from "react";
import { useParams } from "react-router-dom";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import ServicesCallToAction from "@/components/services/ServicesCallToAction";
import Contact from "@/components/Contact";
import { projectFaqs } from "@/data/seoFaqs";
import SimplifiedProjectDetail from "@/components/project/SimplifiedProjectDetail";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  if (!projectId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600">Invalid project ID</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ImageMaximizerProvider>
        <main className="flex-grow">
          <SimplifiedProjectDetail />
          <Contact />
          <ServicesCallToAction />
          <SeoFaqSection 
            title="Project & Design Questions"
            faqs={projectFaqs}
            className="mt-16"
          />
        </main>
      </ImageMaximizerProvider>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
