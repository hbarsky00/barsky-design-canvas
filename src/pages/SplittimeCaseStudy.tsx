import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";
import SplittimeImageViewer from "@/components/splittime/SplittimeImageViewer";
import SplittimeHero from "@/components/splittime/SplittimeHero";
import SplittimeConflictAnalysis from "@/components/splittime/SplittimeConflictAnalysis";
import SplittimeCoordinationSolution from "@/components/splittime/SplittimeCoordinationSolution";
import SplittimeFamilyInterface from "@/components/splittime/SplittimeFamilyInterface";
import SplittimeImpactMetrics from "@/components/splittime/SplittimeImpactMetrics";
import SplittimeCallToAction from "@/components/splittime/SplittimeCallToAction";
import { useSplittimeImageViewer } from "@/hooks/useSplittimeImageViewer";

const SplittimeCaseStudy: React.FC = () => {
  const {
    viewerOpen,
    currentImage,
    currentZoom,
    openImageViewer,
    closeImageViewer,
    zoomIn,
    zoomOut,
    resetZoom,
    handleImageKeypress
  } = useSplittimeImageViewer();
  return <>
        <DynamicSeo 
          type="project"
          title="Splittime: Co-Parenting App Case Study | Hiram Barsky"
          description="Transforming co-parenting from conflict to collaboration. AI-powered features that reduce communication stress and improve family coordination by 50%."
          image="https://barskydesign.pro/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png"
          projectName="Splittime"
          results={["50% reduction in onboarding time", "40% fewer support tickets", "Conflict-reduction through design"]}
          technologies={["React Native", "Family Tech", "Communication Platform", "Scheduling AI"]}
          path="/case-study-splittime"
        />
      
      <div className="coparenting-platform-showcase min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
        <Header />
        
        {/* Back Navigation */}
        <div className="pt-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link to="/projects" className="inline-flex items-center text-blue-700 hover:text-blue-900 transition-colors font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </motion.div>
        </div>
        
        <main className="flex-grow">
          <SplittimeHero 
            onImageClick={openImageViewer}
            onImageKeypress={handleImageKeypress}
          />

          <SplittimeConflictAnalysis 
            onImageClick={openImageViewer}
            onImageKeypress={handleImageKeypress}
          />

          <SplittimeCoordinationSolution 
            onImageClick={openImageViewer}
            onImageKeypress={handleImageKeypress}
          />

          <SplittimeFamilyInterface 
            onImageClick={openImageViewer}
            onImageKeypress={handleImageKeypress}
          />

          <SplittimeImpactMetrics 
            onImageClick={openImageViewer}
            onImageKeypress={handleImageKeypress}
          />

          <SplittimeCallToAction />
        </main>
        
        <SplittimeImageViewer
          viewerOpen={viewerOpen}
          currentImage={currentImage}
          currentZoom={currentZoom}
          onClose={closeImageViewer}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onResetZoom={resetZoom}
        />
        
        <Footer />
      </div>
    </>;
};
export default SplittimeCaseStudy;