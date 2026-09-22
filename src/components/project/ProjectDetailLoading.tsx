
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MaterialDesignLoader from "@/components/loading/MaterialDesignLoader";

const ProjectDetailLoading: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <MaterialDesignLoader 
          size="lg"
          text="Loading project details..."
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailLoading;
